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
#include "connection.hpp"


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

/** 
 * 
 * 
 */


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
