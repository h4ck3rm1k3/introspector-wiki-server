cmake_minimum_required(VERSION 2.4)
PROJECT(introspector-wiki-server)

# Usage: 
#   cmake . -DCMAKE_INCLUDE_PATH=~/exp/include -DCMAKE_LIBRARY_PATH=~/exp/lib
#

# SET(CMAKE_VERBOSE_MAKEFILE ON)
SET (BOOST_ROOT "/home/h4ck3rm1k3/install")
SET (CMAKE_PREFIX_PATH "/home/h4ck3rm1k3/install")
SET (CMAKE_C_COMPILER  "/opt/cfarm/release/4.5.1/bin/gcc")
SET (CMAKE_CXX_COMPILER "/opt/cfarm/release/4.5.1/bin/g++")
SET (CMAKE_MODULE_PATH ${cpptests_SOURCE_DIR}/cmake CACHE PATH "local cmake")
SET (LD_LIBRARY_PATH "/home/h4ck3rm1k3/install/lib/:/opt/cfarm/release/4.5.1/lib64/")
SET (CMAKE_LD_LIBRARY_PATH "/home/h4ck3rm1k3/install/lib/:/opt/cfarm/release/4.5.1/lib64/")

ADD_DEFINITIONS(-g -Wall -ansi -Wno-deprecated)
find_package (Threads)


SET(Boost_USE_STATIC_LIBS ON)
SET(Boost_USE_MULTITHREAD ON)
FIND_PACKAGE(Boost 1.35.0 REQUIRED COMPONENTS system thread regex)
IF(Boost_FOUND)
  INCLUDE_DIRECTORIES(${Boost_INCLUDE_DIRS})
  LINK_DIRECTORIES(${Boost_LIBRARY_DIRS})
ENDIF(Boost_FOUND)

SET(USED_LIBS ${Boost_SYSTEM_LIBRARY} ${Boost_THREAD_LIBRARY} ${Boost_REGEX_LIBRARY})

ADD_EXECUTABLE(introspector-wiki-server boost.cpp webem.cpp wikiserver.cpp connection.cpp)
TARGET_LINK_LIBRARIES(introspector-wiki-server ${USED_LIBS} ${CMAKE_THREAD_LIBS_INIT})

#/opt/cfarm/release/X.Y.Z/bin