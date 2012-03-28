

#include <asio/basic_datagram_socket.hpp>
#include <asio/basic_deadline_timer.hpp>
#include <asio/basic_io_object.hpp>
#include <asio/basic_raw_socket.hpp>
#include <asio/basic_seq_packet_socket.hpp>
#include <asio/basic_serial_port.hpp>
#include <asio/basic_signal_set.hpp>
#include <asio/basic_socket_acceptor.hpp>
#include <asio/basic_socket_iostream.hpp>
#include <asio/basic_socket_streambuf.hpp>
#include <asio/basic_stream_socket.hpp>
#include <asio/basic_streambuf.hpp>
#include <asio/buffer.hpp>
#include <asio/buffered_read_stream.hpp>
#include <asio/buffered_read_stream_fwd.hpp>
#include <asio/buffered_stream.hpp>
#include <asio/buffered_stream_fwd.hpp>
#include <asio/buffered_write_stream.hpp>
#include <asio/buffered_write_stream_fwd.hpp>
#include <asio/buffers_iterator.hpp>
#include <asio/completion_condition.hpp>
#include <asio/connect.hpp>
#include <asio/datagram_socket_service.hpp>
#include <asio/detail/push_options.hpp>
#include <asio/detail/socket_types.hpp>
#include <asio/error.hpp>
#include <asio/handler_alloc_hook.hpp>
#include <asio/handler_invoke_hook.hpp>
#include <asio/io_service.hpp>
#include <asio/ip/address.hpp>
#include <asio/ip/address_v4.hpp>
#include <asio/ip/address_v6.hpp>
#include <asio/ip/basic_endpoint.hpp>
#include <asio/ip/basic_resolver.hpp>
#include <asio/ip/basic_resolver_entry.hpp>
#include <asio/ip/basic_resolver_iterator.hpp>
#include <asio/ip/basic_resolver_query.hpp>
#include <asio/ip/host_name.hpp>
#include <asio/ip/icmp.hpp>
#include <asio/ip/multicast.hpp>
#include <asio/ip/resolver_query_base.hpp>
#include <asio/ip/resolver_service.hpp>
#include <asio/ip/tcp.hpp>
#include <asio/ip/udp.hpp>
#include <asio/ip/unicast.hpp>
#include <asio/is_read_buffered.hpp>
#include <asio/is_write_buffered.hpp>
#include <asio/local/basic_endpoint.hpp>
#include <asio/local/connect_pair.hpp>
#include <asio/local/datagram_protocol.hpp>
#include <asio/local/stream_protocol.hpp>
#include <asio/placeholders.hpp>
#include <asio/posix/basic_descriptor.hpp>
#include <asio/posix/basic_stream_descriptor.hpp>
#include <asio/posix/descriptor_base.hpp>
#include <asio/posix/stream_descriptor.hpp>
#include <asio/posix/stream_descriptor_service.hpp>
#include <asio/raw_socket_service.hpp>
#include <asio/read.hpp>
#include <asio/read_at.hpp>
#include <asio/read_until.hpp>
#include <asio/seq_packet_socket_service.hpp>
#include <asio/serial_port.hpp>
#include <asio/serial_port_base.hpp>
#include <asio/serial_port_service.hpp>
#include <asio/signal_set.hpp>
#include <asio/signal_set_service.hpp>
#include <asio/socket_acceptor_service.hpp>
#include <asio/socket_base.hpp>
#include <asio/strand.hpp>
#include <asio/stream_socket_service.hpp>
#include <asio/streambuf.hpp>
#include <asio/time_traits.hpp>
#include <asio/version.hpp>
#include <asio/write.hpp>
#include <asio/write_at.hpp>


#include <boost/thread/thread.hpp>
#include <boost/thread/condition_variable.hpp>
#include <boost/thread/exceptions.hpp>
#include <boost/thread/mutex.hpp>
#include <boost/thread/once.hpp>
#include <boost/thread/recursive_mutex.hpp>
#include <boost/thread/tss.hpp>
#include <boost/thread/thread_time.hpp>
#include <boost/thread/locks.hpp>
#include <boost/thread/shared_mutex.hpp>
#include <boost/thread/barrier.hpp>
#include <boost/thread/future.hpp>

///
#include <boost/interprocess/detail/config_begin.hpp>
#include <boost/interprocess/detail/workaround.hpp>
#include <boost/detail/workaround.hpp>
#include <boost/interprocess/creation_tags.hpp>
#include <boost/interprocess/exceptions.hpp>
#include <boost/interprocess/detail/utilities.hpp>
#include <boost/interprocess/detail/move.hpp>
#include <boost/interprocess/detail/os_file_functions.hpp>
#include <boost/interprocess/interprocess_fwd.hpp>
#include <boost/interprocess/exceptions.hpp>
//#include <boost/interprocess/xsi_key.hpp>
//#include <boost/interprocess/permissions.hpp>


#include <sys/shm.h>
#include <boost/cstdint.hpp>

#include <cstddef>   //std::size_t
#include <string>    //char_traits
#include <new>       //std::nothrow
#include <utility>   //std::pair
#include <boost/assert.hpp>
#include <exception>


namespace introspector {
namespace wiki {
namespace server {

#define INTROSPECTOR_WEB_DECL 

class request {
};

class page {
};

class response {
};

class thread {
};

class context {
  
  class distribution_key {

  };

  template <class tkey,class tdata> class distribution_storage {
    // store a hash or something of key->data, 
    void store_data(tkey key,tdata data);

    tdata  fetch_data(tkey key);

    // make sure all servers share this data, and all processes on all servers.

    // avoid lock contention.
    void broadcast_to_all_servers();
    void receive_message_from_other_server();

    void lock_shared_variable_per_key(tkey ks); // lock this one key data   
    
  };

  //each thread is responsible for one type of catagory, it processes all the data for that cat and mirrors/caches that data to all other servers, (think specialist or broker)
  distribution_storage<distribution_key,thread> threads;
};


class client
{
};

  class connection {};
class server
{
public:
  // Default constructor.
  INTROSPECTOR_WEB_DECL server();
  
  context create_context();

  client create_client (context c );

  thread create_connection ( context x, client m );

  connection create_connection ( context x, thread t, client m );

  // cli
  request create_request ( context x, connection c, thread t );
  
  //serve a page 
  server ( context x, thread t, request r, page p, response s )
  {
    
  }
  
};// class 
  
}; // ns server 
}; // ns wiki
}; // ns introspectr

