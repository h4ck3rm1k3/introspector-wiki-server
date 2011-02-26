/**
 * @file   proxy-server.cpp
 * @author Alex Ott <alexott@gmail.com>
 * 
 * @brief  
 * 
 * 
 */

#include "proxy-server.hpp"

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
