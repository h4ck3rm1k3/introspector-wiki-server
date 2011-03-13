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
						     isOpened(false) 

{
  init_mime_types();
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

/** 
 * 
 * 
 * @param err 
 * @param endpoint_iterator 
 */


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
