cmake_minimum_required(VERSION 2.4)
PROJECT(asio-proxy-async)

# Usage: 
#   cmake . -DCMAKE_INCLUDE_PATH=~/exp/include -DCMAKE_LIBRARY_PATH=~/exp/lib
#

# SET(CMAKE_VERBOSE_MAKEFILE ON)

SET (CMAKE_MODULE_PATH ${cpptests_SOURCE_DIR}/cmake CACHE PATH "local cmake")

ADD_DEFINITIONS(-g -Wall -ansi -Wno-deprecated)

SET(Boost_USE_STATIC_LIBS OFF)
SET(Boost_USE_MULTITHREAD ON)
FIND_PACKAGE(Boost 1.35.0 REQUIRED COMPONENTS system thread regex)
IF(Boost_FOUND)
  INCLUDE_DIRECTORIES(${Boost_INCLUDE_DIRS})
	LINK_DIRECTORIES(${Boost_LIBRARY_DIRS})
ENDIF(Boost_FOUND)

SET(USED_LIBS ${Boost_SYSTEM_LIBRARY} ${Boost_THREAD_LIBRARY} ${Boost_REGEX_LIBRARY})

ADD_EXECUTABLE(asio-proxy-async proxy.cpp proxy-server.cpp proxy-conn.cpp)
TARGET_LINK_LIBRARIES(asio-proxy-async ${USED_LIBS})

