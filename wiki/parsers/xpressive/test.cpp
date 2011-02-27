// Bojan Nikolic <bojan@bnikolic.co.uk>

// A simple program to filter the standard input, allowing the user to
// supply a regular expression and then embelishing this regular
// expression by requiring specific characters before its occurance


#include <iostream>
#include <boost/xpressive/xpressive_static.hpp>
#include <boost/xpressive/xpressive_dynamic.hpp>


using namespace boost::xpressive;

struct filter
{

  /// The user-supplied regular expression
  sregex urex;

  /// The static part of the regular expression
  sregex srex;

  /// Construct a filter witch maches one or more of 'X', 'x' or ' '
  /// (space) and then a user-supplied regular expression and then a
  /// colon.
  ///
  /// For example could be used to find string of type:
  ///
  /// XXX Warning: There was a delay in accessing the market data server
  ///
  /// Note the use of reference to urex in the static expression srex
  filter(const char *u):
    urex(sregex::compile(u)),
    srex(+(set='X','x',' ')>>urex>>':'>> +_)
  {}

  /// Does the string match?
  bool pred(const std::string &s)
  {
    return regex_match(s,srex);
  }

};

void dofilter(std::istream &ins,
              std::ostream &os,
              const char *urex_str)
{
  filter f(urex_str);
  std::string cline;
  while(ins.good())
    {
      std::getline(ins,cline);
      if (f.pred(cline))
	{
	  os<<cline;
	}
    }
}

int main(int argc, const char **argv)
{
  dofilter(std::cin,
           std::cout,
           argv[1]);
}
