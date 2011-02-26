//#include "proxy-server.hpp"

/**
 * @file   proxy-server.hpp
 * @author Alex Ott <alexott@gmail.com>
 * 
 * @brief  
 * 
 * 
 */

//#include "common.h"
//#include "proxy-conn.hpp"
#include <boost/asio.hpp>
#include <boost/shared_ptr.hpp>
#include <boost/enable_shared_from_this.hpp>

#include <boost/algorithm/string.hpp>
#include <boost/lexical_cast.hpp>

#include <boost/regex.hpp>

#include <boost/bind.hpp>
#include <boost/thread/thread.hpp>

#include <iostream>
#include <string>

namespace ba=boost::asio;
namespace bs=boost::system;

typedef boost::shared_ptr<ba::ip::tcp::socket> socket_ptr;
typedef boost::shared_ptr<ba::io_service> io_service_ptr;

#include <deque>
#include <map>
typedef std::deque<io_service_ptr> ios_deque;


/**
code derived from    proxy-conn.hpp @author Alex Ott <alexott@gmail.com>
**/




class connection : public boost::enable_shared_from_this<connection> {
public:
  typedef boost::shared_ptr<connection> pointer;

  static pointer create(ba::io_service& io_service) {
    return pointer(new connection(io_service));
  }

  ba::ip::tcp::socket& socket() {
    return bsocket_;
  }

  void start();

private:
  connection(ba::io_service& io_service);
  void handle_browser_write(const bs::error_code& err, size_t len);
  void handle_browser_read_headers(const bs::error_code& err, size_t len);
  void handle_server_write(const bs::error_code& err, size_t len);
  void handle_server_read_headers(const bs::error_code& err, size_t len);
  void handle_server_read_body(const bs::error_code& err, size_t len);
  void start_connect();
  void start_write_to_server();
  void shutdown();
  void handle_resolve(const boost::system::error_code& err,
		      ba::ip::tcp::resolver::iterator endpoint_iterator);
  void handle_connect(const boost::system::error_code& err,
		      ba::ip::tcp::resolver::iterator endpoint_iterator);

  ba::io_service& io_service_;
  ba::ip::tcp::socket bsocket_;
  ba::ip::tcp::socket ssocket_;
  ba::ip::tcp::resolver resolver_;
  bool proxy_closed;
  bool isPersistent;
  int32_t RespLen;
  int32_t RespReaded;

  boost::array<char, 8192> bbuffer;
  boost::array<char, 8192> sbuffer;

  std::string fURL;
  std::string fHeaders;
  std::string fNewURL;
  std::string fMethod;
  std::string fReqVersion;
  std::string fServer;
  std::string fPort;
  bool isOpened;

  std::string fReq;
  
  typedef std::map<std::string,std::string> headersMap;
  headersMap reqHeaders, respHeaders;
  
  void parseHeaders(const std::string& h, headersMap& hm);
};




class server {
public:
  server(const ios_deque& io_services, int port=10001);

private:
  void start_accept();
  void handle_accept(connection::pointer new_connection, const bs::error_code& error);
  
  ios_deque io_services_;
  ba::ip::tcp::acceptor acceptor_;
};





int main(int argc, char** argv) {
  try {
    int thread_num=2;
    if(argc > 1)
      thread_num=boost::lexical_cast<int>(argv[1]);
    ios_deque io_services;
    std::deque<ba::io_service::work> io_service_work;
    
    boost::thread_group thr_grp;
    
    for (int i = 0; i < thread_num; ++i) {
      io_service_ptr ios(new ba::io_service);
      io_services.push_back(ios);
      io_service_work.push_back(ba::io_service::work(*ios));
      thr_grp.create_thread(boost::bind(&ba::io_service::run, ios));
    }
    server server(io_services);
    thr_grp.join_all();
  } catch (std::exception& e) {
    std::cerr << e.what() << std::endl;
  }


  return 0;
}

/*server::server(std::deque<boost::shared_ptr<boost::asio::io_service>, std::allocator<boost::shared_ptr<boost::asio::io_service> > > const& a, int b)
//  : boost::asio::basic_socket_acceptor<boost::asio::ip::tcp>::basic_socket_acceptor(a,b)
{

}*/


/** 
 * 
 * 
 * @param io_service 
 */
connection::connection(ba::io_service& io_service) : io_service_(io_service),
													 bsocket_(io_service),
													 ssocket_(io_service),
													 resolver_(io_service),
													 proxy_closed(false),
													 isPersistent(false),
													 isOpened(false) {
}

/** 
 * 
 * 
 */
void connection::start() {
	fHeaders.clear();
	reqHeaders.clear();
	respHeaders.clear();
	
	async_read(bsocket_, ba::buffer(bbuffer), ba::transfer_at_least(1),
			   boost::bind(&connection::handle_browser_read_headers,
						   shared_from_this(),
						   ba::placeholders::error,
						   ba::placeholders::bytes_transferred));
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
		if(fHeaders.find("\r\n\r\n") == std::string::npos) { // going to read rest of headers
			async_read(bsocket_, ba::buffer(bbuffer), ba::transfer_at_least(1),
					   boost::bind(&connection::handle_browser_read_headers,
								   shared_from_this(),
								   ba::placeholders::error,
								   ba::placeholders::bytes_transferred));
		} else { // analyze headers
			std::string::size_type idx=fHeaders.find("\r\n");
			std::string reqString=fHeaders.substr(0,idx);
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
void connection::handle_server_write(const bs::error_code& err, size_t len) {
	if(!err) {
		async_read(ssocket_, ba::buffer(sbuffer), ba::transfer_at_least(1),
				   boost::bind(&connection::handle_server_read_headers,
							   shared_from_this(),
							   ba::placeholders::error,
							   ba::placeholders::bytes_transferred));
	}else {
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
			parseHeaders(fHeaders.substr(idx+2),respHeaders);
			std::string reqConnString="",respConnString="";

			std::string respVersion=respString.substr(respString.find("HTTP/")+5,3);
			
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
void connection::handle_browser_write(const bs::error_code& err, size_t len) {
	if(!err) {
		if(!proxy_closed && (RespLen == -1 || RespReaded < RespLen))
			async_read(ssocket_, ba::buffer(sbuffer,len), ba::transfer_at_least(1),
					   boost::bind(&connection::handle_server_read_body,
								   shared_from_this(),
								   ba::placeholders::error,
								   ba::placeholders::bytes_transferred));
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

void connection::shutdown() {
	ssocket_.close();
	bsocket_.close();
}

/** 
 * 
 * 
 */
void connection::start_connect() {
	std::string server="";
	std::string port="80";
	boost::regex rHTTP("http://(.*?)(:(\\d+))?(/.*)");
	boost::smatch m;
	
	if(boost::regex_search(fURL, m, rHTTP, boost::match_extra)) {
		server=m[1].str();
		if(m[2].str() != "") {
			port=m[3].str();
		}
		fNewURL=m[4].str();
	}
	if(server.empty()) {
		std::cout << "Can't parse URL "<< std::endl;
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

/** 
 * 
 * 
 */
void connection::start_write_to_server() {
	fReq=fMethod;
	fReq+=" ";
	fReq+=fNewURL;
	fReq+=" HTTP/";
	fReq+="1.0";
	fReq+="\r\n";
	fReq+=fHeaders;
	ba::async_write(ssocket_, ba::buffer(fReq),
					boost::bind(&connection::handle_server_write, shared_from_this(),
								ba::placeholders::error,
								ba::placeholders::bytes_transferred));

	fHeaders.clear();
}


/** 
 * 
 * 
 * @param err 
 * @param endpoint_iterator 
 */
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

/** 
 * 
 * 
 * @param err 
 * @param endpoint_iterator 
 */
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

void connection::parseHeaders(const std::string& h, headersMap& hm) {
	std::string str(h);
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
	}
}

server::server(const ios_deque& io_services, int port)
	: io_services_(io_services),
	  acceptor_(*io_services.front(), ba::ip::tcp::endpoint(ba::ip::tcp::v4(), port)) {
	start_accept();
}

void server::start_accept() {
	// Round robin.
	io_services_.push_back(io_services_.front());
	io_services_.pop_front();
	connection::pointer new_connection = connection::create(*io_services_.front());

	acceptor_.async_accept(new_connection->socket(),
						   boost::bind(&server::handle_accept, this, new_connection,
									   ba::placeholders::error));
}

void server::handle_accept(connection::pointer new_connection, const bs::error_code& error) {
	if (!error) {
		new_connection->start();
		start_accept();
	}
}
