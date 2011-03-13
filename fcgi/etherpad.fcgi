#!/usr/bin/perl
use strict;
use CGI::Fast;
use JSON; # imports encode_json, decode_json, to_json and from_json.
use CGI qw(:standard);

# "DOCUMENT_ROOT":"/home/andreas/experiments2/wiki/wiki/",
# "FCGI_ROLE":"RESPONDER",
# "GATEWAY_INTERFACE":"CGI/1.1",
# "HTTP_ACCEPT":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
# "HTTP_ACCEPT_CHARSET":"ISO-8859-1,utf-8;q=0.7,*;q=0.7"
# "HTTP_ACCEPT_ENCODING":"gzip,deflate"
# "HTTP_ACCEPT_LANGUAGE":"de-de,de;q=0.8,en-us;q=0.5,en;q=0.3",
# "HTTP_CONNECTION":"keep-alive",
# "HTTP_HOST":"localhost",
# "HTTP_KEEP_ALIVE":"115",
# "HTTP_USER_AGENT":"Mozilla/5.0 (X11; U; Linux i686; de; rv:1.9.2.14pre) Gecko/20101218 Ubuntu/9.10 (karmic) Namoroka/3.6.14pre",
# "PATH_INFO":"",
# "PHP_FCGI_CHILDREN":"1"
# "PWD":"/var/log/lighttpd",
# "QUERY_STRING":"URL=/tstest",
# "REDIRECT_STATUS":"200",
# "REDIRECT_URI":"/ep/etherpad.pl?URL=/tstest",
# "REMOTE_ADDR":"::1",
# "REMOTE_PORT":"44632",
# "REQUEST_METHOD":"GET",
# "REQUEST_URI":"/ep/tstest",
# "SCRIPT_FILENAME":"/home/andreas/experiments2/wiki/wiki/ep/etherpad.pl",
# "SCRIPT_NAME":"/ep/etherpad.pl",
# "SERVER_ADDR":"::1",
# "SERVER_NAME":"localhost",
# "SERVER_PORT":"80",
# "SERVER_PROTOCOL":"HTTP/1.1",
# "SERVER_SOFTWARE":"lighttpd/1.4.22",

while (new CGI::Fast) {
#    my $filename = $ENV{SCRIPT_FILENAME};


    if ($ENV{REQUEST_URI} eq "/ep/account/guest-knock")
    {
	#
#data: {
#24 padId: clientVars.localPadId,
#25 guestDisplayName: clientVars.guestDisplayName
#26 }, 
	print header();   
	print "approved"; #
	#denied
	#wait
    }

#~/experiments2/wiki/wiki/etherpad/pad/etherpad/src/etherpad/control/historycontrol.js
#  if ((regexResult = /^stat$/.exec(rest))) {
#     _do_stat(padId);
#   }
#   else if ((regexResult = /^text\/(\d+)$/.exec(rest))) {
#     var r = Number(regexResult[1]);
#     _do_text(padId, r);
#   }
#   else if ((regexResult = /^changes\/(\d+)-(\d+)$/.exec(rest))) {
#     _do_changes(padId, Number(regexResult[1]), Number(regexResult[2]));
#   }

#/ep/pad/changes/MYPADID?s=NaN&g=1    
#http://localhost/ep/pad/history/myfunkyid/changes/1-1
#http://localhost/ep/xhrXdFrame/100253302409

#see : etherpad/pad/infrastructure/net.appjet.ajstdlib/streaming.scala

  elsif ($ENV{REQUEST_URI} =~ /^\/ep\/xhrXdFrame\/(.+)/)
  {
       print header();
       #print "<h3>this is an ifream</h3>\n";
print q%
<html>
<head>
<script>
function createRequestObject() {
  var xmlhttp=false;
  /*@cc_on @*/
  /*@if (@_jscript_version >= 5)
   try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
   } catch (e) {
    console.log(e);
    try {
     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
     xmlhttp = false;
    }
   }
  @end @*/
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    try {
      xmlhttp = new XMLHttpRequest();
    } catch (e) {
    console.log(e);
      xmlhttp=false;
    }
  }
  if (!xmlhttp && window.createRequest) {
    try {
      xmlhttp = window.createRequest();
    } catch (e) {
    console.log(e);
      xmlhttp=false;
    }
  }
  return xmlhttp
}
var host = window.location.host;
var oldDomain = document.domain;
var newDomain = oldDomain.substring(oldDomain.indexOf(".", oldDomain.indexOf(".")+1)+1);

function doAction(method, uri, async, headers, body, cb) {
  try {
    document.domain = oldDomain;
  } catch (e) { 
    console.log(e);
}
  var req = createRequestObject();
  req.open(method, '//'+host+uri, async);
  for (var i in headers) {
    req.setRequestHeader(i, headers[i]);
  }
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      try {
        document.domain = newDomain;
        cb(req.status, req.responseText);
      } catch (e) {
    console.log(e);
        // yikes. well, hopefully a timeout will notice this error.
      }
    }
  }
  req.send(body);
}
function doAbort(xhr) {
  try {
    document.domain = oldDomain;
  } catch (e) { 
    console.log(e);
}
  xhr.abort();
}
document.domain = newDomain;
window.onload = function() {
  var doneKey = 'done_'+oldDomain.split(".", 2)[0];
    setTimeout(function() {
      window.parent[doneKey]();
    }, 0);
}
</script>
</head>
<body>
</body>
</html>
%;

  }
#/ep/xhrXdFrame/841700162949
   elsif ($ENV{REQUEST_URI} =~ /^\/ep\/post\?(.+)/)
   {
       #/ep/post?r=352835342344&v=2&id=780305495983&seq=0"
       print header();
       print "ok\n";
   }
   elsif ($ENV{REQUEST_URI} =~ /^\/ep\/pad\/history\/([^\/]+)\/changes\/(.+)/)
   {
	my $id = $1;
	my $revs = $2;
   print header('application/json');
	my %RESPONSE = (
	    charPool => "HMMM", 
	    changes => "a,b,c",
	    );
	print encode_json \%RESPONSE;	
   }


#Host: localhost
#http://localhost/ep//channel?v=2&r=338209545647&id=969255209756&channel=shortpolling&new=yes&create=yes&seq=0
   elsif ($ENV{REQUEST_URI} =~ /^\/ep\/channel\?(.+)/)
   {
       if ($ENV{REQUEST_URI} =~ /new=yes&create=yes/)
       {
	   print header();
#       print "13:oob:keepalive\n";
	   print "6:oob:ok\n";
       }
       elsif ($ENV{REQUEST_URI} =~ /new=yes&create=no/)
       {
	   print header();
#       print "13:oob:keepalive\n";
	   print "6:oob:ok\n";
       }
       else
       {
	   #GET /ep/channel?v=2&r=885475168297&id=97552956252&channel=shortpolling&seq=0
	   if ($ENV{REQUEST_URI} =~ /seq=(\d+)/)	   
	   {
	       my $seq = $1 +1;
	       my $control = 1;
	       my $text = "funky";
	       my $respo = join (":",($seq,$control,$text));
	       my $ln = length($respo);
	       print header();
	       
	       print  $ln . ":" . $respo;

	   }
       }
   }
   elsif ($ENV{REQUEST_URI} =~ /^\/ep\/pad\/changes\/(.+)/)
   {
	my $id = $1;
   print header('application/json');
	my %RESPONSE = (

	    text => "Mike was here",
	    textlines => ["Mike was here"],
	    alines => ["Mike"],
	    charPool => "HMMM", 
	    pool => {
		"numToAttrib" =>   {
		    "0" =>     [
			"author",    
			"g.3qij6eccnda2o5wf"
			]
		},    
			"nextNum" => 1
	    },
	    changes => "a,b,c",
	    );
	print encode_json \%RESPONSE;	
   }

    elsif ($ENV{REQUEST_URI} =~ /^\/ep\/pad\/history\/([^\/]+)\/stat/)
    {
    #var obj = {exists: data.exists};
    # obj.latestRev = data.latestRev; 

	print header('application/json');
	my %RESPONSE = (
	    exists => 1,
	    latestRev =>  1 # integer    
	    );
	print encode_json \%RESPONSE;	
	
    }
    elsif ($ENV{REQUEST_URI} =~ /^\/ep\/pad\/history\/([^\/]+)\/text\/(\d+)/)
    {
	my $id = $1;
	my $rev = $2;
    #var obj = {exists: data.exists};
    # obj.latestRev = data.latestRev; 

	print header('application/json');
	my %RESPONSE = (
	    text => "Hello world",	   
	    Rev =>  $rev,
	    pad =>  $id	    
	    );
	print encode_json \%RESPONSE;	
	
    }
    elsif ($ENV{REQUEST_URI} =~ /^\/ep\/search/)
    {
	print header('application/json');
	my %RESPONSE = (
	    #produced in etherpad/pad/etherpad/src/plugins/twitterStyleTags/hooks.js
	    #for search engine
	    matchingPads => 
	    [ # array 
	      { # object
		  ID => "funky1",
		  lastWriteTime => "dunno",
		  TAGS => [( "foo", "bar")] # field array
	      },
	      { # object
		  ID => "funky2",
		  lastWriteTime => "dunno",
		  TAGS => [( "foo2", "bar2")] # field array
	      }
	    ]
	    );
	print encode_json \%RESPONSE;	
    }
    else
    {
	#default stuff
	print header('application/json');
	my %RESPONSE = (
	    UNKNOWN => 1,
	    ENV => \%ENV
	    );
	print encode_json \%RESPONSE;
    }
    #
}
