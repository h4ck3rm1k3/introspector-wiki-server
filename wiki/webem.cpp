#include <string>
#include <boost/bind.hpp>

// register application method
// Whenever server sees <!--#webem hello -->
// call cHello::DisplayHTML() and include the HTML returned


class cHello
{
public:
  void DisplayHTML ();
};

class Server 
{
public:
  template <class t> void RegisterIncludeCode( std::string name, t);
  void RegisterIncludeCode(std::basic_string<char>, 
			   boost::_bi::bind_t<void, boost::_mfi::mf0<void, cHello>, 
			   boost::_bi::list1<boost::_bi::value<cHello*> > >
			   )
  {}
} ;

void foo()
{
Server  theServer;
cHello hello;

theServer.RegisterIncludeCode( "hello",
			       boost::bind(
					   &cHello::DisplayHTML,// member function
					   &hello ) );// instance of class
}


template <> void Server::RegisterIncludeCode(std::basic_string<char, std::char_traits<char>, std::allocator<char> >, boost::_bi::bind_t<void, boost::_mfi::mf0<void, cHello>, boost::_bi::list1<boost::_bi::value<cHello*> > >)
{

}

void cHello::DisplayHTML()
{

}

/*
typedef  boost::_bi::bind_t<
    void, boost::_mfi::mf0<
	    void, cHello>, 
    boost::_bi::list1<
      boost::_bi::value<cHello*> > > type_X_t;

typedef boost::_bi::bind_t<void, boost::_mfi::mf0<void, cHello> , 
			   boost::_bi::list1<boost::_bi::value<cHello*> > > type_bind_t;

			   template <> void Server::RegisterIncludeCode<type_X_t >(
							std::string name, 
							type_bind_t bind
							)
{}
*/

/*
)':
/home/h4ck3rm1k3/experiments/icinga/cxx0x/wiki/boost.cpp:150:144: error: no matching function for call to 'boost::asio::basic_socket_acceptor<boost::asio::ip::tcp>::basic_socket_acceptor()'

boost/asio/basic_socket_acceptor.hpp:170:3: note: candidates are: 


boost::asio::basic_socket_acceptor<Protocol, SocketAcceptorService>::basic_socket_acceptor(
boost::asio::io_service&, 
const protocol_type&, 
boost::asio::basic_socket_acceptor<Protocol, SocketAcceptorService>::native_handle_type&)
 [with 
 Protocol = boost::asio::ip::tcp, 
 SocketAcceptorService = boost::asio::socket_acceptor_service<boost::asio::ip::tcp>, 
 protocol_type = boost::asio::ip::tcp, 
 boost::asio::basic_socket_acceptor<Protocol, SocketAcceptorService>::native_handle_type = int]


boost/asio/basic_socket_acceptor.hpp:135:3: note:                 boost::asio::basic_socket_acceptor<Protocol, SocketAcceptorService>::basic_socket_acceptor(boost::asio::io_service&, boost::asio::basic_socket_acceptor<Protocol, SocketAcceptorService>::endpoint_type&, bool) [with Protocol = boost::asio::ip::tcp, SocketAcceptorService = boost::asio::socket_acceptor_service<boost::asio::ip::tcp>, boost::asio::basic_socket_acceptor<Protocol, SocketAcceptorService>::endpoint_type = boost::asio::ip::basic_endpoint<boost::asio::ip::tcp>]
boost/asio/basic_socket_acceptor.hpp:99:3: note:                 boost::asio::basic_socket_acceptor<Protocol, SocketAcceptorService>::basic_socket_acceptor(boost::asio::io_service&, const protocol_type&) [with Protocol = boost::asio::ip::tcp, SocketAcceptorService = boost::asio::socket_acceptor_service<boost::asio::ip::tcp>, protocol_type = boost::asio::ip::tcp]
boost/asio/basic_socket_acceptor.hpp:82:12: note:                 boost::asio::basic_socket_acceptor<Protocol, SocketAcceptorService>::basic_socket_acceptor(boost::asio::io_service&) [with Protocol = boost::asio::ip::tcp, SocketAcceptorService = boost::asio::socket_acceptor_service<boost::asio::ip::tcp>]
boost/asio/basic_socket_acceptor.hpp:57:1: note:                 boost::asio::basic_socket_acceptor<boost::asio::ip::tcp>::basic_socket_acceptor(const boost::asio::basic_socket_acceptor<boost::asio::ip::tcp>&)

*/
