#include "connection.hpp"
//#include <boost/log/formatters/date_time.hpp>

#include <iostream>
#include <boost/filesystem.hpp>
//#include <boost/local_time.hpp>
#include <boost/date_time/time_zone_base.hpp>

//#include <boost/filesystem/fstream.hpp>
//#include <boost/filesystem/operations.hpp>
#include <string>
#include <iostream>
#include <fstream>
#include <cstdio> // for std::remove


#include <algorithm>
#include <iterator>


#include <boost/date_time/local_time/local_time.hpp>
using namespace boost::filesystem;

// this is going to connect to another server
void connection::start_connect() {
	std::string server="";
	std::string port="80";
	boost::regex rHTTP("http://(.*?)(:(\\d+))?(/.*)");

	boost::regex rOTHER("/([\\/\\s\\w]+\\.\\w+)");

	boost::smatch m;
	std::cout << "got URL "	  << fURL  << std::endl;
	
	if(boost::regex_search(fURL, m, rHTTP, boost::match_extra)) {
		server=m[1].str();
		if(m[2].str() != "") {
			port=m[3].str();
		}
		fNewURL=m[4].str();

		std::cout << "parsed URL "
			  << fURL << std::endl
		  //			  << rHTTP << std::endl
		  //			  << m
			  << fNewURL << std::endl
			  << std::endl;
	}
	//	if rOTHER

	if(server.empty()) {
		std::cout << "Can't parse URL "
			  << fURL
		  //	  << rHTTP
		  //			  << m
			  << std::endl;
		if(boost::regex_search(fURL, m, rOTHER, boost::match_extra)) {
		  
		  std::string path=m[1].str();

		    			// append cookie to headers
		    std::string headers;
		    //Sat, 26 Feb 2011 19:13:18 GMT
		    
		    std::stringstream ss;
		    ss.exceptions(std::ios_base::failbit);
		    boost::local_time::local_date_time t(boost::local_time::local_sec_clock::local_time(boost::local_time::time_zone_ptr()));
		    boost::local_time::local_time_facet* lf(new boost::local_time::local_time_facet("%a, %d %b %Y %H:%M:%S GMT"));
		    ss.imbue(std::locale(std::cout.getloc(), lf));

		    ss << "HTTP/1.1 200 OK\n";
		    ss << "Date:"<< t << std::endl;
		    ss << "Vary: Cookie,User-Agent,Accept-Language,Accept-Encoding" << std::endl;
		    ss << "Keep-Alive: timeout=15, max=100" << std::endl;
		    ss << "Connection: Keep-Alive" << std::endl;
		    ss << "Content-Type: text/html; charset=utf-8" << std::endl;
		    ss << "Set-Cookie: other2=test; expires=1d" << std::endl;

		    std::ifstream tfs;
		    std::cout << "going to read file :"  << path << std::endl;
		    
		    tfs.open( path.c_str() );
		    if (tfs)
		      {
			std::copy(std::istreambuf_iterator<char>(tfs),
				  std::istreambuf_iterator<char>(),
				  std::ostreambuf_iterator<char>(ss));
		    headers = ss.str();
		    std::cout << "going to write the received headers to client :"  << headers << std::endl;

		    
		    ba::async_write(bsocket_, ba::buffer(headers),
							boost::bind(&connection::handle_browser_write,
										shared_from_this(),
										ba::placeholders::error,
										ba::placeholders::bytes_transferred));
		      }
		    else
		      {
			std::cout << "cannot to read file :"  << path << std::endl;
		      }




		  }
		return;
	}
	if(!isOpened || server != fServer || port != fPort) {
		fServer=server;
		fPort=port;
		ba::ip::tcp::resolver::query query(server, port);
		resolver_.async_resolve(query,
								boost::bind(&connection::handle_resolve, shared_from_this(),
											boost::asio::placeholders::error,
											boost::asio::placeholders::iterator));
	} else {
	    start_write_to_server();
	}
}
void connection::handle_resolve(const boost::system::error_code& err,
								ba::ip::tcp::resolver::iterator endpoint_iterator) {
    if (!err) {
		ba::ip::tcp::endpoint endpoint = *endpoint_iterator;
		ssocket_.async_connect(endpoint,
							  boost::bind(&connection::handle_connect, shared_from_this(),
										  boost::asio::placeholders::error,
										  ++endpoint_iterator));
    }else {
		shutdown();
	}
}

void connection::handle_connect(const boost::system::error_code& err,
								ba::ip::tcp::resolver::iterator endpoint_iterator) {
    if (!err) {
		isOpened=true;
		start_write_to_server();
    } else if (endpoint_iterator != ba::ip::tcp::resolver::iterator()) {
		ssocket_.close();
		ba::ip::tcp::endpoint endpoint = *endpoint_iterator;
		ssocket_.async_connect(endpoint,
							   boost::bind(&connection::handle_connect, shared_from_this(),
										   boost::asio::placeholders::error,
										   ++endpoint_iterator));
    } else {
		shutdown();
	}
}

/** 
 * 
 * 
 * @param err 
 * @param len 
 */
void connection::handle_browser_read_headers(const bs::error_code& err, size_t len) {
	if(!err) {

		if(fHeaders.empty())
			fHeaders=std::string(bbuffer.data(),len);
		else
			fHeaders+=std::string(bbuffer.data(),len);

		std::cout << "got browser headers:"
			  << fHeaders << std::endl;

		if(fHeaders.find("\r\n\r\n") == std::string::npos) { // going to read rest of headers
			async_read(bsocket_, ba::buffer(bbuffer), ba::transfer_at_least(1),
					   boost::bind(&connection::handle_browser_read_headers,
								   shared_from_this(),
								   ba::placeholders::error,
								   ba::placeholders::bytes_transferred));
		} else { // analyze headers
			std::string::size_type idx=fHeaders.find("\r\n");
			std::string reqString=fHeaders.substr(0,idx);
			// this is the get from the client
			std::cout << " request string: " << reqString << std::endl;
			std::cout << " request idx: " << fHeaders << std::endl;


			fHeaders.erase(0,idx+2);

			idx=reqString.find(" ");
			if(idx == std::string::npos) {
				std::cout << "Bad first line: " << reqString << std::endl;
				return;
			}
			
			fMethod=reqString.substr(0,idx);
			reqString=reqString.substr(idx+1);
			idx=reqString.find(" ");
			if(idx == std::string::npos) {
				std::cout << "Bad first line of request: " << reqString << std::endl;
				return;
			}
			fURL=reqString.substr(0,idx);
			fReqVersion=reqString.substr(idx+1);
			idx=fReqVersion.find("/");
			if(idx == std::string::npos) {
				std::cout << "Bad first line of request: " << reqString << std::endl;
				return;
			}
			fReqVersion=fReqVersion.substr(idx+1);
			
			// analyze headers, etc
			parseHeaders(fHeaders,reqHeaders);
			// pass control
			start_connect();
		}
	} else {
		shutdown();
	}
}

/** 
 * 
 * 
 * @param err 
 * @param len 
 */
void connection::handle_server_read_headers(const bs::error_code& err, size_t len) {
	if(!err) {
		std::string::size_type idx;
		if(fHeaders.empty())
			fHeaders=std::string(sbuffer.data(),len);
		else
			fHeaders+=std::string(sbuffer.data(),len);

		std::cout << "read headers data2:"  << fHeaders << std::endl;


		idx=fHeaders.find("\r\n\r\n");
		if(idx == std::string::npos) { // going to read rest of headers
			async_read(ssocket_, ba::buffer(sbuffer), ba::transfer_at_least(1),
					   boost::bind(&connection::handle_browser_read_headers,
								   shared_from_this(),
								   ba::placeholders::error,
								   ba::placeholders::bytes_transferred));


		} else { // analyze headers
			RespReaded=len-idx-4;
			idx=fHeaders.find("\r\n");
 			std::string respString=fHeaders.substr(0,idx);
			RespLen = -1;
			std::string reststring = fHeaders.substr(idx+2); // the rest of the string
			std::cout << "Split rest string :"  << reststring << std::endl;

			parseHeaders(reststring,respHeaders);
			std::string reqConnString="",respConnString="";

			std::string respVersion=respString.substr(respString.find("HTTP/")+5,3);
			std::cout << "Split off respon string :"  << respString << std::endl;
			std::cout << "going to write the received headers to client :"  << fHeaders << std::endl;
			
			headersMap::iterator it=respHeaders.find("Content-Length");
			if(it != respHeaders.end())
				RespLen=boost::lexical_cast<int>(it->second);
			it=respHeaders.find("Connection");
			if(it != respHeaders.end())
				respConnString=it->second;
			it=reqHeaders.find("Connection");
			if(it != reqHeaders.end())
				reqConnString=it->second;


			
			isPersistent=(
				((fReqVersion == "1.1" && reqConnString != "close") ||
				 (fReqVersion == "1.0" && reqConnString == "keep-alive")) &&
				((respVersion == "1.1" && respConnString != "close") ||
				 (respVersion == "1.0" && respConnString == "keep-alive")) &&
				RespLen != -1);


			// append cookie to headers
			respString +="\nSet-Cookie: other=test; expires=1d\n";
			respString +="Set-Cookie: test_name=value; expires=1d\n";
			respString +="Set-Cookie: test_name202=value4; expires=1d\n";
			fHeaders =   respString + reststring;

			std::cout << "going to write the received headers to client :"  << fHeaders << std::endl;

			// send data
			ba::async_write(bsocket_, ba::buffer(fHeaders),
							boost::bind(&connection::handle_browser_write,
										shared_from_this(),
										ba::placeholders::error,
										ba::placeholders::bytes_transferred));
		}
	} else {
		shutdown();
	}
}
// get from the second server.
void connection::start_write_to_server() {
	fReq=fMethod;
	fReq+=" ";
	fReq+=fNewURL;
	fReq+=" HTTP/";
	fReq+="1.0";
	fReq+="\r\n";
	fReq+="\nSet-Cookie: test_name=value;test_name5=value226;expires=1d\n";
	fReq+=fHeaders;

	std::cout << " ask for page string: " << fReq << std::endl;

	ba::async_write(ssocket_, ba::buffer(fReq),
					boost::bind(&connection::handle_server_write, shared_from_this(),
								ba::placeholders::error,
								ba::placeholders::bytes_transferred));
	//    calls connection::handle_server_read_headers,
	fHeaders.clear();
}

/** 
 *  writes to the client the data found
 * 
 * @param err 
 * @param len 
 */
void connection::handle_browser_write(const bs::error_code& err, size_t len) {


  std::string temp_buff2=std::string(sbuffer.data(),len);
  std::cout << "connection::handle_browser_write going to write :"  << temp_buff2 << std::endl;
  
  // now we want to append the cookie to the header 
    //	fReq+="Set-Cookie: test_name=value; test_name2=value>2; expires=1d;";

  if(!err) {
    if(!proxy_closed && (RespLen == -1 || RespReaded < RespLen))
      {
	async_read(ssocket_, ba::buffer(sbuffer,len), ba::transfer_at_least(1),
		   boost::bind(&connection::handle_server_read_body,
			       shared_from_this(),
			       ba::placeholders::error,
			       ba::placeholders::bytes_transferred));
	
	std::cout << "connection::handle_browser_write wrote :"  << temp_buff2 << std::endl;
	
	    }
    else {
      //			shutdown();
	    if(isPersistent && !proxy_closed) {
	      std::cout << "Starting read headers from browser, as connection is persistent" << std::endl;
	      start();
	    }
	  }
  } else {
    shutdown();
  }
}

void connection::parseHeaders(const std::string& h, headersMap& hm) {
	std::string str(h);
	std::cout << "parseheaders:"  << str << std::endl;

	std::string::size_type idx;
	std::string t;
	while((idx=str.find("\r\n")) != std::string::npos) {
		t=str.substr(0,idx);
		str.erase(0,idx+2);
		if(t == "")
			break;
		idx=t.find(": ");
		if(idx == std::string::npos) {
			std::cout << "Bad header line: " << t << std::endl;
			break;
		}
		hm.insert(std::make_pair(t.substr(0,idx),t.substr(idx+2)));

		std::cout << "adding pair: " << t.substr(0,idx) << " = " << t.substr(idx+2) << std::endl;

	}
	// add the cookie
	
	hm.insert(std::make_pair("Set-Cookie",
				 "test_name=value;test_name3=value302;expires=1d"
				 ));
	
		  
}

/** 
 * 
 * 
 * @param err 
 * @param len 
 */
void connection::handle_server_read_body(const bs::error_code& err, size_t len) {
	if(!err || err == ba::error::eof) {
		RespReaded+=len;
		if(err == ba::error::eof)
			proxy_closed=true;


		std::string temp_buff=std::string(bbuffer.data(),len);
		std::cout << "got data:"  << temp_buff << std::endl;


		ba::async_write(bsocket_, ba::buffer(sbuffer,len),
						boost::bind(&connection::handle_browser_write,
									shared_from_this(),
									ba::placeholders::error,
									ba::placeholders::bytes_transferred));
	} else {
		shutdown();
	}
}

/** 
 * 
 * 
 * @param err 
 * @param len 
 */
void connection::handle_server_write(const bs::error_code& err, size_t len) {
	if(!err) {
		async_read(ssocket_, ba::buffer(sbuffer), ba::transfer_at_least(1),
				   boost::bind(&connection::handle_server_read_headers,
							   shared_from_this(),
							   ba::placeholders::error,
							   ba::placeholders::bytes_transferred));
		std::string temp_buff=std::string(bbuffer.data(),len);
		std::cout << "got data:"  << temp_buff << std::endl;
		std::string temp_buff2=std::string(sbuffer.data(),len);
		std::cout << "send data:"  << temp_buff2 << std::endl;


	}else {
		shutdown();
	}
}
