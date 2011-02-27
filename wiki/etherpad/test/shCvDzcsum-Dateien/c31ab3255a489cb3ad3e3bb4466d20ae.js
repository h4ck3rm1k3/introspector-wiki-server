
var host=window.location.host;
function WebSocket(AX)

{

    var AK=this;var AV=this;var Al=2;var AS=
	{
	    
	}
    ;this.onopen=function()
    {
	
    }
    ;
    this.onclosed=function()
    {
	
    }
    ;this.onmessage=function()
    {
	
    }
    ;this.onhiccup=function()
    {
	
    }
    ;this.onlogmessage=function()
    {
	
    }
    ;
    this.CONNECTING=0;this.OPEN=1;this.CLOSED=2;this.readyState=-1;var Ax=0;var A9=setInterval(function()
											       {
												   Ax=0;
												   if(AK.readyState==AK.CLOSED)
												   {
												       clearInterval(A9);
												   }

											       }
											       ,60*1000);var AT=false;function AN(A)
    {
	if(A!=AM&&A!=AK)
	{
	    return;
	    
	}
	if(AT)
	{
	    return;
	}
	AJ("hiccup: "+A.name);if(Ax++>10)
	{
	    AO(
		{
		    reconnect:true,reason:"Too many hiccups!"
		}
	    );return;
	    
	}
	At();AP(AS,"hiccup",15000,function()
		{
		    AT=false;AO(
			{
			    reconnect:false,reason:"Couldn't contact server to hiccup."
			}
		    );
		    
		}
	       );AT=true;function B()
	{
	    if(!AT)
	    {
		return;
	    }
	    AK.onhiccup(
		{
		    connected:false
		}
	    );AJ("trying hiccup");AP(AS,"singleHiccup",5000,function()
				     {
					 B();
					 
				     }
				    );AW("post",Ay(),true,[
					{
					    key:"oob",value:"hiccup"
					}
				    ],function(D,C)
					 {
					     if(!AT)
					     {
						 return;
					     }
					     if(C.substring(0,"restart-fail".length)=="restart-fail")
					     {
						 AO(
						     {
							 reconnect:true,reason:"Server restarted or socket timed out on server."
						     }
						 );
						 
					     }
					     else
					     {
						 if(D!=200||C.substring(0,2)!="ok")
						 {
						     AJ("Failed to hiccup with error: "+D+" / "+C);setTimeout(B,500);
						     
						 }
						 else
						 {
						     AT=false;AS.singleHiccup();AS.hiccup();Ap();
						 }

					     }

					 }
					);
	}
	B();
    }
    function At()
    {
	for(var A in AR)
	{
	    if(AR.hasOwnProperty(A))
	    {
		AR[A].disconnect();
		
	    }

	}
	AM=undefined;
    }
    function AO(A,C,B)
    {
	AJ("disconnected: "+A.reason+" / "+(A.data!==undefined?"data: "+A.data:""));
	A3();At();if(AU&&AU.div)
	{
	    AU.div.innerHTML="";
	}
	if(AK.readyState!=AK.CLOSED)
	{
	    AK.readyState=AK.CLOSED;if(!C)
	    {
		Ag(true,"kill:"+A.reason,B,true);
		
	    }
	    AK.onclosed(A);
	}

    }
    this.disconnect=function(A)
    {
	AO(
	    {
		reason:"Closed by client."
	    }
	    ,false,A);
    }
    ;function BE()
    {
	var A=A0();
	AJ("basic connect on type: "+A);var B=AR[A]=new Ak[A]();B.connect();
    }
    function A2()
    {
	var D=A5();var C;var A;
	for(var B=0;B<D.length;++B)
	{
	    A=D[B];AJ("other connect on type: "+A);C=AR[A]=new Ak[A]();C.connect();
	}

    }
    function Ap()
    {
	AJ("doing connect!");
	AP(AS,"connect",15000,function()
	   {
	       AO(
		   {
		       reconnect:false,reason:"Timeout connecting to server: no channel type was able to connect."
		   }
	       );
	       
	   }
	  );BE();
    }
    this.connect=function()
    {
	AJ("socket connecting: "+AX);Ap();
    }
    ;function Ah()
    {
	return Math.floor((new Date()).valueOf()/100)%10000000;
	
    }
    function AJ(A)
    {
	AK.onlogmessage("(comet @t: "+Ah()+") "+A);
    }
    function A3()
    {
	AJ(AK.describe());
    }


    this.describe=function()
    {
	
	
	function A()
	{
	    out=[];
	    for(var B in AR)
	    {
		if(AR.hasOwnProperty(B))
		{
		    out.push(B+": "+AR[B].describe());
		}

	    }
	    return"[ "+out.join(", ")+" ]";
	    
	}

	return("socket state:{ id: "+AX+", readyState: "+AK.readyState+", isHiccuping: "+AT+", timeouts: "+Ab(AS)+", officialChannel: "+(AM?AM.name:"none")+", channels: "+A()+", isPosting: "+Aa+", lastReceivedSeqNumber: "+AL+", lastPost: "+Ar+", postTimeouts: "+Ab(Ad)+", channelSeq: "+Au+" }");
		
    };
    
    function A8(A,B)
    {
	return function()
	{
	    var D=[];for(var C=0;C<arguments.length;C++)
	    {
		D.push(arguments[C]);
		
	    }
	    B.apply(A,D);
	}
	;
    }
    var AQ=A8;function AW(L,K,F,D,E,J)
    {
	var A=(J||Aw)();A.open(L,K,F);if(F)
	{
	    A.onreadystatechange=function()
	    {
		if(A.readyState!=4)
		{
		    return;
		    
		}
		var N;var M;try
		{
		    N=A.status;M=A.responseText;
		}
		catch(O)
		{
		    
		}
		E(N,M,A);
	    }
	    ;
	}
	var B=null;if(D)
	{
	    B=[];for(var C=0;
		     C<D.length;++C)
	    {
		B.push(encodeURIComponent(D[C].key)+"="+encodeURIComponent(D[C].value));
	    }
	    B=B.join("&");
	    A.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
	}
	try
	{
	    A.send(B);
	    
	}
	catch(H)
	{
	    A.abort();E(500,"Error sending data!",A);
	}
	if(!F)
	{
	    var I;var G;try
	    {
		I=A.status;G=A.responseText;
		
	    }
	    catch(H)
	    {
		
	    }
	    E(I,G,A);
	}
	return A;
    }
    var An=function()
    {
	
    }
    ;function AP(B,A,F,G)
    {
	function C(H,I)
	{
	    if(H[I])
	    {
		H[I]();
		H[I]=An;
	    }

	}
	var E=setTimeout(function()
			 {
			     C(B,A);G();
			 }
			 ,F);var D=function()
	{
	    clearTimeout(E);
	}
	;C(B,A);B[A]=D;
	return D;
    }
    var AL=0;function BB(A)
    {
	if(A.seqNumber>AL+1)
	{
	    AJ("bad sequence number. expecting: "+(AL+1)+", got: "+A.seqNumber);
	    AN(AK);return false;
	}
	if(A.seqNumber<AL+1)
	{
	    return true;
	}
	AL=A.seqNumber;if(!A.isControl)
	{
	    AK.onmessage(
		{
		    data:A.content
		}
	    );
	    return true;
	    
	}

	else
	{
	    if(A.content=="kill")
	    {
		AO(
		    {
			reconnect:false,reason:"Killed by server."
		    }
		);return false;
		
	    }

	}

    }
    var Ay=function()
    {
	return"/comet/post?r="+AY()+"&v="+Al+"&id="+AX+"&seq="+AL;
    }
    ;function A7()
    {
	var A=[];
	var B=0;var C=0;this.offer=function(D)
	{
	    A[C++]=D;
	}
	;this.poll=function()
	{
	    if(this.length()>0)
	    {
		var D=A[B];
		delete A[B++];return D;
	    }

	}
	;this.clear=function()
	{
	    B=0;C=0;var D=A;A=[];return D;
	}
	;this.length=function()
	{
	    return C-B;
	    
	}
	;
    }
    var Am=new A7();var Aa=false;var Ad=
	{
	    
	}
    ;var Ar;function Ag(E,B,D,C,A)
    {
	As([
	    {
		oob:E,data:B,cb:A
	    }
	],D,C);
	
    }
    function As(B,G,I,D)
    {
	if(!I&&AK.readyState==AK.CLOSED)
	{
	    return;
	}
	if(B.length==0)
	{
	    if(D)
	    {
		D();
	    }
	    return;
	}
	var E=[];
	var C=[];for(var A=0;A<B.length;++A)
	{
	    E.push(
		{
		    key:(B[A].oob?"oob":"m"),value:B[A].data
		}
	    );if(B[A].cb)
	    {
		C.push(B[A].cb);
		
	    }

	}
	function F(M,N,L,O)
	{
	    var J="";try
	    {
		J=M+": "+L.statusText+" - "+N+" ("+O+")";
	    }
	    catch(P)
	    {
		
	    }
	    AO(
		{
		    reconnect:true,reason:"Posting message failed.",data:J
		}
	    );
	    for(var K=0;K<C.length;++K)
	    {
		C[K](false,J);
	    }

	}
	function H(K,L,M)
	{
	    Ad.post();if(K!=200||L.substring(0,2)!="ok")
	    {
		F(K,L,M,"1");
		
	    }
	    else
	    {
		for(var J=0;J<C.length;++J)
		{
		    C[J](true);
		}
		if(D)
		{
		    D();
		}

	    }

	}
	AP(Ad,"post",15000,function()
	   {
	       AO(
		   {
		       reconnect:true,reason:"Posting message timed out."
		   }
	       );
	       
	   }
	  );AW("post",Ay(),!G,E,H);
    }
    function Av()
    {
	if(Aa==true)
	{
	    return;
	}
	var A=Am.clear();if(A.length==0)
	{
	    return;
	    
	}
	Aa=true;As(A,false,false,function()
		   {
		       Aa=false;setTimeout(Av,0);
		   }
		  );Ar=Ah();
    }
    this.postMessage=function(B,A)
    {
	if(AK.readyState!=AK.OPEN)
	{
	    return;
	    
	}
	Am.offer(
	    {
		data:B,cb:A
	    }
	);setTimeout(function()
		     {
			 Av();
		     }
		     ,0);
    }
    ;function Aj()
    {
	var C=[];for(var B=0;B<Ai.length;
		     ++B)
	{
	    var A=Ai[B];if(window.location.hash.length>0)
	    {
		if(window.location.hash!="#"+A)
		{
		    continue;
		}

	    }
	    if($&&$.browser.opera&&A!="shortpolling"&&A!="streaming")
	    {
		continue;
		
	    }
	    C.push(A);
	}
	return C;
    }
    function A0()
    {
	return Aj()[0];
    }
    function A5()
    {
	return Aj().slice(1);
    }
    var AM;this.getTransportType=function()
    {
	return(AM?AM.name:"none");
	
    }
    ;var Ai=["shortpolling","longpolling","streaming"];var BC=true;var AR=
	{
	    
	}
    ;var Ak=
	{
	    shortpolling:Az,longpolling:BD,streaming:A1
	}
    ;
    function Ab(A)
    {
	var C=[];for(var B in A)
	{
	    if(A.hasOwnProperty(B))
	    {
		C.push(B+": "+(A[B]==An?"unset":"set"));
		
	    }

	}
	return"
{
 "+C.join(", ")+" 
}
";
    }
    var Au=1;function Aq(A)
    {
	AS.connect();if(!AM||A.weight>AM.weight)
	{
	    AJ("switching to use channel: "+A.name);
	    var B=AM;AM=A;setTimeout(function()
				     {
					 Ag(true,"useChannel:"+(Au++)+":"+A.name,false,false,function(C,D)
					    {
						if(C)
						{
						    if(B)
						    {
							B.disconnect();
							
						    }
						    else
						    {
							A2();
						    }
						    if(AK.readyState!=AK.OPEN)
						    {
							AK.readyState=AK.OPEN;AK.onopen(
							    {
								
							    }
							);
						    }
						    else
						    {
							AK.onhiccup(
							    {
								connected:true
							    }
							);
							
						    }

						}
						else
						{
						    AO(
							{
							    reconnect:true,reason:"Failed to select channel on server.",data:D
							}
						    );
						}

					    }
					   );
				     }
				     ,0);return true;
	    
	}
	else
	{
	    return false;
	}

    }
    function AY()
    {
	return String(Math.round(Math.random()*1000000000000));
    }
    function AZ()
    {
	return"/comet/channel?v="+Al+"&r="+AY()+"&id="+AX;
	
    }
    function Aw()
    {
	var A=false;try
	{
	    A=(window.ActiveXObject&&new ActiveXObject("Msxml2.XMLHTTP"));
	}
	catch(B)
	{
	    try
	    {
		A=(window.ActiveXObject&&new ActiveXObject("Microsoft.XMLHTTP"));
		
	    }
	    catch(C)
	    {
		A=false;
	    }

	}
	if(!A&&typeof XMLHttpRequest!="undefined")
	{
	    try
	    {
		A=new XMLHttpRequest();
	    }
	    catch(B)
	    {
		A=false;
		
	    }

	}
	if(!A&&window.createRequest)
	{
	    try
	    {
		A=window.createRequest();
	    }
	    catch(B)
	    {
		A=false;
	    }

	}
	return A;
    }
    function Ac(A)
    {
	this.message=A;
	
    }
    function Af(C,B)
    {
	if(!B)
	{
	    B=0;
	}
	var A=C.indexOf(":",B);if(A<0)
	{
	    return;
	}
	var D=Number(C.substring(B,A));if(isNaN(D))
	{
	    throw new Ac("Bad length: "+C.substring(B,A));
	    
	}
	if(C.length<A+1+D)
	{
	    return;
	}
	var E=C.substr(A+1,D);return
	{
	    message:E,lastConsumedChar:A+1+D
	}
	;
    }
    function A4(A,B)
    {
	if(B==0)
	{
	    return
	    {
		message:A,lastConsumedChar:A.length
	    }
	    ;
	    
	}

    }
    function BG(I,E,H)
    {
	if(!E)
	{
	    E=0;
	}
	var B=[];var C=E;while(true)
	{
	    var D=(H||Af)(I,C);if(!D)
	    {
		break;
	    }
	    C=D.lastConsumedChar;
	    var K=D.message;var A=K.split(":");if(A[0]=="oob")
	    {
		B.push(
		    {
			oob:A.slice(1).join(":")
		    }
		);continue;
	    }
	    var F=Number(A[0]);
	    if(isNaN(F))
	    {
		throw new Ac("Bad sequence number: "+A[0]);
	    }
	    var G=Number(A[1]);if(isNaN(G))
	    {
		throw new Ac("Bad control: "+A[1]);
		
	    }
	    var J=A.slice(2).join(":");B.push(
		{
		    seqNumber:F,isControl:(G==1),content:J
		}
	    );
	}
	return
	{
	    messages:B,lastConsumedChar:C
	}
	;
	
    }
    function Ae(E,D,F,G)
    {
	try
	{
	    messages=BG(E,D,G);
	}
	catch(A)
	{
	    if(A instanceof Ac)
	    {
		AJ("Data format error: "+A.message);
		AN(F);return;
	    }
	    else
	    {
		AJ(A.toString()+" on line: "+A.lineNumber);
	    }

	}
	for(var B=0;B<messages.messages.length;
	    B++)
	{
	    var C=messages.messages[B].oob;if(C)
	    {
		if(C=="restart-fail")
		{
		    AO(
			{
			    reconnect:true,reason:"Server restarted or socket timed out on server."
			}
		    );
		    return;
		}

	    }
	    else
	    {
		if(!BB(messages.messages[B]))
		{
		    break;
		}

	    }

	}
	return messages.lastConsumedChar;
    }
    function Az()
    {
	this.weight=0;
	this.name="shortpolling";this.isConnected=false;this.isClosed=false;this.request;this.clearRequest=function()
	{
	    if(this.request)
	    {
		this.request.abort();
		this.request=null;
	    }

	}
	;this.timeouts=
	    {
		
	    }
	;this.describe=function()
	{
	    return"
{
 isConnected: "+this.isConnected+", isClosed: "+this.isClosed+", timeouts: "+Ab(this.timeouts)+", request: "+(this.request?"set":"not set")+" 
}
";
	    
	}
	;this.pollDataHandler=function(B,A,D)
	{
	    if(D.readyState!=4)
	    {
		return;
	    }
	    if(this.timeouts.poll)
	    {
		this.timeouts.poll();
		
	    }
	    var F;if(!this.isConnected)
	    {
		this.timeouts.connectAttempt();if(B!=200)
		{
		    AJ(this.name+" connect failed: "+B+" / "+A);
		    setTimeout(AQ(this,this.attemptConnect),500);return;
		}
		var C=(A?Af(A):undefined);if(C&&C.message=="oob:ok")
		{
		    this.timeouts.initialConnect();
		    this.isConnected=true;AJ(this.name+" transport connected!");if(!Aq(this))
		    {
			AJ(this.name+" transport not chosen for activation.");
			this.disconnect();return;
		    }
		    this.doPoll();return;
		}
		else
		{
		    AJ(this.name+" connect didn't get ok: "+B+" / "+A);
		    setTimeout(AQ(this,this.attemptConnect),500);return;
		}

	    }
	    var E=Ae(D.responseText,0,this);if(B!=200||((!E)&&this.emptyResponseBad))
	    {
		AN(this);
		
	    }
	    setTimeout(AQ(this,this.doPoll),this.pollDelay);this.clearRequest();
	}
	;this.keepRetryingConnection=true;
	this.cancelConnect=function()
	{
	    this.clearRequest();this.keepRetryingConnection=false;
	}
	;this.cancelPoll=function()
	{
	    this.clearRequest();
	    AJ("poll timed out.");AN(this);
	}
	;this.doPoll=function()
	{
	    if(this.isClosed)
	    {
		return;
	    }
	    AP(this.timeouts,"poll",this.pollTimeout,AQ(this,this.cancelPoll));
	    this.request=AW("GET",AZ()+"&channel="+this.name+"&seq="+AL+this.pollParams(),true,undefined,AQ(this,this.pollDataHandler),this.xhrGenerator);
	    
	}
	;this.pollParams=function()
	{
	    return"";
	}
	;this.pollTimeout=5000;this.pollDelay=500;this.attemptConnect=function()
	{
	    if(!this.keepRetryingConnection)
	    {
		return;
		
	    }
	    AJ(this.name+" attempting connect");this.clearRequest();AP(this.timeouts,"connectAttempt",5000,AQ(this,this.attemptConnect));
	    this.request=AW("GET",AZ()+"&channel="+this.name+"&new=yes&create="+(AV.readyState==AV.OPEN?"no":"yes")+"&seq="+AL,true,undefined,AQ(this,this.pollDataHandler),this.xhrGenerator);
	    
	}
	;this.connect=function()
	{
	    this.attemptConnect();AP(this.timeouts,"initialConnect",15000,AQ(this,this.cancelConnect));
	    
	}
	;this.disconnect=function()
	{
	    AJ(this.name+" disconnected");this.isClosed=true;this.clearRequest();
	}
	;
    }
    function A1()
    {
	this.weight=2;
	this.name="streaming";var C=this;var G=false;var B;function J()
	{
	    if(B)
	    {
		B.abort();B=null;if(A)
		{
		    A=null;
		}
		if(D)
		{
		    D.innerHTML="";
		    D=null;
		}

	    }

	}
	var H=false;var E=
	    {
		
	    }
	;var F=0;this.describe=function()
	{
	    return"
{
 isConnected: "+G+", isClosed: "+H+", timeouts: "+Ab(E)+", request: "+(B?"set":"not set")+", cursor: "+F+" 
}
";
	    
	}
	;function L()
	{
	    G=true;E.initialConnect();if(!Aq(C))
	    {
		AJ("streaming transport not chosen for activation");
		C.disconnect();return;
	    }

	}
	function O()
	{
	    if(E.data)
	    {
		E.data();
	    }
	    if(H)
	    {
		return;
	    }
	    try
	    {
		if(!B.responseText)
		{
		    return;
		    
		}

	    }
	    catch(Q)
	    {
		return;
	    }
	    if(!G)
	    {
		var P=Af(B.responseText,F);if(!P)
		{
		    return;
		}
		F=P.lastReceivedSeqNumber;if(P.message=="oob:ok")
		{
		    L();
		    
		}
		else
		{
		    AJ("stream: incorrect channel connect message:"+P.message);C.disconnect();return;
		}

	    }
	    else
	    {
		F=Ae(B.responseText,F,C);
		
	    }
	    if(!B||B.readyState==4)
	    {
		J();if(G)
		{
		    AJ("stream connection unexpectedly closed.");AN(C);return;
		}

	    }
	    AP(E,"data",60*1000,function()
	       {
		   AN(C);
		   
	       }
	      );
	}
	function M(P)
	{
	    if(H)
	    {
		return;
	    }
	    if(!G)
	    {
		if(P=="oob:ok")
		{
		    L();
		}
		else
		{
		    AJ("iframe stream: unexpected data on connect - "+P);
		    
		}

	    }
	    else
	    {
		Ae(P,0,C,A4);
	    }

	}
	function N()
	{
	    H=true;J();AJ("stream: failed to connect.");
	}
	var A;var D;var I=0;function K()
	{
	    var Q;
	    try
	    {
		Q=D.firstChild.readyState;
	    }
	    catch(P)
	    {
		AN(C);return;
	    }
	    if(Q=="interactive"||I>10)
	    {
		try
		{
		    var R=D.firstChild.contentWindow.document.getElementById("thebody");
		    
		}
		catch(P)
		{
		    AN(C);
		}

	    }
	    else
	    {
		I++;setTimeout(K,500);
	    }

	}
	this.connect=function()
	{
	    AP(E,"initialConnect",15000,N);
	    if(BC)
	    {
		var P="//"+AY()+".comet."+host+AZ()+"&channel=streaming&type=iframe&new=yes&create="+(AV.readyState==AV.OPEN?"no":"yes")+"&seq="+AL;
		AJ("stream to: "+P);if($&&$.browser.opera)
		{
		    D=$('<div style="display: none;"></div>').get(0);$("body").append(D);
		    window.comet=
			{
			    pass_data:M,disconnect:function()
			    {
				AN(C);
			    }

			}
		    ;$(D).append($("<iframe src='"+P+"'></iframe>"));
		    I=0;setTimeout(K,2000);AJ("stream connect sent!");return;
		}
		try
		{
		    A=(window.ActiveXObject&&new ActiveXObject("htmlfile"));
		    if(A)
		    {
			A.open();A.write("<html><head><title>f</title></head><body>");A.write("\x3cscript>document.domain='"+document.domain+"';\x3c/script>");
			A.write("</body></html>");A.close();D=A.createElement("div");A.appendChild(D);A.parentWindow.comet=
			    {
				pass_data:M,disconnect:function()
				{
				    AN(C);
				    
				}

			    }
			;D.innerHTML="<iframe src='"+P+"'></iframe>";I=0;setTimeout(K,2000);
		    }

		}
		catch(Q)
		{
		    A=false;
		}

	    }
	    else
	    {
		if($&&$.browser.opera)
		{
		    AJ("opera - not trying xhr");
		    return;
		}

	    }
	    if(!A)
	    {
		B=Aw();B.open("get",AZ()+"&channel=streaming&new=yes&create="+(AV.readyState==AV.OPEN?"no":"yes")+"&seq="+AL);
		B.onreadystatechange=O;try
		{
		    B.send(null);
		}
		catch(Q)
		{
		    
		}

	    }
	    AJ("stream connect sent!");
	}
	;this.disconnect=function()
	{
	    AJ("stream disconnected");
	    H=true;J();
	}
	;AJ("new streamchannel");
    }
    function Ao(A)
    {
	return"//"+A+".comet."+host+"/comet/xhrXdFrame";
	
    }
    function BF()
    {
	if(!document.getElementById("newcomethidden"))
	{
	    var A=document.createElement("div");A.setAttribute("id","newcomethidden");
	    A.style.display="none";document.body.appendChild(A);
	}
	return document.getElementById("newcomethidden");
	
    }
    function A6(A)
    {
	this.open=function(C,D,E)
	{
	    this.method=C;this.uri=D;this.async=E;
	}
	;var B=
	    {
		
	    }
	;this.setRequestHeader=function(D,C)
	{
	    B[D]=C;
	    
	}
	;this.send=function(D)
	{
	    var C=this;this.xhr=A.iframe.contentWindow.doAction(this.method,this.uri,this.async,B,D||null,function(F,E)
								{
								    C.readyState=4;
								    C.status=F;C.responseText=E;C.onreadystatechange();
								}
							       );
	}
	;this.abort=function()
	{
	    if(this.xhr)
	    {
		A.contentWindow.doAbort(this.xhr);
		
	    }

	}
	;
    }
    function BH(E)
    {
	var B=AY();try
	{
	    var A=(window.ActiveXObject&&new ActiveXObject("htmlfile"));var C;if(A)
	    {
		A.open();
		A.write("<html><head><title>f</title></head><body>");A.write("\x3cscript>document.domain='"+document.domain+"';\x3c/script>");
		A.write("</body></html>");A.close();C=A.createElement("div");A.appendChild(C);A.parentWindow["done_"+B]=E;
		C.innerHTML="<iframe src='"+Ao(B)+"'></iframe>";return
		{
		    iframe:C.firstChild,axc:A,div:C
		}
		;
	    }

	}
	catch(F)
	{
	    A=false;
	    
	}
	AJ("Not using IE setup.");var D=document.createElement("iframe");BF().appendChild(D);window["done_"+B]=function()
	{
	    try
	    {
		delete window["done_"+B];
		
	    }
	    catch(G)
	    {
		
	    }
	    E();
	}
	;D.src=Ao(B);return
	{
	    iframe:D
	}
	;
    }
    function BA()
    {
	if(!AU)
	{
	    throw Error("WebSocket isn't properly set up!");
	    
	}
	return new A6(AU);
    }
    var AU;function BD()
    {
	Az.apply(this);this.weight=1;this.name="longpolling";this.pollDelay=0;
	this.pollTimeout=15000;this.pollParams=function()
	{
	    return"&timeout="+(this.pollTimeout-5000);
	}
	;var A=this.connect;
	this.connect=function()
	{
	    if(!AU)
	    {
		AU=BH(AQ(this,A));
	    }
	    else
	    {
		A.apply(this);
	    }

	}
	;this.xhrGenerator=BA;this.emptyResponseBad=true;
	
    }

}
function wikiStyleLinksInit()
{
    this.hooks=["aceInitInnerdocbodyHead","aceGetFilterStack","aceCreateDomLine"];
    this.aceInitInnerdocbodyHead=aceInitInnerdocbodyHead;this.aceGetFilterStack=aceGetFilterStack;this.aceCreateDomLine=aceCreateDomLine;
    
}
function aceInitInnerdocbodyHead(B)
{
    B.iframeHTML.push('\'<link rel="stylesheet" type="text/css" href="/static/css/plugins/wikiStyleLinks/pad.css"/>\'');
    
}
function aceGetFilterStack(B)
{
    return[getWikiLinkFilter(B.linestylefilter)];
}
function aceCreateDomLine(D)
{
    if(D.cls.indexOf("wikilink")>=0)
    {
	var C;
	cls=D.cls.replace(/wikilink:(\S+)/g,function(B,A)
			  {
			      if(A.indexOf("/")>=0)
			      {
				  C="/ep/pad/view/"+A;
			      }
			      else
			      {
				  if(A.indexOf("ro.")==0)
				  {
				      C="/ep/pad/view/"+A+"/latest";
				      
				  }
				  else
				  {
				      C="/"+A;
				  }

			      }
			      return"wikilink";
			  }
			 );return[
			     {
				 cls:cls,extraOpenTags:'<a href="'+C+'">',extraCloseTags:"</a>"
			     }
			 ];
	
    }

}
function getWikiLinkFilter(B)
{
    return function(R,O)
    {
	var P=new RegExp("\\[\\[[^\\[\\]]*]]","g");P.lastIndex=0;
	var A=null;var M=null;var L;while((L=P.exec(R)))
	{
	    if(!A)
	    {
		A=[];M=[];
	    }
	    var N=L.index+2;var Q=L[0].substring(2,L[0].length-2).replace(/ /g,"-");
	    A.push([N,Q]);M.push(N,N+Q.length);
	}
	if(!A)
	{
	    return O;
	}
	function T(E)
	{
	    for(var D=0;D<A.length;D++)
	    {
		var C=A[D];
		if(E>=C[0]&&E<C[0]+C[1].length)
		{
		    return C[1];
		}

	    }
	    return false;
	}
	var S=(function()
	       {
		   var C=0;return function(F,H)
		   {
		       var G=F.length;
		       var E=H;var D=T(C);if(D)
		       {
			   E+=" wikilink:"+D;
		       }
		       O(F,E);C+=G;
		   }
		   ;
	       }
	      )();return B.textAndClassFuncSplitter(S,M);
	
    }
    ;
}
wikiStyleLinks=new wikiStyleLinksInit();function twitterStyleTagsInit()
{
    this.hooks=["aceInitInnerdocbodyHead","aceGetFilterStack","aceCreateDomLine"];
    
}
twitterStyleTagsInit.prototype.aceInitInnerdocbodyHead=function(B)
{
    B.iframeHTML.push('\'<link rel="stylesheet" type="text/css" href="/static/css/plugins/twitterStyleTags/pad.css"/>\'');
    
}
;twitterStyleTagsInit.prototype.aceGetFilterStack=function(B)
{
    return[B.linestylefilter.getRegexpFilter(new RegExp("#[^,#=!\\s\"'][^,#=!\\s
}
\"']*","g"),"padtag"),B.linestylefilter.getRegexpFilter(new RegExp("=[^#=\\s\"'][^#=\\s\"']*","g"),"padtagsearch")];
    
}
;twitterStyleTagsInit.prototype.aceCreateDomLine=function(D)
{
    if(D.cls.indexOf("padtagsearch")>=0)
    {
	var C;
	cls=D.cls.replace(/(^| )padtagsearch:(\S+)/g,function(H,B,G)
			  {
			      var A=encodeURI(G.substring(1));C="/ep/search?query="+A;
			      return B+"padtagsearch padtagsearch_"+A;
			  }
			 );return[
			     {
				 cls:cls,extraOpenTags:'<a href="'+C.replace(/\"/g,"&quot;")+'">',extraCloseTags:"</a>"
			     }
			 ];
	
    }
    else
    {
	if(D.cls.indexOf("padtag")>=0)
	{
	    var C;cls=D.cls.replace(/(^| )padtag:(\S+)/g,function(H,B,G)
				    {
					var A=encodeURI(G.substring(1));
					C="/ep/search?query="+A;return B+"padtag padtag_"+A;
				    }
				   );return[
				       {
					   cls:cls,extraOpenTags:'<a href="'+C.replace(/\"/g,"&quot;")+'">',extraCloseTags:"</a>"
				       }
				   ];
	    
	}

    }

}
;twitterStyleTags=new twitterStyleTagsInit();plugins=
    {
	callHook:function(hookName,args)
	{
	    var hook=clientVars.hooks[hookName];
	    if(hook===undefined)
	    {
		return[];
	    }
	    var res=[];for(var i=0,N=hook.length;i<N;i++)
	    {
		var plugin=hook[i];var pluginRes=eval(plugin.plugin)[plugin.original||hookName](args);
		if(pluginRes!=undefined&&pluginRes!=null)
		{
		    res=res.concat(pluginRes);
		}

	    }
	    return res;
	}
	,callHookStr:function(I,J,F,G,H)
	{
	    if(F==undefined)
	    {
		F="";
		
	    }
	    if(G==undefined)
	    {
		G="";
	    }
	    if(H==undefined)
	    {
		H="";
	    }
	    return plugins.callHook(I,J).map(function(A)
					     {
						 return G+A+H;
						 
					     }
					    ).join(F||"");
	}

    }
;if(window._orig_windowOpen)
{
    window.open=_orig_windowOpen;
}
if(window._orig_windowSetTimeout)
{
    window.setTimeout=_orig_windowSetTimeout;
    
}
if(window._orig_windowSetInterval)
{
    window.setInterval=_orig_windowSetInterval;
}
(function()
 {
     var C=this,B,b=C.jQuery,Y=C.$,A=C.jQuery=C.$=function(e,f)
     {
	 return new A.fn.init(e,f);
	 
     }
     ,d=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,X=/^.[^:#\[\.,]*$/;A.fn=A.prototype=
	 {
	     init:function(e,h)
	     {
		 e=e||document;
		 if(e.nodeType)
		 {
		     this[0]=e;this.length=1;this.context=e;return this;
		 }
		 if(typeof e==="string")
		 {
		     var f=d.exec(e);
		     if(f&&(f[1]||!h))
		     {
			 if(f[1])
			 {
			     e=A.clean([f[1]],h);
			 }
			 else
			 {
			     var i=document.getElementById(f[3]);if(i&&i.id!=f[3])
			     {
				 return A().find(e);
				 
			     }
			     var g=A(i||[]);g.context=document;g.selector=e;return g;
			 }

		     }
		     else
		     {
			 return A(h).find(e);
		     }

		 }
		 else
		 {
		     if(A.isFunction(e))
		     {
			 return A(document).ready(e);
			 
		     }

		 }
		 if(e.selector&&e.context)
		 {
		     this.selector=e.selector;this.context=e.context;
		 }
		 return this.setArray(A.isArray(e)?e:A.makeArray(e));
		 
	     }
	     ,selector:"",jquery:"1.3.2",size:function()
	     {
		 return this.length;
	     }
	     ,get:function(e)
	     {
		 return e===B?Array.prototype.slice.call(this):this[e];
		 
	     }
	     ,pushStack:function(h,f,g)
	     {
		 var e=A(h);e.prevObject=this;e.context=this.context;if(f==="find")
		 {
		     e.selector=this.selector+(this.selector?" ":"")+g;
		     
		 }
		 else
		 {
		     if(f)
		     {
			 e.selector=this.selector+"."+f+"("+g+")";
		     }

		 }
		 return e;
	     }
	     ,setArray:function(e)
	     {
		 this.length=0;
		 Array.prototype.push.apply(this,e);return this;
	     }
	     ,each:function(f,e)
	     {
		 return A.each(this,f,e);
	     }
	     ,index:function(e)
	     {
		 return A.inArray(e&&e.jquery?e[0]:e,this);
		 
	     }
	     ,attr:function(e,h,g)
	     {
		 var f=e;if(typeof e==="string")
		 {
		     if(h===B)
		     {
			 return this[0]&&A[g||"attr"](this[0],e);
			 
		     }
		     else
		     {
			 f=
			     {
				 
			     }
			 ;f[e]=h;
		     }

		 }
		 return this.each(function(j)
				  {
				      for(e in f)
				      {
					  A.attr(g?this.style:this,e,A.prop(this,f[e],g,j,e));
					  
				      }

				  }
				 );
	     }
	     ,css:function(e,f)
	     {
		 if((e=="width"||e=="height")&&parseFloat(f)<0)
		 {
		     f=B;
		 }
		 return this.attr(e,f,"curCSS");
		 
	     }
	     ,text:function(e)
	     {
		 if(typeof e!=="object"&&e!=null)
		 {
		     return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(e));
		     
		 }
		 var f="";A.each(e||this,function()
				 {
				     A.each(this.childNodes,function()
					    {
						if(this.nodeType!=8)
						{
						    f+=this.nodeType!=1?this.nodeValue:A.fn.text([this]);
						    
						}

					    }
					   );
				 }
				);return f;
	     }
	     ,wrapAll:function(f)
	     {
		 if(this[0])
		 {
		     var e=A(f,this[0].ownerDocument).clone();if(this[0].parentNode)
		     {
			 e.insertBefore(this[0]);
			 
		     }
		     e.map(function()
			   {
			       var g=this;while(g.firstChild)
			       {
				   g=g.firstChild;
			       }
			       return g;
			   }
			  ).append(this);
		 }
		 return this;
		 
	     }
	     ,wrapInner:function(e)
	     {
		 return this.each(function()
				  {
				      A(this).contents().wrapAll(e);
				  }
				 );
	     }
	     ,wrap:function(e)
	     {
		 return this.each(function()
				  {
				      A(this).wrapAll(e);
				      
				  }
				 );
	     }
	     ,append:function()
	     {
		 return this.domManip(arguments,true,function(e)
				      {
					  if(this.nodeType==1)
					  {
					      this.appendChild(e);
					      
					  }

				      }
				     );
	     }
	     ,prepend:function()
	     {
		 return this.domManip(arguments,true,function(e)
				      {
					  if(this.nodeType==1)
					  {
					      this.insertBefore(e,this.firstChild);
					      
					  }

				      }
				     );
	     }
	     ,before:function()
	     {
		 return this.domManip(arguments,false,function(e)
				      {
					  this.parentNode.insertBefore(e,this);
					  
				      }
				     );
	     }
	     ,after:function()
	     {
		 return this.domManip(arguments,false,function(e)
				      {
					  this.parentNode.insertBefore(e,this.nextSibling);
					  
				      }
				     );
	     }
	     ,end:function()
	     {
		 return this.prevObject||A([]);
	     }
	     ,push:[].push,sort:[].sort,splice:[].splice,find:function(e)
	     {
		 if(this.length===1)
		 {
		     var f=this.pushStack([],"find",e);
		     f.length=0;A.find(e,this[0],f);return f;
		 }
		 else
		 {
		     return this.pushStack(A.unique(A.map(this,function(g)
							  {
							      return A.find(e,g);
							      
							  }
							 )),"find",e);
		 }

	     }
	     ,clone:function(h)
	     {
		 var f=this.map(function()
				{
				    if(!A.support.noCloneEvent&&!A.isXMLDoc(this))
				    {
					var i=this.outerHTML;
					if(!i)
					{
					    var j=this.ownerDocument.createElement("div");j.appendChild(this.cloneNode(true));i=j.innerHTML;
					    
					}
					return A.clean([i.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0];
				    }
				    else
				    {
					return this.cloneNode(true);
					
				    }

				}
			       );if(h===true)
		 {
		     var g=this.find("*").andSelf(),e=0;f.find("*").andSelf().each(function()
										   {
										       if(this.nodeName!==g[e].nodeName)
										       {
											   return;
											   
										       }
										       var i=A.data(g[e],"events");for(var j in i)
										       {
											   for(var k in i[j])
											   {
											       A.event.add(this,j,i[j][k],i[j][k].data);
											       
											   }

										       }
										       e++;
										   }
										  );
		 }
		 return f;
	     }
	     ,filter:function(e)
	     {
		 return this.pushStack(A.isFunction(e)&&A.grep(this,function(g,f)
							       {
								   return e.call(g,f);
								   
							       }
							      )||A.multiFilter(e,A.grep(this,function(f)
											{
											    return f.nodeType===1;
											}
										       )),"filter",e);
	     }
	     ,closest:function(e)
	     {
		 var g=A.expr.match.POS.test(e)?A(e):null,f=0;
		 return this.map(function()
				 {
				     var h=this;while(h&&h.ownerDocument)
				     {
					 if(g?g.index(h)>-1:A(h).is(e))
					 {
					     A.data(h,"closest",f);
					     return h;
					 }
					 h=h.parentNode;f++;
				     }

				 }
				);
	     }
	     ,not:function(e)
	     {
		 if(typeof e==="string")
		 {
		     if(X.test(e))
		     {
			 return this.pushStack(A.multiFilter(e,this,true),"not",e);
			 
		     }
		     else
		     {
			 e=A.multiFilter(e,this);
		     }

		 }
		 var f=e.length&&e[e.length-1]!==B&&!e.nodeType;return this.filter(function()
										   {
										       return f?A.inArray(this,e)<0:this!=e;
										       
										   }
										  );
	     }
	     ,add:function(e)
	     {
		 return this.pushStack(A.unique(A.merge(this.get(),typeof e==="string"?A(e):A.makeArray(e))));
		 
	     }
	     ,is:function(e)
	     {
		 return !!e&&A.multiFilter(e,this).length>0;
	     }
	     ,hasClass:function(e)
	     {
		 return !!e&&this.is("."+e);
		 
	     }
	     ,val:function(e)
	     {
		 if(e===B)
		 {
		     var f=this[0];if(f)
		     {
			 if(A.nodeName(f,"option"))
			 {
			     return(f.attributes.value||
				    {
					
				    }
				   ).specified?f.value:f.text;
			     
			 }
			 if(A.nodeName(f,"select"))
			 {
			     var j=f.selectedIndex,l=[],m=f.options,h=f.type=="select-one";if(j<0)
			     {
				 return null;
				 
			     }
			     for(var g=h?j:0,n=h?j+1:m.length;g<n;g++)
			     {
				 var k=m[g];if(k.selected)
				 {
				     e=A(k).val();if(h)
				     {
					 return e;
				     }
				     l.push(e);
				     
				 }

			     }
			     return l;
			 }
			 return(f.value||"").replace(/\r/g,"");
		     }
		     return B;
		 }
		 if(typeof e==="number")
		 {
		     e+="";
		 }
		 return this.each(function()
				  {
				      if(this.nodeType!=1)
				      {
					  return;
					  
				      }
				      if(A.isArray(e)&&/radio|checkbox/.test(this.type))
				      {
					  this.checked=(A.inArray(this.value,e)>=0||A.inArray(this.name,e)>=0);
					  
				      }
				      else
				      {
					  if(A.nodeName(this,"select"))
					  {
					      var i=A.makeArray(e);A("option",this).each(function()
											 {
											     this.selected=(A.inArray(this.value,i)>=0||A.inArray(this.text,i)>=0);
											     
											 }
											);if(!i.length)
					      {
						  this.selectedIndex=-1;
					      }

					  }
					  else
					  {
					      this.value=e;
					  }

				      }

				  }
				 );
	     }
	     ,html:function(e)
	     {
		 return e===B?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(e);
		 
	     }
	     ,replaceWith:function(e)
	     {
		 return this.after(e).remove();
	     }
	     ,eq:function(e)
	     {
		 return this.slice(e,+e+1);
	     }
	     ,slice:function()
	     {
		 return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","));
		 
	     }
	     ,map:function(e)
	     {
		 return this.pushStack(A.map(this,function(f,g)
					     {
						 return e.call(f,g,f);
					     }
					    ));
	     }
	     ,andSelf:function()
	     {
		 return this.add(this.prevObject);
		 
	     }
	     ,domManip:function(k,o,n)
	     {
		 if(this[0])
		 {
		     var f=(this[0].ownerDocument||this[0]).createDocumentFragment(),g=A.clean(k,(this[0].ownerDocument||this[0]),f),h=f.firstChild;
		     if(h)
		     {
			 for(var e=0,j=this.length;e<j;e++)
			 {
			     n.call(m(this[e],h),this.length>1||e>0?f.cloneNode(true):f);
			     
			 }

		     }
		     if(g)
		     {
			 A.each(g,c);
		     }

		 }
		 return this;function m(i,l)
		 {
		     return o&&A.nodeName(i,"table")&&A.nodeName(l,"tr")?(i.getElementsByTagName("tbody")[0]||i.appendChild(i.ownerDocument.createElement("tbody"))):i;
		     
		 }

	     }

	 }
     ;A.fn.init.prototype=A.fn;function c(f,e)
     {
	 if(e.src)
	 {
	     A.ajax(
		 {
		     url:e.src,async:false,dataType:"script"
		 }
	     );
	     
	 }
	 else
	 {
	     A.globalEval(e.text||e.textContent||e.innerHTML||"");
	 }
	 if(e.parentNode)
	 {
	     e.parentNode.removeChild(e);
	     
	 }

     }
     function F()
     {
	 return +new Date;
     }
     A.extend=A.fn.extend=function()
     {
	 var e=arguments[0]||
	     {
		 
	     }
	 ,g=1,l=arguments.length,j=false,k;
	 if(typeof e==="boolean")
	 {
	     j=e;e=arguments[1]||
		 {
		     
		 }
	     ;g=2;
	 }
	 if(typeof e!=="object"&&!A.isFunction(e))
	 {
	     e=
		 {
		     
		 }
	     ;
	 }
	 if(l==g)
	 {
	     e=this;
	     --g;
	 }
	 for(;g<l;g++)
	 {
	     if((k=arguments[g])!=null)
	     {
		 for(var h in k)
		 {
		     var m=e[h],f=k[h];if(e===f)
		     {
			 continue;
		     }
		     if(j&&f&&typeof f==="object"&&!f.nodeType)
		     {
			 e[h]=A.extend(j,m||(f.length!=null?[]:
					     {
						 
					     }
					    ),f);
			 
		     }
		     else
		     {
			 if(f!==B)
			 {
			     e[h]=f;
			 }

		     }

		 }

	     }

	 }
	 return e;
     }
     ;var W=/z-?index|font-?weight|opacity|zoom|line-?height/i,R=document.defaultView||
	 {
	     
	 }
     ,S=Object.prototype.toString;
     A.extend(
	 {
	     noConflict:function(e)
	     {
		 C.$=Y;if(e)
		 {
		     C.jQuery=b;
		 }
		 return A;
	     }
	     ,isFunction:function(e)
	     {
		 return S.call(e)==="[object Function]";
		 
	     }
	     ,isArray:function(e)
	     {
		 return S.call(e)==="[object Array]";
	     }
	     ,isXMLDoc:function(e)
	     {
		 return e.nodeType===9&&e.documentElement.nodeName!=="HTML"||!!e.ownerDocument&&A.isXMLDoc(e.ownerDocument);
		 
	     }
	     ,globalEval:function(f)
	     {
		 if(f&&/\S/.test(f))
		 {
		     var g=document.getElementsByTagName("head")[0]||document.documentElement,e=document.createElement("script");
		     e.type="text/javascript";if(A.support.scriptEval)
		     {
			 e.appendChild(document.createTextNode(f));
		     }
		     else
		     {
			 e.text=f;
			 
		     }
		     g.insertBefore(e,g.firstChild);g.removeChild(e);
		 }

	     }
	     ,nodeName:function(e,f)
	     {
		 return e.nodeName&&e.nodeName.toUpperCase()==f.toUpperCase();
		 
	     }
	     ,each:function(e,j,k)
	     {
		 var f,g=0,h=e.length;if(k)
		 {
		     if(h===B)
		     {
			 for(f in e)
			 {
			     if(j.apply(e[f],k)===false)
			     {
				 break;
				 
			     }

			 }

		     }
		     else
		     {
			 for(;g<h;)
			 {
			     if(j.apply(e[g++],k)===false)
			     {
				 break;
			     }

			 }

		     }

		 }
		 else
		 {
		     if(h===B)
		     {
			 for(f in e)
			 {
			     if(j.call(e[f],f,e[f])===false)
			     {
				 break;
				 
			     }

			 }

		     }
		     else
		     {
			 for(var l=e[0];g<h&&j.call(l,g,l)!==false;l=e[++g])
			 {
			     
			 }

		     }

		 }
		 return e;
	     }
	     ,prop:function(j,e,h,g,f)
	     {
		 if(A.isFunction(e))
		 {
		     e=e.call(j,g);
		     
		 }
		 return typeof e==="number"&&h=="curCSS"&&!W.test(f)?e+"px":e;
	     }
	     ,className:
	     {
		 add:function(e,f)
		 {
		     A.each((f||"").split(/\s+/),function(h,g)
			    {
				if(e.nodeType==1&&!A.className.has(e.className,g))
				{
				    e.className+=(e.className?" ":"")+g;
				    
				}

			    }
			   );
		 }
		 ,remove:function(e,f)
		 {
		     if(e.nodeType==1)
		     {
			 e.className=f!==B?A.grep(e.className.split(/\s+/),function(g)
						  {
						      return !A.className.has(f,g);
						      
						  }
						 ).join(" "):"";
		     }

		 }
		 ,has:function(e,f)
		 {
		     return e&&A.inArray(f,(e.className||e).toString().split(/\s+/))>-1;
		     
		 }

	     }
	     ,swap:function(f,g,i)
	     {
		 var h=
		     {
			 
		     }
		 ;for(var e in g)
		 {
		     h[e]=f.style[e];f.style[e]=g[e];
		 }
		 i.call(f);for(var e in g)
		 {
		     f.style[e]=h[e];
		     
		 }

	     }
	     ,css:function(e,f,k,h)
	     {
		 if(f=="width"||f=="height")
		 {
		     var g,j=
			 {
			     position:"absolute",visibility:"hidden",display:"block"
			 }
		     ,l=f=="width"?["Left","Right"]:["Top","Bottom"];
		     function i()
																																																																																		      {
																																																																																			  g=f=="width"?e.offsetWidth:e.offsetHeight;if(h==="border")
																																																																																			  {
																																																																																			      return;
																																																																																			  }
																																																																																			  A.each(l,function()
																																																																																				 {
																																																																																				     if(!h)
																																																																																				     {
																																																																																					 g-=parseFloat(A.curCSS(e,"padding"+this,true))||0;
																																																																																					 
																																																																																				     }
																																																																																				     if(h==="margin")
																																																																																				     {
																																																																																					 g+=parseFloat(A.curCSS(e,"margin"+this,true))||0;
																																																																																				     }
																																																																																				     else
																																																																																				     {
																																																																																					 g-=parseFloat(A.curCSS(e,"border"+this+"Width",true))||0;
																																																																																					 
																																																																																				     }

																																																																																				 }
																																																																																				);
																																																																																		      }
																																																																																		      if(e.offsetWidth!==0)
																																																																																		      {
																																																																																			  i();
																																																																																		      }
																																																																																		      else
																																																																																		      {
																																																																																			  A.swap(e,j,i);
																																																																																		      }
																																																																																		      return Math.max(0,Math.round(g));
																																																																																		  }
																																																																																	      return A.curCSS(e,f,k);
																																																																																	      
																																																																																	  }
																					       ,curCSS:function(g,e,j)
																					       {
																						   var f,h=g.style;if(e=="opacity"&&!A.support.opacity)
																						   {
																						       f=A.attr(h,"opacity");return f==""?"1":f;
																						       
																						   }
																						   if(e.match(/float/i))
																						   {
																						       e=J;
																						   }
																						   if(!j&&h&&h[e])
																						   {
																						       f=h[e];
																						   }
																						   else
																						   {
																						       if(R.getComputedStyle)
																						       {
																							   if(e.match(/float/i))
																							   {
																							       e="float";
																							       
																							   }
																							   e=e.replace(/([A-Z])/g,"-$1").toLowerCase();var i=R.getComputedStyle(g,null);if(i)
																							   {
																							       f=i.getPropertyValue(e);
																							       
																							   }
																							   if(e=="opacity"&&f=="")
																							   {
																							       f="1";
																							   }

																						       }
																						       else
																						       {
																							   if(g.currentStyle)
																							   {
																							       var l=e.replace(/\-(\w)/g,function(o,n)
																									       {
																										   return n.toUpperCase();
																										   
																									       }
																									      );f=g.currentStyle[e]||g.currentStyle[l];if(!/^\d+(px)?$/i.test(f)&&/^\d/.test(f))
																							       {
																								   var k=h.left,m=g.runtimeStyle.left;
																								   g.runtimeStyle.left=g.currentStyle.left;h.left=f||0;f=h.pixelLeft+"px";h.left=k;g.runtimeStyle.left=m;
																								   
																							       }

																							   }

																						       }

																						   }
																						   return f;
																					       }
																					       ,clean:function(j,g,k)
																					       {
																						   g=g||document;if(typeof g.createElement==="undefined")
																						   {
																						       g=g.ownerDocument||g[0]&&g[0].ownerDocument||document;
																						       
																						   }
																						   if(!k&&j.length===1&&typeof j[0]==="string")
																						   {
																						       var m=/^<(\w+)\s*\/?>$/.exec(j[0]);if(m)
																						       {
																							   return[g.createElement(m[1])];
																							   
																						       }

																						   }
																																																																																																 var e=[],l=[],h=g.createElement("div");A.each(j,function(t,n)
																																																																																																					       {
																																																																																																						   if(typeof n==="number")
																																																																																																						   {
																																																																																																						       n+="";
																																																																																																						   }
																																																																																																						   if(!n)
																																																																																																						   {
																																																																																																						       return;
																																																																																																						       
																																																																																																						   }
																																																																																																						   if(typeof n==="string")
																																																																																																						   {
																																																																																																						       n=n.replace(/(<(\w+)[^>]*?)\/>/g,function(u,v,i)
																																																																																																								   {
																																																																																																								       return i.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?u:v+"></"+i+">";
																																																																																																								       
																																																																																																								   }
																																																																																																								  );var o=n.replace(/^\s+/,"").substring(0,10).toLowerCase();var r=!o.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!o.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||o.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!o.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!o.indexOf("<td")||!o.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!o.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!A.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];
																																																																																																						       h.innerHTML=r[1]+n+r[2];while(r[0]--)
																																																																																																						       {
																																																																																																							   h=h.lastChild;
																																																																																																						       }
																																																																																																						       if(!A.support.tbody)
																																																																																																						       {
																																																																																																							   var s=/<tbody/i.test(n),q=!o.indexOf("<table")&&!s?h.firstChild&&h.firstChild.childNodes:r[1]=="<table>"&&!s?h.childNodes:[];
																																																																																																							   for(var p=q.length-1;p>=0;--p)
																																																																																																							   {
																																																																																																							       if(A.nodeName(q[p],"tbody")&&!q[p].childNodes.length)
																																																																																																							       {
																																																																																																								   q[p].parentNode.removeChild(q[p]);
																																																																																																								   
																																																																																																							       }

																																																																																																							   }

																																																																																																						       }
																																																																																																						       if(!A.support.leadingWhitespace&&/^\s/.test(n))
																																																																																																						       {
																																																																																																							   h.insertBefore(g.createTextNode(n.match(/^\s*/)[0]),h.firstChild);
																																																																																																							   
																																																																																																						       }
																																																																																																						       n=A.makeArray(h.childNodes);
																																																																																																						   }
																																																																																																						   if(n.nodeType)
																																																																																																						   {
																																																																																																						       e.push(n);
																																																																																																						   }
																																																																																																						   else
																																																																																																						   {
																																																																																																						       e=A.merge(e,n);
																																																																																																						   }

																																																																																																					       }
																																																																																																					      );if(k)
																																																																																																 {
																																																																																																     for(var f=0;e[f];
																																																																																																	 f++)
																																																																																																     {
																																																																																																	 if(A.nodeName(e[f],"script")&&(!e[f].type||e[f].type.toLowerCase()==="text/javascript"))
																																																																																																	 {
																																																																																																	     l.push(e[f].parentNode?e[f].parentNode.removeChild(e[f]):e[f]);
																																																																																																	     
																																																																																																	 }
																																																																																																	 else
																																																																																																	 {
																																																																																																	     if(e[f].nodeType===1)
																																																																																																	     {
																																																																																																		 e.splice.apply(e,[f+1,0].concat(A.makeArray(e[f].getElementsByTagName("script"))));
																																																																																																		 
																																																																																																	     }
																																																																																																	     k.appendChild(e[f]);
																																																																																																	 }

																																																																																																     }
																																																																																																     return l;
																																																																																																 }
																																																																																																 return e;
																																																																																															     }
																					       ,attr:function(e,f,g)
																					       {
																						   if(!e||e.nodeType==3||e.nodeType==8)
																						   {
																						       return B;
																						       
																						   }
																						   var h=!A.isXMLDoc(e),i=g!==B;f=h&&A.props[f]||f;if(e.tagName)
																						   {
																						       var l=/href|src|style/.test(f);if(f=="selected"&&e.parentNode)
																																																																																																																																								  {
																																																																																																																																								      e.parentNode.selectedIndex;
																																																																																																																																								  
}
if(f in e&&h&&!l)
																																																																																																																																								       {
																																																																																																																																									   if(i)
																																																																																																																																									       {
																																																																																																																																										   if(f=="type"&&A.nodeName(e,"input")&&e.parentNode)
																																																																																																																																										       {
																																																																																																																																											   throw"type property can't be changed";
																																																																																																																																										       
}
e[f]=g;
}
if(A.nodeName(e,"form")&&e.getAttributeNode(f))
																																																																																																																																												    {
																																																																																																																																													return e.getAttributeNode(f).nodeValue;
}
if(f=="tabIndex")
																																																																																																																																																		    {
																																																																																																																																																			var j=e.getAttributeNode("tabIndex");
																																																																																																																																																			return j&&j.specified?j.value:e.nodeName.match(/(button|input|object|select|textarea)/i)?0:e.nodeName.match(/^(a|area)$/i)&&e.href?0:B;
																																																																																																																																																		    
}
return e[f];
}
if(!A.support.style&&h&&f=="style")
																																																																																																																																																				      {
																																																																																																																																																					  return A.attr(e.style,"cssText",g);
}
if(i)
																																																																																																																																																										  {
																																																																																																																																																										      e.setAttribute(f,""+g);
																																																																																																																																																										  
}
var k=!A.support.hrefNormalized&&h&&l?e.getAttribute(f,2):e.getAttribute(f);return k===null?B:k;
}
if(!A.support.opacity&&f=="opacity")
																																																																																																																																																																							{
																																																																																																																																																																							    if(i)
																																																																																																																																																																								{
																																																																																																																																																																								    e.zoom=1;
																																																																																																																																																																								    e.filter=(e.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(g)+""=="NaN"?"":"alpha(opacity="+g*100+")");
																																																																																																																																																																							
}
return e.filter&&e.filter.indexOf("opacity=")>=0?(parseFloat(e.filter.match(/opacity=([^)]*)/)[1])/100)+"":"";
																					   
}
f=f.replace(/-([a-z])/ig,function(n,m)
																							{
																							    return m.toUpperCase();
}
);if(i)
																											  {
																											      e[f]=g;
}
return e[f];
}
,trim:function(e)
																				      {
																					  return(e||"").replace(/^\s+|\s+$/g,"");
																				      
}
,makeArray:function(e)
																					    {
																						var g=[];if(e!=null)
																							     {
																								 var f=e.length;if(f==null||typeof e==="string"||A.isFunction(e)||e.setInterval)
																										    {
																											g[0]=e;
																										    
}
else
																								     {
																									 while(f)
																									     {
																										 g[--f]=e[f];
}

}

}
return g;
}
,inArray:function(h,f)
																													       {
																														   for(var e=0,g=f.length;e<g;e++)
																														       {
																															   if(f[e]===h)
																															       {
																																   return e;
																															       
}

}
return -1;
}
,merge:function(f,g)
																																		 {
																																		     var h=0,e,j=f.length;if(!A.support.getAll)
																																					      {
																																						  while((e=g[h++])!=null)
																																						      {
																																							  if(e.nodeType!=8)
																																							      {
																																								  f[j++]=e;
																																							      
}

}

}
else
																																			 {
																																			     while((e=g[h++])!=null)
																																				 {
																																				     f[j++]=e;
}

}
return f;
}
,unique:function(g)
																																							       {
																																								   var h=[],j=
																																								       {
																																								       
}
;try
																																									     {
																																										 for(var f=0,l=g.length;
																																										     f<l;f++)
																																										     {
																																											 var k=A.data(g[f]);if(!j[k])
																																														{
																																														    j[k]=true;h.push(g[f]);
}

}

}
catch(m)
																																								       {
																																									   h=g;
}
return h;
}
,grep:function(f,k,h)
																																											       {
																																												   var g=[];
																																												   for(var e=0,j=f.length;e<j;e++)
																																												       {
																																													   if(!h!=!k(f[e],e))
																																													       {
																																														   g.push(f[e]);
}

}
return g;
}
,map:function(g,k)
																																																		 {
																																																		     var e=[];
																																																		     for(var f=0,j=g.length;f<j;f++)
																																																			 {
																																																			     var h=k(g[f],f);if(h!=null)
																																																						 {
																																																						     e[e.length]=h;
}

}
return e.concat.apply([],e);
																																																		 
}

}
);var E=navigator.userAgent.toLowerCase();A.browser=
																																																		 {
																																																		     version:(E.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(E),opera:/opera/.test(E),msie:/msie/.test(E)&&!/opera/.test(E),mozilla:/mozilla/.test(E)&&!/(compatible|webkit)/.test(E)
}
;
A.each(
       {
	   parent:function(e)
	       {
		   return e.parentNode;
}
,parents:function(e)
					     {
						 return A.dir(e,"parentNode");
}
,next:function(e)
										    {
											return A.nth(e,2,"nextSibling");
										    
}
,prev:function(e)
											  {
											      return A.nth(e,2,"previousSibling");
}
,nextAll:function(e)
																	{
																	    return A.dir(e,"nextSibling");
																	
}
,prevAll:function(e)
																	      {
																		  return A.dir(e,"previousSibling");
}
,siblings:function(e)
																							  {
																							      return A.sibling(e.parentNode.firstChild,e);
																							  
}
,children:function(e)
																								{
																								    return A.sibling(e.firstChild);
}
,contents:function(e)
																													 {
																													     return A.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:A.makeArray(e.childNodes);
																													 
}

}
,function(e,f)
       {
	   A.fn[e]=function(g)
	       {
		   var h=A.map(this,f);if(g&&typeof g=="string")
					   {
					       h=A.multiFilter(g,h);
					   
}
return this.pushStack(A.unique(h),e,g);
}
;
}
);A.each(
											       {
												   appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"
}
,function(e,f)
											       {
												   A.fn[e]=function(j)
												       {
													   var h=[],m=A(j);
													   for(var g=0,n=m.length;g<n;g++)
													       {
														   var k=(g>0?this.clone(true):this).get();A.fn[f].apply(A(m[g]),k);h=h.concat(k);
													       
}
return this.pushStack(h,e,j);
}
;
}
);A.each(
																			 {
																			     removeAttr:function(e)
																				 {
																				     A.attr(this,e,"");if(this.nodeType==1)
																							   {
																							       this.removeAttribute(e);
																							   
}

}
,addClass:function(e)
																								  {
																								      A.className.add(this,e);
}
,removeClass:function(e)
																												    {
																													A.className.remove(this,e);
																												    
}
,toggleClass:function(f,e)
																													  {
																													      if(typeof e!=="boolean")
																														  {
																														      e=!A.className.has(this,f);
}
A.className[e?"add":"remove"](this,f);
																													  
}
,remove:function(e)
																														{
																														    if(!e||A.filter(e,[this]).length)
																															{
																															    A("*",this).add([this]).each(function()
																																			 {
																																			     A.event.remove(this);
																																			     A.removeData(this);
}
);if(this.parentNode)
																																						       {
																																							   this.parentNode.removeChild(this);
}

}

}
,empty:function()
																																												     {
																																													 A(this).children().remove();
																																													 while(this.firstChild)
																																													     {
																																														 this.removeChild(this.firstChild);
}

}

}
,function(e,f)
																			 {
																			     A.fn[e]=function()
																				 {
																				     return this.each(f,arguments);
																				 
}
;
}
);function H(e,f)
																				 {
																				     return e[0]&&parseInt(A.curCSS(e[0],f,true),10)||0;
}
var D="jQuery"+F(),a=0,U=
																				     {
																				     
}
;
A.extend(
	 {
	     cache:
	     {
	     
}
,data:function(f,g,h)
		   {
		       f=f==C?U:f;var e=f[D];if(!e)
						 {
						     e=f[D]=++a;
}
if(g&&!A.cache[e])
								     {
									 A.cache[e]=
									     {
									     
}
;
								     
}
if(h!==B)
									  {
									      A.cache[e][g]=h;
}
return g?A.cache[e][g]:e;
}
,removeData:function(f,g)
															      {
																  f=f==C?U:f;var h=f[D];
																  if(g)
																      {
																	  if(A.cache[h])
																	      {
																		  delete A.cache[h][g];g="";for(g in A.cache[h])
																						{
																						    break;
}
if(!g)
																							       {
																								   A.removeData(f);
}

}

}
else
																      {
																	  try
																	      {
																		  delete f[D];
																	      
}
catch(i)
																	      {
																		  if(f.removeAttribute)
																		      {
																			  f.removeAttribute(D);
}

}
delete A.cache[h];
}

}
,queue:function(h,e,g)
																									  {
																									      if(h)
																										  {
																										      e=(e||"fx")+"queue";
																										      var f=A.data(h,e);if(!f||A.isArray(g))
																													    {
																														f=A.data(h,e,A.makeArray(g));
}
else
																											  {
																											      if(g)
																												  {
																												      f.push(g);
}

}

}
return f;
																									  
}
,dequeue:function(h,f)
																										{
																										    var g=A.queue(h,f),e=g.shift();if(!f||f==="fx")
																														       {
																															   e=g[0];
}
if(e!==B)
																																       {
																																	   e.call(h);
}

}

}
);
A.fn.extend(
	    {
		data:function(g,h)
		    {
			var e=g.split(".");e[1]=e[1]?"."+e[1]:"";if(h===B)
								     {
									 var f=this.triggerHandler("getData"+e[1]+"!",[e[0]]);
									 if(f===B&&this.length)
									     {
										 f=A.data(this[0],g);
}
return f===B&&e[1]?this.data(e[0]):f;
}
else
			    {
				return this.trigger("setData"+e[1]+"!",[e[0],h]).each(function()
										      {
											  A.data(this,g,h);
										      
}
);
}

}
,removeData:function(e)
												{
												    return this.each(function()
														     {
															 A.removeData(this,e);
}
);
}
,queue:function(e,f)
																		       {
																			   if(typeof e!=="string")
																			       {
																				   f=e;
																				   e="fx";
}
if(f===B)
																					       {
																						   return A.queue(this[0],e);
}
return this.each(function()
																											       {
																												   var g=A.queue(this,e,f);if(e=="fx"&&g.length==1)
																															       {
																																   g[0].call(this);
																															       
}

}
);
}
,dequeue:function(e)
																																	 {
																																	     return this.each(function()
																																			      {
																																				  A.dequeue(this,e);
}
);
}

}
);(function()
																																							    {
																																								var l=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,k=0,m=Object.prototype.toString;
var g=function(y,v,x,AE)
{
x=x||[];v=v||document;if(v.nodeType!==1&&v.nodeType!==9)
{
return[];
}
if(!y||typeof y!=="string")
{
return x;

}
var e=[],AD,z,w,AH,AI,AC,AF=true;l.lastIndex=0;while((AD=l.exec(y))!==null)
{
e.push(AD[1]);if(AD[2])
{
AC=RegExp.rightContext;
break;
}

}
if(e.length>1&&s.exec(y))
{
if(e.length===2&&f.relative[e[0]])
{
z=n(e[0]+e[1],v);
}
else
{
z=f.relative[e[0]]?[v]:g(e.shift(),v);
while(e.length)
{
y=e.shift();if(f.relative[y])
{
y+=e.shift();
}
z=n(y,z);
}

}

}
else
{
var AG=AE?
{
expr:e.pop(),set:i(AE)
}
:g.find(e.pop(),e.length===1&&v.parentNode?v.parentNode:v,h(v));
z=g.filter(AG.expr,AG.set);if(e.length>0)
{
w=i(z);
}
else
{
AF=false;
}
while(e.length)
{
var AA=e.pop(),AB=AA;
if(!f.relative[AA])
{
AA="";
}
else
{
AB=e.pop();
}
if(AB==null)
{
AB=v;
}
f.relative[AA](w,AB,h(v));
}

}
if(!w)
{
w=z;

}
if(!w)
{
throw"Syntax error, unrecognized expression: "+(AA||y);
}
if(m.call(w)==="[object Array]")
{
if(!AF)
{
x.push.apply(x,w);

}
else
{
if(v.nodeType===1)
{
for(var u=0;w[u]!=null;u++)
{
if(w[u]&&(w[u]===true||w[u].nodeType===1&&r(v,w[u])))
{
x.push(z[u]);

}

}

}
else
{
for(var u=0;w[u]!=null;u++)
{
if(w[u]&&w[u].nodeType===1)
{
x.push(z[u]);
}

}

}

}

}
else
{
i(w,x);
}
if(AC)
{
g(AC,v,x,AE);
if(j)
{
hasDuplicate=false;x.sort(j);if(hasDuplicate)
{
for(var u=1;u<x.length;u++)
{
if(x[u]===x[u-1])
{
x.splice(u--,1);

}

}

}

}

}
return x;
}
;g.matches=function(e,u)
{
return g(e,null,null,u);
}
;g.find=function(u,y,AB)
{
var e,v;if(!u)
{
return[];

}
for(var w=0,AA=f.order.length;w<AA;w++)
{
var x=f.order[w],v;if((v=f.match[x].exec(u)))
{
var z=RegExp.leftContext;
if(z.substr(z.length-1)!=="\\")
{
v[1]=(v[1]||"").replace(/\\/g,"");e=f.find[x](v,y,AB);if(e!=null)
{
u=u.replace(f.match[x],"");
break;
}

}

}

}
if(!e)
{
e=y.getElementsByTagName("*");
}
return
{
set:e,expr:u
}
;
}
;g.filter=function(e,y,AD,AF)
{
var AE=e,AA=[],v=y,u,w,AI=y&&y[0]&&h(y[0]);
while(e&&y.length)
{
for(var x in f.filter)
{
if((u=f.match[x].exec(e))!=null)
{
var AH=f.filter[x],z,AC;w=false;
if(v==AA)
{
AA=[];
}
if(f.preFilter[x])
{
u=f.preFilter[x](u,v,AD,AA,AF,AI);if(!u)
{
w=z=true;
}
else
{
if(u===true)
{
continue;

}

}

}
if(u)
{
for(var AB=0;(AC=v[AB])!=null;AB++)
{
if(AC)
{
z=AH(AC,u,AB,v);var AG=AF^!!z;if(AD&&z!=null)
{
if(AG)
{
w=true;

}
else
{
v[AB]=false;
}

}
else
{
if(AG)
{
AA.push(AC);w=true;
}

}

}

}

}
if(z!==B)
{
if(!AD)
{
v=AA;
}
e=e.replace(f.match[x],"");
if(!w)
{
return[];
}
break;
}

}

}
if(e==AE)
{
if(w==null)
{
throw"Syntax error, unrecognized expression: "+e;
}
else
{
break;

}

}
AE=e;
}
return v;
}
;var f=g.selectors=
{
order:["ID","NAME","TAG"],match:
{
ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
}
,attrMap:
{
"class":"className","for":"htmlFor"
}
,attrHandle:
{
href:function(e)
{
return e.getAttribute("href");

}

}
,relative:
{
"+":function(w,u,AB)
{
var x=typeof u==="string",z=x&&!/\W/.test(u),y=x&&!z;if(z&&!AB)
{
u=u.toUpperCase();

}
for(var v=0,AA=w.length,e;v<AA;v++)
{
if((e=w[v]))
{
while((e=e.previousSibling)&&e.nodeType!==1)
{

}
w[v]=y||e&&e.nodeName===u?e||false:e===u;

}

}
if(y)
{
g.filter(u,w,true);
}

}
,">":function(v,e,AA)
{
var x=typeof e==="string";if(x&&!/\W/.test(e))
{
e=AA?e:e.toUpperCase();
for(var u=0,y=v.length;u<y;u++)
{
var w=v[u];if(w)
{
var z=w.parentNode;v[u]=z.nodeName===e?z:false;
}

}

}
else
{
for(var u=0,y=v.length;
u<y;u++)
{
var w=v[u];if(w)
{
v[u]=x?w.parentNode:w.parentNode===e;
}

}
if(x)
{
g.filter(e,v,true);
}

}

}
,"":function(x,e,v)
{
var w=k++,u=q;
if(!e.match(/\W/))
{
var y=e=v?e:e.toUpperCase();u=p;
}
u("parentNode",e,w,x,y,v);
}
,"~":function(x,e,v)
{
var w=k++,u=q;
if(typeof e==="string"&&!e.match(/\W/))
{
var y=e=v?e:e.toUpperCase();u=p;
}
u("previousSibling",e,w,x,y,v);

}

}
,find:
{
ID:function(v,u,w)
{
if(typeof u.getElementById!=="undefined"&&!w)
{
var e=u.getElementById(v[1]);
return e?[e]:[];
}

}
,NAME:function(w,x,z)
{
if(typeof x.getElementsByName!=="undefined")
{
var u=[],v=x.getElementsByName(w[1]);
for(var e=0,y=v.length;e<y;e++)
{
if(v[e].getAttribute("name")===w[1])
{
u.push(v[e]);
}

}
return u.length===0?null:u;

}

}
,TAG:function(e,u)
{
return u.getElementsByTagName(e[1]);
}

}
,preFilter:
{
CLASS:function(u,w,x,y,z,AA)
{
u=" "+u[1].replace(/\\/g,"")+" ";
if(AA)
{
return u;
}
for(var v=0,e;(e=w[v])!=null;v++)
{
if(e)
{
if(z^(e.className&&(" "+e.className+" ").indexOf(u)>=0))
{
if(!x)
{
y.push(e);

}

}
else
{
if(x)
{
w[v]=false;
}

}

}

}
return false;
}
,ID:function(e)
{
return e[1].replace(/\\/g,"");
}
,TAG:function(v,u)
{
for(var e=0;
u[e]===false;e++)
{

}
return u[e]&&h(u[e])?v[1]:v[1].toUpperCase();
}
,CHILD:function(e)
{
if(e[1]=="nth")
{
var u=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2]=="even"&&"2n"||e[2]=="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);
e[2]=(u[1]+(u[2]||1))-0;e[3]=u[3]-0;
}
e[0]=k++;return e;
}
,ATTR:function(e,x,y,w,z,v)
{
var u=e[1].replace(/\\/g,"");
if(!v&&f.attrMap[u])
{
e[1]=f.attrMap[u];
}
if(e[2]==="~=")
{
e[4]=" "+e[4]+" ";
}
return e;
}
,PSEUDO:function(e,v,w,u,y)
{
if(e[1]==="not")
{
if(e[3].match(l).length>1||/^\w/.test(e[3]))
{
e[3]=g(e[3],null,null,v);

}
else
{
var x=g.filter(e[3],v,w,true^y);if(!w)
{
u.push.apply(u,x);
}
return false;
}

}
else
{
if(f.match.POS.test(e[0])||f.match.CHILD.test(e[0]))
{
return true;

}

}
return e;
}
,POS:function(e)
{
e.unshift(true);return e;
}

}
,filters:
{
enabled:function(e)
{
return e.disabled===false&&e.type!=="hidden";

}
,disabled:function(e)
{
return e.disabled===true;
}
,checked:function(e)
{
return e.checked===true;
}
,selected:function(e)
{
e.parentNode.selectedIndex;
return e.selected===true;
}
,parent:function(e)
{
return !!e.firstChild;
}
,empty:function(e)
{
return !e.firstChild;

}
,has:function(u,v,e)
{
return !!g(e[3],u).length;
}
,header:function(e)
{
return/h\d/i.test(e.nodeName);
}
,text:function(e)
{
return"text"===e.type;

}
,radio:function(e)
{
return"radio"===e.type;
}
,checkbox:function(e)
{
return"checkbox"===e.type;
}
,file:function(e)
{
return"file"===e.type;

}
,password:function(e)
{
return"password"===e.type;
}
,submit:function(e)
{
return"submit"===e.type;
}
,image:function(e)
{
return"image"===e.type;

}
,reset:function(e)
{
return"reset"===e.type;
}
,button:function(e)
{
return"button"===e.type||e.nodeName.toUpperCase()==="BUTTON";

}
,input:function(e)
{
return/input|select|textarea|button/i.test(e.nodeName);
}

}
,setFilters:
{
first:function(u,e)
{
return e===0;

}
,last:function(w,e,v,u)
{
return e===u.length-1;
}
,even:function(u,e)
{
return e%2===0;
}
,odd:function(u,e)
{
return e%2===1;

}
,lt:function(v,u,e)
{
return u<e[3]-0;
}
,gt:function(v,u,e)
{
return u>e[3]-0;
}
,nth:function(v,u,e)
{
return e[3]-0==u;

}
,eq:function(v,u,e)
{
return e[3]-0==u;
}

}
,filter:
{
PSEUDO:function(v,e,u,AA)
{
var w=e[1],x=f.filters[w];
if(x)
{
return x(v,u,e,AA);
}
else
{
if(w==="contains")
{
return(v.textContent||v.innerText||"").indexOf(e[3])>=0;

}
else
{
if(w==="not")
{
var y=e[3];for(var u=0,z=y.length;u<z;u++)
{
if(y[u]===v)
{
return false;
}

}
return true;

}

}

}

}
,CHILD:function(u,w)
{
var AA=w[1],e=u;switch(AA)
{
case"only":case"first":while(e=e.previousSibling)
{
if(e.nodeType===1)
{
return false;

}

}
if(AA=="first")
{
return true;
}
e=u;case"last":while(e=e.nextSibling)
{
if(e.nodeType===1)
{
return false;

}

}
return true;case"nth":var v=w[2],AB=w[3];if(v==1&&AB==0)
{
return true;
}
var z=w[0],x=u.parentNode;if(x&&(x.sizcache!==z||!u.nodeIndex))
{
var AC=0;
for(e=x.firstChild;e;e=e.nextSibling)
{
if(e.nodeType===1)
{
e.nodeIndex=++AC;
}

}
x.sizcache=z;
}
var y=u.nodeIndex-AB;
if(v==0)
{
return y==0;
}
else
{
return(y%v==0&&y/v>=0);
}

}

}
,ID:function(e,u)
{
return e.nodeType===1&&e.getAttribute("id")===u;

}
,TAG:function(u,e)
{
return(e==="*"&&u.nodeType===1)||u.nodeName===e;
}
,CLASS:function(e,u)
{
return(" "+(e.className||e.getAttribute("class"))+" ").indexOf(u)>-1;

}
,ATTR:function(x,z)
{
var w=z[1],y=f.attrHandle[w]?f.attrHandle[w](x):x[w]!=null?x[w]:x.getAttribute(w),u=y+"",v=z[2],e=z[4];
return y==null?v==="!=":v==="="?u===e:v==="*="?u.indexOf(e)>=0:v==="~="?(" "+u+" ").indexOf(e)>=0:!e?u&&y!==false:v==="!="?u!=e:v==="^="?u.indexOf(e)===0:v==="$="?u.substr(u.length-e.length)===e:v==="|="?u===e||u.substr(0,e.length+1)===e+"-":false;

}
,POS:function(x,e,w,y)
{
var v=e[2],u=f.setFilters[v];if(u)
{
return u(x,w,e,y);
}

}

}

}
;var s=f.match.POS;for(var o in f.match)
{
f.match[o]=RegExp(f.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source);

}
var i=function(u,e)
{
u=Array.prototype.slice.call(u);if(e)
{
e.push.apply(e,u);return e;
}
return u;
}
;try
{
Array.prototype.slice.call(document.documentElement.childNodes);

}
catch(t)
{
i=function(e,x)
{
var v=x||[];if(m.call(e)==="[object Array]")
{
Array.prototype.push.apply(v,e);

}
else
{
if(typeof e.length==="number")
{
for(var u=0,w=e.length;u<w;u++)
{
v.push(e[u]);
}

}
else
{
for(var u=0;
e[u];u++)
{
v.push(e[u]);
}

}

}
return v;
}
;
}
var j;if(document.documentElement.compareDocumentPosition)
{
j=function(u,e)
{
var v=u.compareDocumentPosition(e)&4?-1:u===e?0:1;
if(v===0)
{
hasDuplicate=true;
}
return v;
}
;
}
else
{
if("sourceIndex" in document.documentElement)
{
j=function(v,u)
{
var e=v.sourceIndex-u.sourceIndex;
if(e===0)
{
hasDuplicate=true;
}
return e;
}
;
}
else
{
if(document.createRange)
{
j=function(w,v)
{
var u=w.ownerDocument.createRange(),e=v.ownerDocument.createRange();
u.selectNode(w);u.collapse(true);e.selectNode(v);e.collapse(true);var x=u.compareBoundaryPoints(Range.START_TO_END,e);
if(x===0)
{
hasDuplicate=true;
}
return x;
}
;
}

}

}
(function()
{
var u=document.createElement("form"),v="script"+(new Date).getTime();
u.innerHTML="<input name='"+v+"'/>";var e=document.documentElement;e.insertBefore(u,e.firstChild);if(!!document.getElementById(v))
{
f.find.ID=function(x,y,z)
{
if(typeof y.getElementById!=="undefined"&&!z)
{
var w=y.getElementById(x[1]);
return w?w.id===x[1]||typeof w.getAttributeNode!=="undefined"&&w.getAttributeNode("id").nodeValue===x[1]?[w]:B:[];

}

}
;f.filter.ID=function(w,y)
{
var x=typeof w.getAttributeNode!=="undefined"&&w.getAttributeNode("id");
return w.nodeType===1&&x&&x.nodeValue===y;
}
;
}
e.removeChild(u);
}
)();(function()
{
var e=document.createElement("div");
e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0)
{
f.find.TAG=function(w,y)
{
var u=y.getElementsByTagName(w[1]);
if(w[1]==="*")
{
var x=[];for(var v=0;u[v];v++)
{
if(u[v].nodeType===1)
{
x.push(u[v]);
}

}
u=x;
}
return u;
}
;
}
e.innerHTML="<a href='#'></a>";
if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#")
{
f.attrHandle.href=function(u)
{
return u.getAttribute("href",2);

}
;
}

}
)();if(document.querySelectorAll)
{
(function()
{
var e=g,u=document.createElement("div");u.innerHTML="<p class='TEST'></p>";
if(u.querySelectorAll&&u.querySelectorAll(".TEST").length===0)
{
return;
}
g=function(y,v,w,x)
{
v=v||document;
if(!x&&v.nodeType===9&&!h(v))
{
try
{
return i(v.querySelectorAll(y),w);
}
catch(z)
{

}

}
return e(y,v,w,x);
}
;g.find=e.find;
g.filter=e.filter;g.selectors=e.selectors;g.matches=e.matches;
}
)();
}
if(document.getElementsByClassName&&document.documentElement.getElementsByClassName)
{
(function()
{
var e=document.createElement("div");
e.innerHTML="<div class='test e'></div><div class='test'></div>";if(e.getElementsByClassName("e").length===0)
{
return;

}
e.lastChild.className="e";if(e.getElementsByClassName("e").length===1)
{
return;
}
f.order.splice(1,0,"CLASS");
f.find.CLASS=function(v,u,w)
{
if(typeof u.getElementsByClassName!=="undefined"&&!w)
{
return u.getElementsByClassName(v[1]);

}

}
;
}
)();
}
function p(w,AB,y,v,AD,z)
{
var AC=w=="previousSibling"&&!z;for(var u=0,AA=v.length;u<AA;u++)
{
var e=v[u];
if(e)
{
if(AC&&e.nodeType===1)
{
e.sizcache=y;e.sizset=u;
}
e=e[w];var x=false;while(e)
{
if(e.sizcache===y)
{
x=v[e.sizset];
break;
}
if(e.nodeType===1&&!z)
{
e.sizcache=y;e.sizset=u;
}
if(e.nodeName===AB)
{
x=e;break;
}
e=e[w];
}
v[u]=x;

}

}

}
function q(x,z,y,w,AD,AA)
{
var AC=x=="previousSibling"&&!AA;for(var u=0,AB=w.length;u<AB;u++)
{
var e=w[u];
if(e)
{
if(AC&&e.nodeType===1)
{
e.sizcache=y;e.sizset=u;
}
e=e[x];var v=false;while(e)
{
if(e.sizcache===y)
{
v=w[e.sizset];
break;
}
if(e.nodeType===1)
{
if(!AA)
{
e.sizcache=y;e.sizset=u;
}
if(typeof z!=="string")
{
if(e===z)
{
v=true;break;

}

}
else
{
if(g.filter(z,[e]).length>0)
{
v=e;break;
}

}

}
e=e[x];
}
w[u]=v;
}

}

}
var r=document.compareDocumentPosition?function(u,e)
{
return u.compareDocumentPosition(e)&16;

}
:function(e,u)
{
return e!==u&&(e.contains?e.contains(u):true);
}
;var h=function(e)
{
return e.nodeType===9&&e.documentElement.nodeName!=="HTML"||!!e.ownerDocument&&h(e.ownerDocument);

}
;var n=function(e,v)
{
var x=[],y="",z,w=v.nodeType?[v]:v;while((z=f.match.PSEUDO.exec(e)))
{
y+=z[0];e=e.replace(f.match.PSEUDO,"");

}
e=f.relative[e]?e+"*":e;for(var u=0,AA=w.length;u<AA;u++)
{
g(e,w[u],x);
}
return g.filter(y,x);
}
;A.find=g;
A.filter=g.filter;A.expr=g.selectors;A.expr[":"]=A.expr.filters;g.selectors.filters.hidden=function(e)
{
return e.offsetWidth===0||e.offsetHeight===0;

}
;g.selectors.filters.visible=function(e)
{
return e.offsetWidth>0||e.offsetHeight>0;
}
;g.selectors.filters.animated=function(e)
{
return A.grep(A.timers,function(u)
{
return e===u.elem;

}
).length;
}
;A.multiFilter=function(e,u,v)
{
if(v)
{
e=":not("+e+")";
}
return g.matches(e,u);
}
;A.dir=function(w,v)
{
var u=[],e=w[v];
while(e&&e!=document)
{
if(e.nodeType==1)
{
u.push(e);
}
e=e[v];
}
return u;
}
;A.nth=function(e,u,w,x)
{
u=u||1;
var v=0;for(;e;e=e[w])
{
if(e.nodeType==1&&++v==u)
{
break;
}

}
return e;
}
;A.sibling=function(e,v)
{
var u=[];
for(;e;e=e.nextSibling)
{
if(e.nodeType==1&&e!=v)
{
u.push(e);
}

}
return u;
}
;return;C.Sizzle=g;
}
)();A.event=
{
add:function(e,j,f,g)
{
if(e.nodeType==3||e.nodeType==8)
{
return;

}
if(e.setInterval&&e!=C)
{
e=C;
}
if(!f.guid)
{
f.guid=this.guid++;
}
if(g!==B)
{
var k=f;f=this.proxy(k);f.data=g;

}
var i=A.data(e,"events")||A.data(e,"events",
{

}
),h=A.data(e,"handle")||A.data(e,"handle",function()
{
return typeof A!=="undefined"&&!A.event.triggered?A.event.handle.apply(arguments.callee.elem,arguments):B;

}
);h.elem=e;A.each(j.split(/\s+/),function(o,l)
{
var m=l.split(".");l=m.shift();f.type=m.slice().sort().join(".");
var n=i[l];if(A.event.specialAll[l])
{
A.event.specialAll[l].setup.call(e,g,m);
}
if(!n)
{
n=i[l]=
{

}
;if(!A.event.special[l]||A.event.special[l].setup.call(e,g,m)===false)
{
if(e.addEventListener)
{
e.addEventListener(l,h,false);

}
else
{
if(e.attachEvent)
{
e.attachEvent("on"+l,h);
}

}

}

}
n[f.guid]=f;A.event.global[l]=true;
}
);e=null;
}
,guid:1,global:
{

}
,remove:function(e,g,i)
{
if(e.nodeType==3||e.nodeType==8)
{
return;

}
var f=A.data(e,"events"),h,l;if(f)
{
if(g===B||(typeof g==="string"&&g.charAt(0)=="."))
{
for(var k in f)
{
this.remove(e,k+(g||""));

}

}
else
{
if(g.type)
{
i=g.handler;g=g.type;
}
A.each(g.split(/\s+/),function(q,m)
{
var n=m.split(".");m=n.shift();
var p=RegExp("(^|\\.)"+n.slice().sort().join(".*\\.")+"(\\.|$)");if(f[m])
{
if(i)
{
delete f[m][i.guid];
}
else
{
for(var o in f[m])
{
if(p.test(f[m][o].type))
{
delete f[m][o];

}

}

}
if(A.event.specialAll[m])
{
A.event.specialAll[m].teardown.call(e,n);
}
for(h in f[m])
{
break;
}
if(!h)
{
if(!A.event.special[m]||A.event.special[m].teardown.call(e,n)===false)
{
if(e.removeEventListener)
{
e.removeEventListener(m,A.data(e,"handle"),false);

}
else
{
if(e.detachEvent)
{
e.detachEvent("on"+m,A.data(e,"handle"));
}

}

}
h=null;delete f[m];
}

}

}
);
}
for(h in f)
{
break;

}
if(!h)
{
var j=A.data(e,"handle");if(j)
{
j.elem=null;
}
A.removeData(e,"events");A.removeData(e,"handle");

}

}

}
,trigger:function(f,i,g,j)
{
var h=f.type||f;if(!j)
{
f=typeof f==="object"?f[D]?f:A.extend(A.Event(h),f):A.Event(h);
if(h.indexOf("!")>=0)
{
f.type=h=h.slice(0,-1);f.exclusive=true;
}
if(!g)
{
f.stopPropagation();if(this.global[h])
{
A.each(A.cache,function()
{
if(this.events&&this.events[h])
{
A.event.trigger(f,i,this.handle.elem);

}

}
);
}

}
if(!g||g.nodeType==3||g.nodeType==8)
{
return B;
}
f.result=B;f.target=g;i=A.makeArray(i);i.unshift(f);

}
f.currentTarget=g;var l=A.data(g,"handle");if(l)
{
l.apply(g,i);
}
if((!g[h]||(A.nodeName(g,"a")&&h=="click"))&&g["on"+h]&&g["on"+h].apply(g,i)===false)
{
f.result=false;

}
if(!j&&g[h]&&!f.isDefaultPrevented()&&!(A.nodeName(g,"a")&&h=="click"))
{
this.triggered=true;try
{
g[h]();

}
catch(m)
{

}

}
this.triggered=false;if(!f.isPropagationStopped())
{
var k=g.parentNode||g.ownerDocument;if(k)
{
A.event.trigger(f,i,k,true);

}

}

}
,handle:function(e)
{
var k,g;e=arguments[0]=A.event.fix(e||C.event);e.currentTarget=this;var i=e.type.split(".");
e.type=i.shift();k=!i.length&&!e.exclusive;var m=RegExp("(^|\\.)"+i.slice().sort().join(".*\\.")+"(\\.|$)");
g=(A.data(this,"events")||
{

}
)[e.type];for(var l in g)
{
var f=g[l];if(k||m.test(f.type))
{
e.handler=f;e.data=f.data;
var h=f.apply(this,arguments);if(h!==B)
{
e.result=h;if(h===false)
{
e.preventDefault();e.stopPropagation();

}

}
if(e.isImmediatePropagationStopped())
{
break;
}

}

}

}
,props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(e)
{
if(e[D])
{
return e;

}
var j=e;e=A.Event(j);for(var k=this.props.length,h;k;)
{
h=this.props[--k];e[h]=j[h];
}
if(!e.target)
{
e.target=e.srcElement||document;

}
if(e.target.nodeType==3)
{
e.target=e.target.parentNode;
}
if(!e.relatedTarget&&e.fromElement)
{
e.relatedTarget=e.fromElement==e.target?e.toElement:e.fromElement;

}
if(e.pageX==null&&e.clientX!=null)
{
var f=document.documentElement,g=document.body;e.pageX=e.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f.clientLeft||0);
e.pageY=e.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f.clientTop||0);
}
if(!e.which&&((e.charCode||e.charCode===0)?e.charCode:e.keyCode))
{
e.which=e.charCode||e.keyCode;

}
if(!e.metaKey&&e.ctrlKey)
{
e.metaKey=e.ctrlKey;
}
if(!e.which&&e.button)
{
e.which=(e.button&1?1:(e.button&2?3:(e.button&4?2:0)));

}
return e;
}
,proxy:function(f,e)
{
e=e||function()
{
return f.apply(this,arguments);
}
;e.guid=f.guid=f.guid||e.guid||this.guid++;
return e;
}
,special:
{
ready:
{
setup:V,teardown:function()
{

}

}

}
,specialAll:
{
live:
{
setup:function(f,e)
{
A.event.add(this,e[0],O);

}
,teardown:function(e)
{
if(e.length)
{
var f=0,g=RegExp("(^|\\.)"+e[0]+"(\\.|$)");A.each((A.data(this,"events").live||
{

}
),function()
{
if(g.test(this.type))
{
f++;

}

}
);if(f<1)
{
A.event.remove(this,e[0],O);
}

}

}

}

}

}
;A.Event=function(e)
{
if(!this.preventDefault)
{
return new A.Event(e);

}
if(e&&e.type)
{
this.originalEvent=e;this.type=e.type;
}
else
{
this.type=e;
}
this.timeStamp=F();this[D]=true;

}
;function K()
{
return false;
}
function M()
{
return true;
}
A.Event.prototype=
{
preventDefault:function()
{
this.isDefaultPrevented=M;
var f=this.originalEvent;if(!f)
{
return;
}
if(f.preventDefault)
{
f.preventDefault();
}
f.returnValue=false;

}
,stopPropagation:function()
{
this.isPropagationStopped=M;var f=this.originalEvent;if(!f)
{
return;
}
if(f.stopPropagation)
{
f.stopPropagation();

}
f.cancelBubble=true;
}
,stopImmediatePropagation:function()
{
this.isImmediatePropagationStopped=M;this.stopPropagation();

}
,isDefaultPrevented:K,isPropagationStopped:K,isImmediatePropagationStopped:K
}
;var N=function(g)
{
var f=g.relatedTarget;
while(f&&f!=this)
{
try
{
f=f.parentNode;
}
catch(h)
{
f=this;
}

}
if(f!=this)
{
g.type=g.data;A.event.handle.apply(this,arguments);

}

}
;A.each(
{
mouseover:"mouseenter",mouseout:"mouseleave"
}
,function(f,e)
{
A.event.special[e]=
{
setup:function()
{
A.event.add(this,f,N,e);

}
,teardown:function()
{
A.event.remove(this,f,N);
}

}
;
}
);A.fn.extend(
{
bind:function(f,g,e)
{
return f=="unload"?this.one(f,g,e):this.each(function()
{
A.event.add(this,f,e||g,e&&g);

}
);
}
,one:function(h,f,e)
{
var g=A.event.proxy(e||f,function(i)
{
A(this).unbind(i,g);return(e||f).apply(this,arguments);

}
);return this.each(function()
{
A.event.add(this,h,g,e&&f);
}
);
}
,unbind:function(f,e)
{
return this.each(function()
{
A.event.remove(this,f,e);

}
);
}
,trigger:function(e,f)
{
return this.each(function()
{
A.event.trigger(e,f,this);
}
);
}
,triggerHandler:function(f,g)
{
if(this[0])
{
var e=A.Event(f);
e.preventDefault();e.stopPropagation();A.event.trigger(e,g,this[0]);return e.result;
}

}
,toggle:function(g)
{
var e=arguments,f=1;
while(f<e.length)
{
A.event.proxy(g,e[f++]);
}
return this.click(A.event.proxy(g,function(h)
{
this.lastToggle=(this.lastToggle||0)%f;
h.preventDefault();return e[this.lastToggle++].apply(this,arguments)||false;
}
));
}
,hover:function(e,f)
{
return this.mouseenter(e).mouseleave(f);

}
,ready:function(e)
{
V();if(A.isReady)
{
e.call(document,A);
}
else
{
A.readyList.push(e);
}
return this;
}
,live:function(f,g)
{
var e=A.event.proxy(g);
e.guid+=this.selector+f;A(document).bind(Q(f,this.selector),this.selector,e);return this;
}
,die:function(f,e)
{
A(document).unbind(Q(f,this.selector),e?
{
guid:e.guid+this.selector+f
}
:null);
return this;
}

}
);function O(f)
{
var h=RegExp("(^|\\.)"+f.type+"(\\.|$)"),g=true,e=[];A.each(A.data(this,"events").live||[],function(l,j)
{
if(h.test(j.type))
{
var k=A(f.target).closest(j.data)[0];
if(k)
{
e.push(
{
elem:k,fn:j
}
);
}

}

}
);e.sort(function(j,i)
{
return A.data(j.elem,"closest")-A.data(i.elem,"closest");

}
);A.each(e,function()
{
if(this.fn.call(this.elem,f,this.fn.data)===false)
{
return(g=false);
}

}
);return g;

}
function Q(f,e)
{
return["live",f,e.replace(/\./g,"`").replace(/ /g,"|")].join(".");
}
A.extend(
{
isReady:false,readyList:[],ready:function()
{
if(!A.isReady)
{
A.isReady=true;
if(A.readyList)
{
A.each(A.readyList,function()
{
this.call(document,A);
}
);A.readyList=null;
}
A(document).triggerHandler("ready");

}

}

}
);var T=false;function V()
{
if(T)
{
return;
}
T=true;if(document.addEventListener)
{
document.addEventListener("DOMContentLoaded",function()
{
document.removeEventListener("DOMContentLoaded",arguments.callee,false);
A.ready();
}
,false);
}
else
{
if(document.attachEvent)
{
document.attachEvent("onreadystatechange",function()
{
if(document.readyState==="complete")
{
document.detachEvent("onreadystatechange",arguments.callee);
A.ready();
}

}
);if(document.documentElement.doScroll&&C==C.top)
{
(function()
{
if(A.isReady)
{
return;
}
try
{
document.documentElement.doScroll("left");

}
catch(e)
{
setTimeout(arguments.callee,0);return;
}
A.ready();
}
)();
}

}

}
A.event.add(C,"load",A.ready);
}
A.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(f,e)
{
A.fn[e]=function(g)
{
return g?this.bind(e,g):this.trigger(e);

}
;
}
);A(C).bind("unload",function()
{
for(var e in A.cache)
{
if(e!=1&&A.cache[e].handle)
{
A.event.remove(A.cache[e].handle.elem);

}

}

}
);(function()
{
A.support=
{

}
;var i=document.documentElement,h=document.createElement("script"),f=document.createElement("div"),j="script"+(new Date).getTime();
f.style.display="none";f.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
var k=f.getElementsByTagName("*"),g=f.getElementsByTagName("a")[0];if(!k||!k.length||!g)
{
return;
}
A.support=
{
leadingWhitespace:f.firstChild.nodeType==3,tbody:!f.getElementsByTagName("tbody").length,objectAll:!!f.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!f.getElementsByTagName("link").length,style:/red/.test(g.getAttribute("style")),hrefNormalized:g.getAttribute("href")==="/a",opacity:g.style.opacity==="0.5",cssFloat:!!g.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null
}
;
h.type="text/javascript";try
{
h.appendChild(document.createTextNode("window."+j+"=1;"));
}
catch(l)
{

}
i.insertBefore(h,i.firstChild);
if(C[j])
{
A.support.scriptEval=true;delete C[j];
}
i.removeChild(h);if(f.attachEvent&&f.fireEvent)
{
f.attachEvent("onclick",function()
{
A.support.noCloneEvent=false;
f.detachEvent("onclick",arguments.callee);
}
);f.cloneNode(true).fireEvent("onclick");
}
A(function()
{
var e=document.createElement("div");
e.style.width=e.style.paddingLeft="1px";document.body.appendChild(e);A.boxModel=A.support.boxModel=e.offsetWidth===2;
document.body.removeChild(e).style.display="none";
}
);
}
)();var J=A.support.cssFloat?"cssFloat":"styleFloat";
A.props=
{
"for":"htmlFor","class":"className","float":J,cssFloat:J,styleFloat:J,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"
}
;
A.fn.extend(
{
_load:A.fn.load,load:function(e,f,h)
{
if(typeof e!=="string")
{
return this._load(e);
}
var g=e.indexOf(" ");
if(g>=0)
{
var i=e.slice(g,e.length);e=e.slice(0,g);
}
var k="GET";if(f)
{
if(A.isFunction(f))
{
h=f;f=null;
}
else
{
if(typeof f==="object")
{
f=A.param(f);
k="POST";
}

}

}
var j=this;A.ajax(
{
url:e,type:k,dataType:"html",data:f,complete:function(l,m)
{
if(m=="success"||m=="notmodified")
{
j.html(i?A("<div/>").append(l.responseText.replace(/\x3cscript(.|\s)*?\/script>/g,"")).find(i):l.responseText);
  
}
if(h)
{
j.each(h,[l.responseText,m,l]);
}

}

}
);return this;
}
,serialize:function()
{
return A.param(this.serializeArray());
  
}
,serializeArray:function()
{
return this.map(function()
{
return this.elements?A.makeArray(this.elements):this;
  
}
).filter(function()
{
return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type));
  
}
).map(function(g,f)
{
var e=A(this).val();return e==null?null:A.isArray(e)?A.map(e,function(h,j)
{
return
{
name:f.name,value:h
}
;
  
}
):
{
name:f.name,value:e
}
;
}
).get();
}

}
);A.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(f,e)
{
A.fn[e]=function(g)
{
return this.bind(e,g);
  
}
;
}
);var Z=F();A.extend(
{
get:function(g,e,f,h)
{
if(A.isFunction(e))
{
f=e;e=null;
}
return A.ajax(
{
type:"GET",url:g,data:e,success:f,dataType:h
}
);
  
}
,getScript:function(e,f)
{
return A.get(e,null,f,"script");
}
,getJSON:function(e,f,g)
{
return A.get(e,f,g,"json");
  
}
,post:function(g,e,f,h)
{
if(A.isFunction(e))
{
f=e;e=
{

}
;
}
return A.ajax(
{
type:"POST",url:g,data:e,success:f,dataType:h
}
);
  
}
,ajaxSetup:function(e)
{
A.extend(A.ajaxSettings,e);
}
,ajaxSettings:
{
url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function()
{
return C.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
  
}
,accepts:
{
xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"
}

}
,lastModified:
																					  {
																					  
}
,ajax:function(f)
																					  {
																					  f=A.extend(true,f,A.extend(true,
																					  {
																					  
}
,A.ajaxSettings,f));
																					  var i,k=/=\?(&|$)/g,j,v,l=f.type.toUpperCase();if(f.data&&f.processData&&typeof f.data!=="string")
																					  {
																					  f.data=A.param(f.data);
																					  
}
if(f.dataType=="jsonp")
																					  {
																					  if(l=="GET")
																					  {
																					  if(!f.url.match(k))
																					  {
																					  f.url+=(f.url.match(/\?/)?"&":"?")+(f.jsonp||"callback")+"=?";
																					  
}

}
else
																					  {
																					  if(!f.data||!f.data.match(k))
																					  {
																					  f.data=(f.data?f.data+"&":"")+(f.jsonp||"callback")+"=?";
}

}
f.dataType="json";
																					  
}
if(f.dataType=="json"&&(f.data&&f.data.match(k)||f.url.match(k)))
																					  {
																					  i="jsonp"+Z++;if(f.data)
																					  {
																					  f.data=(f.data+"").replace(k,"="+i+"$1");
																					  
}
f.url=f.url.replace(k,"="+i+"$1");f.dataType="script";C[i]=function(s)
																					  {
																					  v=s;p();r();C[i]=B;try
																					  {
																					  delete C[i];
																					  
}
catch(z)
																					  {
																					  
}
if(n)
																					  {
																					  n.removeChild(h);
}

}
;
}
if(f.dataType=="script"&&f.cache==null)
																					  {
																					  f.cache=false;
}
if(f.cache===false&&l=="GET")
																					  {
																					  var w=F();
																					  var y=f.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+w+"$2");f.url=y+((y==f.url)?(f.url.match(/\?/)?"&":"?")+"_="+w:"");
																					  
}
if(f.data&&l=="GET")
																					  {
																					  f.url+=(f.url.match(/\?/)?"&":"?")+f.data;f.data=null;
}
if(f.global&&!A.active++)
																					  {
																					  A.event.trigger("ajaxStart");
																					  
}


var o=/^(\w+:)?\/\/([^\/?#]+)/.exec(f.url);if(f.dataType=="script"&&l=="GET"&&o&&(o[1]&&o[1]!=location.protocol||o[2]!=location.host))
																					  {
																					  var n=document.getElementsByTagName("head")[0];
																					  var h=document.createElement("script");h.src=f.url;if(f.scriptCharset)
																					  {
																					  h.charset=f.scriptCharset;
}
if(!i)
																					  {
																					  var x=false;
																					  h.onload=h.onreadystatechange=function()
																					  {
																					  if(!x&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"))
																					  {
																					  x=true;
																					  p();r();h.onload=h.onreadystatechange=null;n.removeChild(h);
}

}
;
}
n.appendChild(h);return B;
}
var q=false;
																					  var g=f.xhr();if(f.username)
																					  {
																					  g.open(l,f.url,f.async,f.username,f.password);
}
else
																					  {
																					  g.open(l,f.url,f.async);
																					  
}
try
																					  {
																					  if(f.data)
																					  {
																					  g.setRequestHeader("Content-Type",f.contentType);
}
if(f.ifModified)
																					  {
																					  g.setRequestHeader("If-Modified-Since",A.lastModified[f.url]||"Thu, 01 Jan 1970 00:00:00 GMT");
																					  
}
g.setRequestHeader("X-Requested-With","XMLHttpRequest");g.setRequestHeader("Accept",f.dataType&&f.accepts[f.dataType]?f.accepts[f.dataType]+", */*":f.accepts._default);

}
catch(u)
{

}
if(f.beforeSend&&f.beforeSend(g,f)===false)
{
if(f.global&&!--A.active)
{
A.event.trigger("ajaxStop");

}
g.abort();return false;
}
if(f.global)
{
A.event.trigger("ajaxSend",[g,f]);
}
var t=function(s)
{
if(g.readyState==0)
{
if(m)
{
clearInterval(m);
m=null;if(f.global&&!--A.active)
{
A.event.trigger("ajaxStop");
}

}

}
else
{
if(!q&&g&&(g.readyState==4||s=="timeout"))
{
q=true;
if(m)
{
clearInterval(m);m=null;
}
j=s=="timeout"?"timeout":!A.httpSuccess(g)?"error":f.ifModified&&A.httpNotModified(g,f.url)?"notmodified":"success";
if(j=="success")
{
try
{
v=A.httpData(g,f.dataType,f);
}
catch(AA)
{
j="parsererror";
}

}
if(j=="success")
{
var z;
try
{
z=g.getResponseHeader("Last-Modified");
}
catch(AA)
{

}
if(f.ifModified&&z)
{
A.lastModified[f.url]=z;
}
if(!i)
{
p();

}

}
else
{
A.handleError(f,g,j);
}
r();if(s)
{
g.abort();
}
if(f.async)
{
g=null;
}

}

}

}
;if(f.async)
{
var m=setInterval(t,13);
if(f.timeout>0)
{
setTimeout(function()
{
if(g&&!q)
{
t("timeout");
}

}
,f.timeout);
}

}
try
{
g.send(f.data);
}
catch(u)
{
A.handleError(f,g,null,u);

}
if(!f.async)
{
t();
}
function p()
{
if(f.success)
{
f.success(v,j);
}
if(f.global)
{
A.event.trigger("ajaxSuccess",[g,f]);

}

}
function r()
{
if(f.complete)
{
f.complete(g,j);
}
if(f.global)
{
A.event.trigger("ajaxComplete",[g,f]);
}
if(f.global&&!--A.active)
{
A.event.trigger("ajaxStop");

}

}
return g;
}
,handleError:function(f,h,i,g)
{
if(f.error)
{
f.error(h,i,g);
}
if(f.global)
{
A.event.trigger("ajaxError",[h,f,g]);

}

}
,active:0,httpSuccess:function(f)
{
try
{
return !f.status&&location.protocol=="file:"||(f.status>=200&&f.status<300)||f.status==304||f.status==1223;

}
catch(g)
{

}
return false;
}
,httpNotModified:function(f,g)
{
try
{
var i=f.getResponseHeader("Last-Modified");
return f.status==304||i==A.lastModified[g];
}
catch(h)
{

}
return false;
}
,httpData:function(h,f,g)
{
var j=h.getResponseHeader("content-type"),i=f=="xml"||!f&&j&&j.indexOf("xml")>=0,e=i?h.responseXML:h.responseText;
if(i&&e.documentElement.tagName=="parsererror")
{
throw"parsererror";
}
if(g&&g.dataFilter)
{
e=g.dataFilter(e,f);

}
if(typeof e==="string")
{
if(f=="script")
{
A.globalEval(e);
}
if(f=="json")
{
e=C["eval"]("("+e+")");
}

}
return e;

}
,param:function(e)
{
var g=[];function h(i,j)
{
g[g.length]=encodeURIComponent(i)+"="+encodeURIComponent(j);

}
if(A.isArray(e)||e.jquery)
{
A.each(e,function()
{
h(this.name,this.value);
}
);
}
else
{
for(var f in e)
{
if(A.isArray(e[f]))
{
A.each(e[f],function()
{
h(f,this);

}
);
}
else
{
h(f,A.isFunction(e[f])?e[f]():e[f]);
}

}

}
return g.join("&").replace(/%20/g,"+");
}

}
);var L=
{

}
,I,P=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
function G(g,f)
{
var e=
{

}
;A.each(P.concat.apply([],P.slice(0,f)),function()
{
e[this]=g;
}
);return e;
}
A.fn.extend(
{
show:function(k,n)
{
if(k)
{
return this.animate(G("show",3),k,n);

}
else
{
for(var e=0,h=this.length;e<h;e++)
{
var m=A.data(this[e],"olddisplay");this[e].style.display=m||"";
if(A.css(this[e],"display")==="none")
{
var g=this[e].tagName,f;if(L[g])
{
f=L[g];
}
else
{
var j=A("<"+g+" />").appendTo("body");
f=j.css("display");if(f==="none")
{
f="block";
}
j.remove();L[g]=f;
}
A.data(this[e],"olddisplay",f);
}

}
for(var e=0,h=this.length;
e<h;e++)
{
this[e].style.display=A.data(this[e],"olddisplay")||"";
}
return this;
}

}
,hide:function(h,j)
{
if(h)
{
return this.animate(G("hide",3),h,j);

}
else
{
for(var e=0,g=this.length;e<g;e++)
{
var f=A.data(this[e],"olddisplay");if(!f&&f!=="none")
{
A.data(this[e],"olddisplay",A.css(this[e],"display"));

}

}
for(var e=0,g=this.length;e<g;e++)
{
this[e].style.display="none";
}
return this;
}

}
,_toggle:A.fn.toggle,toggle:function(e,g)
{
var f=typeof e==="boolean";
return A.isFunction(e)&&A.isFunction(g)?this._toggle.apply(this,arguments):e==null||f?this.each(function()
{
var h=f?e:A(this).is(":hidden");
A(this)[h?"show":"hide"]();
}
):this.animate(G("toggle",3),e,g);
}
,fadeTo:function(e,g,f)
{
return this.animate(
{
opacity:g
}
,e,f);

}
,animate:function(e,g,i,h)
{
var f=A.speed(g,i,h);return this[f.queue===false?"each":"queue"](function()
{
var j=A.extend(
{

}
,f),k,m=this.nodeType==1&&A(this).is(":hidden"),l=this;
for(k in e)
{
if(e[k]=="hide"&&m||e[k]=="show"&&!m)
{
return j.complete.call(this);
}
if((k=="height"||k=="width")&&this.style)
{
j.display=A.css(this,"display");
j.overflow=this.style.overflow;
}

}
if(j.overflow!=null)
{
this.style.overflow="hidden";
}
j.curAnim=A.extend(
{

}
,e);
A.each(e,function(t,r)
{
var q=new A.fx(l,j,t);if(/toggle|show|hide/.test(r))
{
q[r=="toggle"?m?"show":"hide":r](e);

}
else
{
var p=r.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),n=q.cur(true)||0;if(p)
{
var o=parseFloat(p[2]),s=p[3]||"px";
if(s!="px")
{
l.style[t]=(o||1)+s;n=((o||1)/q.cur(true))*n;l.style[t]=n+s;
}
if(p[1])
{
o=((p[1]=="-="?-1:1)*o)+n;

}
q.custom(n,o,s);
}
else
{
q.custom(n,r,"");
}

}

}
);return true;
}
);
}
,stop:function(g,f)
{
var e=A.timers;if(g)
{
this.queue([]);

}
this.each(function()
{
for(var h=e.length-1;h>=0;h--)
{
if(e[h].elem==this)
{
if(f)
{
e[h](true);
}
e.splice(h,1);

}

}

}
);if(!f)
{
this.dequeue();
}
return this;
}

}
);A.each(
{
slideDown:G("show",1),slideUp:G("hide",1),slideToggle:G("toggle",1),fadeIn:
{
opacity:"show"
}
,fadeOut:
{
opacity:"hide"
}

}
,function(e,f)
{
A.fn[e]=function(g,h)
{
return this.animate(f,g,h);

}
;
}
);A.extend(
{
speed:function(f,g,h)
{
var e=typeof f==="object"?f:
{
complete:h||!h&&g||A.isFunction(f)&&f,duration:f,easing:h&&g||g&&!A.isFunction(g)&&g
}
;
e.duration=A.fx.off?0:typeof e.duration==="number"?e.duration:A.fx.speeds[e.duration]||A.fx.speeds._default;
e.old=e.complete;e.complete=function()
{
if(e.queue!==false)
{
A(this).dequeue();
}
if(A.isFunction(e.old))
{
e.old.call(this);

}

}
;return e;
}
,easing:
{
linear:function(g,h,e,f)
{
return e+f*g;
}
,swing:function(g,h,e,f)
{
return((-Math.cos(g*Math.PI)/2)+0.5)*f+e;

}

}
,timers:[],fx:function(f,e,g)
{
this.options=e;this.elem=f;this.prop=g;if(!e.orig)
{
e.orig=
{

}
;
}

}

}
);A.fx.prototype=
{
update:function()
{
if(this.options.step)
{
this.options.step.call(this.elem,this.now,this);

}
(A.fx.step[this.prop]||A.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style)
{
this.elem.style.display="block";

}

}
,cur:function(f)
{
if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))
{
return this.elem[this.prop];

}
var e=parseFloat(A.css(this.elem,this.prop,f));return e&&e>-10000?e:parseFloat(A.curCSS(this.elem,this.prop))||0;

}
,custom:function(i,h,g)
{
this.startTime=F();this.start=i;this.end=h;this.unit=g||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var f=this;function e(j)
{
return f.step(j);
}
e.elem=this.elem;if(e()&&A.timers.push(e)&&!I)
{
I=setInterval(function()
{
var k=A.timers;
for(var j=0;j<k.length;j++)
{
if(!k[j]())
{
k.splice(j--,1);
}

}
if(!k.length)
{
clearInterval(I);I=B;
}

}
,13);
}

}
,show:function()
{
this.options.orig[this.prop]=A.attr(this.elem.style,this.prop);
this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());A(this.elem).show();

}
,hide:function()
{
this.options.orig[this.prop]=A.attr(this.elem.style,this.prop);this.options.hide=true;
this.custom(this.cur(),0);
}
,step:function(k)
{
var f=F();if(k||f>=this.options.duration+this.startTime)
{
this.now=this.end;
this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var e=true;for(var j in this.options.curAnim)
{
if(this.options.curAnim[j]!==true)
{
e=false;

}

}
if(e)
{
if(this.options.display!=null)
{
this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;
if(A.css(this.elem,"display")=="none")
{
this.elem.style.display="block";
}

}
if(this.options.hide)
{
A(this.elem).hide();

}
if(this.options.hide||this.options.show)
{
for(var g in this.options.curAnim)
{
A.attr(this.elem.style,g,this.options.orig[g]);

}

}
this.options.complete.call(this.elem);
}
return false;
}
else
{
var h=f-this.startTime;this.state=h/this.options.duration;
this.pos=A.easing[this.options.easing||(A.easing.swing?"swing":"linear")](this.state,h,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);this.update();
}
return true;
}

}
;A.extend(A.fx,
{
speeds:
{
slow:600,fast:200,_default:400
}
,step:
{
opacity:function(e)
{
A.attr(e.elem.style,"opacity",e.now);

}
,_default:function(e)
{
if(e.elem.style&&e.elem.style[e.prop]!=null)
{
e.elem.style[e.prop]=e.now+e.unit;

}
else
{
e.elem[e.prop]=e.now;
}

}

}

}
);if(document.documentElement.getBoundingClientRect)
{
A.fn.offset=function()
{
if(!this[0])
{
return
{
top:0,left:0
}
;

}
if(this[0]===this[0].ownerDocument.body)
{
return A.offset.bodyOffset(this[0]);
}
var g=this[0].getBoundingClientRect(),h=this[0].ownerDocument,f=h.body,e=h.documentElement,l=e.clientTop||f.clientTop||0,k=e.clientLeft||f.clientLeft||0,j=g.top+(self.pageYOffset||A.boxModel&&e.scrollTop||f.scrollTop)-l,i=g.left+(self.pageXOffset||A.boxModel&&e.scrollLeft||f.scrollLeft)-k;
return
{
top:j,left:i
}
;
}
;
}
else
{
A.fn.offset=function()
{
if(!this[0])
{
return
{
top:0,left:0
}
;
}
if(this[0]===this[0].ownerDocument.body)
{
return A.offset.bodyOffset(this[0]);

}
A.offset.initialized||A.offset.initialize();var e=this[0],k=e.offsetParent,o=e,m=e.ownerDocument,g,l=m.documentElement,i=m.body,n=m.defaultView,j=n.getComputedStyle(e,null),h=e.offsetTop,f=e.offsetLeft;
while((e=e.parentNode)&&e!==i&&e!==l)
{
g=n.getComputedStyle(e,null);h-=e.scrollTop,f-=e.scrollLeft;if(e===k)
{
h+=e.offsetTop,f+=e.offsetLeft;
if(A.offset.doesNotAddBorder&&!(A.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(e.tagName)))
{
h+=parseInt(g.borderTopWidth,10)||0,f+=parseInt(g.borderLeftWidth,10)||0;

}
o=k,k=e.offsetParent;
}
if(A.offset.subtractsBorderForOverflowNotVisible&&g.overflow!=="visible")
{
h+=parseInt(g.borderTopWidth,10)||0,f+=parseInt(g.borderLeftWidth,10)||0;

}
j=g;
}
if(j.position==="relative"||j.position==="static")
{
h+=i.offsetTop,f+=i.offsetLeft;
}
if(j.position==="fixed")
{
h+=Math.max(l.scrollTop,i.scrollTop),f+=Math.max(l.scrollLeft,i.scrollLeft);

}
return
{
top:h,left:f
}
;
}
;
}
A.offset=
{
initialize:function()
{
if(this.initialized)
{
return;
}
var e=document.body,f=document.createElement("div"),g,i,n,k,j,h,l=e.style.marginTop,m='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
j=
{
position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"
}
;for(h in j)
{
f.style[h]=j[h];

}
f.innerHTML=m;e.insertBefore(f,e.firstChild);g=f.firstChild,i=g.firstChild,k=g.nextSibling.firstChild.firstChild;
this.doesNotAddBorder=(i.offsetTop!==5);this.doesAddBorderForTableAndCells=(k.offsetTop===5);g.style.overflow="hidden",g.style.position="relative";
this.subtractsBorderForOverflowNotVisible=(i.offsetTop===-5);e.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(e.offsetTop===0);
e.style.marginTop=l;e.removeChild(f);this.initialized=true;
}
,bodyOffset:function(e)
{
A.offset.initialized||A.offset.initialize();
var g=e.offsetTop,f=e.offsetLeft;if(A.offset.doesNotIncludeMarginInBodyOffset)
{
g+=parseInt(A.curCSS(e,"marginTop",true),10)||0,f+=parseInt(A.curCSS(e,"marginLeft",true),10)||0;

}
return
{
top:g,left:f
}
;
}

}
;A.fn.extend(
{
position:function()
{
var j=0,i=0,h;if(this[0])
{
var f=this.offsetParent(),g=this.offset(),e=/^body|html$/i.test(f[0].tagName)?
{
top:0,left:0
}
:f.offset();
g.top-=H(this,"marginTop");g.left-=H(this,"marginLeft");e.top+=H(f,"borderTopWidth");e.left+=H(f,"borderLeftWidth");
h=
{
top:g.top-e.top,left:g.left-e.left
}
;
}
return h;
}
,offsetParent:function()
{
var e=this[0].offsetParent||document.body;
while(e&&(!/^body|html$/i.test(e.tagName)&&A.css(e,"position")=="static"))
{
e=e.offsetParent;
}
return A(e);

}

}
);A.each(["Left","Top"],function(f,g)
{
var e="scroll"+g;A.fn[e]=function(h)
{
if(!this[0])
{
return null;

}
return h!==B?this.each(function()
{
this==C||this==document?C.scrollTo(!f?h:A(C).scrollLeft(),f?h:A(C).scrollTop()):this[e]=h;

}
):this[0]==C||this[0]==document?self[f?"pageYOffset":"pageXOffset"]||A.boxModel&&document.documentElement[e]||document.body[e]:this[0][e];

}
;
}
);A.each(["Height","Width"],function(h,e)
{
var j=h?"Left":"Top",k=h?"Right":"Bottom",g=e.toLowerCase();
A.fn["inner"+e]=function()
{
return this[0]?A.css(this[0],g,false,"padding"):null;
}
;A.fn["outer"+e]=function(i)
{
return this[0]?A.css(this[0],g,false,i?"margin":"border"):null;

}
;var f=e.toLowerCase();A.fn[f]=function(i)
{
return this[0]==C?document.compatMode=="CSS1Compat"&&document.documentElement["client"+e]||document.body["client"+e]:this[0]==document?Math.max(document.documentElement["client"+e],document.body["scroll"+e],document.documentElement["scroll"+e],document.body["offset"+e],document.documentElement["offset"+e]):i===B?(this.length?A.css(this[0],f):null):this.css(f,typeof i==="string"?i:i+"px");

}
;
}
);
}
)();if(!this.JSON)
{
JSON=
{

}
;
}
(function()
{
function L(A)
{
return A<10?"0"+A:A;
}
if(typeof Date.prototype.toJSON!=="function")
{
Date.prototype.toJSON=function(A)
{
return this.getUTCFullYear()+"-"+L(this.getUTCMonth()+1)+"-"+L(this.getUTCDate())+"T"+L(this.getUTCHours())+":"+L(this.getUTCMinutes())+":"+L(this.getUTCSeconds())+"Z";

}
;String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(A)
{
return this.valueOf();

}
;
}
var P=/[\u0000-\u001f\u007f-\uffff]/g,O=/[\\\"\u0000-\u001f\u007f-\uffff]/g,J,M,R=
{
"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"
}
,K;
function Q(A)
{
O.lastIndex=0;return O.test(A)?'"'+A.replace(O,function(C)
{
var B=R[C];if(typeof B==="string")
{
return B;

}
return"\\u"+("0000"+C.charCodeAt(0).toString(16)).slice(-4);
}
)+'"':'"'+A+'"';
}
function N(H,I)
{
var D,E,B,G,F=J,C,A=I[H];
if(A&&typeof A==="object"&&typeof A.toJSON==="function")
{
A=A.toJSON(H);
}
if(typeof K==="function")
{
A=K.call(I,H,A);

}
switch(typeof A)
{
case"string":return Q(A);case"number":return isFinite(A)?String(A):"null";case"boolean":case"null":return String(A);
case"object":if(!A)
{
return"null";
}
J+=M;C=[];if(typeof A.length==="number"&&!A.propertyIsEnumerable("length"))
{
G=A.length;
for(D=0;D<G;D+=1)
{
C[D]=N(D,A)||"null";
}
B=C.length===0?"[]":J?"[\n"+J+C.join(",\n"+J)+"\n"+F+"]":"["+C.join(",")+"]";
J=F;return B;
}
if(K&&typeof K==="object")
{
G=K.length;for(D=0;D<G;D+=1)
{
E=K[D];if(typeof E==="string")
{
B=N(E,A);
if(B)
{
C.push(Q(E)+(J?": ":":")+B);
}

}

}

}
else
{
for(E in A)
{
if(Object.hasOwnProperty.call(A,E))
{
B=N(E,A);if(B)
{
C.push(Q(E)+(J?": ":":")+B);

}

}

}

}
B=C.length===0?"
																								 {

}
":J?"
{
\n"+J+C.join(",\n"+J)+"\n"+F+"
}
":"
{
"+C.join(",")+"
}
";J=F;return B;
}

}
if(typeof JSON.stringify!=="function")
{
JSON.stringify=function(D,A,B)
{
var C;
J="";M="";if(typeof B==="number")
{
for(C=0;C<B;C+=1)
{
M+=" ";
}

}
else
{
if(typeof B==="string")
{
M=B;
}

}
K=A;if(A&&typeof A!=="function"&&(typeof A!=="object"||typeof A.length!=="number"))
{
throw new Error("JSON.stringify");

}
return N("",
{
"":D
}
);
}
;
}
if(typeof JSON.parse!=="function")
{
JSON.parse=function(A,C)
{
var B;function D(H,I)
{
var F,G,E=H[I];
if(E&&typeof E==="object")
{
for(F in E)
{
if(Object.hasOwnProperty.call(E,F))
{
G=D(E,F);if(G!==undefined)
{
E[F]=G;

}
else
{
delete E[F];
}

}

}

}
return C.call(H,I,E);
}
P.lastIndex=0;if(P.test(A))
{
A=A.replace(P,function(E)
{
return"\\u"+("0000"+E.charCodeAt(0).toString(16)).slice(-4);

}
);
}
if(/^[\],:
{

}
\s]*$/.test(A.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]
{
4
}
)/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))
		       {
			   B=window["eval"]("("+A+")");
			   return typeof C==="function"?D(
							  {
							      "":B
}
,""):B;
}
throw new SyntaxError("JSON.parse");
}
;
}

}
)();var colorutils=
							      {
							      
}
;
colorutils.css2triple=function(F)
{
    var E=colorutils.css2sixhex(F);function D(A)
    {
	return Number("0x"+A)/255;
    
}
return[D(E.substr(0,2)),D(E.substr(2,2)),D(E.substr(4,2))];
}
;colorutils.css2sixhex=function(J)
    {
	var F=/[0-9a-fA-F]+/.exec(J)[0];
	if(F.length!=6)
	    {
		var H=F.charAt(0);var I=F.charAt(1);var G=F.charAt(2);F=H+H+I+I+G+G;
}
return F;
}
;colorutils.triple2css=function(D)
		{
		    function C(A)
		    {
			var B=colorutils.clamp(Math.round(A*255),0,255);
			return("0"+B.toString(16)).slice(-2);
}
return"#"+C(D[0])+C(D[1])+C(D[2]);
}
;colorutils.clamp=function(D,E,F)
			{
			    return D<E?E:(D>F?F:D);
			
}
;colorutils.min3=function(E,F,D)
			{
			    return(E<F)?(E<D?E:D):(F<D?F:D);
}
;colorutils.max3=function(E,F,D)
			    {
				return(E>F)?(E>D?E:D):(F>D?F:D);
			    
}
;colorutils.colorMin=function(B)
			    {
				return colorutils.min3(B[0],B[1],B[2]);
}
;colorutils.colorMax=function(B)
				{
				    return colorutils.max3(B[0],B[1],B[2]);
				
}
;colorutils.scale=function(F,D,E)
				{
				    return colorutils.clamp(D+F*(E-D),0,1);
}
;colorutils.unscale=function(F,D,E)
				    {
					return colorutils.clamp((F-D)/(E-D),0,1);
				    
}
;colorutils.scaleColor=function(E,F,D)
				    {
					return[colorutils.scale(E[0],F,D),colorutils.scale(E[1],F,D),colorutils.scale(E[2],F,D)];
				    
}
;colorutils.unscaleColor=function(E,F,D)
				    {
					return[colorutils.unscale(E[0],F,D),colorutils.unscale(E[1],F,D),colorutils.unscale(E[2],F,D)];
				    
}
;colorutils.luminosity=function(B)
				    {
					return B[0]*0.3+B[1]*0.59+B[2]*0.11;
}
;colorutils.saturate=function(D)
					{
					    var E=colorutils.colorMin(D);
					    var F=colorutils.colorMax(D);if(F-E<=0)
									     {
										 return[1,1,1];
}
return colorutils.unscaleColor(D,E,F);
}
;colorutils.blend=function(E,F,D)
										 {
										     return[colorutils.scale(D,E[0],F[0]),colorutils.scale(D,E[1],F[1]),colorutils.scale(D,E[2],F[2])];
										 
}
;function makeDraggable(D,C)
										 {
										     D.each(function()
											    {
												var K=$(this);var B=
														  {
														  
}
;var A=false;function L(E)
												{
												    if(A)
													{
													    return;
													
}
A=true;if(C("dragstart",E,B)!==false)
														    {
															$(document).bind("mousemove",I);$(document).bind("mouseup",J);
														    
}
E.preventDefault();return false;
}
function I(E)
												{
												    if(!A)
													{
													    return;
}
C("dragupdate",E,B);E.preventDefault();
												    return false;
}
function J(E)
												{
												    if(!A)
													{
													    return;
}
A=false;try
																{
																    C("dragend",E,B);
}
finally
													{
													    $(document).unbind("mousemove",I);
													    $(document).unbind("mouseup",J);E.preventDefault();
}
return false;
}
K.bind("mousedown",L);
}
);
}
function makeResizableVPane(I,J,F,G,H)
													    {
														if(G===undefined)
														    {
															G=0;
														    
}
if(H===undefined)
															 {
															     H=0;
}
makeDraggable($(J),function(P,O,A)
																		{
																		    if(P=="dragstart")
																			{
																			    A.startY=O.pageY;A.topHeight=$(I).height();
																			    A.bottomHeight=$(F).height();A.minTop=G;A.maxTop=(A.topHeight+A.bottomHeight)-H;
}
else
																			{
																			    if(P=="dragupdate")
																				{
																				    var D=O.pageY-A.startY;
																				    var B=A.topHeight+D;if(B<A.minTop)
																							    {
																								B=A.minTop;
}
if(B>A.maxTop)
																										{
																										    B=A.maxTop;
}
D=B-A.topHeight;var E=A.bottomHeight-D;
																				    var C=$(J).height();var N=B+C+E;B=100*B/N;C=100*C/N;E=100*E/N;$(I).css("bottom","auto");$(I).css("height",B+"%");
																				    $(J).css("top",B+"%");$(F).css("top",(B+C)+"%");$(F).css("height","auto");
}

}

}
);
}
function makeResizableHPane(I,K,J,L,H,N,M)
																				    {
																					if(L===undefined)
																					    {
																						L=0;
																					    
}
if(H===undefined)
																						 {
																						     H=0;
}
makeDraggable($(K),function(F,G,A)
																									{
																									    if(F=="dragstart")
																										{
																										    A.startX=G.pageX;A.leftWidth=$(I).width();
																										    A.rightWidth=$(J).width();A.minLeft=L;A.maxLeft=(A.leftWidth+A.rightWidth)-H;
}
else
																										{
																										    if(F=="dragend"||F=="dragupdate")
																											{
																											    var D=G.pageX-A.startX;
																											    var B=A.leftWidth+D;if(B<A.minLeft)
																														    {
																															B=A.minLeft;
}
if(B>A.maxLeft)
																																	 {
																																	     B=A.maxLeft;
}
D=B-A.leftWidth;var C=A.rightWidth-D;
																											    newSepWidth=N;if(newSepWidth==undefined)
																													      {
																														  newSepWidth=$(K).width();
}
newSepOffset=M;if(newSepOffset==undefined)
																																			       {
																																				   newSepOffset=0;
																																			       
}
if(D==0)
																																				    {
																																					if(C!=H||A.lastRightWidth==undefined)
																																					    {
																																						A.lastRightWidth=C;C=H;
}
else
																																					    {
																																						C=A.lastRightWidth;A.lastRightWidth=H;
																																					    
}
D=A.rightWidth-C;B=D+A.leftWidth;
}
var E=B+newSepWidth+C;B=100*B/E;newSepWidth=100*newSepWidth/E;newSepOffset=100*newSepOffset/E;
																											    C=100*C/E;$(I).css("right","auto");$(I).css("width",B+"%");$(K).css("left",(B+newSepOffset)+"%");$(J).css("left",(B+newSepWidth)+"%");
																											    $(J).css("width","auto");
}

}

}
);
}
var padutils=
																											    {
																												escapeHtml:function(B)
																												{
																												    return String(B).replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
																												
}
,uniqueId:function()
																												{
																												    function B(D,A)
																												    {
																													return(Array(A+1).join("0")+Number(D).toString(35)).slice(-A);
}
return[pad.getClientIp(),B(+new Date,7),B(Math.floor(Math.random()*1000000000),4)].join(".");
																												
}
,uaDisplay:function(H)
																												{
																												    var G;function I(A)
																												    {
																													var B=16;A=A.replace(/[^a-zA-Z0-9\.]/g,"");if(A.length>B)
																																		       {
																																			   A=A.substr(0,B);
																																		       
}
return A;
}
function J(B)
																												    {
																													var A=H.match(RegExp(B+"\\/([\\d\\.]+)"));if(A&&A.length>1)
																																		      {
																																			  return I(B+A[1]);
																																		      
}
return null;
}
if(J("Firefox"))
																																					{
																																					    return J("Firefox");
}
G=H.match(/compatible; ([^;]+);/);if(G&&G.length>1)
																																												       {
																																													   return I(G[1]);
																																												       
}
if(H.match(/\(iPhone;/))
																																													    {
																																														return"iPhone";
}
if(J("Chrome"))
																																																    {
																																																	return J("Chrome");
}
G=H.match(/Safari\/[\d\.]+/);
																												    if(G)
																													{
																													    var K="?";G=H.match(/Version\/([\d\.]+)/);if(G&&G.length>1)
																																			  {
																																			      K=G[1];
}
return I("Safari"+K);
}
var L=H.split(" ")[0];
																												    return I(L);
}
,binarySearch:function(F,H)
																												{
																												    if(F<1)
																													{
																													    return 0;
}
if(H(0))
																															  {
																															      return 0;
}
if(!H(F-1))
																																	    {
																																		return F;
}
var I=0;
																												    var G=F-1;while((G-I)>1)
																														  {
																														      var J=Math.floor((I+G)/2);if(H(J))
																																		    {
																																			G=J;
}
else
																															  {
																															      I=J;
}

}
return G;
}
,simpleDateTime:function(M)
																												{
																												    var H=new Date(+M);
																												    var N=(["Sun","Mon","Tue","Wed","Thu","Fri","Sat"])[H.getDay()];var J=(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"])[H.getMonth()];
																												    var K=H.getDate();var L=H.getFullYear();var I=H.getHours()+":"+("0"+H.getMinutes()).slice(-2);return N+" "+J+" "+K+" "+L+" "+I;
																												
}
,findURLs:function(H)
																												{
																												    var I=/[\u0030-\u0039\u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u1FFF\u3040-\u9FFF\uF900-\uFDFF\uFE70-\uFEFE\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFDC]/;
																												    var F=new RegExp("("+/[-:@a-zA-Z0-9_.,~%+\/?=&#;()$]/.source+"|"+I.source+")");var G=new RegExp(/(?:(?:https?|s?ftp|ftps|file|smb|afp|nfs|(x-)?man|gopher|txmt):\/\/|mailto:)/.source+F.source+"*(?![:.,;])"+F.source,"g");
																												    function J(C)
																												    {
																													G.lastIndex=0;var A=null;var B;while((B=G.exec(C)))
																																	   {
																																	       A=(A||[]);var D=B.index;var E=B[0];
																																	       A.push([D,E]);
}
return A;
}
return J(H);
}
,escapeHtmlWithClickableLinks:function(N,Q)
																												{
																												    var O=0;var L=[];var J=padutils.findURLs(N);
																												    function M(A)
																												    {
																													if(A>O)
																													    {
																														L.push(padutils.escapeHtml(N.substring(O,A)));O=A;
}

}
if(J)
																																					{
																																					    for(var K=0;K<J.length;
																																						K++)
																																						{
																																						    var P=J[K][0];var R=J[K][1];M(P);L.push("<a ",(Q?'target="'+Q+'" ':""),'href="',R.replace(/\"/g,"&quot;"),'">');
																																						    M(P+R.length);L.push("</a>");
}

}
M(N.length);return L.join("");
}
,bindEnterAndEscape:function(F,D,E)
																												{
																												    if(D)
																													{
																													    F.keypress(function(A)
																												{
																												    if(A.which==13)
																													{
																													    D(A);
																													
}

}
);
}
if(E)
																														 {
																														     F.keydown(function(A)
																												{
																												    if(A.which==27)
																													{
																													    E(A);
}

}
);
}

}
,timediff:function(C)
																												{
																												    function D(A,B)
																												    {
																													A=Math.round(A);
																													return(""+A+" "+B+(A!=1?"s":"")+" ago");
}
C=Math.max(0,(+(new Date)-(+C)-pad.clientTimeOffset)/1000);if(C<60)
																																										{
																																										    return D(C,"second");
																																										
}
C/=60;if(C<60)
																																											   {
																																											       return D(C,"minute");
}
C/=60;if(C<24)
																																															       {
																																																   return D(C,"hour");
}
C/=24;return D(C,"day");
}
,makeAnimationScheduler:function(I,J,F)
																												{
																												    if(F===undefined)
																													{
																													    F=1;
																													
}
var G=null;function H()
																												    {
																													if(!G)
																													    {
																														G=window.setTimeout(function()
																																    {
																																	G=null;var B=F;var A=true;while(A&&B>0)
																																				      {
																																					  A=I();
																																					  B--;
}
if(A)
																																						   {
																																						       H();
}

}
,J*F);
}

}
return
																												    {
																													scheduleAnimation:H
}
;
}
,makeShowHideAnimator:function(N,X,V,T)
																												{
																												    var M=(X?0:-2);
																												    var P=1000/V;var Q=P/T;var O=padutils.makeAnimationScheduler(U,P).scheduleAnimation;function W()
																												    {
																													M=-1;
																													N(M);O();
}
function S()
																												    {
																													if(M<-1)
																													    {
																														M=-1;
}
else
																													    {
																														if(M<=0)
																														    {
																															M=M;
}
else
																														    {
																															M=Math.max(-1,Math.min(0,-M));
}

}
N(M);O();
																												    
}
function R()
																												    {
																													if(M>=-1&&M<=0)
																													    {
																														M=0.000001;O();
}

}
function U()
																												    {
																													if(M<-1||M==0)
																													    {
																														return false;
}
else
																													    {
																														if(M<0)
																														    {
																															M+=Q;
																															if(M>=0)
																															    {
																																M=0;N(M);return false;
}
else
																															    {
																																N(M);return true;
}

}
else
																														    {
																															if(M>0)
																															    {
																																M+=Q;if(M>=1)
																																	 {
																																	     M=1;N(M);M=-2;return false;
																																	 
}
else
																																    {
																																	N(M);return true;
}

}

}

}

}
return
																												    {
																													show:W,hide:R,quickShow:S
}
;
}
,_nextActionId:1,uncanceledActions:
																												{
																												
}
,getCancellableAction:function(F,H)
																												{
																												    var E=padutils.uncanceledActions[F];
																												    if(!E)
																													{
																													    E=
																														{
																														
}
;padutils.uncanceledActions[F]=E;
}
var G=(padutils._nextActionId++);E[G]=true;return function()
																												    {
																													var A=padutils.uncanceledActions[F];
																													if(A&&A[G])
																													    {
																														H();
}

}
;
}
,cancelActions:function(C)
																												{
																												    var D=padutils.uncanceledActions[C];if(D)
																																	    {
																																		delete padutils.uncanceledActions[C];
																																	    
}

}
,makeFieldLabeledWhenEmpty:function(D,F)
																												{
																												    D=$(D);function E()
																												    {
																													D.addClass("editempty");D.val(F);
}
D.focus(function()
																												{
																												    if(D.hasClass("editempty"))
																													{
																													    D.val("");
																													
}
D.removeClass("editempty");
}
);D.blur(function()
																												{
																												    if(!D.val())
																													{
																													    E();
}

}
);return
																												    {
																													clear:E
}
;
}
,getCheckbox:function(B)
																												{
																												    return $(B).is(":checked");
																												
}
,setCheckbox:function(C,D)
																												{
																												    if(D)
																													{
																													    $(C).attr("checked","checked");
}
else
																													{
																													    $(C).removeAttr("checked");
}

}
,bindCheckboxChange:function(D,C)
																												{
																												    $(D).bind("click change",C);
																												
}
,encodeUserId:function(B)
																												{
																												    return B.replace(/[^a-y0-9]/g,function(A)
																												{
																												    if(A==".")
																													{
																													    return"-";
}
return"z"+A.charCodeAt(0)+"z";
																												
}
);
}
,decodeUserId:function(B)
																												{
																												    return B.replace(/[a-y0-9]+|-|z.+?z/g,function(A)
																												{
																												    if(A=="-")
																													{
																													    return".";
																													
}
else
																													{
																													    if(A.charAt(0)=="z")
																														{
																														    return String.fromCharCode(Number(A.slice(1,-1)));
}
else
																														{
																														    return A;
}

}

}
);
}

}
;var padcookie=(function()
																																		    {
																																			function M()
																																			{
																																			    if(!document.cookie)
																																				{
																																				    return null;
																																				
}
var A=document.cookie.match(/(?:^|;)\s*prefs=([^;]*)(?:;|$)/);if((!A)||(!A[1]))
																																												   {
																																												       return null;
}
return A[1];
																																			
}
function R(B)
																																			{
																																			    var A=new Date();A.setFullYear(3000);document.cookie=("prefs="+B+";expires="+A.toGMTString());
																																			
}
function T(C)
																																			{
																																			    try
																																				{
																																				    var B=JSON.parse(unescape(C));return B;
}
catch(A)
																																				{
																																				    return null;
}

}
function S(A)
																																			{
																																			    return escape(JSON.stringify(A));
																																			
}
function N()
																																			{
																																			    if(!O)
																																				{
																																				    return;
}
R(S(K));if(pad.getIsProPad()&&(!M())&&(!L))
																																							{
																																							    alert("Warning: it appears that your browser does not have cookies enabled. EtherPad uses cookies to keep track of unique users for the purpose of putting a quota on the number of active users.  Using EtherPad without  cookies may fill up your server's user quota faster than expected.");
																																							    L=true;
}

}
var P=true;var K=
																																			{
																																			
}
;var L=false;var O=false;var Q=
																																			{
																																			    init:function(C)
																																			    {
																																				var D=M();if(D)
																																					      {
																																						  var A=T(D);
																																						  if(A)
																																						      {
																																							  P=false;delete A.userId;delete A.name;delete A.colorId;K=A;
}

}
for(var B in C)
																																															   {
																																															       K[B]=C[B];
}
O=true;
																																				N();
}
,wasNoCookie:function()
																																			    {
																																				return P;
}
,getPref:function(A)
																																			    {
																																				return K[A];
}
,setPref:function(B,A)
																																			    {
																																				K[B]=A;
																																				N();
}

}
;return Q;
}
());var padeditor=(function()
																																								    {
																																									var B=
																																									{
																																									    ace:null,viewZoom:100,init:function(A,E)
																																									    {
																																										function F()
																																										{
																																										    $("#editorloadingbox").hide();
																																										    if(A)
																																											{
																																											    A();
}

}
B.ace=new Ace2Editor();B.ace.init("editorcontainer","",F);B.ace.setProperty("wraps",true);
																																										if(pad.getIsDebugEnabled())
																																										    {
																																											B.ace.setProperty("dmesg",pad.dmesg);
}
B.initViewOptions();B.setViewOptions(E);
																																										B.initViewZoom();$("#viewbarcontents").show();
}
,initViewOptions:function()
																																									    {
																																										padutils.bindCheckboxChange($("#options-linenoscheck"),function()
																																									{
																																									    pad.changeViewOption("showLineNumbers",padutils.getCheckbox($("#options-linenoscheck")));
																																									
}
);padutils.bindCheckboxChange($("#options-colorscheck"),function()
																																									{
																																									    pad.changeViewOption("showAuthorColors",padutils.getCheckbox("#options-colorscheck"));
																																									
}
);$("#viewfontmenu").change(function()
																																									{
																																									    pad.changeViewOption("useMonospaceFont",$("#viewfontmenu").val()=="monospace");
																																									
}
);
}
,setViewOptions:function(F)
																																									    {
																																										function E(D,H)
																																										{
																																										    var C=String(F[D]);if(C=="true")
																																													   {
																																													       return true;
}
if(C=="false")
																																																{
																																																    return false;
																																																
}
return H;
}
var A;A=E("showLineNumbers",true);B.ace.setProperty("showslinenumbers",A);padutils.setCheckbox($("#options-linenoscheck"),A);
																																										A=E("showAuthorColors",true);B.ace.setProperty("showsauthorcolors",A);padutils.setCheckbox($("#options-colorscheck"),A);
																																										A=E("useMonospaceFont",false);B.ace.setProperty("textface",(A?"monospace":"Arial, sans-serif"));$("#viewfontmenu").val(A?"monospace":"normal");
																																									    
}
,initViewZoom:function()
																																									    {
																																										var A=Number(padcookie.getPref("viewZoom"));if((!A)||isNaN(A))
																																																{
																																																    A=100;
}
B.setViewZoom(A);
																																										$("#viewzoommenu").change(function(D)
																																									{
																																									    B.setViewZoom(Number($("#viewzoommenu").val().substring(1)));
}
);
																																									    
}
,setViewZoom:function(A)
																																									    {
																																										if(!(A>=50&&A<=1000))
																																										    {
																																											return;
}
B.viewZoom=A;$("#viewzoommenu").val("z"+A);var D=13;
																																										B.ace.setProperty("textsize",Math.round(D*B.viewZoom/100));padcookie.setPref("viewZoom",A);
}
,dispose:function()
																																									    {
																																										if(B.ace)
																																										    {
																																											B.ace.destroy();
																																										    
}

}
,disable:function()
																																									    {
																																										if(B.ace)
																																										    {
																																											B.ace.setProperty("grayedOut",true);B.ace.setEditable(false);
}

}
,restoreRevisionText:function(A)
																																									    {
																																										pad.addHistoricalAuthors(A.historicalAuthorData);
																																										B.ace.importAText(A.atext,A.apool,true);
}

}
;return B;
}
());var padeditbar=(function()
																																																			 {
																																																			     var D=(function()
																																										    {
																																											var O=-100;
																																											var L=100;var A=L;var R=25;var M=1/R;var P=-0.5;var N=1;var B=1.5;var Q=padutils.makeAnimationScheduler(function()
																																																			     {
																																																				 if(A==O||A==L)
																																																				     {
																																																					 return false;
																																																				     
}
else
																																																				     {
																																																					 if(A>=B)
																																																					     {
																																																						 A=L;$("#syncstatussyncing").css("display","none");$("#syncstatusdone").css("display","none");
																																																						 return false;
}
else
																																																					     {
																																																						 if(A<0)
																																																						     {
																																																							 A+=M;if(A>=0)
																																																								  {
																																																								      $("#syncstatussyncing").css("display","none");$("#syncstatusdone").css("display","block").css("opacity",1);
																																																								  
}
return true;
}
else
																																																						     {
																																																							 A+=M;if(A>=N)
																																																								  {
																																																								      $("#syncstatusdone").css("opacity",(B-A)/(B-N));
}
return true;
}

}

}

}
,M*1000);
																																											return
																																											{
																																											    syncing:function()
																																												{
																																												    A=O;$("#syncstatussyncing").css("display","block");$("#syncstatusdone").css("display","none");
																																												
}
,done:function()
																																												      {
																																													  A=P;Q.scheduleAnimation();
}

}
;
}
());var C=
																																																			     {
																																																				 init:function()
																																																				 {
																																																				     $("#editbar .editbarbutton").attr("unselectable","on");
																																																				     $("#editbar").removeClass("disabledtoolbar").addClass("enabledtoolbar");
}
,isEnabled:function()
																																																				 {
																																																				     return !$("#editbar").hasClass("disabledtoolbar");
																																																				 
}
,disable:function()
																																																				 {
																																																				     $("#editbar").addClass("disabledtoolbar").removeClass("enabledtoolbar");
}
,toolbarClick:function(A)
																																																				 {
																																																				     if(C.isEnabled())
																																																					 {
																																																					     if(A=="save")
																																																						 {
																																																						     padsavedrevs.saveNow();
																																																						 
}
else
																																																						 {
																																																						     padeditor.ace.callWithAce(function(B)
																																													      {
																																														  if(A=="bold"||A=="italic"||A=="underline"||A=="strikethrough")
																																														      {
																																															  B.ace_toggleAttributeOnSelection(A);
																																														      
}
else
																																														      {
																																															  if(A=="undo"||A=="redo")
																																															      {
																																																  B.ace_doUndoRedo(A);
}
else
																																															      {
																																																  if(A=="insertunorderedlist")
																																																      {
																																																	  B.ace_doInsertUnorderedList();
																																																      
}
else
																																																      {
																																																	  if(A=="indent")
																																																	      {
																																																		  if(!B.ace_doIndentOutdent(false))
																																																		      {
																																																			  B.ace_doInsertUnorderedList();
}

}
else
																																																	      {
																																																		  if(A=="outdent")
																																																		      {
																																																			  B.ace_doIndentOutdent(true);
																																																		      
}
else
																																																		      {
																																																			  if(A=="clearauthorship")
																																																			      {
																																																				  if((!(B.ace_getRep().selStart&&B.ace_getRep().selEnd))||B.ace_isCaret())
																																																				      {
																																																					  if(window.confirm("Clear authorship colors on entire document?"))
																																																					      {
																																																						  B.ace_performDocumentApplyAttributesToCharRange(0,B.ace_getRep().alltext.length,[["author",""]]);
																																																					      
}

}
else
																																																				      {
																																																					  B.ace_setAttributeOnSelection("author","");
}

}

}

}

}

}

}

}
,A,true);
}

}
padeditor.ace.focus();
}
,setSyncStatus:function(A)
																																																				 {
																																																				     if(A=="syncing")
																																																					 {
																																																					     D.syncing();
																																																					 
}
else
																																																					 {
																																																					     if(A=="done")
																																																						 {
																																																						     D.done();
}

}

}

}
;return C;
}
());var paddocbar=(function()
																																																												{
																																																												    var S=false;var R=false;var P=false;
																																																												    var N=false;function O(A,D)
																																																												    {
																																																													var B=$("#"+A+"-wrapper");var E="docbar"+A+"-opening";var G="docbar"+A+"-open";
																																																													var H="docbar"+A+"-closing";function C(I)
																																																													{
																																																													    $("#docbar").removeClass(E).removeClass(G).removeClass(H);if(I!="closed")
																																																																					  {
																																																																					      $("#docbar").addClass("docbar"+A+"-"+I);
																																																																					  
}

}
function F(I)
																																																													{
																																																													    function J(U)
																																																													    {
																																																														U=1-U;U*=U*U;return 1-U;
}
if(I==-1)
																																																																	     {
																																																																		 C("opening");B.css("height","0");
}
else
																																																														{
																																																														    if(I<0)
																																																															{
																																																															    var V=Math.round(J(I+1)*(D-1))+"px";
																																																															    B.css("height",V);
}
else
																																																															{
																																																															    if(I==0)
																																																																{
																																																																    C("open");B.css("height",D-1);
}
else
																																																																{
																																																																    if(I<1)
																																																																	{
																																																																	    C("closing");var V=Math.round((1-J(I))*(D-1))+"px";
																																																																	    B.css("height",V);
}
else
																																																																	{
																																																																	    if(I==1)
																																																																		{
																																																																		    C("closed");B.css("height","0");
}

}

}

}

}

}
return padutils.makeShowHideAnimator(F,false,25,500);
																																																												    
}
var L=null;function Q(A)
																																																												    {
																																																													if(L!=A)
																																																													    {
																																																														L=A;padutils.cancelActions("hide-docbar-panel");
}

}
var M;function T(A)
																																																												    {
																																																													if((A||null)!=(K.password||null))
																																																													    {
																																																														K.password=(A||null);
																																																														pad.notifyChangePassword(A);
}
K.renderPassword();
}
var K=
																																																												    {
																																																													title:null,password:null,init:function(A)
																																																													{
																																																													    M=
																																																													    {
																																																														impexp:
																																																														{
																																																														    animator:O("impexp",160)
}
,savedrevs:
																																																														{
																																																														    animator:O("savedrevs",79)
}
,options:
																																																														{
																																																														    animator:O("options",114)
}
,security:
																																																														{
																																																														    animator:O("security",130)
}

}
;
																																																													    S=A.isTitleEditable;K.title=A.initialTitle;K.password=A.initialPassword;$("#docbarimpexp").click(function()
																																																														    {
																																																															K.togglePanel("impexp");
																																																														    
}
);$("#docbarsavedrevs").click(function()
																																																														    {
																																																															K.togglePanel("savedrevs");
}
);$("#docbaroptions").click(function()
																																																														    {
																																																															K.togglePanel("options");
																																																														    
}
);$("#docbarsecurity").click(function()
																																																														    {
																																																															K.togglePanel("security");
}
);$("#docbarrenamelink").click(K.editTitle);
																																																													    $("#padtitlesave").click(function()
																																																														    {
																																																															K.closeTitleEdit(true);
}
);$("#padtitlecancel").click(function()
																																																														    {
																																																															K.closeTitleEdit(false);
																																																														    
}
);padutils.bindEnterAndEscape($("#padtitleedit"),function()
																																																														    {
																																																															$("#padtitlesave").trigger("click");
}
,function()
																																																														    {
																																																															$("#padtitlecancel").trigger("click");
																																																														    
}
);$("#options-close").click(function()
																																																														    {
																																																															K.setShownPanel(null);
}
);$("#security-close").click(function()
																																																														    {
																																																															K.setShownPanel(null);
																																																														    
}
);if(pad.getIsProPad())
																																																															   {
																																																															       K.initPassword();
}
N=true;K.render();$("#security-access input").bind("change click",function(B)
																																																														    {
																																																															pad.changePadOption("guestPolicy",$("#security-access input[name='padaccess']:checked").val());
																																																														    
}
);K.setGuestPolicy(A.guestPolicy);
}
,setGuestPolicy:function(A)
																																																													{
																																																													    $("#security-access input[value='"+A+"']").attr("checked","checked");
																																																													    K.render();
}
,initPassword:function()
																																																													{
																																																													    K.renderPassword();$("#password-clearlink").click(function()
																																																														    {
																																																															T(null);
																																																														    
}
);$("#password-setlink, #password-display").click(function()
																																																														    {
																																																															K.enterPassword();
}
);$("#password-cancellink").click(function()
																																																														    {
																																																															K.exitPassword(false);
																																																														    
}
);$("#password-savelink").click(function()
																																																														    {
																																																															K.exitPassword(true);
}
);padutils.bindEnterAndEscape($("#security-passwordedit"),function()
																																																														    {
																																																															K.exitPassword(true);
																																																														    
}
,function()
																																																														    {
																																																															K.exitPassword(false);
}
);
}
,enterPassword:function()
																																																													{
																																																													    P=true;$("#security-passwordedit").val(K.password||"");
																																																													    K.renderPassword();$("#security-passwordedit").focus().select();
}
,exitPassword:function(A)
																																																													{
																																																													    P=false;if(A)
																																																															{
																																																															    T($("#security-passwordedit").val());
																																																															
}
else
																																																														{
																																																														    K.renderPassword();
}

}
,renderPassword:function()
																																																													{
																																																													    if(P)
																																																														{
																																																														    $("#password-nonedit").hide();$("#password-inedit").show();
																																																														
}
else
																																																														{
																																																														    $("#password-nonedit").toggleClass("nopassword",!K.password);$("#password-setlink").html(K.password?"Change...":"Set...");
																																																														    if(K.password)
																																																															{
																																																															    $("#password-display").html(K.password.replace(/./g,"&#8226;"));
}
else
																																																															{
																																																															    $("#password-display").html("None");
																																																															
}
$("#password-inedit").hide();$("#password-nonedit").show();
}

}
,togglePanel:function(A)
																																																													{
																																																													    if(A in M)
																																																														{
																																																														    if(L==A)
																																																															{
																																																															    K.setShownPanel(null);
																																																															
}
else
																																																															{
																																																															    K.setShownPanel(A);
}

}

}
,setShownPanel:function(A)
																																																													{
																																																													    function B(C,D)
																																																													    {
																																																														var E=0;if(C=="options"&&P)
																																																															    {
																																																																K.exitPassword(false);
																																																																E=500;
}
window.setTimeout(function()
																																																														    {
																																																															M[C].animator.hide();if(D)
																																																																		 {
																																																																		     D();
}

}
,E);
}
if(!A)
																																																																				    {
																																																																					if(L)
																																																																					    {
																																																																						B(L);Q(null);
}

}
else
																																																														{
																																																														    if(A in M)
																																																															{
																																																															    if(L!=A)
																																																																{
																																																																    if(L)
																																																																	{
																																																																	    B(L,function()
																																																														    {
																																																															M[A].animator.show();
																																																															Q(A);
}
);
}
else
																																																																	{
																																																																	    M[A].animator.show();Q(A);
}

}

}

}

}
,isPanelShown:function(A)
																																																													{
																																																													    if(!A)
																																																														{
																																																														    return !L;
}
else
																																																														{
																																																														    return(A==L);
																																																														
}

}
,changeTitle:function(A)
																																																													{
																																																													    K.title=A;K.render();
}
,editTitle:function()
																																																													{
																																																													    if(!N)
																																																														{
																																																														    return;
}
$("#padtitleedit").val(K.title);
																																																													    R=true;K.render();$("#padtitleedit").focus().select();
}
,closeTitleEdit:function(B)
																																																													{
																																																													    if(!N)
																																																														{
																																																														    return;
}
if(B)
																																																																{
																																																																    var A=$("#padtitleedit").val();
																																																																    if(A)
																																																																	{
																																																																	    A=A.substring(0,80);K.title=A;pad.notifyChangeTitle(A);
}

}
R=false;K.render();
}
,changePassword:function(A)
																																																													{
																																																													    if(A)
																																																														{
																																																														    K.password=A;
																																																														
}
else
																																																														{
																																																														    K.password=null;
}
K.renderPassword();
}
,render:function()
																																																													{
																																																													    if(R)
																																																														{
																																																														    $("#docbarpadtitle").hide();$("#docbarrenamelink").hide();
																																																														    $("#padtitleedit").show();$("#padtitlebuttons").show();if(!N)
																																																																					       {
																																																																						   $("#padtitleedit").attr("disabled","disabled");
																																																																					       
}
else
																																																															{
																																																															    $("#padtitleedit").removeAttr("disabled");
}

}
else
																																																														{
																																																														    $("#padtitleedit").hide();$("#padtitlebuttons").hide();
																																																														    var B=$("#docbarpadtitle span");B.html(padutils.escapeHtml(K.title));$("#docbarpadtitle").attr("title",(pad.isPadPublic()?"Public Pad: ":"")+K.title);
																																																														    $("#docbarpadtitle").show();if(S)
																																																																		    {
																																																																			var A=$("#docbarpadtitle").position().left+$("#docbarpadtitle span").position().left+Math.min($("#docbarpadtitle").width(),$("#docbarpadtitle span").width());
																																																																			$("#docbarrenamelink").css("left",A+10).show();
}
if(pad.isPadPublic())
																																																																									    {
																																																																										$("#docbar").addClass("docbar-public");
																																																																									    
}
else
																																																															{
																																																															    $("#docbar").removeClass("docbar-public");
}

}

}
,disable:function()
																																																													{
																																																													    N=false;K.render();
}
,handleResizePage:function()
																																																													{
																																																													    padsavedrevs.handleResizePage();
																																																													
}
,hideLaterIfNoOtherInteraction:function()
																																																													{
																																																													    return padutils.getCancellableAction("hide-docbar-panel",function()
																																																														    {
																																																															K.setShownPanel(null);
																																																														    
}
);
}

}
;return K;
}
());var padmodals=(function()
																																																																		       {
																																																																			   var G=false;function I(A)
																																																																			   {
																																																																			       A=!!A;if(G!=A)
																																																																					 {
																																																																					     G=A;if(A)
																																																																						     {
																																																																							 $("#sharebox-send").css("opacity",0.75);
																																																																						     
}
else
																																																																						 {
																																																																						     $("#sharebox-send").css("opacity",1);
}

}

}
var H=function()
																																																																			   {
																																																																			   
}
;function J()
																																																																			   {
																																																																			       H();
}
var F=
																																																																			   {
																																																																			       init:function()
																																																																			       {
																																																																				   F.initFeedback();
																																																																				   F.initShareBox();
}
,initFeedback:function()
																																																																			       {
																																																																				   $("#feedbackbox-hide").click(function()
																																																																				   {
																																																																				       F.hideModal();
}
);$("#feedbackbutton").click(function()
																																																																				   {
																																																																				       F.showFeedback();
																																																																				   
}
);$("#uservoicelinks a").click(function()
																																																																				   {
																																																																				       F.hideModal();return true;
}
);$("#feedbackemails a").each(function()
																																																																				   {
																																																																				       var A=$(this);
																																																																				       A.attr("href","mailto:"+A.attr("href")+"@etherpad.com");
}
);
}
,initShareBox:function()
																																																																			       {
																																																																				   $("#sharebutton, #nootherusers a").click(function()
																																																																				   {
																																																																				       F.showShareBox();
																																																																				   
}
);$("#sharebox-hide").click(function()
																																																																				   {
																																																																				       F.hideModal();
}
);$("#sharebox-send").click(function()
																																																																				   {
																																																																				       F.sendInvite();
																																																																				   
}
);$("#sharebox-url").click(function()
																																																																				   {
																																																																				       $("#sharebox-url").focus().select();
}
);H=padutils.makeFieldLabeledWhenEmpty($("#sharebox-to"),"(email addresses)").clear;
																																																																				   J();$("#sharebox-subject").val(F.getDefaultShareBoxSubjectForName(pad.getUserName()));$("#sharebox-message").val(F.getDefaultShareBoxMessageForName(pad.getUserName()));
																																																																				   $("#sharebox-stripe .setsecurity").click(function()
																																																																				   {
																																																																				       F.hideModal();paddocbar.setShownPanel("security");
																																																																				   
}
);
}
,getDefaultShareBoxMessageForName:function(A)
																																																																			       {
																																																																				   return(A||"Somebody")+" has shared an EtherPad document with you.\n\nView it here:\n\n"+padutils.escapeHtml($("#sharebox-url").val()+"\n");
																																																																			       
}
,getDefaultShareBoxSubjectForName:function(A)
																																																																			       {
																																																																				   return(A||"Somebody")+" invited you to an EtherPad document";
																																																																			       
}
,relayoutWithBottom:function(A)
																																																																			       {
																																																																				   $("#modaloverlay").height(A);$("#sharebox").css("left",Math.floor(($(window).width()-$("#sharebox").outerWidth())/2));
																																																																				   $("#feedbackbox").css("left",Math.floor(($(window).width()-$("#feedbackbox").outerWidth())/2));
}
,showFeedback:function()
																																																																			       {
																																																																				   F.showModal("#feedbackbox");
																																																																			       
}
,showShareBox:function()
																																																																			       {
																																																																				   var B=$("#sharebox-message");if(B.val()==F.getDefaultShareBoxMessageForName(null))
																																																																								    {
																																																																									B.val(F.getDefaultShareBoxMessageForName(pad.getUserName()));
																																																																								    
}
var A=$("#sharebox-subject");if(A.val()==F.getDefaultShareBoxSubjectForName(null))
																																																																												      {
																																																																													  A.val(F.getDefaultShareBoxSubjectForName(pad.getUserName()));
																																																																												      
}
if(pad.isPadPublic())
																																																																													   {
																																																																													       $("#sharebox-stripe").get(0).className="sharebox-stripe-public";
}
else
																																																																				       {
																																																																					   $("#sharebox-stripe").get(0).className="sharebox-stripe-private";
																																																																				       
}
F.showModal("#sharebox",500);$("#sharebox-url").focus().select();
}
,showModal:function(B,A)
																																																																			       {
																																																																				   $(".modaldialog").hide();
																																																																				   $(B).show().css(
																																																																				   {
																																																																				       opacity:0
}
).animate(
																																																																				   {
																																																																				       opacity:1
}
,A);$("#modaloverlay").show().css(
																																																																				   {
																																																																				       opacity:0
}
).animate(
																																																																				   {
																																																																				       opacity:1
}
,A);
																																																																			       
}
,hideModal:function(A)
																																																																			       {
																																																																				   padutils.cancelActions("hide-feedbackbox");padutils.cancelActions("hide-sharebox");
																																																																				   $("#sharebox-response").hide();$(".modaldialog").animate(
																																																																				   {
																																																																				       opacity:0
}
,A,function()
																																																																				   {
																																																																				       $("#modaloverlay").hide();
																																																																				   
}
);$("#modaloverlay").animate(
																																																																				   {
																																																																				       opacity:0
}
,A,function()
																																																																				   {
																																																																				       $("#modaloverlay").hide();
}
);
}
,hideFeedbackLaterIfNoOtherInteraction:function()
																																																																			       {
																																																																				   return padutils.getCancellableAction("hide-feedbackbox",function()
																																																																				   {
																																																																				       F.hideModal();
																																																																				   
}
);
}
,hideShareboxLaterIfNoOtherInteraction:function()
																																																																			       {
																																																																				   return padutils.getCancellableAction("hide-sharebox",function()
																																																																				   {
																																																																				       F.hideModal();
																																																																				   
}
);
}
,sendInvite:function()
																																																																			       {
																																																																				   if(G)
																																																																				       {
																																																																					   return;
}
if(!pad.isFullyConnected())
																																																																						       {
																																																																							   C("Error: Connection to the server is down or flaky.");
																																																																							   return;
}
var E=$("#sharebox-message").val();if(!E)
																																																																													  {
																																																																													      C("Please enter a message body before sending.");return;
																																																																													  
}
var W=($("#sharebox-to").hasClass("editempty")?"":$("#sharebox-to").val())||"";var A=W.match(/[^\s,:;<>\"\'\/\(\)\[\]
																																																																																									  {
																																																																																									  
}
]+/g)||[];
																																																																				   if(A.length==0)
																																																																				       {
																																																																					   C('Please enter at least one "To:" address.');$("#sharebox-to").focus().select();return;
																																																																				       
}
for(var D=0;D<A.length;D++)
																																																																					    {
																																																																						var R=A[D];if(!R.match(/^[\w\.\_\+\-]+\@[\w\_\-]+\.[\w\_\-\.]+$/))
																																																																							       {
																																																																								   C('"'+padutils.escapeHtml(R)+'" does not appear to be a valid email address.');
																																																																								   return;
}

}
var B=$("#sharebox-subject").val();if(!B)
																																																																														   {
																																																																														       B=F.getDefaultShareBoxSubjectForName(pad.getUserName());
																																																																														       $("#sharebox-subject").val(B);
}
var S=pad.getPadId();var X=pad.getUserName();I(true);$("#sharebox-response").html("Sending...").get(0).className="";
																																																																				   $("#sharebox-response").show();$.ajax(
																																																																				   {
																																																																				       type:"post",url:"/ep/pad/emailinvite",data:
																																																																				       {
																																																																					   message:E,toEmails:A.join(","),subject:B,username:X,padId:S
}
,success:T,error:U
}
);
																																																																				   var V=F.hideShareboxLaterIfNoOtherInteraction();function T(K)
																																																																				   {
																																																																				       I(false);$("#sharebox-response").html("Email invitation sent!").get(0).className="goodresponse";
																																																																				       $("#sharebox-response").show();window.setTimeout(function()
																																																																											{
																																																																											    $("#sharebox-response").fadeOut("slow",function()
																																																																															    {
																																																																																V();
																																																																															    
}
);
}
,1500);
}
function U(K)
																																																																				   {
																																																																				       setSendingFeedback(false);$("#sharebox-response").html("An error occurred; no email was sent.").get(0).className="badresponse";
																																																																				       $("#sharebox-response").show();
}
function C(K)
																																																																				   {
																																																																				       $("#sharebox-response").html(K).get(0).className="badresponse";
																																																																				       $("#sharebox-response").show();
}

}

}
;return F;
}
());Ace2Editor.registry=
																																																																				       {
																																																																					   nextId:1
}
;function Ace2Editor()
																																																																					   {
																																																																					       var I="Ace2Editor";
																																																																					       var F=Ace2Editor;var B=
																																																																								    {
																																																																								    
}
;var A=
																																																																									  {
																																																																									      editor:B,id:(F.registry.nextId++)
}
;var D=false;var E=[];function C(R,Q)
																																																																					       {
																																																																						   return function()
																																																																						       {
																																																																							   var T=this;
																																																																							   var S=arguments;function U()
																																																																							   {
																																																																							       R.apply(T,S);
}
if(Q)
																																																																										 {
																																																																										     Q.apply(T,S);
}
if(D)
																																																																												       {
																																																																													   U();
}
else
																																																																							       {
																																																																								   E.push(U);
}

}
;
}
function G()
																																																																					       {
																																																																						   for(var Q=0;
																																																																						       Q<E.length;Q++)
																																																																						       {
																																																																							   E[Q]();
}
E=[];
}
F.registry[A.id]=A;B.importText=C(function(Q,R)
																																																																													   {
																																																																													       A.ace_importText(Q,R);
}
);
																																																																					       B.importAText=C(function(S,Q,R)
																																																																							       {
																																																																								   A.ace_importAText(S,Q,R);
}
);B.exportText=function()
																																																																												   {
																																																																												       if(!D)
																																																																													   {
																																																																													       return"(awaiting init)\n";
																																																																													   
}
return A.ace_exportText();
}
;B.getFrame=function()
																																																																																	    {
																																																																																		return A.frame||null;
}
;B.focus=C(function()
																																																																																						 {
																																																																																						     A.ace_focus();
																																																																																						 
}
);B.setEditable=C(function(Q)
																																																																																								    {
																																																																																									A.ace_setEditable(Q);
}
);B.getFormattedCode=function()
																																																																																												    {
																																																																																													return A.ace_getFormattedCode();
																																																																																												    
}
;B.setOnKeyPress=C(function(Q)
																																																																																															{
																																																																																															    A.ace_setOnKeyPress(Q);
}
);B.setOnKeyDown=C(function(Q)
																																																																																																				       {
																																																																																																					   A.ace_setOnKeyDown(Q);
																																																																																																				       
}
);B.setNotifyDirty=C(function(Q)
																																																																																																							     {
																																																																																																								 A.ace_setNotifyDirty(Q);
}
);B.setProperty=C(function(R,Q)
																																																																																																													    {
																																																																																																														A.ace_setProperty(R,Q);
																																																																																																													    
}
);B.getDebugProperty=function(Q)
																																																																																																														   {
																																																																																																														       return A.ace_getDebugProperty(Q);
}
;B.setBaseText=C(function(Q)
																																																																																																																					  {
																																																																																																																					      A.ace_setBaseText(Q);
																																																																																																																					  
}
);B.setBaseAttributedText=C(function(Q,R)
																																																																																																																								       {
																																																																																																																									   A.ace_setBaseAttributedText(Q,R);
}
);B.applyChangesToBase=C(function(S,R,Q)
																																																																																																																																      {
																																																																																																																																	  A.ace_applyChangesToBase(S,R,Q);
																																																																																																																																      
}
);B.prepareUserChangeset=function()
																																																																																																																																	     {
																																																																																																																																		 if(!D)
																																																																																																																																		     {
																																																																																																																																			 return null;
}
return A.ace_prepareUserChangeset();
}
;B.applyPreparedChangesetToBase=C(function()
																																																																																																																																													     {
																																																																																																																																														 A.ace_applyPreparedChangesetToBase();
																																																																																																																																													     
}
);B.setUserChangeNotificationCallback=C(function(Q)
																																																																																																																																																		      {
																																																																																																																																																			  A.ace_setUserChangeNotificationCallback(Q);
}
);B.setAuthorInfo=C(function(Q,R)
																																																																																																																																																											  {
																																																																																																																																																											      A.ace_setAuthorInfo(Q,R);
																																																																																																																																																											  
}
);B.setAuthorSelectionRange=C(function(S,Q,R)
																																																																																																																																																															 {
																																																																																																																																																															     A.ace_setAuthorSelectionRange(S,Q,R);
}
);B.getUnhandledErrors=function()
																																																																																																																																																																					 {
																																																																																																																																																																					     if(!D)
																																																																																																																																																																						 {
																																																																																																																																																																						     return[];
																																																																																																																																																																						 
}
return A.ace_getUnhandledErrors();
}
;B.callWithAce=C(function(Q,S,R)
																																																																																																																																																																												      {
																																																																																																																																																																													  return A.ace_callWithAce(Q,S,R);
																																																																																																																																																																												      
}
);B.execCommand=C(function(Q,R)
																																																																																																																																																																															 {
																																																																																																																																																																															     A.ace_execCommand(Q,R);
}
);B.replaceRange=C(function(Q,R,S)
																																																																																																																																																																																					{
																																																																																																																																																																																					    A.ace_replaceRange(Q,R,S);
																																																																																																																																																																																					
}
);var L=function(Q)
																																																																																																																																																																																					       {
																																																																																																																																																																																						   return'<link rel="stylesheet" type="text/css" href="'+Q+'"/>';
}
;var H=function(Q)
																																																																																																																																																																																														       {
																																																																																																																																																																																															   return'\x3cscript type="text/javascript" src="'+Q+'">\x3c/script>';
																																																																																																																																																																																														       
}
;var M=H;var N=L;var J=function(Q)
																																																																																																																																																																																																	     {
																																																																																																																																																																																																		 return'\'<link rel="stylesheet" type="text/css" href="'+Q+"\"/>'";
																																																																																																																																																																																																	     
}
;var K=function(Q)
																																																																																																																																																																																																		   {
																																																																																																																																																																																																		       return'\'\\x3cscript type="text/javascript" src="'+Q+"\">\\x3c/script>'";
}
;var P=K;
																																																																					       var O=J;B.destroy=C(function()
																																																																								   {
																																																																								       A.ace_dispose();A.frame.parentNode.removeChild(A.frame);delete F.registry[A.id];
																																																																								       A=null;
}
);B.init=function(R,Q,S)
																																																																										     {
																																																																											 B.importText(Q);A.onEditorReady=function()
																																																																											 {
																																																																											     D=true;G();S();
}
;(function()
																																																																									   {
																																																																									       var W='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
																																																																									       var T=["'"+W+"<html><head>'"];plugins.callHook("aceInitInnerdocbodyHead",
																																																																															      {
																																																																																  iframeHTML:T
}
);T.push(("('<style type=\"text/css\">'+'body
{
margin:0;white-space:nowrap;
}
#outerdocbody
{
background-color:#fff;
}
body.grayedout
{
background-color:#eee!important;
}
#innerdocbody
{
font-size:12px;font-family:monospace;line-height:16px;
}
body.doesWrap
{
white-space:normal;
}
#innerdocbody
{
padding-top:1px;padding-right:10px;padding-bottom:8px;padding-left:1px;overflow:hidden;background-image:url(data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
}
#sidediv
{
font-size:11px;font-family:monospace;line-height:16px;padding-top:8px;padding-right:3px;position:absolute;width:20px;top:0;left:0;cursor:default;color:white;
}
#sidedivinner
{
text-align:right;
}
.sidedivdelayed
{
background-color:#eee;color:#888!important;border-right:1px solid #999;
}
.sidedivhidden
{
display:none;
}
#outerdocbody iframe
{
display:block;position:relative;left:32px;top:7px;border:0;width:1px;height:1px;
}
#outerdocbody .hotrect
{
border:1px solid #999;position:absolute;
}
body.mozilla,body.safari
{
display:table-cell;
}
body.doesWrap
{
display:block!important;
}
.safari div
{
padding-right:1px;
}
p
{
margin:0;
}
#linemetricsdiv
{
position:absolute;left:-1000px;top:-1000px;color:white;z-index:-1;font-size:12px;font-family:monospace;
}
#overlaysdiv
{
position:absolute;left:-1000px;top:-1000px;
}
.syntax .c
{
color:#bd3f00;font-style:italic;
}
.syntax .o
{
font-weight:bold;
}
.syntax .p
{
font-weight:bold;
}
.syntax .k
{
color:blue;
}
.syntax .kc
{
color:purple;
}
.syntax .mf
{
color:purple;
}
.syntax .mh
{
color:purple;
}
.syntax .mi
{
color:purple;
}
.syntax .sr
{
color:purple;
}
.syntax .s2
{
color:purple;
}
.syntax .s1
{
color:purple;
}
.syntax .sd
{
color:purple;
}
.syntax .cs
{
color:#0a3;font-weight:bold;font-style:italic;
}
.syntax .err
{
color:#c00;font-weight:bold;text-decoration:underline;
}
.syntax .nt
{
font-weight:bold;
}
.syntax .nc
{
color:#336;
}
.syntax .nf
{
color:#336;
}
.syntax .nd
{
color:#999;
}
.syntax .m
{
color:purple;
}
.syntax .nb
{
color:purple;
}
.syntax .cp
{
color:#bd3f00;
}
.syntax .flash
{
background-color:#adf!important;
}
.syntax .flashbad
{
background-color:#f55!important;
}
html
{
cursor:text;
}
span
{
cursor:auto;
}
a
{
cursor:pointer!important;
}
ul,ol,li
{
padding:0;margin:0;
}
ul
{
margin-left:1.5em;
}
ul ul
{
margin-left:0!important;
}
ul.list-bullet1
{
margin-left:1.5em;
}
ul.list-bullet2
{
margin-left:3em;
}
ul.list-bullet3
{
margin-left:4.5em;
}
ul.list-bullet4
{
margin-left:6em;
}
ul.list-bullet5
{
margin-left:7.5em;
}
ul.list-bullet6
{
margin-left:9em;
}
ul.list-bullet7
{
margin-left:10.5em;
}
ul.list-bullet8
{
margin-left:12em;
}
ul
{
list-style-type:disc;
}
ul.list-bullet1
{
list-style-type:disc;
}
ul.list-bullet2
{
list-style-type:circle;
}
ul.list-bullet3
{
list-style-type:square;
}
ul.list-bullet4
{
list-style-type:disc;
}
ul.list-bullet5
{
list-style-type:circle;
}
ul.list-bullet6
{
list-style-type:square;
}
ul.list-bullet7
{
list-style-type:disc;
}
ul.list-bullet8
{
list-style-type:circle;
}
'+'\\x3c/style>')"));
																																																																									       T.push(('(\'\\x3cscript type="text/javascript">//<!--\\n\'+\'function isNodeText(A)
{
return(A.nodeType==3);
}
function object(B)
{
var A=function()
{

}
;A.prototype=B;return new A();\\n
}
function extend(C,A)
{
for(var B in A)
{
C[B]=A[B];
}
return C;
}
function forEach(B,D)
{
for(var A=0;A\\x3cB.length;\\nA++)
{
var C=D(B[A],A);if(C)
{
break;
}

}

}
function map(C,D)
{
var B=[];for(var A=0;A\\x3cC.length;A++)
{
if(D)
{
B.push(D(C[A],A));\\n
}
else
{
B.push(C[A]);
}

}
return B;
}
function filter(B,D)
{
var C=[];for(var A=0;A\\x3cB.length;A++)
{
if(D(B[A],A))
{
C.push(B[A]);\\n
}

}
return C;
}
function isArray(A)
{
return A&&typeof A==="object"&&!(A.propertyIsEnumerable("length"))&&typeof A.length==="number";\\n
}
var userAgent=navigator.userAgent.toLowerCase();var browser=
{
version:(userAgent.match(/.+(?:rv|it|ra|ie)[\\\\\\x2f: ]([\\\\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent),windows:/windows/.test(userAgent)
}
;\\nfunction getAssoc(B,A)
{
return B["_magicdom_"+A];
}
function setAssoc(C,A,B)
{
C["_magicdom_"+A]=B;
}
function binarySearch(A,E)
{
if(A\\x3c1)
{
return 0;\\n
}
if(E(0))
{
return 0;
}
if(!E(A-1))
{
return A;
}
var D=0;var B=A-1;while((B-D)>1)
{
var C=Math.floor((D+B)/2);\\nif(E(C))
{
B=C;
}
else
{
D=C;
}

}
return B;
}
function binarySearchInfinite(C,B)
{
var A=0;while(!B(A))
{
A+=C;
}
return binarySearch(A,B);\\n
}
function htmlPrettyEscape(A)
{
return A.replace(/&/g,"&amp;").replace(/\\x3c/g,"&lt;").replace(/>/g,"&gt;").replace(/\\\\r?\\\\n/g,"\\\\\\\\n");\\n
}
function newSkipList()
{
var H=window.PROFILER;if(!H)
{
H=function()
{
return
{
start:G,mark:G,literal:G,end:G,cancel:G
}
;\\n
}
;
}
function G()
{

}
var B=
{
key:null,levels:1,upPtrs:[null],downPtrs:[null],downSkips:[1],downSkipWidths:[0]
}
;\\nvar E=
{
key:null,levels:1,upPtrs:[null],downPtrs:[null],downSkips:[null],downSkipWidths:[null]
}
;var A=0;\\nvar D=0;var I=
{

}
;B.downPtrs[0]=E;E.upPtrs[0]=B;function J(Z)
{
var W=B.levels;var T=W-1;var X=-1,b=0;var V=new Array(W);\\nvar Y=new Array(W);var a=new Array(W);V[T]=B;Y[T]=-1;a[T]=0;while(T>=0)
{
var U=V[T];while(U.downPtrs[T]&&(X+U.downSkips[T]\\x3cZ))
{
X+=U.downSkips[T];\\nb+=U.downSkipWidths[T];U=U.downPtrs[T];
}
V[T]=U;Y[T]=X;a[T]=b;T--;if(T>=0)
{
V[T]=U;
}

}
return
{
nodes:V,idxs:Y,loc:Z,widthSkips:a,toString:function()
{
return"getPoint("+Z+")";\\n
}

}
;
}
function P(W)
{
var V=0;var T=B;var U=B.levels-1;while(U>=0&&T.downPtrs[U])
{
while(T.downPtrs[U]&&(V+T.downSkipWidths[U]\\x3c=W))
{
V+=T.downSkipWidths[U];\\nT=T.downPtrs[U];
}
U--;
}
if(T===B)
{
return(B.downPtrs[0]||null);
}
else
{
if(T===E)
{
return(W==D?(E.upPtrs[0]||null):null);\\n
}

}
return T;
}
function K(T)
{
return(T&&T.width)||0;
}
function N(V,f,h)
{
var X=H("insertKey",false);var W=
{
key:f,levels:0,upPtrs:[],downPtrs:[],downSkips:[],downSkipWidths:[]
}
;\\nX.mark("donealloc");var Y=V.nodes;var e=V.idxs;var k=V.loc;var j=V.widthSkips[0]+V.nodes[0].downSkipWidths[0];\\nvar a=K(h);X.mark("loop1");while(W.levels==0||Math.random()\\x3c0.01)
{
var T=W.levels;W.levels++;if(T==Y.length)
{
Y[T]=B;\\ne[T]=-1;B.levels++;E.levels++;B.downPtrs[T]=E;E.upPtrs[T]=B;B.downSkips[T]=A+1;B.downSkipWidths[T]=D;\\nV.widthSkips[T]=0;
}
var Z=W;var U=Y[T];var d=U.downPtrs[T];var b=k-e[T];var g=U.downSkips[T]+1-b;U.downSkips[T]=b;\\nU.downPtrs[T]=Z;Z.downSkips[T]=g;Z.upPtrs[T]=U;Z.downPtrs[T]=d;d.upPtrs[T]=Z;var c=j-V.widthSkips[T];\\nvar i=U.downSkipWidths[T]+a-c;U.downSkipWidths[T]=c;Z.downSkipWidths[T]=i;
}
X.mark("loop2");X.literal(Y.length,"PNL");\\nfor(var T=W.levels;T\\x3cY.length;T++)
{
var U=Y[T];U.downSkips[T]++;U.downSkipWidths[T]+=a;
}
X.mark("map");\\nI["$KEY$"+f]=W;A++;D+=a;X.end();
}
function O(T)
{
return T.nodes[0].downPtrs[0];
}
function S(U)
{
U.loc++;for(var T=0;\\nT\\x3cU.nodes.length;T++)
{
if(U.idxs[T]+U.nodes[T].downSkips[T]\\x3cU.loc)
{
U.idxs[T]+=U.nodes[T].downSkips[T];\\nU.widthSkips[T]+=U.nodes[T].downSkipWidths[T];U.nodes[T]=U.nodes[T].downPtrs[T];
}

}

}
function M(W)
{
var V=W.nodes[0].downPtrs[0];\\nvar X=K(V.entry);for(var T=0;T\\x3cW.nodes.length;T++)
{
if(T\\x3cV.levels)
{
var U=V.upPtrs[T];var Y=V.downPtrs[T];\\nvar a=U.downSkips[T]+V.downSkips[T]-1;U.downPtrs[T]=Y;Y.upPtrs[T]=U;U.downSkips[T]=a;var Z=U.downSkipWidths[T]+V.downSkipWidths[T]-X;\\nU.downSkipWidths[T]=Z;
}
else
{
var U=W.nodes[T];var Y=U.downPtrs[T];U.downSkips[T]--;U.downSkipWidths[T]-=X;\\n
}

}
delete I["$KEY$"+V.key];A--;D-=X;
}
function R(V)
{
var X=V.downSkipWidths[0];var Y=K(V.entry);var W=Y-X;\\nvar U=V;var T=0;while(T\\x3cU.levels)
{
U.downSkipWidths[T]+=W;T++;while(T>=U.levels&&U.upPtrs[T-1])
{
U=U.upPtrs[T-1];\\n
}

}
D+=W;
}
function L(X,W)
{
var V=(W?0:-1);var T=X;while(T!==B)
{
var U=T.levels-1;T=T.upPtrs[U];if(W)
{
V+=T.downSkipWidths[U];\\n
}
else
{
V+=T.downSkips[U];
}

}
return V;
}
function F(T)
{
return I["$KEY$"+T];
}
function Q(Y)
{
var U=B;var T=B.levels-1;\\nvar W=-1;function X(Z)
{
if(Z===B)
{
return false;
}
else
{
if(Z===E)
{
return true;
}
else
{
return Y(Z.entry);
}

}

}
while(T>=0)
{
var V=U.downPtrs[T];\\nwhile(!X(V))
{
W+=U.downSkips[T];U=V;V=U.downPtrs[T];
}
T--;
}
return W+1;
}
var C=
{
length:function()
{
return A;\\n
}
,atIndex:function(T)
{
if(T\\x3c0)
{
console.warn("atIndex("+T+")");
}
if(T>=A)
{
console.warn("atIndex("+T+">="+A+")");\\n
}
return O(J(T)).entry;
}
,splice:function(T,W,V)
{
if(T\\x3c0)
{
console.warn("splice("+T+", ...)");
}
if(T+W>A)
{
console.warn("splice("+T+", "+W+", ...), N="+A);\\nconsole.warn("%s %s %s",typeof T,typeof W,typeof A);console.trace();
}
if(!V)
{
V=[];
}
var Y=J(T);for(var U=0;\\nU\\x3cW;U++)
{
M(Y);
}
for(var U=(V.length-1);U>=0;U--)
{
var X=V[U];N(Y,X.key,X);var Z=F(X.key);Z.entry=X;
}

}
,next:function(T)
{
return F(T.key).downPtrs[0].entry||null;\\n
}
,prev:function(T)
{
return F(T.key).upPtrs[0].entry||null;
}
,push:function(T)
{
C.splice(A,0,[T]);
}
,slice:function(T,U)
{
if(T===undefined)
{
T=0;\\n
}
else
{
if(T\\x3c0)
{
T+=A;
}

}
if(U===undefined)
{
U=A;
}
else
{
if(U\\x3c0)
{
U+=A;
}

}
if(T\\x3c0)
{
T=0;
}
if(T>A)
{
T=A;
}
if(U\\x3c0)
{
U=0;\\n
}
if(U>A)
{
U=A;
}
dmesg(String([T,U,A]));if(U\\x3c=T)
{
return[];
}
var V=C.atIndex(T);var X=[V];for(var W=1;W\\x3c(U-T);\\nW++)
{
V=C.next(V);X.push(V);
}
return X;
}
,atKey:function(T)
{
return F(T).entry;
}
,indexOfKey:function(T)
{
return L(F(T));\\n
}
,indexOfEntry:function(T)
{
return C.indexOfKey(T.key);
}
,containsKey:function(T)
{
return !!(F(T));
}
,atOffset:function(T)
{
return P(T).entry;\\n
}
,keyAtOffset:function(T)
{
return C.atOffset(T).key;
}
,offsetOfKey:function(T)
{
return L(F(T),true);
}
,offsetOfEntry:function(T)
{
return C.offsetOfKey(T.key);\\n
}
,setEntryWidth:function(T,U)
{
T.width=U;R(F(T.key));
}
,totalWidth:function()
{
return D;
}
,offsetOfIndex:function(T)
{
if(T\\x3c0)
{
return 0;\\n
}
if(T>=A)
{
return D;
}
return C.offsetOfEntry(C.atIndex(T));
}
,indexOfOffset:function(T)
{
if(T\\x3c=0)
{
return 0;\\n
}
if(T>=D)
{
return A;
}
return C.indexOfEntry(C.atOffset(T));
}
,search:function(T)
{
return Q(T);
}
,debugGetPoint:J,debugDepth:function()
{
return B.levels;\\n
}

}
;return C;
}
function makeVirtualLineView(B)
{
var E=20;var D=null;function G()
{
return B.textContent.length;\\n
}
function F()
{
if(!D)
{
var J=C();J.forwardByWhile(E);D=J;
}
return D.getVirtualLine()+1;
}
function H(L)
{
var J=C();\\nJ.forwardByWhile(E,null,L);var K=J.getVirtualLine();J.backwardByWhile(8,function()
{
return J.getVirtualLine()==K;\\n
}
);J.forwardByWhile(1,function()
{
return J.getVirtualLine()!=K;
}
);var M=J.getOffset();return
{
vline:K,offset:(L-M)
}
;\\n
}
function I(Q,P)
{
var J=C();J.binarySearch(function()
{
return J.getVirtualLine()>=Q;
}
);var M=J.getOffset();\\nvar L=J.getVirtualLine();J.forwardByWhile(E,null,M+P);J.backwardByWhile(1,function()
{
return J.getVirtualLine()!=L;\\n
}
,M);var K=J.getOffset();var N=K-M;if(N\\x3cP&&L==(F()-1))
{
var O=G();N+=O-K;K=O;
}
return
{
vline:L,offset:N,lineChar:K
}
;\\n
}
return
{
getNumVirtualLines:F,getVLineAndOffsetForChar:H,getCharForVLineAndOffset:I,makeCharSeeker:function()
{
return C();\\n
}

}
;function A(J)
{
J=J.firstChild;while(J&&J.firstChild)
{
J=J.firstChild;
}
if(J.data)
{
return J;
}
return null;\\n
}
function C()
{
function T(a,b)
{
var Z=a.parentNode;var f=(a.nodeValue.charAt(b)===" ");if(f)
{
if(b==0)
{
if(Z.previousSibling&&A(Z.previousSibling))
{
a=A(Z.previousSibling);\\nb=a.length-1;Z=a.parentNode;
}
else
{
return
{
top:Z.offsetTop,left:Z.offsetLeft
}
;
}

}
else
{
b--;
}

}
var c=document.createElement("SPAN");\\nvar e=a.nodeValue;var d=document.createDocumentFragment();d.appendChild(document.createTextNode(e.substring(0,b)));\\nc.appendChild(document.createTextNode(e.substr(b,1)));d.appendChild(c);d.appendChild(document.createTextNode(e.substring(b+1)));\\nZ.replaceChild(d,a);var g=
{
top:c.offsetTop,left:c.offsetLeft+(f?c.offsetWidth:0),height:c.offsetHeight
}
;\\nwhile(Z.firstChild)
{
Z.removeChild(Z.firstChild);
}
Z.appendChild(a);return g;
}
var Y=B.textContent;var O=Y.length;\\nvar M=null;var J=0;var L=0;var P;var N;var V;var X=0;function Q()
{
var Z=M;if(!Z)
{
Z=B.firstChild;
}
else
{
Z=Z.nextSibling;\\n
}
while(Z&&!A(Z))
{
Z=Z.nextSibling;
}
return Z;
}
function S()
{
var Z=M;if(!Z)
{
Z=B.lastChild;
}
else
{
Z=Z.previousSibling;\\n
}
while(Z&&!A(Z))
{
Z=Z.previousSibling;
}
return Z;
}
var K;if(O>0)
{
M=Q();var R=T(A(M),0);V=R.height;P=R.top;\\nN=R.left;function W(b,a)
{
var Z=T(b,a);X+=Math.round((Z.top-P)/V);P=Z.top;N=Z.left;
}
K=
{
forward:function(e)
{
var c=J;\\nvar Z=J+e;if(Z>(O-1))
{
Z=O-1;
}
while(J\\x3cZ)
{
var d=A(M).length;var a=d-L;if(J+a>Z||!Q())
{
var b=Z-J;if(b>=a)
{
b=a-1;\\n
}
J+=b;L+=b;break;
}
else
{
J+=a;L=0;M=Q();
}

}
W(A(M),L);return J-c;
}
,backward:function(c)
{
var b=J;var Z=J-c;\\nif(Z\\x3c0)
{
Z=0;
}
while(J>Z)
{
if(J-L\\x3c=Z||!S())
{
var a=J-Z;if(a>L)
{
a=L;
}
J-=a;L-=a;break;
}
else
{
J-=L+1;M=S();L=A(M).length-1;\\n
}

}
W(A(M),L);return b-J;
}
,getVirtualLine:function()
{
return X;
}
,getLeftCoord:function()
{
return N;
}

}
;
}
else
{
N=B.offsetLeft;\\nK=
{
forward:function(Z)
{
return 0;
}
,backward:function(Z)
{
return 0;
}
,getVirtualLine:function()
{
return 0;\\n
}
,getLeftCoord:function()
{
return N;
}

}
;
}
K.getOffset=function()
{
return J;
}
;K.getLineLength=function()
{
return O;\\n
}
;K.toString=function()
{
return"seeker[curChar: "+J+"("+Y.charAt(J)+"), left: "+K.getLeftCoord()+", vline: "+K.getVirtualLine()+"]";\\n
}
;function U(c,j,e,a)
{
var b=null;var i=((typeof e)=="function");var h=e;var g=((typeof a)=="number");\\nvar d=a;while(b!==0&&((!i)||h()))
{
var Z=j;if(g)
{
var f=(c?J-d:d-J);if(f\\x3cZ)
{
Z=f;
}

}
if(Z\\x3c0)
{
break;
}
b=(c?K.backward(Z):K.forward(Z));\\n
}

}
K.forwardByWhile=function(Z,b,a)
{
U(false,Z,b,a);
}
;K.backwardByWhile=function(Z,b,a)
{
U(true,Z,b,a);
}
;\\nK.binarySearch=function(Z)
{
var b=Z;var a=function()
{
return !Z();
}
;K.forwardByWhile(20,a);K.backwardByWhile(20,b);\\nK.forwardByWhile(10,a);K.backwardByWhile(5,b);K.forwardByWhile(1,a);return K.getOffset()+(Z()?0:1);
}
;\\nreturn K;
}

}
var _opt=null;function AttribPool()
{
var A=
{

}
;A.numToAttrib=
{

}
;A.attribToNum=
{

}
;A.nextNum=0;\\nA.putAttrib=function(C,E)
{
var D=String(C);if(D in A.attribToNum)
{
return A.attribToNum[D];
}
if(E)
{
return -1;\\n
}
var B=A.nextNum++;A.attribToNum[D]=B;A.numToAttrib[B]=[String(C[0]||""),String(C[1]||"")];return B;
}
;\\nA.getAttrib=function(C)
{
var B=A.numToAttrib[C];if(!B)
{
return B;
}
return[B[0],B[1]];
}
;A.getAttribKey=function(C)
{
var B=A.numToAttrib[C];\\nif(!B)
{
return"";
}
return B[0];
}
;A.getAttribValue=function(C)
{
var B=A.numToAttrib[C];if(!B)
{
return"";
}
return B[1];\\n
}
;A.eachAttrib=function(C)
{
for(var D in A.numToAttrib)
{
var B=A.numToAttrib[D];C(B[0],B[1]);
}

}
;A.toJsonable=function()
{
return
{
numToAttrib:A.numToAttrib,nextNum:A.nextNum
}
;\\n
}
;A.fromJsonable=function(B)
{
A.numToAttrib=B.numToAttrib;A.nextNum=B.nextNum;A.attribToNum=
{

}
;for(var C in A.numToAttrib)
{
A.attribToNum[String(A.numToAttrib[C])]=Number(C);\\n
}
return A;
}
;return A;
}
var Changeset=
{

}
;Changeset.error=function error(B)
{
var A=new Error(B);A.easysync=true;\\nthrow A;
}
;Changeset.assert=function assert(A,C)
{
if(!A)
{
var B=Array.prototype.slice.call(arguments,1).join("");\\nChangeset.error("Changeset: "+B);
}

}
;Changeset.parseNum=function(A)
{
return parseInt(A,36);
}
;Changeset.numToString=function(A)
{
return A.toString(36).toLowerCase();\\n
}
;Changeset.toBaseTen=function(A)
{
var B=A.indexOf("$");var D=A.substring(0,B);var C=A.substring(B);return D.replace(/[0-9a-z]+/g,function(E)
{
return String(Changeset.parseNum(E));\\n
}
)+C;
}
;Changeset.oldLen=function(A)
{
return Changeset.unpack(A).oldLen;
}
;Changeset.newLen=function(A)
{
return Changeset.unpack(A).newLen;\\n
}
;Changeset.opIterator=function(E,K)
{
var D=/((?:\\\\*[0-9a-z]+)*)(?:\\\\|([0-9a-z]+))?([-+=])([0-9a-z]+)|\\\\?|/g;\\nvar L=(K||0);var B=L;var F=B;function C()
{
F=B;var M;if(_opt)
{
M=_opt.nextOpInString(E,B);if(M)
{
if(M.opcode()=="?")
{
Changeset.error("Hit error opcode in op stream");\\n
}
B=M.lastIndex();
}

}
else
{
D.lastIndex=B;M=D.exec(E);B=D.lastIndex;if(M[0]=="?")
{
Changeset.error("Hit error opcode in op stream");\\n
}

}
return M;
}
var A=C();var H=Changeset.newOp();function I(N)
{
var M=(N||H);if(_opt&&A)
{
M.attribs=A.attribs();\\nM.lines=A.lines();M.chars=A.chars();M.opcode=A.opcode();A=C();
}
else
{
if((!_opt)&&A[0])
{
M.attribs=A[1];\\nM.lines=Changeset.parseNum(A[2]||0);M.opcode=A[3];M.chars=Changeset.parseNum(A[4]);A=C();
}
else
{
Changeset.clearOp(M);\\n
}

}
return M;
}
function G()
{
return !!(_opt?A:A[0]);
}
function J()
{
return F;
}
return
{
next:I,hasNext:G,lastIndex:J
}
;\\n
}
;Changeset.clearOp=function(A)
{
A.opcode="";A.chars=0;A.lines=0;A.attribs="";
}
;Changeset.newOp=function(A)
{
return
{
opcode:(A||""),chars:0,lines:0,attribs:""
}
;\\n
}
;Changeset.cloneOp=function(A)
{
return
{
opcode:A.opcode,chars:A.chars,lines:A.lines,attribs:A.attribs
}
;\\n
}
;Changeset.copyOp=function(B,A)
{
A.opcode=B.opcode;A.chars=B.chars;A.lines=B.lines;A.attribs=B.attribs;\\n
}
;Changeset.opString=function(B)
{
if(!B.opcode)
{
return"null";
}
var A=Changeset.opAssembler();A.append(B);\\nreturn A.toString();
}
;Changeset.stringOp=function(A)
{
return Changeset.opIterator(A).next();
}
;Changeset.checkRep=function(C)
{
var G=Changeset.unpack(C);\\nvar F=G.oldLen;var J=G.newLen;var M=G.ops;var E=G.charBank;var I=Changeset.smartOpAssembler();var D=0;\\nvar B=0;var H=0;var K=Changeset.opIterator(M);while(K.hasNext())
{
var A=K.next();switch(A.opcode)
{
case"=":D+=A.chars;\\nB+=A.chars;break;case"-":D+=A.chars;Changeset.assert(D\\x3cF,D," >= ",F," in ",C);break;case"+":B+=A.chars;\\nH+=A.chars;Changeset.assert(B\\x3cJ,B," >= ",J," in ",C);break;
}
I.append(A);
}
B+=F-D;E=E.substring(0,H);while(E.length\\x3cH)
{
E+="?";\\n
}
I.endDocument();var L=Changeset.pack(F,B,I.toString(),E);Changeset.assert(L==C,L," != ",C);return C;\\n
}
;Changeset.smartOpAssembler=function()
{
var G=Changeset.mergingOpAssembler();var E=Changeset.mergingOpAssembler();\\nvar B=Changeset.mergingOpAssembler();var A=Changeset.stringAssembler();var C="";var F=0;function H()
{
A.append(B.toString());\\nB.clear();
}
function I()
{
A.append(G.toString());G.clear();A.append(E.toString());E.clear();
}
function D(O)
{
if(!O.opcode)
{
return;\\n
}
if(!O.chars)
{
return;
}
if(O.opcode=="-")
{
if(C=="=")
{
H();
}
G.append(O);F-=O.chars;
}
else
{
if(O.opcode=="+")
{
if(C=="=")
{
H();\\n
}
E.append(O);F+=O.chars;
}
else
{
if(O.opcode=="=")
{
if(C!="=")
{
I();
}
B.append(O);
}

}

}
C=O.opcode;
}
function M(R,P,T,S)
{
var O=Changeset.newOp(R);\\nO.attribs=Changeset.makeAttribsString(R,T,S);var Q=P.lastIndexOf("\\\\n");if(Q\\x3c0)
{
O.chars=P.length;O.lines=0;\\nD(O);
}
else
{
O.chars=Q+1;O.lines=P.match(/\\\\n/g).length;D(O);O.chars=P.length-(Q+1);O.lines=0;D(O);
}

}
function K()
{
I();\\nH();return A.toString();
}
function N()
{
G.clear();E.clear();B.clear();A.clear();F=0;
}
function L()
{
B.endDocument();\\n
}
function J()
{
return F;
}
return
{
append:D,toString:K,clear:N,endDocument:L,appendOpWithText:M,getLengthChange:J
}
;\\n
}
;if(_opt)
{
Changeset.mergingOpAssembler=function()
{
var A=_opt.mergingOpAssembler();function C(F)
{
A.append(F.opcode,F.chars,F.lines,F.attribs);\\n
}
function E()
{
return A.toString();
}
function B()
{
A.clear();
}
function D()
{
A.endDocument();
}
return
{
append:C,toString:E,clear:B,endDocument:D
}
;\\n
}
;
}
else
{
Changeset.mergingOpAssembler=function()
{
var C=Changeset.opAssembler();var A=Changeset.newOp();\\nvar B=0;function D(I)
{
if(A.opcode)
{
if(I&&A.opcode=="="&&!A.attribs)
{

}
else
{
C.append(A);if(B)
{
A.chars=B;\\nA.lines=0;C.append(A);B=0;
}

}
A.opcode="";
}

}
function F(I)
{
if(I.chars>0)
{
if(A.opcode==I.opcode&&A.attribs==I.attribs)
{
if(I.lines>0)
{
A.chars+=B+I.chars;\\nA.lines+=I.lines;B=0;
}
else
{
if(A.lines==0)
{
A.chars+=I.chars;
}
else
{
B+=I.chars;
}

}

}
else
{
D();Changeset.copyOp(I,A);\\n
}

}

}
function G()
{
D(true);
}
function H()
{
D();return C.toString();
}
function E()
{
C.clear();Changeset.clearOp(A);\\n
}
return
{
append:F,toString:H,clear:E,endDocument:G
}
;
}
;
}
if(_opt)
{
Changeset.opAssembler=function()
{
var A=_opt.opAssembler();\\nfunction C(E)
{
A.append(E.opcode,E.chars,E.lines,E.attribs);
}
function D()
{
return A.toString();
}
function B()
{
A.clear();\\n
}
return
{
append:C,toString:D,clear:B
}
;
}
;
}
else
{
Changeset.opAssembler=function()
{
var A=[];function C(E)
{
A.push(E.attribs);\\nif(E.lines)
{
A.push("|",Changeset.numToString(E.lines));
}
A.push(E.opcode);A.push(Changeset.numToString(E.chars));\\n
}
function D()
{
return A.join("");
}
function B()
{
A.length=0;
}
return
{
append:C,toString:D,clear:B
}
;
}
;
}
Changeset.stringIterator=function(D)
{
var A=0;\\nfunction B(H)
{
Changeset.assert(H\\x3c=C(),"!(",H," \\x3c= ",C(),")");
}
function F(H)
{
B(H);var I=D.substr(A,H);\\nA+=H;return I;
}
function E(H)
{
B(H);var I=D.substr(A,H);return I;
}
function G(H)
{
B(H);A+=H;
}
function C()
{
return D.length-A;\\n
}
return
{
take:F,skip:G,remaining:C,peek:E
}
;
}
;Changeset.stringAssembler=function()
{
var A=[];function B(D)
{
A.push(String(D));\\n
}
function C()
{
return A.join("");
}
return
{
append:B,toString:C
}
;
}
;Changeset.textLinesMutator=function(C)
{
var A=[0,0];\\nvar D=false;var E=0,B=0;function O(X)
{
C.splice.apply(C,X);
}
function S()
{
return C.toSource();
}
function J(X)
{
if(C.get)
{
return C.get(X);\\n
}
else
{
return C[X];
}

}
function U(Y,X)
{
if(C.slice)
{
return C.slice(Y,X);
}
else
{
return[];
}

}
function T()
{
if((typeof C.length)=="number")
{
return C.length;\\n
}
else
{
return C.length();
}

}
function G()
{
A[0]=E;A[1]=0;if(B>0)
{
F();
}
D=true;
}
function K()
{
O(A);A.length=2;\\nA[0]=A[1]=0;D=false;
}
function H()
{
return(E-A[0]\\x3c(A.length-2));
}
function W(X)
{
print(X+": "+A.toSource()+" / "+E+","+B+" / "+S());\\n
}
function F()
{
if(!H())
{
A.push(J(A[0]+A[1]));A[1]++;
}
return 2+E-A[0];
}
function L(X,Z)
{
if(X)
{
if(Z)
{
if(!D)
{
G();\\n
}
for(var Y=0;Y\\x3cX;Y++)
{
B=0;F();E++;
}

}
else
{
if(D)
{
if(X>1)
{
K();
}
else
{
F();
}

}
E+=X;B=0;
}

}

}
function R(Z,Y,X)
{
if(Z)
{
if(Y)
{
L(Y,X);\\n
}
else
{
if(X&&!D)
{
G();
}
if(D)
{
F();
}
B+=Z;
}

}

}
function I(X)
{
var Y="";if(X)
{
if(!D)
{
G();
}
function a(c)
{
var b=A[0]+A[1];\\nreturn U(b,b+c).join("");
}
if(H())
{
if(B==0)
{
Y=A[A.length-1];A.length--;Y+=a(X-1);A[1]+=X-1;
}
else
{
Y=a(X-1);\\nA[1]+=X-1;var Z=A.length-1;Y=A[Z].substring(B)+Y;A[Z]=A[Z].substring(0,B)+J(A[0]+A[1]);A[1]+=1;
}

}
else
{
Y=a(X);\\nA[1]+=X;
}

}
return Y;
}
function V(Y,Z)
{
var a="";if(Y)
{
if(Z)
{
return I(Z);
}
else
{
if(!D)
{
G();
}
var X=F();a=A[X].substring(B,B+Y);\\nA[X]=A[X].substring(0,B)+A[X].substring(B+Y);
}

}
return a;
}
function M(Z,c)
{
if(Z)
{
if(!D)
{
G();
}
if(c)
{
var X=Changeset.splitTextLines(Z);\\nif(H())
{
var Y=A.length-1;var a=A[Y];var b=B;A[Y]=a.substring(0,b)+X[0];E++;X.splice(0,1);Array.prototype.push.apply(A,X);\\nE+=X.length;A.push(a.substring(b));B=0;
}
else
{
Array.prototype.push.apply(A,X);E+=X.length;
}

}
else
{
var Y=F();\\nA[Y]=A[Y].substring(0,B)+Z+A[Y].substring(B);B+=Z.length;
}

}

}
function N()
{
var X=T();if(D)
{
X+=A.length-2-A[1];\\n
}
return E\\x3cX;
}
function P()
{
if(D)
{
K();
}

}
var Q=
{
skip:R,remove:V,insert:M,close:P,hasMore:N,removeLines:I,skipLines:L
}
;\\nreturn Q;
}
;Changeset.applyZip=function(I,K,H,J,G)
{
var F=Changeset.opIterator(I,K);var E=Changeset.opIterator(H,J);\\nvar D=Changeset.smartOpAssembler();var A=Changeset.newOp();var C=Changeset.newOp();var B=Changeset.newOp();\\nwhile(A.opcode||F.hasNext()||C.opcode||E.hasNext())
{
if((!A.opcode)&&F.hasNext())
    {
	F.next(A);
}
if((!C.opcode)&&E.hasNext())
		       {
			   E.next(C);\\n
}
G(A,C,B);if(B.opcode)
						      {
							  D.append(B);B.opcode="";
}

}
D.endDocument();return D.toString();
}
;Changeset.unpack=function(B)
							  {
							      var G=/Z:([0-9a-z]+)([>\\x3c])([0-9a-z]+)|/;\\nvar A=G.exec(B);if((!A)||(!A[0]))
																 {
																     Changeset.error("Not a changeset: "+B);
}
var D=Changeset.parseNum(A[1]);\\nvar E=(A[2]==">")?1:-1;var H=Changeset.parseNum(A[3]);var F=D+E*H;var I=A[0].length;var C=B.indexOf("$");\\nif(C\\x3c0)
							      {
								  C=B.length;
}
return
							      {
								  oldLen:D,newLen:F,ops:B.substring(I,C),charBank:B.substring(C+1)
}
;
}
;Changeset.pack=function(C,G,F,D)
								  {
								      var A=G-C;\\nvar E=(A>=0?">"+Changeset.numToString(A):"\\x3c"+Changeset.numToString(-A));var B=[];B.push("Z:",Changeset.numToString(C),E,F,"$",D);\\nreturn B.join("");
}
;Changeset.applyToText=function(H,E)
								      {
									  var C=Changeset.unpack(H);Changeset.assert(E.length==C.oldLen,"mismatched apply: ",E.length," / ",C.oldLen);\\nvar F=Changeset.opIterator(C.ops);var G=Changeset.stringIterator(C.charBank);var B=Changeset.stringIterator(E);\\nvar A=Changeset.stringAssembler();while(F.hasNext())
																																										 {
																																										     var D=F.next();switch(D.opcode)
																																													{
																																													case"+":A.append(G.take(D.chars));\\nbreak;case"-":B.skip(D.chars);break;case"=":A.append(B.take(D.chars));break;
}

}
A.append(B.take(B.remaining()));\\nreturn A.toString();
}
;Changeset.mutateTextLines=function(G,F)
																																													{
																																													    var C=Changeset.unpack(G);var D=Changeset.opIterator(C.ops);\\nvar E=Changeset.stringIterator(C.charBank);var B=Changeset.textLinesMutator(F);while(D.hasNext())
																																																															      {
																																																																  var A=D.next();\\nswitch(A.opcode)
																																																																		     {
																																																																		     case"+":B.insert(E.take(A.chars),A.lines);break;case"-":B.remove(A.chars,A.lines);break;\\ncase"=":B.skip(A.chars,A.lines,(!!A.attribs));break;
}

}
B.close();
}
;Changeset.composeAttributes=function(G,F,E,D)
																																																																		     {
																																																																			 if((!G)&&E)
																																																																			     {
																																																																				 return F;\\n
}
if(!F)
																																																																						  {
																																																																						      return G;
}
var A=[];G.replace(/\\\\*([0-9a-z]+)/g,function(I,H)
																																																																			 {
																																																																			     A.push(D.getAttrib(Changeset.parseNum(H)));\\nreturn"";
}
);F.replace(/\\\\*([0-9a-z]+)/g,function(M,L)
																																																																			 {
																																																																			     var H=D.getAttrib(Changeset.parseNum(L));var K=false;\\nfor(var I=0;I\\x3cA.length;I++)
																																																																										      {
																																																																											  var J=A[I];if(J[0]==H[0])
																																																																													 {
																																																																													     if(H[1]||E)
																																																																														 {
																																																																														     J[1]=H[1];
}
else
																																																																														 {
																																																																														     A.splice(I,1);
}
K=true;\\nbreak;
}

}
if((!K)&&(H[1]||E))
																																																																																			  {
																																																																																			      A.push(H);
}
return"";
}
);A.sort();var B=Changeset.stringAssembler();for(var C=0;\\nC\\x3cA.length;C++)
																																																																																												    {
																																																																																													B.append("*");B.append(Changeset.numToString(D.putAttrib(A[C])));
}
return B.toString();\\n
}
;Changeset._slicerZipperFunc=function(A,B,C,D)
																																																																																													{
																																																																																													    if(A.opcode=="-")
																																																																																														{
																																																																																														    Changeset.copyOp(A,C);A.opcode="";
}
else
																																																																																														{
																																																																																														    if(!A.opcode)
																																																																																															{
																																																																																															    Changeset.copyOp(B,C);\\nB.opcode="";
}
else
																																																																																															{
																																																																																															    switch(B.opcode)
																																																																																																{
																																																																																																case"-":if(B.chars\\x3c=A.chars)
																																																																																																	{
																																																																																																	    if(A.opcode=="=")
																																																																																																		{
																																																																																																		    C.opcode="-";C.chars=B.chars;\\nC.lines=B.lines;C.attribs="";
}
A.chars-=B.chars;A.lines-=B.lines;B.opcode="";if(!A.chars)
																																																																																																																    {
																																																																																																																	A.opcode="";\\n
}

}
else
																																																																																																	{
																																																																																																	    if(A.opcode=="=")
																																																																																																		{
																																																																																																		    C.opcode="-";C.chars=A.chars;C.lines=A.lines;C.attribs="";
}
B.chars-=A.chars;\\nB.lines-=A.lines;A.opcode="";
}
break;case"+":Changeset.copyOp(B,C);B.opcode="";break;case"=":if(B.chars\\x3c=A.chars)
																																																																																																																							   {
																																																																																																																							       C.opcode=A.opcode;\\nC.chars=B.chars;C.lines=B.lines;C.attribs=Changeset.composeAttributes(A.attribs,B.attribs,A.opcode=="=",D);\\nB.opcode="";A.chars-=B.chars;A.lines-=B.lines;if(!A.chars)
																																																																																																																																														    {
																																																																																																																																															A.opcode="";
}

}
else
																																																																																																	{
																																																																																																	    C.opcode=A.opcode;C.chars=A.chars;\\nC.lines=A.lines;C.attribs=Changeset.composeAttributes(A.attribs,B.attribs,A.opcode=="=",D);A.opcode="";\\nB.chars-=A.chars;B.lines-=A.lines;
}
break;case"":Changeset.copyOp(A,C);A.opcode="";break;
}

}

}

}
;Changeset.applyToAttribution=function(D,C,B)
																																																																																																	    {
																																																																																																		var A=Changeset.unpack(D);\\nreturn Changeset.applyZip(C,0,A.ops,0,function(F,E,G)
																																																																																																		{
																																																																																																		    return Changeset._slicerZipperFunc(F,E,G,B);
}
);\\n
}
;Changeset.mutateAttributionLines=function(N,Q,O)
																																																																																																		    {
																																																																																																			var I=Changeset.unpack(N);var H=Changeset.opIterator(I.ops);\\nvar M=I.charBank;var G=0;var F=Changeset.textLinesMutator(Q);var B=null;function L()
																																																																																																			{
																																																																																																			    return(B&&B.hasNext())||F.hasMore();\\n
}
function P(R)
																																																																																																			{
																																																																																																			    if((!(B&&B.hasNext()))&&F.hasMore())
																																																																																																				{
																																																																																																				    var S=F.removeLines(1);B=Changeset.opIterator(S);\\n
}
if(B&&B.hasNext())
																																																																																																											     {
																																																																																																												 B.next(R);
}
else
																																																																																																				{
																																																																																																				    R.opcode="";
}

}
var D=null;function J(R)
																																																																																																			{
																																																																																																			    if(!D)
																																																																																																				{
																																																																																																				    D=Changeset.mergingOpAssembler();\\n
}
D.append(R);if(R.lines>0)
																																																																																																											 {
																																																																																																											     Changeset.assert(R.lines==1,"Can\\\'t have op.lines of ",R.lines," in attribution lines");\\nF.insert(D.toString(),1);D=null;
}

}
var A=Changeset.newOp();var E=Changeset.newOp();var C=Changeset.newOp();\\nwhile(A.opcode||H.hasNext()||E.opcode||L())
																																																																																																			{
																																																																																																			    if((!A.opcode)&&H.hasNext())
																																																																																																				{
																																																																																																				    H.next(A);
}
if((!A.opcode)&&(!E.opcode)&&(!D)&&(!(B&&B.hasNext())))
																																																																																																						   {
																																																																																																						       break;\\n
}
else
																																																																																																				{
																																																																																																				    if(A.opcode=="="&&A.lines>0&&(!A.attribs)&&(!E.opcode)&&(!D)&&(!(B&&B.hasNext())))
																																																																																																					{
																																																																																																					    F.skipLines(A.lines);\\nA.opcode="";
}
else
																																																																																																					{
																																																																																																					    if(A.opcode=="+")
																																																																																																						{
																																																																																																						    if(A.lines>1)
																																																																																																							{
																																																																																																							    var K=M.indexOf("\\\\n",G)+1-G;Changeset.copyOp(A,C);A.chars-=K;\\nA.lines--;C.lines=1;C.chars=K;
}
else
																																																																																																							{
																																																																																																							    Changeset.copyOp(A,C);A.opcode="";
}
J(C);G+=C.chars;C.opcode="";
}
else
																																																																																																						{
																																																																																																						    if((!E.opcode)&&L())
																																																																																																							{
																																																																																																							    P(E);\\n
}
Changeset._slicerZipperFunc(E,A,C,O);if(C.opcode)
																																																																																																													      {
																																																																																																														  J(C);C.opcode="";
}

}

}

}

}
Changeset.assert(!D,"line assembler not finished");\\nF.close();
}
;Changeset.joinAttributionLines=function(D)
																																																																																																														  {
																																																																																																														      var C=Changeset.mergingOpAssembler();for(var A=0;\\nA\\x3cD.length;A++)
																																																																																																																			       {
																																																																																																																				   var E=D[A];var B=Changeset.opIterator(E);while(B.hasNext())
																																																																																																																										{
																																																																																																																										    C.append(B.next());
}

}
return C.toString();\\n
}
;Changeset.splitAttributionLines=function(J,K)
																																																																																																																										    {
																																																																																																																											var G=Changeset.opIterator(J);var C=Changeset.mergingOpAssembler();\\nvar I=[];var D=0;function E(L)
																																																																																																																											{
																																																																																																																											    C.append(L);if(L.lines>0)
																																																																																																																													    {
																																																																																																																														I.push(C.toString());C.clear();
}
D+=L.chars;
}
while(G.hasNext())
																																																																																																																																				{
																																																																																																																																				    var A=G.next();\\nvar F=A.chars;var B=A.lines;while(B>1)
																																																																																																																																										      {
																																																																																																																																											  var H=K.indexOf("\\\\n",D)+1;Changeset.assert(H>0,"newlineEnd \\x3c= 0 in splitAttributionLines");\\nA.chars=H-D;A.lines=1;E(A);F-=A.chars;B-=A.lines;
}
if(B==1)
																																																																																																																																																														     {
																																																																																																																																																															 A.chars=F;A.lines=1;
}
E(A);
}
return I;
}
;Changeset.splitTextLines=function(A)
																																																																																																																																																															 {
																																																																																																																																																															     return A.match(/[^\\\\n]*(?:\\\\n|[^\\\\n]$)/g);\\n
}
;Changeset.compose=function(J,H,L)
																																																																																																																																																															     {
																																																																																																																																																																 var B=Changeset.unpack(J);var A=Changeset.unpack(H);var K=B.oldLen;\\nvar I=B.newLen;Changeset.assert(I==A.oldLen,"mismatched composition");var G=A.newLen;var D=Changeset.stringIterator(B.charBank);\\nvar E=Changeset.stringIterator(A.charBank);var C=Changeset.stringAssembler();var F=Changeset.applyZip(B.ops,0,A.ops,0,function(O,N,M)
																																																																																																																																																																 {
																																																																																																																																																																     var Q=O.opcode;\\nvar P=N.opcode;if(Q=="+"&&P=="-")
																																																																																																																																																																					  {
																																																																																																																																																																					      D.skip(Math.min(O.chars,N.chars));
}
Changeset._slicerZipperFunc(O,N,M,L);\\nif(M.opcode=="+")
																																																																																																																																																																     {
																																																																																																																																																																	 if(P=="+")
																																																																																																																																																																	     {
																																																																																																																																																																		 C.append(E.take(M.chars));
}
else
																																																																																																																																																																	     {
																																																																																																																																																																		 C.append(D.take(M.chars));
}

}

}
);return Changeset.pack(K,G,F,C.toString());\\n
}
;Changeset.attributeTester=function(D,B)
																																																																																																																																																																		 {
																																																																																																																																																																		     if(!B)
																																																																																																																																																																			 {
																																																																																																																																																																			     return C;
}
var A=B.putAttrib(D,true);if(A\\x3c0)
																																																																																																																																																																								     {
																																																																																																																																																																									 return C;\\n
}
else
																																																																																																																																																																			 {
																																																																																																																																																																			     var E=new RegExp("\\\\\\\\*"+Changeset.numToString(A)+"(?!\\\\\\\\w)");return function(F)
																																																																																																																																																																			     {
																																																																																																																																																																				 return E.test(F);\\n
}
;
}
function C(F)
																																																																																																																																																																		     {
																																																																																																																																																																			 return false;
}

}
;Changeset.identity=function(A)
																																																																																																																																																																			 {
																																																																																																																																																																			     return Changeset.pack(A,A,"","");
}
;Changeset.makeSplice=function(B,A,F,E,H,J)
																																																																																																																																																																			     {
																																																																																																																																																																				 var D=B.length;\\nif(A>=D)
																																																																																																																																																																				 {
																																																																																																																																																																				     A=D-1;
}
if(F>B.length-A-1)
																																																																																																																																																																						{
																																																																																																																																																																						    F=B.length-A-1;
}
var G=B.substring(A,A+F);var I=D+E.length-G.length;\\nvar C=Changeset.smartOpAssembler();C.appendOpWithText("=",B.substring(0,A));C.appendOpWithText("-",G);\\nC.appendOpWithText("+",E,H,J);C.endDocument();return Changeset.pack(D,I,C.toString(),E);
}
;Changeset.toSplices=function(G)
																																																																																																																																																																						    {
																																																																																																																																																																							var F=Changeset.unpack(G);\\nvar B=[];var C=0;var E=Changeset.opIterator(F.ops);var H=Changeset.stringIterator(F.charBank);var D=false;\\nwhile(E.hasNext())
																																																																																																																																																																							{
																																																																																																																																																																							    var A=E.next();if(A.opcode=="=")
																																																																																																																																																																									       {
																																																																																																																																																																										   C+=A.chars;D=false;
}
else
																																																																																																																																																																								{
																																																																																																																																																																								    if(!D)
																																																																																																																																																																									{
																																																																																																																																																																									    B.push([C,C,""]);\\nD=true;
}
if(A.opcode=="-")
																																																																																																																																																																													    {
																																																																																																																																																																														C+=A.chars;B[B.length-1][1]+=A.chars;
}
else
																																																																																																																																																																									{
																																																																																																																																																																									    if(A.opcode=="+")
																																																																																																																																																																										{
																																																																																																																																																																										    B[B.length-1][2]+=H.take(A.chars);\\n
}

}

}

}
return B;
}
;Changeset.characterRangeFollow=function(M,N,L,K)
																																																																																																																																																																										    {
																																																																																																																																																																											var C=N;var A=L;var J=Changeset.toSplices(M);\\nvar H=0;for(var G=0;G\\x3cJ.length;G++)
																																																																																																																																																																																		    {
																																																																																																																																																																																			var F=J[G];var B=F[0]+H;var E=F[1]+H;var I=F[2].length;var D=I-(E-B);\\nif(B\\x3c=C&&E>=A)
																																																																																																																																																																																												 {
																																																																																																																																																																																												     if(K)
																																																																																																																																																																																													 {
																																																																																																																																																																																													     C=A=B;
}
else
																																																																																																																																																																																													 {
																																																																																																																																																																																													     C=A=B+I;
}

}
else
																																																																																																																																																																																															   {
																																																																																																																																																																																															       if(E\\x3c=C)
																																																																																																																																																																																																   {
																																																																																																																																																																																																       C+=D;A+=D;
}
else
																																																																																																																																																																																																   {
																																																																																																																																																																																																       if(B>=A)
																																																																																																																																																																																																	   {
																																																																																																																																																																																																	   
}
else
																																																																																																																																																																																																	   {
																																																																																																																																																																																																	       if(B>=C&&E\\x3c=A)
																																																																																																																																																																																																		   {
																																																																																																																																																																																																		       A+=D;\\n
}
else
																																																																																																																																																																																																		   {
																																																																																																																																																																																																		       if(E\\x3cA)
																																																																																																																																																																																																			   {
																																																																																																																																																																																																			       C=B+I;A+=D;
}
else
																																																																																																																																																																																																			   {
																																																																																																																																																																																																			       A=B;
}

}

}

}

}
H+=D;
}
return[C,A];
}
;Changeset.moveOpsToNewPool=function(A,F,C)
																																																																																																																																																																																																			       {
																																																																																																																																																																																																				   var B=A.indexOf("$");\\nif(B\\x3c0)
																																																																																																																																																																																																				   {
																																																																																																																																																																																																				       B=A.length;
}
var D=A.substring(0,B);var E=A.substring(B);return D.replace(/\\\\*([0-9a-z]+)/g,function(K,G)
																																																																																																																																																																																																				   {
																																																																																																																																																																																																				       var H=Changeset.parseNum(G);\\nvar J=F.getAttrib(H);var I=C.putAttrib(J);return"*"+Changeset.numToString(I);
}
)+E;
}
;Changeset.makeAttribution=function(B)
																																																																																																																																																																																																				       {
																																																																																																																																																																																																					   var A=Changeset.smartOpAssembler();\\nA.appendOpWithText("+",B);return A.toString();
}
;Changeset.eachAttribNumber=function(A,D)
																																																																																																																																																																																																					   {
																																																																																																																																																																																																					       var B=A.indexOf("$");\\nif(B\\x3c0)
																																																																																																																																																																																																					       {
																																																																																																																																																																																																						   B=A.length;
}
var C=A.substring(0,B);C.replace(/\\\\*([0-9a-z]+)/g,function(F,E)
																																																																																																																																																																																																					       {
																																																																																																																																																																																																						   D(Changeset.parseNum(E));\\nreturn"";
}
);
}
;Changeset.filterAttribNumbers=function(B,A)
																																																																																																																																																																																																						   {
																																																																																																																																																																																																						       return Changeset.mapAttribNumbers(B,A);
}
;Changeset.mapAttribNumbers=function(A,E)
																																																																																																																																																																																																						       {
																																																																																																																																																																																																							   var B=A.indexOf("$");\\nif(B\\x3c0)
																																																																																																																																																																																																							   {
																																																																																																																																																																																																							       B=A.length;
}
var D=A.substring(0,B);var C=D.replace(/\\\\*([0-9a-z]+)/g,function(H,G)
																																																																																																																																																																																																							   {
																																																																																																																																																																																																							       var F=E(Changeset.parseNum(G));\\nif(F===true)
																																																																																																																																																																																																							       {
																																																																																																																																																																																																								   return H;
}
else
																																																																																																																																																																																																										 {
																																																																																																																																																																																																										     if((typeof F)==="number")
																																																																																																																																																																																																											 {
																																																																																																																																																																																																											     return"*"+Changeset.numToString(F);
}
else
																																																																																																																																																																																																											 {
																																																																																																																																																																																																											     return"";\\n
}

}

}
);return C+A.substring(B);
}
;Changeset.makeAText=function(A,B)
																																																																																																																																																																																																											     {
																																																																																																																																																																																																												 return
																																																																																																																																																																																																												 {
																																																																																																																																																																																																												     text:A,attribs:(B||Changeset.makeAttribution(A))
}
;\\n
}
;Changeset.applyToAText=function(A,B,C)
																																																																																																																																																																																																												     {
																																																																																																																																																																																																													 return
																																																																																																																																																																																																													 {
																																																																																																																																																																																																													     text:Changeset.applyToText(A,B.text),attribs:Changeset.applyToAttribution(A,B.attribs,C)
}
;\\n
}
;Changeset.cloneAText=function(A)
																																																																																																																																																																																																													     {
																																																																																																																																																																																																														 return
																																																																																																																																																																																																														 {
																																																																																																																																																																																																														     text:A.text,attribs:A.attribs
}
;
}
;Changeset.copyAText=function(A,B)
																																																																																																																																																																																																														     {
																																																																																																																																																																																																															 B.text=A.text;\\nB.attribs=A.attribs;
}
;Changeset.appendATextToAssembler=function(C,B)
																																																																																																																																																																																																															 {
																																																																																																																																																																																																															     var D=Changeset.opIterator(C.attribs);\\nvar A=Changeset.newOp();while(D.hasNext())
																																																																																																																																																																																																																								  {
																																																																																																																																																																																																																								      D.next(A);if(!D.hasNext())
																																																																																																																																																																																																																										    {
																																																																																																																																																																																																																											if(A.lines\\x3c=1)
																																																																																																																																																																																																																											    {
																																																																																																																																																																																																																												A.lines=0;A.chars--;\\nif(A.chars)
																																																																																																																																																																																																																															{
																																																																																																																																																																																																																															    B.append(A);
}

}
else
																																																																																																																																																																																																																											    {
																																																																																																																																																																																																																												var F=C.text.lastIndexOf("\\\\n",C.text.length-2)+1;var E=C.text.length-F-1;\\nA.lines--;A.chars-=(E+1);B.append(A);A.lines=0;A.chars=E;if(A.chars)
																																																																																																																																																																																																																																													    {
																																																																																																																																																																																																																																														B.append(A);
}

}

}
else
																																																																																																																																																																																																																									  {
																																																																																																																																																																																																																									      B.append(A);\\n
}

}

}
;Changeset.prepareForWire=function(C,B)
																																																																																																																																																																																																																									      {
																																																																																																																																																																																																																										  var A=new AttribPool();var D=Changeset.moveOpsToNewPool(C,B,A);\\nreturn
																																																																																																																																																																																																																										  {
																																																																																																																																																																																																																										      translated:D,pool:A
}
;
}
;Changeset.isIdentity=function(B)
																																																																																																																																																																																																																										      {
																																																																																																																																																																																																																											  var A=Changeset.unpack(B);return A.ops==""&&A.oldLen==A.newLen;\\n
}
;Changeset.opAttributeValue=function(C,B,A)
																																																																																																																																																																																																																											  {
																																																																																																																																																																																																																											      return Changeset.attribsAttributeValue(C.attribs,B,A);
}
;\\nChangeset.attribsAttributeValue=function(C,D,A)
																																																																																																																																																																																																																											      {
																																																																																																																																																																																																																												  var B="";if(C)
																																																																																																																																																																																																																													       {
																																																																																																																																																																																																																														   Changeset.eachAttribNumber(C,function(E)
																																																																																																																																																																																																																																	      {
																																																																																																																																																																																																																																		  if(A.getAttribKey(E)==D)
																																																																																																																																																																																																																																		      {
																																																																																																																																																																																																																																			  B=A.getAttribValue(E);\\n
}

}
);
}
return B;
}
;Changeset.builder=function(D)
																																																																																																																																																																																																																																			  {
																																																																																																																																																																																																																																			      var B=Changeset.smartOpAssembler();var A=Changeset.newOp();\\nvar E=Changeset.stringAssembler();var C=
																																																																																																																																																																																																																																			      {
																																																																																																																																																																																																																																				  keep:function(I,G,F,H)
																																																																																																																																																																																																																																				  {
																																																																																																																																																																																																																																				      A.opcode="=";A.attribs=(F&&Changeset.makeAttribsString("=",F,H))||"";\\nA.chars=I;A.lines=(G||0);B.append(A);return C;
}
,keepText:function(H,G,F)
																																																																																																																																																																																																																																				  {
																																																																																																																																																																																																																																				      B.appendOpWithText("=",H,G,F);\\nreturn C;
}
,insert:function(F,H,G)
																																																																																																																																																																																																																																				  {
																																																																																																																																																																																																																																				      B.appendOpWithText("+",F,H,G);E.append(F);return C;
}
,remove:function(G,F)
																																																																																																																																																																																																																																				  {
																																																																																																																																																																																																																																				      A.opcode="-";\\nA.attribs="";A.chars=G;A.lines=(F||0);B.append(A);return C;
}
,toString:function()
																																																																																																																																																																																																																																				  {
																																																																																																																																																																																																																																				      B.endDocument();var F=D+B.getLengthChange();\\nreturn Changeset.pack(D,F,B.toString(),E.toString());
}

}
;return C;
}
;Changeset.makeAttribsString=function(E,A,D)
																																																																																																																																																																																																																																				      {
																																																																																																																																																																																																																																					  if(!A)
																																																																																																																																																																																																																																					      {
																																																																																																																																																																																																																																						  return"";\\n
}
else
																																																																																																																																																																																																																																					      {
																																																																																																																																																																																																																																						  if((typeof A)=="string")
																																																																																																																																																																																																																																						      {
																																																																																																																																																																																																																																							  return A;
}
else
																																																																																																																																																																																																																																						      {
																																																																																																																																																																																																																																							  if(D&&A&&A.length)
																																																																																																																																																																																																																																							      {
																																																																																																																																																																																																																																								  if(A.length>1)
																																																																																																																																																																																																																																								      {
																																																																																																																																																																																																																																									  A=A.slice();A.sort();\\n
}
var C=[];for(var B=0;B\\x3cA.length;B++)
																																																																																																																																																																																																																																														{
																																																																																																																																																																																																																																														    var F=A[B];if(E=="="||(E=="+"&&F[1]))
																																																																																																																																																																																																																																																   {
																																																																																																																																																																																																																																																       C.push("*"+Changeset.numToString(D.putAttrib(F)));\\n
}

}
return C.join("");
}

}

}

}
;Changeset.subattribution=function(I,F,H)
																																																																																																																																																																																																																																																       {
																																																																																																																																																																																																																																																	   var E=Changeset.opIterator(I,0);var D=Changeset.smartOpAssembler();\\nvar A=Changeset.newOp();var B=Changeset.newOp();var C=Changeset.newOp();function G()
																																																																																																																																																																																																																																																	   {
																																																																																																																																																																																																																																																	       if(B.chars)
																																																																																																																																																																																																																																																		   {
																																																																																																																																																																																																																																																		       while(B.opcode&&(A.opcode||E.hasNext()))
																																																																																																																																																																																																																																																			   {
																																																																																																																																																																																																																																																			       if(!A.opcode)
																																																																																																																																																																																																																																																				   {
																																																																																																																																																																																																																																																				       E.next(A);\\n
}
if(B.opcode&&A.opcode&&B.chars>=A.chars&&A.lines>0&&B.lines\\x3c=0)
																																																																																																																																																																																																																																																							 {
																																																																																																																																																																																																																																																							     B.lines++;
}
Changeset._slicerZipperFunc(A,B,C,null);\\nif(C.opcode)
																																																																																																																																																																																																																																																														    {
																																																																																																																																																																																																																																																															D.append(C);C.opcode="";
}

}

}

}
B.opcode="-";B.chars=F;G();if(H===undefined)
																																																																																																																																																																																																																																																																						   {
																																																																																																																																																																																																																																																																						       if(A.opcode)
																																																																																																																																																																																																																																																																							   {
																																																																																																																																																																																																																																																																							       D.append(A);\\n
}
while(E.hasNext())
																																																																																																																																																																																																																																																																										   {
																																																																																																																																																																																																																																																																										       E.next(A);D.append(A);
}

}
else
																																																																																																																																																																																																																																																	       {
																																																																																																																																																																																																																																																		   B.opcode="=";B.chars=H-F;G();
}
return D.toString();
}
;\\nChangeset.inverse=function(U,F,G,J)
																																																																																																																																																																																																																																																		   {
																																																																																																																																																																																																																																																		       function P(a)
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																			   if(F.get)
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   return F.get(a);
}
else
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   return F[a];
}

}
function Z()
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																			   if((typeof F.length)=="number")
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   return F.length;\\n
}
else
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   return F.length();
}

}
function Q(a)
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																			   if(G.get)
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   return G.get(a);
}
else
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   return G[a];
}

}
function Y()
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																			   if((typeof G.length)=="number")
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   return G.length;\\n
}
else
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   return G.length();
}

}
var C=0;var E=0;var D=null;var I;var A=Changeset.newOp("+");var R=Changeset.unpack(U);\\nvar N=Changeset.opIterator(R.ops);var H=Changeset.builder(R.newLen);function M(c,e)
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																			   if((!D)||(I!=C))
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   D=Changeset.opIterator(Q(C));\\nI=C;var b=0;var d=false;while(!d)
																																																																																																																																																																																																																																																											       {
																																																																																																																																																																																																																																																												   D.next(A);if(b+A.chars>=E)
																																																																																																																																																																																																																																																														 {
																																																																																																																																																																																																																																																														     A.chars-=(E-b);d=true;
}
else
																																																																																																																																																																																																																																																												       {
																																																																																																																																																																																																																																																													   b+=A.chars;
}

}

}
while(c>0)
																																																																																																																																																																																																																																																															     {
																																																																																																																																																																																																																																																																 if((!A.chars)&&(!D.hasNext()))
																																																																																																																																																																																																																																																																     {
																																																																																																																																																																																																																																																																	 C++;\\nE=0;I=C;A.chars=0;D=Changeset.opIterator(Q(C));
}
if(!A.chars)
																																																																																																																																																																																																																																																																								    {
																																																																																																																																																																																																																																																																									D.next(A);
}
var a=Math.min(c,A.chars);e(a,A.attribs,a==A.chars&&A.lines>0);\\nc-=a;A.chars-=a;E+=a;
}
if((!A.chars)&&(!D.hasNext()))
																																																																																																																																																																																																																																																																																					       {
																																																																																																																																																																																																																																																																																						   C++;E=0;
}

}
function X(b,a)
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																			   if(a)
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   C+=a;E=0;
}
else
																																																																																																																																																																																																																																																			       {
																																																																																																																																																																																																																																																				   if(D&&I==C)
																																																																																																																																																																																																																																																				       {
																																																																																																																																																																																																																																																					   M(b,function()
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																		       
}
);\\n
}
else
																																																																																																																																																																																																																																																				       {
																																																																																																																																																																																																																																																					   E+=b;
}

}

}
function S(e)
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																			   var a=0;var b=Changeset.stringAssembler();var c=P(C).substring(E);a+=c.length;\\nb.append(c);var f=C+1;while(a\\x3ce)
																																																																																																																																																																																																																																																																      {
																																																																																																																																																																																																																																																																	  var d=P(f);a+=d.length;b.append(d);f++;
}
return b.toString().substring(0,e);\\n
}
function W(b)
																																																																																																																																																																																																																																																		       {
																																																																																																																																																																																																																																																			   var a=
																																																																																																																																																																																																																																																			   {
																																																																																																																																																																																																																																																			   
}
;return function(c)
																																																																																																																																																																																																																																																			   {
																																																																																																																																																																																																																																																			       if(!a[c])
																																																																																																																																																																																																																																																				   {
																																																																																																																																																																																																																																																				       a[c]=b(c);
}
return a[c];
}
;
}
var K=[];var L=[];while(N.hasNext())
																																																																																																																																																																																																																																																										       {
																																																																																																																																																																																																																																																											   var B=N.next();\\nif(B.opcode=="=")
																																																																																																																																																																																																																																																													      {
																																																																																																																																																																																																																																																														  if(B.attribs)
																																																																																																																																																																																																																																																														      {
																																																																																																																																																																																																																																																															  K.length=0;L.length=0;Changeset.eachAttribNumber(B.attribs,function(a)
																																																																																																																																																																																																																																																																					   {
																																																																																																																																																																																																																																																																					       K.push(J.getAttribKey(a));\\nL.push(J.getAttribValue(a));
}
);var T=W(function(f)
																																																																																																																																																																																																																																																																														   {
																																																																																																																																																																																																																																																																														       var d=[];for(var a=0;a\\x3cK.length;a++)
																																																																																																																																																																																																																																																																																    {
																																																																																																																																																																																																																																																																																	var c=K[a];var e=L[a];\\nvar b=Changeset.attribsAttributeValue(f,c,J);if(e!=b)
																																																																																																																																																																																																																																																																																										  {
																																																																																																																																																																																																																																																																																										      d.push([c,b]);
}

}
return Changeset.makeAttribsString("=",d,J);\\n
}
);M(B.chars,function(a,c,b)
																																																																																																																																																																																																																																																																																																			  {
																																																																																																																																																																																																																																																																																																			      H.keep(a,b?1:0,T(c));
}
);
}
else
																																																																																																																																																																																																																																																														      {
																																																																																																																																																																																																																																																															  X(B.chars,B.lines);H.keep(B.chars,B.lines);\\n
}

}
else
																																																																																																																																																																																																																																																																					      {
																																																																																																																																																																																																																																																																						  if(B.opcode=="+")
																																																																																																																																																																																																																																																																						      {
																																																																																																																																																																																																																																																																							  H.remove(B.chars,B.lines);
}
else
																																																																																																																																																																																																																																																																						      {
																																																																																																																																																																																																																																																																							  if(B.opcode=="-")
																																																																																																																																																																																																																																																																							      {
																																																																																																																																																																																																																																																																								  var V=S(B.chars);var O=0;M(B.chars,function(a,b,c)
																																																																																																																																																																																																																																																																											     {
																																																																																																																																																																																																																																																																												 H.insert(V.substr(O,a),b);\\nO+=a;
}
);
}

}

}

}
return Changeset.checkRep(H.toString());
}
;Changeset.follow=function(N,L,K,G)
																																																																																																																																																																																																																																																																												 {
																																																																																																																																																																																																																																																																												     var C=Changeset.unpack(N);\\nvar B=Changeset.unpack(L);var O=C.oldLen;var M=B.oldLen;Changeset.assert(O==M,"mismatched follow");var I=Changeset.stringIterator(C.charBank);\\nvar H=Changeset.stringIterator(B.charBank);var F=C.newLen;var D=0;var A=0;var E=Changeset.attributeTester(["insertorder","first"],G);\\nvar J=Changeset.applyZip(C.ops,0,B.ops,0,function(Q,P,R)
																																																																																																																																																																																																																																																																												     {
																																																																																																																																																																																																																																																																													 if(Q.opcode=="+"||P.opcode=="+")
																																																																																																																																																																																																																																																																													     {
																																																																																																																																																																																																																																																																														 var S;if(P.opcode!="+")
																																																																																																																																																																																																																																																																															   {
																																																																																																																																																																																																																																																																															       S=1;\\n
}
else
																																																																																																																																																																																																																																																																														     {
																																																																																																																																																																																																																																																																															 if(Q.opcode!="+")
																																																																																																																																																																																																																																																																															     {
																																																																																																																																																																																																																																																																																 S=2;
}
else
																																																																																																																																																																																																																																																																															     {
																																																																																																																																																																																																																																																																																 var V=I.peek(1);var T=H.peek(1);var W=E(Q.attribs);var U=E(P.attribs);\\nif(W&&!U)
																																																																																																																																																																																																																																																																																 {
																																																																																																																																																																																																																																																																																     S=1;
}
else
																																																																																																																																																																																																																																																																																	      {
																																																																																																																																																																																																																																																																																		  if(U&&!W)
																																																																																																																																																																																																																																																																																		      {
																																																																																																																																																																																																																																																																																			  S=2;
}
else
																																																																																																																																																																																																																																																																																		      {
																																																																																																																																																																																																																																																																																			  if(V=="\\\\n"&&T!="\\\\n")
																																																																																																																																																																																																																																																																																			      {
																																																																																																																																																																																																																																																																																				  S=2;
}
else
																																																																																																																																																																																																																																																																																			      {
																																																																																																																																																																																																																																																																																				  if(V!="\\\\n"&&T=="\\\\n")
																																																																																																																																																																																																																																																																																				      {
																																																																																																																																																																																																																																																																																					  S=1;
}
else
																																																																																																																																																																																																																																																																																				      {
																																																																																																																																																																																																																																																																																					  if(K)
																																																																																																																																																																																																																																																																																					      {
																																																																																																																																																																																																																																																																																						  S=2;\\n
}
else
																																																																																																																																																																																																																																																																																					      {
																																																																																																																																																																																																																																																																																						  S=1;
}

}

}

}

}

}

}
if(S==1)
																																																																																																																																																																																																																																																																																								 {
																																																																																																																																																																																																																																																																																								     I.skip(Q.chars);R.opcode="=";R.lines=Q.lines;R.chars=Q.chars;R.attribs="";Q.opcode="";\\n
}
else
																																																																																																																																																																																																																																																																														     {
																																																																																																																																																																																																																																																																															 H.skip(P.chars);Changeset.copyOp(P,R);P.opcode="";
}

}
else
																																																																																																																																																																																																																																																																													     {
																																																																																																																																																																																																																																																																														 if(Q.opcode=="-")
																																																																																																																																																																																																																																																																														     {
																																																																																																																																																																																																																																																																															 if(!P.opcode)
																																																																																																																																																																																																																																																																															     {
																																																																																																																																																																																																																																																																																 Q.opcode="";\\n
}
else
																																																																																																																																																																																																																																																																															     {
																																																																																																																																																																																																																																																																																 if(Q.chars\\x3c=P.chars)
																																																																																																																																																																																																																																																																																     {
																																																																																																																																																																																																																																																																																	 P.chars-=Q.chars;P.lines-=Q.lines;Q.opcode="";if(!P.chars)
																																																																																																																																																																																																																																																																																							   {
																																																																																																																																																																																																																																																																																							       P.opcode="";
}

}
else
																																																																																																																																																																																																																																																																																     {
																																																																																																																																																																																																																																																																																	 Q.chars-=P.chars;\\nQ.lines-=P.lines;P.opcode="";
}

}

}
else
																																																																																																																																																																																																																																																																														     {
																																																																																																																																																																																																																																																																															 if(P.opcode=="-")
																																																																																																																																																																																																																																																																															     {
																																																																																																																																																																																																																																																																																 Changeset.copyOp(P,R);if(!Q.opcode)
																																																																																																																																																																																																																																																																																			   {
																																																																																																																																																																																																																																																																																			       P.opcode="";\\n
}
else
																																																																																																																																																																																																																																																																																     {
																																																																																																																																																																																																																																																																																	 if(P.chars\\x3c=Q.chars)
																																																																																																																																																																																																																																																																																	     {
																																																																																																																																																																																																																																																																																		 Q.chars-=P.chars;Q.lines-=P.lines;P.opcode="";if(!Q.chars)
																																																																																																																																																																																																																																																																																								   {
																																																																																																																																																																																																																																																																																								       Q.opcode="";
}

}
else
																																																																																																																																																																																																																																																																																	     {
																																																																																																																																																																																																																																																																																		 R.lines=Q.lines;\\nR.chars=Q.chars;P.lines-=Q.lines;P.chars-=Q.chars;Q.opcode="";
}

}

}
else
																																																																																																																																																																																																																																																																															     {
																																																																																																																																																																																																																																																																																 if(!Q.opcode)
																																																																																																																																																																																																																																																																																     {
																																																																																																																																																																																																																																																																																	 Changeset.copyOp(P,R);\\nP.opcode="";
}
else
																																																																																																																																																																																																																																																																																     {
																																																																																																																																																																																																																																																																																	 if(!P.opcode)
																																																																																																																																																																																																																																																																																	     {
																																																																																																																																																																																																																																																																																		 Changeset.copyOp(Q,R);Q.opcode="";
}
else
																																																																																																																																																																																																																																																																																	     {
																																																																																																																																																																																																																																																																																		 R.opcode="=";R.attribs=Changeset.followAttributes(Q.attribs,P.attribs,G);\\nif(Q.chars\\x3c=P.chars)
																																																																																																																																																																																																																																																																																		 {
																																																																																																																																																																																																																																																																																		     R.chars=Q.chars;R.lines=Q.lines;P.chars-=Q.chars;P.lines-=Q.lines;Q.opcode="";if(!P.chars)
																																																																																																																																																																																																																																																																																												       {
																																																																																																																																																																																																																																																																																													   P.opcode="";\\n
}

}
else
																																																																																																																																																																																																																																																																																																{
																																																																																																																																																																																																																																																																																																    R.chars=P.chars;R.lines=P.lines;Q.chars-=P.chars;Q.lines-=P.lines;P.opcode="";
}

}

}

}

}

}
switch(R.opcode)
																																																																																																																																																																																																																																																																																																											    {
																																																																																																																																																																																																																																																																																																											    case"=":D+=R.chars;\\nA+=R.chars;break;case"-":D+=R.chars;break;case"+":A+=R.chars;break;
}

}
);A+=F-D;return Changeset.pack(F,A,J,B.charBank);\\n
}
;Changeset.followAttributes=function(F,E,B)
																																																																																																																																																																																																																																																																																																											    {
																																																																																																																																																																																																																																																																																																												if((!E)||(!B))
																																																																																																																																																																																																																																																																																																												    {
																																																																																																																																																																																																																																																																																																													return"";
}
if(!F)
																																																																																																																																																																																																																																																																																																														      {
																																																																																																																																																																																																																																																																																																															  return E;
}
var A=[];E.replace(/\\\\*([0-9a-z]+)/g,function(H,G)
																																																																																																																																																																																																																																																																																																												{
																																																																																																																																																																																																																																																																																																												    A.push(B.getAttrib(Changeset.parseNum(G)));\\nreturn"";
}
);F.replace(/\\\\*([0-9a-z]+)/g,function(K,J)
																																																																																																																																																																																																																																																																																																												{
																																																																																																																																																																																																																																																																																																												    var I=B.getAttrib(Changeset.parseNum(J));for(var G=0;\\nG\\x3cA.length;G++)
																																																																																																																																																																																																																																																																																																																		 {
																																																																																																																																																																																																																																																																																																																		     var H=A[G];if(I[0]==H[0])
																																																																																																																																																																																																																																																																																																																				    {
																																																																																																																																																																																																																																																																																																																					if(I[1]\\x3c=H[1])
																																																																																																																																																																																																																																																																																																																					    {
																																																																																																																																																																																																																																																																																																																						A.splice(G,1);
}
break;
}

}
return"";
}
);var C=Changeset.stringAssembler();\\nfor(var D=0;D\\x3cA.length;D++)
																																																																																																																																																																																																																																																																																																												{
																																																																																																																																																																																																																																																																																																												    C.append("*");C.append(Changeset.numToString(B.putAttrib(A[D])));
}
return C.toString();\\n
}
;function makeCSSManager(I)
																																																																																																																																																																																																																																																																																																												    {
																																																																																																																																																																																																																																																																																																													function E(N)
																																																																																																																																																																																																																																																																																																													{
																																																																																																																																																																																																																																																																																																													    var M=document.styleSheets;for(var K=0;K\\x3cM.length;K++)
																																																																																																																																																																																																																																																																																																																	   {
																																																																																																																																																																																																																																																																																																																	       var L=M[K];\\nif(L.title==N)
																																																																																																																																																																																																																																																																																																																			      {
																																																																																																																																																																																																																																																																																																																				  return L;
}

}
return null;
}
var A=E(I);function C()
																																																																																																																																																																																																																																																																																																													{
																																																																																																																																																																																																																																																																																																													    return(A.cssRules||A.rules);
}
function H(K)
																																																																																																																																																																																																																																																																																																													{
																																																																																																																																																																																																																																																																																																													    if(A.deleteRule)
																																																																																																																																																																																																																																																																{
A.deleteRule(K);\\n
}
else
{
A.removeRule(K);
}

}
function F(L,K)
{
if(A.insertRule)
{
A.insertRule(K+" 
{

}
",L);
}
else
{
A.addRule(K,null,L);\\n
}

}
var B=[];function D(L)
{
for(var K=0;K\\x3cB.length;K++)
{
if(B[K]==L)
{
return K;
}

}
return -1;
}
function G(K)
{
var L=D(K);\\nif(L\\x3c0)
{
F(0,K);B.splice(0,0,K);L=0;
}
return C().item(L).style;
}
function J(L)
{
var K=D(L);if(K>=0)
{
H(K);\\nB.splice(K,1);
}

}
return
{
selectorStyle:G,removeSelectorStyle:J,info:function()
{
return B.length+":"+C().length;\\n
}

}
;
}
var colorutils=
{

}
;colorutils.css2triple=function(C)
{
var B=colorutils.css2sixhex(C);function A(D)
{
return Number("0x"+D)/255;\\n
}
return[A(B.substr(0,2)),A(B.substr(2,2)),A(B.substr(4,2))];
}
;colorutils.css2sixhex=function(E)
{
var A=/[0-9a-fA-F]+/.exec(E)[0];\\nif(A.length!=6)
{
var C=A.charAt(0);var B=A.charAt(1);var D=A.charAt(2);A=C+C+B+B+D+D;
}
return A;
}
;colorutils.triple2css=function(B)
{
function A(D)
{
var C=colorutils.clamp(Math.round(D*255),0,255);\\nreturn("0"+C.toString(16)).slice(-2);
}
return"#"+A(B[0])+A(B[1])+A(B[2]);
}
;colorutils.clamp=function(A,C,B)
{
return A\\x3cC?C:(A>B?B:A);\\n
}
;colorutils.min3=function(C,B,A)
{
return(C\\x3cB)?(C\\x3cA?C:A):(B\\x3cA?B:A);
}
;colorutils.max3=function(C,B,A)
{
return(C>B)?(C>A?C:A):(B>A?B:A);\\n
}
;colorutils.colorMin=function(A)
{
return colorutils.min3(A[0],A[1],A[2]);
}
;colorutils.colorMax=function(A)
{
return colorutils.max3(A[0],A[1],A[2]);\\n
}
;colorutils.scale=function(B,A,C)
{
return colorutils.clamp(A+B*(C-A),0,1);
}
;colorutils.unscale=function(B,A,C)
{
return colorutils.clamp((B-A)/(C-A),0,1);\\n
}
;colorutils.scaleColor=function(C,B,A)
{
return[colorutils.scale(C[0],B,A),colorutils.scale(C[1],B,A),colorutils.scale(C[2],B,A)];\\n
}
;colorutils.unscaleColor=function(C,B,A)
{
return[colorutils.unscale(C[0],B,A),colorutils.unscale(C[1],B,A),colorutils.unscale(C[2],B,A)];\\n
}
;colorutils.luminosity=function(A)
{
return A[0]*0.3+A[1]*0.59+A[2]*0.11;
}
;colorutils.saturate=function(A)
{
var C=colorutils.colorMin(A);\\nvar B=colorutils.colorMax(A);if(B-C\\x3c=0)
{
return[1,1,1];
}
return colorutils.unscaleColor(A,C,B);
}
;colorutils.blend=function(C,B,A)
{
return[colorutils.scale(A,C[0],B[0]),colorutils.scale(A,C[1],B[1]),colorutils.scale(A,C[2],B[2])];\\n
}
;undoModule=(function()
{
var A=(function()
{
var M=[];var O=0;var Q="undoableEvent";var N="externalChange";\\nfunction P()
{
M.length=0;M.push(
{
elementType:Q,eventType:"bottom"
}
);O=1;
}
P();function T(Y)
{
var X=extend(
{

}
,Y);\\nX.elementType=Q;M.push(X);O++;
}
function U(Y)
{
var X=M.length-1;if(M[X].elementType==N)
{
M[X].changeset=Changeset.compose(M[X].changeset,Y,D());\\n
}
else
{
M.push(
{
elementType:N,changeset:Y
}
);
}

}
function R(e)
{
var c=M.length-1-e;var X=M.length-1;while(X>c||M[X].elementType==N)
{
if(M[X].elementType==N)
{
var Z=M[X];\\nvar Y=M[X-1];if(Y.backset)
{
var b=Z.changeset;var d=Y.backset;Y.backset=Changeset.follow(b,Y.backset,false,D());\\nZ.changeset=Changeset.follow(d,Z.changeset,true,D());if((typeof Y.selStart)=="number")
{
var a=Changeset.characterRangeFollow(b,Y.selStart,Y.selEnd);\\nY.selStart=a[0];Y.selEnd=a[1];if(Y.selStart==Y.selEnd)
{
Y.selFocusAtStart=false;
}

}

}
M[X-1]=Z;M[X]=Y;if(X>=2&&M[X-2].elementType==N)
{
Z.changeset=Changeset.compose(M[X-2].changeset,Z.changeset,D());\\nM.splice(X-2,1);X--;
}

}
else
{
X--;
}

}

}
function W(X)
{
R(X);return M[M.length-1-X];
}
function V()
{
return O;
}
function S()
{
R(0);\\nO--;return M.pop();
}
return
{
numEvents:V,popEvent:S,pushEvent:T,pushExternalChange:U,clearStack:P,getNthFromTop:W
}
;\\n
}
)();var B=0;function J()
{
A.clearStack();B=0;
}
function H(O,P)
{
var M=0;var N=0;while(M>=0&&M\\x3cO.length)
{
M=O.indexOf(P,M);\\nif(M>=0)
{
N++;M++;
}

}
return N;
}
function C(M,N)
{
return H(Changeset.unpack(M).ops,N);
}
function K(N,M)
{
if(!N)
{
return M;\\n
}
if(!M)
{
return N;
}
var U=C(N,"+");var T=C(M,"+");var R=C(N,"-");var Q=C(M,"-");if(U==1&&T==1&&R==0&&Q==0)
{
var O=Changeset.compose(N,M,D());\\nvar S=C(O,"+");var P=C(O,"-");if(S==1&&P==0)
{
return O;
}

}
else
{
if(U==0&&T==0&&R==1&&Q==1)
{
var O=Changeset.compose(N,M,D());\\nvar S=C(O,"+");var P=C(O,"-");if(S==0&&P==1)
{
return O;
}

}

}
return null;
}
function I(M)
{
var N=A.getNthFromTop(0);\\nfunction P()
{
if((typeof M.selStart)=="number")
{
N.selStart=M.selStart;N.selEnd=M.selEnd;N.selFocusAtStart=M.selFocusAtStart;\\n
}

}
if((!M.backset)||Changeset.isIdentity(M.backset))
{
P();
}
else
{
var O=false;if(N.eventType==M.eventType)
{
var Q=K(M.backset,N.backset);\\nif(Q)
{
N.backset=Q;P();O=true;
}

}
if(!O)
{
A.pushEvent(M);
}
B=0;
}

}
function G(M)
{
if(M&&!Changeset.isIdentity(M))
{
A.pushExternalChange(M);\\n
}

}
function E(M)
{
if((typeof M.selStart)!="number")
{
return null;
}
else
{
return
{
selStart:M.selStart,selEnd:M.selEnd,selFocusAtStart:M.selFocusAtStart
}
;\\n
}

}
function F(M)
{
if(B\\x3cA.numEvents()-1)
{
var O=A.getNthFromTop(B);var N=A.getNthFromTop(B+1);var P=M(O.backset,E(N));\\nA.pushEvent(P);B+=2;
}
else
{
M();
}

}
function L(M)
{
if(B>=2)
{
var O=A.getNthFromTop(0);var N=A.getNthFromTop(1);\\nM(O.backset,E(N));A.popEvent();B-=2;
}
else
{
M();
}

}
function D()
{
return undoModule.apool;
}
return
{
clearHistory:J,reportEvent:I,reportExternalChange:G,performUndo:F,performRedo:L,enabled:true,apool:null
}
;\\n
}
)();var _MAX_LIST_LEVEL=8;function sanitizeUnicode(A)
{
return A.replace(/[\\\\uffff\\\\ufffe\\\\ufeff\\\\ufdd0-\\\\ufdef\\\\ud800-\\\\udfff]/g,"?");\\n
}
function makeContentCollector(V,H,M,a,S)
{
H=H||
{

}
;var J;if(typeof(plugins)!="undefined")
{
J=plugins;
}
else
{
J=parent.parent.plugins;\\n
}
var C=a||
{
isNodeText:function(g)
{
return(g.nodeType==3);
}
,nodeTagName:function(g)
{
return g.tagName;
}
,nodeValue:function(g)
{
return g.nodeValue;\\n
}
,nodeNumChildren:function(g)
{
return g.childNodes.length;
}
,nodeChild:function(h,g)
{
return h.childNodes.item(g);\\n
}
,nodeProp:function(h,g)
{
return h[g];
}
,nodeAttr:function(h,g)
{
return h.getAttribute(g);
}
,optNodeInnerHTML:function(g)
{
return g.innerHTML;\\n
}

}
;var b=
{
div:1,p:1,pre:1,li:1
}
;function Q(g)
{
return !!b[(C.nodeTagName(g)||"").toLowerCase()];
}
function Y(g)
{
return sanitizeUnicode(g.replace(/[\\\\n\\\\r ]/g," ").replace(/\\\\xa0/g," ").replace(/\\\\t/g,"        "));\\n
}
function U(h,g)
{
return C.nodeProp(h,"_magicdom_"+g);
}
var B=(function()
{
var g=[];var k=[];var h=null;\\nvar j=Changeset.newOp("+");var i=
{
length:function()
{
return g.length;
}
,atColumnZero:function()
{
return g[g.length-1]==="";\\n
}
,startNew:function()
{
g.push("");i.flush(true);h=Changeset.smartOpAssembler();
}
,textOfLine:function(l)
{
return g[l];\\n
}
,appendText:function(l,m)
{
g[g.length-1]+=l;j.attribs=m;j.chars=l.length;h.append(j);
}
,textLines:function()
{
return g.slice();\\n
}
,attribLines:function()
{
return k;
}
,flush:function(l)
{
if(h)
{
k.push(h.toString());h=null;
}

}

}
;i.startNew();\\nreturn i;
}
());var A=
{

}
;function O(g)
{
if(!B.atColumnZero())
{
A.startNewLine(g);
}

}
var P,E,D;var K=[-1,-1],I=[-1,-1];\\nvar f=
{
div:1,p:1,pre:1
}
;function R(g,h)
{
if(C.nodeNumChildren(g)==0)
{
return true;
}
if(C.nodeNumChildren(g)==1&&U(g,"shouldBeEmpty")&&C.optNodeInnerHTML(g)=="&nbsp;"&&!U(g,"unpasted"))
{
if(h)
{
var i=C.nodeChild(g,0);\\nL(i,0,h);L(i,1,h);
}
return true;
}
return false;
}
function G(j,i)
{
var h=B.length()-1;var g=B.textOfLine(h).length;\\nif(g==0&&i.listType&&i.listType!="none")
{
g+=1;
}
g+=j;return[h,g];
}
function N(g,h,i)
{
if(!C.isNodeText(g))
{
L(g,h,i);\\n
}

}
function L(i,g,h)
{
if(E&&i==E.node&&E.index==g)
{
K=G(0,h);
}
if(D&&i==D.node&&D.index==g)
{
I=G(0,h);
}

}
A.incrementFlag=function(g,h)
{
g.flags[h]=(g.flags[h]||0)+1;\\n
}
;A.decrementFlag=function(g,h)
{
g.flags[h]--;
}
;A.incrementAttrib=function(g,h)
{
if(!g.attribs[h])
{
g.attribs[h]=1;\\n
}
else
{
g.attribs[h]++;
}
F(g);
}
;A.decrementAttrib=function(g,h)
{
g.attribs[h]--;F(g);
}
;function T(g,h)
{
var i=g.listType;\\ng.listLevel=(g.listLevel||0)+1;if(h!="none")
{
g.listNesting=(g.listNesting||0)+1;
}
g.listType=h;F(g);return i;\\n
}
function d(g,h)
{
g.listLevel--;if(g.listType!="none")
{
g.listNesting--;
}
g.listType=h;F(g);
}
function X(g,i)
{
var h=g.author;\\ng.authorLevel=(g.authorLevel||0)+1;g.author=i;F(g);return h;
}
function e(g,h)
{
g.authorLevel--;g.author=h;\\nF(g);
}
function F(g)
{
var h=[];for(var i in g.attribs)
{
if(g.attribs[i])
{
h.push([i,"true"]);
}

}
if(g.authorLevel>0)
{
var j=["author",g.author];\\nif(M.putAttrib(j,true)>=0)
{
h.push(j);
}

}
g.attribString=Changeset.makeAttribsString("+",h,M);
}
function W(g)
{
B.appendText("*",Changeset.makeAttribsString("+",[["list",g.listType],["insertorder","first"]],M));\\n
}
A.startNewLine=function(g)
{
if(g)
{
var h=B.textOfLine(B.length()-1).length==0;if(h&&g.listType&&g.listType!="none")
{
W(g);\\n
}

}
B.startNew();
}
;A.notifySelection=function(g)
{
if(g)
{
P=g;E=P.startPoint;D=P.endPoint;
}

}
;A.doAttrib=function(g,h)
{
g.localAttribs=(g.localAttribs||[]);\\ng.localAttribs.push(h);A.incrementAttrib(g,h);
}
;A.collectContent=function(j,g)
{
if(!g)
{
g=
{
flags:
{

}
,localAttribs:null,attribs:
{

}
,attribString:""
}
;\\n
}
var AH=g.localAttribs;g.localAttribs=null;var AA=Q(j);var AF=R(j,g);if(AA)
{
O(g);
}
var AG=B.length()-1;\\nN(j,0,g);if(C.isNodeText(j))
{
var l=C.nodeValue(j);var AB="";var o=0;if(l.length==0)
{
if(E&&j==E.node)
{
K=G(0,g);\\n
}
if(D&&j==D.node)
{
I=G(0,g);
}

}
while(l.length>0)
{
var u=0;if(g.flags.preMode)
{
var z=l.split("\\\\n",1)[0];u=z.length+1;\\nAB=l.substring(u);l=z;
}
else
{

}
if(E&&j==E.node&&E.index-o\\x3c=l.length)
{
K=G(E.index-o,g);
}
if(D&&j==D.node&&D.index-o\\x3c=l.length)
{
I=G(D.index-o,g);\\n
}
var p=l;if((!g.flags.preMode)&&/^[\\\\r\\\\n]*$/.exec(l))
{
p="";
}
var w=B.textOfLine(B.length()-1).length==0;\\nif(w)
{
p=p.replace(/^\\\\n*/,"");
}
if(w&&g.listType&&g.listType!="none")
{
W(g);
}
B.appendText(Y(p),g.attribString);\\no+=u;l=AB;if(l.length>0)
{
A.startNewLine(g);
}

}

}
else
{
var h=(C.nodeTagName(j)||"").toLowerCase();if(h=="br")
{
A.startNewLine(g);\\n
}
else
{
if(h=="script"||h=="style")
{

}
else
{
if(!AF)
{
var k=C.nodeAttr(j,"style");var n=C.nodeProp(j,"className");\\nvar r=(h=="pre");if((!r)&&H.safari)
{
r=(k&&/\\\\bwhite-space:\\\\s*pre\\\\b/i.exec(k));
}
if(r)
{
A.incrementFlag(g,"preMode");\\n
}
var q=null;var v=null;if(V)
{
J.callHook("collectContentPre",
{
cc:A,state:g,tname:h,styl:k,cls:n
}
);if(h=="b"||(k&&/\\\\bfont-weight:\\\\s*bold\\\\b/i.exec(k))||h=="strong")
{
A.doAttrib(g,"bold");\\n
}
if(h=="i"||(k&&/\\\\bfont-style:\\\\s*italic\\\\b/i.exec(k))||h=="em")
{
A.doAttrib(g,"italic");
}
if(h=="u"||(k&&/\\\\btext-decoration:\\\\s*underline\\\\b/i.exec(k))||h=="ins")
{
A.doAttrib(g,"underline");\\n
}
if(h=="s"||(k&&/\\\\btext-decoration:\\\\s*line-through\\\\b/i.exec(k))||h=="del")
{
A.doAttrib(g,"strikethrough");\\n
}
if(h=="ul")
{
var t;var y=n&&/(?:^| )list-(bullet[12345678])\\\\b/.exec(n);t=y&&y[1]||"bullet"+String(Math.min(_MAX_LIST_LEVEL,(g.listNesting||0)+1));\\nq=(T(g,t)||"none");
}
else
{
if((h=="div"||h=="p")&&n&&n.match(/(?:^| )ace-line\\\\b/))
{
q=(T(g,t)||"none");
}

}
if(S&&n)
{
var s=n.match(/\\\\S+/g);\\nif(s&&s.length>0)
{
for(var m=0;m\\x3cs.length;m++)
{
var AC=s[m];var AD=S(AC);if(AD)
{
v=(X(g,AD)||"none");break;\\n
}

}

}

}

}
var AE=C.nodeNumChildren(j);for(var m=0;m\\x3cAE;m++)
{
var AC=C.nodeChild(j,m);A.collectContent(AC,g);\\n
}
if(V)
{
J.callHook("collectContentPost",
{
cc:A,state:g,tname:h,styl:k,cls:n
}
);
}
if(r)
{
A.decrementFlag(g,"preMode");\\n
}
if(g.localAttribs)
{
for(var m=0;m\\x3cg.localAttribs.length;m++)
{
A.decrementAttrib(g,g.localAttribs[m]);
}

}
if(q)
{
d(g,q);\\n
}
if(v)
{
e(g,v);
}

}

}

}

}
if(!H.msie)
{
N(j,1,g);
}
if(AA)
{
if(B.length()-1==AG)
{
A.startNewLine(g);
}
else
{
O(g);
}

}
if(H.msie)
{
N(j,1,g);\\n
}
g.localAttribs=AH;
}
;A.notifyNextNode=function(g)
{
if((!g)||(Q(g)&&!R(g)))
{
O(null);
}

}
;var c=function()
{
return K;\\n
}
;var Z=function()
{
return I;
}
;A.getLines=function()
{
return B.textLines();
}
;A.finish=function()
{
B.flush();\\nvar h=B.attribLines();var g=A.getLines();g.length--;h.length--;var j=c();var k=Z();function l()
{
var r=2000;\\nvar v=10;var t=0;var s=0;for(var m=g.length-1;m>=0;m--)
{
var o=g[m];var q=h[m];if(o.length>r+v)
{
var n=[];\\nvar p=[];while(o.length>r)
{
lengthToTake=r;n.push(o.substring(0,lengthToTake));o=o.substring(lengthToTake);\\np.push(Changeset.subattribution(q,0,lengthToTake));q=Changeset.subattribution(q,lengthToTake);
}
if(o.length>0)
{
n.push(o);\\np.push(q);
}
function u(w)
{
if(w[0]\\x3c0)
{
return;
}
var x=w[0];var z=w[1];if(x>m)
{
x+=(n.length-1);
}
else
{
if(x==m)
{
var y=0;\\nwhile(z>n[y].length)
{
z-=n[y].length;y++;
}
x+=y;
}

}
w[0]=x;w[1]=z;
}
u(j);u(k);t++;s+=n.length;n.unshift(m,1);\\ng.splice.apply(g,n);p.unshift(m,1);h.splice.apply(h,p);
}

}
return
{
linesWrapped:t,numLinesAfter:s
}
;
}
var i=l();\\nreturn
{
selStart:j,selEnd:k,linesWrapped:i.linesWrapped,numLinesAfter:i.numLinesAfter,lines:g,lineAttribs:h
}
;\\n
}
;return A;
}
function makeChangesetTracker(K,A,J)
{
var D=Changeset.makeAText("\\\\n");var B=null;var C=Changeset.identity(1);\\nvar F=false;var E=false;var G=null;var H=null;function L()
{
if(G&&H===null)
{
H=K.setTimeout(function()
{
try
{
G();\\n
}
finally
{
H=null;
}

}
,0);
}

}
var I;return I=
{
isTracking:function()
{
return F;
}
,setBaseText:function(M)
{
I.setBaseAttributedText(Changeset.makeAText(M),null);\\n
}
,setBaseAttributedText:function(M,N)
{
J.withCallbacks("setBaseText",function(P)
{
F=true;D=Changeset.cloneAText(M);\\nif(N)
{
var O=(new AttribPool()).fromJsonable(N);D.attribs=Changeset.moveOpsToNewPool(D.attribs,O,A);
}
B=null;\\nC=Changeset.identity(M.text.length);E=true;try
{
P.setDocumentAttributedText(M);
}
finally
{
E=false;
}

}
);
}
,composeUserChangeset:function(M)
{
if(!F)
{
return;\\n
}
if(E)
{
return;
}
if(Changeset.isIdentity(M))
{
return;
}
C=Changeset.compose(C,M,A);L();
}
,applyChangesToBase:function(M,O,N)
{
if(!F)
{
return;\\n
}
J.withCallbacks("applyChangesToBase",function(V)
{
if(N)
{
var U=(new AttribPool()).fromJsonable(N);M=Changeset.moveOpsToNewPool(M,U,A);\\n
}
D=Changeset.applyToAText(M,D,A);var P=M;if(B)
{
var Q=B;B=Changeset.follow(M,Q,false,A);P=Changeset.follow(Q,M,true,A);\\n
}
var R=true;var S=C;C=Changeset.follow(P,S,R,A);var T=Changeset.follow(S,P,!R,A);var W=true;E=true;try
{
V.applyChangesetToDocument(T,W);\\n
}
finally
{
E=false;
}

}
);
}
,prepareUserChangeset:function()
{
var M;if(B)
{
M=Changeset.compose(B,C,A);
}
else
{
if(Changeset.isIdentity(C))
{
M=null;\\n
}
else
{
M=C;
}

}
var N=null;if(M)
{
B=M;C=Changeset.identity(Changeset.newLen(M));N=M;
}
var P=null;if(N)
{
var O=Changeset.prepareForWire(N,A);\\nP=O.pool.toJsonable();N=O.translated;
}
var Q=
{
changeset:N,apool:P
}
;return Q;
}
,applyPreparedChangesetToBase:function()
{
if(!B)
{
throw new Error("applySubmittedChangesToBase: no submitted changes to apply");\\n
}
D=Changeset.applyToAText(B,D,A);B=null;
}
,setUserChangeNotificationCallback:function(M)
{
G=M;
}
,hasUncommittedChanges:function()
{
return !!(B||(!Changeset.isIdentity(C)));\\n
}

}
;
}
var linestylefilter=
{

}
;linestylefilter.ATTRIB_CLASSES=
{
bold:"tag:b",italic:"tag:i",underline:"tag:u",strikethrough:"tag:s"
}
;\\nlinestylefilter.getAuthorClassName=function(A)
{
return"author-"+A.replace(/[^a-y0-9]/g,function(B)
{
if(B==".")
{
return"-";\\n
}
return"z"+B.charCodeAt(0)+"z";
}
);
}
;linestylefilter.getLineStyleFilter=function(C,F,B,E)
{
var A;if(typeof(plugins)!="undefined")
{
A=plugins;\\n
}
else
{
A=parent.parent.plugins;
}
if(C==0)
{
return B;
}
var D=B;var G=(function()
{
var O=C;var M=0;var K;var H;\\nfunction Q(S)
{
var R="";Changeset.eachAttribNumber(S,function(V)
{
var T=E.getAttribKey(V);if(T)
{
var U=E.getAttribValue(V);\\nif(U)
{
if(T=="author")
{
R+=" "+linestylefilter.getAuthorClassName(U);
}
else
{
if(T=="list")
{
R+=" list:"+U;\\n
}
else
{
if(linestylefilter.ATTRIB_CLASSES[T])
{
R+=" "+linestylefilter.ATTRIB_CLASSES[T];
}
else
{
R+=A.callHookStr("aceAttribsToClasses",
{
linestylefilter:linestylefilter,key:T,value:U
}
," "," ","");\\n
}

}

}

}

}

}
);return R.substring(1);
}
var P=Changeset.opIterator(F);var I,J;function L()
{
I=P.next();J=(I.opcode&&Q(I.attribs));\\n
}
L();function N()
{
if(M\\x3cO)
{
K=J;H=I.chars;L();while(I.opcode&&J==K)
{
H+=I.chars;L();
}

}

}
N();return function(R,T)
{
while(R.length>0)
{
if(H\\x3c=0)
{
return D(R,T);\\n
}
var S=R.length;if(S>H)
{
S=H;
}
var U=R.substring(0,S);R=R.substring(S);D(U,(T&&T+" ")+K);M+=S;H-=S;if(H==0)
{
N();\\n
}

}

}
;
}
)();return G;
}
;linestylefilter.getAtSignSplitterFilter=function(E,C)
{
var B=/@/g;B.lastIndex=0;var A=null;\\nvar D;while((D=B.exec(E)))
{
if(!A)
{
A=[];
}
A.push(D.index);
}
if(!A)
{
return C;
}
return linestylefilter.textAndClassFuncSplitter(C,A);\\n
}
;linestylefilter.getRegexpFilter=function(A,B)
{
return function(K,H)
{
A.lastIndex=0;var C=null;var E=null;\\nvar D;while((D=A.exec(K)))
{
if(!C)
{
C=[];E=[];
}
var F=D.index;var G=D[0];C.push([F,G]);E.push(F,F+G.length);\\n
}
if(!C)
{
return H;
}
function I(N)
{
for(var M=0;M\\x3cC.length;M++)
{
var L=C[M];if(N>=L[0]&&N\\x3cL[0]+L[1].length)
{
return L[1];\\n
}

}
return false;
}
var J=(function()
{
var L=0;return function(M,P)
{
var Q=M.length;var N=P;var O=I(L);if(O)
{
N+=" "+B+":"+O;\\n
}
H(M,N);L+=Q;
}
;
}
)();return linestylefilter.textAndClassFuncSplitter(J,E);
}
;
}
;linestylefilter.REGEX_WORDCHAR=/[\\\\u0030-\\\\u0039\\\\u0041-\\\\u005A\\\\u0061-\\\\u007A\\\\u00C0-\\\\u00D6\\\\u00D8-\\\\u00F6\\\\u00F8-\\\\u00FF\\\\u0100-\\\\u1FFF\\\\u3040-\\\\u9FFF\\\\uF900-\\\\uFDFF\\\\uFE70-\\\\uFEFE\\\\uFF10-\\\\uFF19\\\\uFF21-\\\\uFF3A\\\\uFF41-\\\\uFF5A\\\\uFF66-\\\\uFFDC]/;\\nlinestylefilter.REGEX_URLCHAR=new RegExp("("+/[-:@a-zA-Z0-9_.,~%+\\\\\\x2f\\\\\\\\?=&#;()$]/.source+"|"+linestylefilter.REGEX_WORDCHAR.source+")");\\nlinestylefilter.REGEX_URL=new RegExp(/(?:(?:https?|s?ftp|ftps|file|smb|afp|nfs|(x-)?man|gopher|txmt):\\\\\\x2f\\\\\\x2f|mailto:)/.source+linestylefilter.REGEX_URLCHAR.source+"*(?![:.,;])"+linestylefilter.REGEX_URLCHAR.source,"g");\\nlinestylefilter.getURLFilter=linestylefilter.getRegexpFilter(linestylefilter.REGEX_URL,"url");linestylefilter.textAndClassFuncSplitter=function(D,B)
{
var A=0;\\nvar C=0;while(B&&A\\x3cB.length&&B[A]==0)
{
A++;
}
function E(F,H)
{
if((!B)||A>=B.length)
{
D(F,H);C+=F.length;
}
else
{
var J=B;\\nvar G=J[A]-C;var I=F.length;if(G>=I)
{
D(F,H);C+=F.length;if(G==I)
{
A++;
}

}
else
{
if(G>0)
{
D(F.substring(0,G),H);\\nC+=G;
}
A++;E(F.substring(G),H);
}

}

}
return E;
}
;linestylefilter.getFilterStack=function(B,E,D)
{
var A=linestylefilter.getURLFilter(B,E);\\nvar C;if(typeof(plugins)!="undefined")
{
C=plugins;
}
else
{
C=parent.parent.plugins;
}
var F=C.callHook("aceGetFilterStack",
{
linestylefilter:linestylefilter,browser:D
}
);\\nF.map(function(G)
{
A=G(B,A);
}
);if(D!==undefined&&D.msie)
{
A=linestylefilter.getAtSignSplitterFilter(B,A);\\n
}
return A;
}
;linestylefilter.populateDomLine=function(F,D,E,G)
{
var A=F;if(A.slice(-1)=="\\\\n")
{
A=A.substring(0,A.length-1);\\n
}
function C(H,I)
{
G.appendSpan(H,I);
}
var B=linestylefilter.getFilterStack(A,C);B=linestylefilter.getLineStyleFilter(A.length,D,B,E);\\nB(A,"");
}
;var domline=
{

}
;domline.noop=function()
{

}
;domline.identity=function(A)
{
return A;
}
;domline.addToLineClass=function(A,B)
{
B.replace(/\\\\S+/g,function(C)
{
if(C.indexOf("line:")==0)
{
A=(A?A+" ":"")+C.substring(5);\\n
}

}
);return A;
}
;domline.createDomLine=function(N,H,J,O)
{
var A=
{
node:null,appendSpan:domline.noop,prepareForAdd:domline.noop,notifyAdded:domline.noop,clearSpans:domline.noop,finishUpdate:domline.noop,lineMarker:0
}
;\\nvar M=(J||
{

}
);var G=O;if(G)
{
A.node=G.createElement("div");
}
else
{
A.node=
{
innerHTML:"",className:""
}
;
}
var D=[];\\nvar F,E;var C=null;function K(R)
{
return domline.processSpaces(R,H);
}
var L=domline.identity;var Q=(H?L:K);\\nvar P=(H?K:L);var B="ace-line";A.appendSpan=function(W,R)
{
if(R.indexOf("list")>=0)
{
var V=/(?:^| )list:(\\\\S+)/.exec(R);\\nif(V)
{
V=V[1];if(V)
{
F=\\\'\\x3cul class="list-\\\'+V+\\\'">\\x3cli>\\\';E="\\x3c/li>\\x3c/ul>";
}
A.lineMarker+=W.length;return;
}

}
var X=null;\\nvar S=null;if(R.indexOf("url")>=0)
{
R=R.replace(/(^| )url:(\\\\S+)/g,function(b,a,Z)
{
X=Z;return a+"url";
}
);\\n
}
if(R.indexOf("tag")>=0)
{
R=R.replace(/(^| )tag:(\\\\S+)/g,function(b,a,Z)
{
if(!S)
{
S=[];
}
S.push(Z.toLowerCase());\\nreturn a+Z;
}
);
}
var T="";var U="";var Y;if(typeof(plugins)!="undefined")
{
Y=plugins;
}
else
{
Y=parent.parent.plugins;\\n
}
Y.callHook("aceCreateDomLine",
{
domline:domline,cls:R
}
).map(function(Z)
{
R=Z.cls;T=T+Z.extraOpenTags;U=Z.extraCloseTags+U;\\n
}
);if((!W)&&R)
{
B=domline.addToLineClass(B,R);
}
else
{
if(W)
{
if(X)
{
T=T+\\\'\\x3ca href="\\\'+X.replace(/\\\\"/g,"&quot;")+\\\'">\\\';\\nU="\\x3c/a>"+U;
}
if(S)
{
S.sort();T=T+"\\x3c"+S.join(">\\x3c")+">";S.reverse();U="\\x3c/"+S.join(">\\x3c/")+">"+U;
}
D.push(\\\'\\x3cspan class="\\\',R||"",\\\'">\\\',T,Q(domline.escapeHTML(W)),U,"\\x3c/span>");\\n
}

}

}
;A.clearSpans=function()
{
D=[];B="";A.lineMarker=0;
}
;function I()
{
var R=P(D.join(""));if(!R)
{
if((!G)||(!J))
{
R+="&nbsp;";\\n
}
else
{
if(!M.msie)
{
R+="\\x3cbr/>";
}

}

}
if(N)
{
R=(F||"")+R+(E||"");
}
D=F=E=null;if(R!==C)
{
C=R;A.node.innerHTML=C;\\n
}
if(B!==null)
{
A.node.className=B;
}

}
A.prepareForAdd=I;A.finishUpdate=I;A.getInnerHTML=function()
{
return C||"";\\n
}
;return A;
}
;domline.escapeHTML=function(B)
{
var A=/[&\\x3c>\\\'"]/g;/\\\']/;if(!A.MAP)
{
A.MAP=
{
"&":"&amp;","\\x3c":"&lt;",">":"&gt;",\\\'"\\\':"&#34;","\\\'":"&#39;"
}
;\\n
}
return B.replace(A,function(C)
{
return A.MAP[C];
}
);
}
;domline.processSpaces=function(F,G)
{
if(F.indexOf("\\x3c")\\x3c0&&!G)
{
return F.replace(/ /g,"&nbsp;");\\n
}
var B=[];F.replace(/\\x3c[^>]*>?| |[^ \\x3c]+/g,function(H)
{
B.push(H);
}
);if(G)
{
var D=true;var E=false;for(var A=B.length-1;\\nA>=0;A--)
{
var C=B[A];if(C==" ")
{
if(D||E)
{
B[A]="&nbsp;";
}
D=false;E=true;
}
else
{
if(C.charAt(0)!="\\x3c")
{
D=false;\\nE=false;
}

}

}
for(var A=0;A\\x3cB.length;A++)
{
var C=B[A];if(C==" ")
{
B[A]="&nbsp;";break;
}
else
{
if(C.charAt(0)!="\\x3c")
{
break;\\n
}

}

}

}
else
{
for(var A=0;A\\x3cB.length;A++)
{
var C=B[A];if(C==" ")
{
B[A]="&nbsp;";
}

}

}
return B.join("");
}
;\'+\'//-->\\n\\x3c/script>\')'));
T.push(('(\'\\x3cscript type="text/javascript">//<!--\\n\'+\'function OUTER(Ck)
{
var AK=false;var B4=false;var Ad="    ";var BW=8;var BO=4;var CD=4;var Ah=20;var Bj=8;\\nvar BS=8;var BU=[];var e="";var BL=false;var C=parent.editorInfo;var f=window.frameElement;var F=f.ace_outerWin;\\nf.ace_outerWin=null;var W=f.nextSibling;var u=W.nextSibling;var Cc=u.nextSibling;BX();var At=function(i)
{

}
;\\nvar Ar=function(i)
{
return true;
}
;var An=function()
{

}
;var A=
{
lines:newSkipList(),selStart:null,selEnd:null,selFocusAtStart:false,alltext:"",alines:[],apool:new AttribPool()
}
;\\nif(undoModule.enabled)
{
undoModule.apool=A.apool;
}
var B,E;var j=true;var K=true;var AP=true;var AX=true;\\nvar o=Ah+BO+BS;var Aj=Bj;var Bo=0,CR=0;var V=(AK&&top.console);if(!V)
{
var Al=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];\\nV=
{

}
;for(var Ag=0;Ag\\x3cAl.length;++Ag)
{
V[Al[Ag]]=function()
{

}
;
}

}
var Q=window.PROFILER;if(!Q)
{
Q=function()
{
return
{
start:I,mark:I,literal:I,end:I,cancel:I
}
;\\n
}
;
}
function I()
{

}
function Cf(i)
{
return i;
}
var t=I;window.dmesg=I;var O=parent;var AQ="monospace";var s=12;\\nfunction AV()
{
return Math.round(s*4/3);
}
var Y=null;function Bi()
{
Y=makeCSSManager("dynamicsyntax");
}
var M=makeChangesetTracker(O,A.apool,
{
withCallbacks:function(i,Cq)
{
T(i,function()
{
G(1);\\nCq(
{
setDocumentAttributedText:function(Cr)
{
Aa(Cr);
}
,applyChangesetToDocument:function(Ct,Cs)
{
var Cr=D.editEvent.eventType;\\nD.startNewEvent("nonundoable");c(Ct,Cs);D.startNewEvent(Cr);
}

}
);
}
);
}

}
);var Ao=
{

}
;function CW(i,Cq)
{
if((typeof i)!="string")
{
throw new Error("setAuthorInfo: author ("+i+") is not a string");\\n
}
if(!Cq)
{
delete Ao[i];if(Y)
{
Y.removeSelectorStyle(Au(BP(i)));
}

}
else
{
Ao[i]=Cq;if(Cq.bgcolor)
{
if(Y)
{
var Cr=Cq.bgcolor;\\nif((typeof Cq.fade)=="number")
{
Cr=BZ(Cr,Cq.fade);
}
Y.selectorStyle(Au(BP(i))).backgroundColor=Cr;
}

}

}

}
function BP(i)
{
return"author-"+i.replace(/[^a-y0-9]/g,function(Cq)
{
if(Cq==".")
{
return"-";\\n
}
return"z"+Cq.charCodeAt(0)+"z";
}
);
}
function Bd(i)
{
if(i.substring(0,7)=="author-")
{
return i.substring(7).replace(/[a-y0-9]+|-|z.+?z/g,function(Cq)
{
if(Cq=="-")
{
return".";\\n
}
else
{
if(Cq.charAt(0)=="z")
{
return String.fromCharCode(Number(Cq.slice(1,-1)));
}
else
{
return Cq;
}

}

}
);
}
return null;\\n
}
function Au(i)
{
return".authorColors ."+i;
}
function AT()
{
if(Y)
{
var Cq=u.offsetHeight;var Cr=AV();var i=0;\\nvar Ct=0;if(Cq\\x3cCr)
{
i=Math.ceil((Cr-Cq)/2);Ct=Cr-Cq-i;
}
var Cs=Y.selectorStyle("#innerdocbody span");Cs.paddingTop=Ct+"px";\\nCs.paddingBottom=i+"px";
}

}
function Cj(Cq)
{
var i=colorutils.css2triple(Cq);i=colorutils.saturate(i);i=colorutils.scaleColor(i,0,0.5/colorutils.luminosity(i));\\nreturn colorutils.triple2css(i);
}
function BZ(Cq,Cr)
{
var i=colorutils.css2triple(Cq);i=colorutils.blend(i,[1,1,1],Cr);\\nreturn colorutils.triple2css(i);
}
function By(i)
{
O.setTimeout(function()
{
alert(i);
}
,0);
}
C.ace_getRep=function()
{
return A;\\n
}
;var D=null;function N(Cr,Cy)
{
if(BL)
{
return;
}
if(D)
{
V.error("Can\\\'t enter callstack "+Cr+", already in "+D.type);\\n
}
var Cu=false;function Cx()
{
Cu=true;V.profile();
}
function Cs(C0)
{
return
{
eventType:C0,backset:null
}
;
}
function Ct(C0)
{
if(A.selStart&&A.selEnd)
{
var C3=A.lines.offsetOfIndex(A.selStart[0])+A.selStart[1];\\nvar C2=A.lines.offsetOfIndex(A.selEnd[0])+A.selEnd[1];C0.selStart=C3;C0.selEnd=C2;C0.selFocusAtStart=A.selFocusAtStart;\\n
}
if(undoModule.enabled)
{
var C1=false;try
{
if(C0.eventType=="setup"||C0.eventType=="importText"||C0.eventType=="setBaseText")
{
undoModule.clearHistory();\\n
}
else
{
if(C0.eventType=="nonundoable")
{
if(C0.changeset)
{
undoModule.reportExternalChange(C0.changeset);\\n
}

}
else
{
undoModule.reportEvent(C0);
}

}
C1=true;
}
finally
{
if(!C1)
{
undoModule.enabled=false;
}

}

}

}
function Cz(C2,C1)
{
var C0=D.editEvent;\\nif(!C1)
{
Ct(C0);
}
D.editEvent=Cs(C2);return C0;
}
D=
{
type:Cr,docTextChanged:false,selectionAffected:false,userChangedSelection:false,domClean:false,profileRest:Cx,isUserChange:false,repChanged:false,editEvent:Cs(Cr),startNewEvent:Cz
}
;\\nvar Cv=false;var Cw;try
{
Cw=Cy();Cv=true;
}
catch(Cq)
{
BU.push(
{
error:Cq,time:+new Date()
}
);t(Cq.toString());\\nthrow Cq;
}
finally
{
var i=D;if(Cv)
{
Ct(i.editEvent);if(i.domClean&&i.type!="setup")
{
if(i.isUserChange)
{
if(i.repChanged)
{
AG.notifyChange();\\n
}
else
{
AG.notifyTick();
}

}
Be.recolorLines();if(i.selectionAffected)
{
Ba();
}
if((i.docTextChanged||i.userChangedSelection)&&i.type!="applyChangesToBase")
{
CQ();\\n
}
if(i.docTextChanged&&i.type.indexOf("importText")\\x3c0)
{
An();
}

}

}
else
{
if(D.type=="idleWorkTimer")
{
H.atLeast(1000);\\n
}

}
D=null;if(Cu)
{
V.profileEnd();
}

}
return Cw;
}
C.ace_inCallStack=N;function T(Cq,i)
{
if(!D)
{
N(Cq,i);
}
else
{
i();\\n
}

}
C.ace_inCallStackIfNecessary=T;function Af(i)
{
if(A.lines.containsKey(i))
{
var Cq=A.lines.offsetOfKey(i);\\nvar Cr=A.lines.atKey(i).width;AU(Cq,Cq+Cr);
}

}
function AL(i)
{
return A.lines.atOffset(i).key;
}
var Be=(function()
{
var i=
{

}
;\\nvar Cq=
{

}
;Cq.setCharNeedsRecoloring=function(Cr)
{
if(Cr>=A.alltext.length)
{
Cr=A.alltext.length-1;
}
i[AL(Cr)]=true;\\n
}
;Cq.setCharRangeNeedsRecoloring=function(Ct,Cs)
{
if(Ct>=A.alltext.length)
{
Ct=A.alltext.length-1;
}
if(Cs>=A.alltext.length)
{
Cs=A.alltext.length-1;\\n
}
var Cv=A.lines.atOffset(Ct);var Cu=A.lines.atOffset(Cs).key;i[Cu]=true;var Cr=Cv;while(Cr&&Cr.key!=Cu)
{
i[Cr.key]=true;\\nCr=A.lines.next(Cr);
}

}
;Cq.recolorLines=function()
{
for(var Cr in i)
{
Af(Cr);
}
i=
{

}
;
}
;return Cq;
}
)();var AG=(function()
{
var i=
{

}
;\\ni.notifyTick=function()
{
Cs(false);
}
;i.notifyChange=function()
{
Cs(true);
}
;i.shouldNormalizeOnChar=function(Cu)
{
if(Cr.active)
{
return true;\\n
}
Cu=String.fromCharCode(Cu);return !!(Cq[Cu]);
}
;var Cr=
{
active:false,whichChars:null,whichLineKeys:null,expireTime:null
}
;\\nvar Cq=
{
"(":1,")":-1,"[":2,"]":-2,"
{
":3,"
}
":-3
}
;var Ct=/[
{

}
\\\\[\\\\]()]/g;function Cs(C1)
{
function C6(C9)
{
var C8=BI();\\nvar DB=100;var DA=3000;if(C8[0]>C9-DB)
{
C8[0]=C9-DB;
}
if(C8[0]\\x3cC9-DA)
{
C8[0]=C9-DA;
}
if(C8[0]\\x3c0)
{
C8[0]=0;\\n
}
if(C8[1]\\x3cC9+DB)
{
C8[1]=C9+DB;
}
if(C8[1]>C9+DA)
{
C8[1]=C9+DA;
}
if(C8[1]>A.lines.totalWidth())
{
C8[1]=A.lines.totalWidth();\\n
}
return C8;
}
function C7(DI,DD)
{
var C9=C6(DI);var DG=A.alltext.substring(C9[0],C9[1]);var DH=DG.replace(Ct,"(");\\nvar C8=DI-C9[0];var DF=[];var DB=false;var DC=false;function DJ()
{
if(C8\\x3c0)
{
return;
}
if(DD)
{
C8++;
}
else
{
C8--;\\n
}
if(C8\\x3c0||C8>=DG.length)
{
C8=-1;
}
if(C8>=0)
{
if(DD)
{
C8=DH.indexOf("(",C8);
}
else
{
C8=DH.lastIndexOf("(",C8);\\n
}

}

}
while((!DB)&&(C8>=0))
{
if(BH(C8+C9[0])=="p")
{
var DK=Cq[DG.charAt(C8)];var DE=DD;var DA=DK;if(DA\\x3c0)
{
DE=!DE;\\nDA=-DA;
}
if(DE)
{
DF.push(DA);
}
else
{
var DL=DF.pop();if(DL!=DA)
{
DB=true;DC=false;
}
else
{
if(DF.length==0)
{
DB=true;\\nDC=true;
}

}

}

}
if((!DB)&&(C8>=0))
{
DJ();
}

}
if(!DB)
{
return null;
}
return
{
chr:(C8+C9[0]),good:DC
}
;
}
var Cu=Cr;\\nvar Cv=null;var Cx=null;if(Cu.active&&(C1||(U()>Cu.expireTime)))
{
Cx=Cu.whichLineKeys;Cu.active=false;\\n
}
if((!Cu.active)&&C1&&P()&&r()>0)
{
var Cw=A6();if(Cw>0&&BH(Cw-1)=="p")
{
var C0=A.alltext.charAt(Cw-1);if(Cq[C0])
{
var C3=(Cq[C0]>0);\\nvar Cy=C7(Cw-1,C3);if(Cy)
{
var Cz=Cy.chr;var C5=Cy.good;Cu.active=true;Cv=
{

}
;Cv[Cw-1]="flash";Cv[Cz]=(C5?"flash":"flashbad");\\nCu.whichLineKeys=[];Cu.whichLineKeys.push(AL(Cw-1));Cu.whichLineKeys.push(AL(Cz));Cu.expireTime=U()+4000;\\nnewlyActive=true;
}

}

}

}
if(Cx)
{
Af(Cx[0]);Af(Cx[1]);
}
if(Cu.active&&Cv)
{
function C4(C9,C8,DA,DC)
{
var DB=Cv[DC];\\nif(C8)
{
DA(C9,C8+" "+DB);
}
else
{
DA(C9,C8);
}

}
for(var C2 in Cv)
{
AU((+C2),(+C2)+1,null,C4);
}

}

}
return i;
}
)();\\nfunction B8()
{
BL=true;if(H)
{
H.never();
}
BF();
}
function BN()
{
return;function Cq()
{
throw new Error("checkALines");\\n
}
if(A.alines.length!=A.lines.length())
{
Cq();
}
for(var Cr=0;Cr\\x3cA.alines.length;Cr++)
{
var Cv=A.alines[Cr];\\nvar Cw=A.lines.atIndex(Cr).text+"\\\\n";var Cx=Cw.length;var Cs=Changeset.opIterator(Cv);var Cu=0;while(Cs.hasNext())
{
var Ct=Cs.next();\\nCu+=Ct.chars;if(Cs.hasNext())
{
if(Ct.lines!=0)
{
Cq();
}

}
else
{
if(Ct.lines!=1)
{
Cq();
}

}

}
if(Cu!=Cx)
{
Cq();
}

}

}
function CE(i)
{
K=i;\\nvar Cq="doesWrap";S(B,"doesWrap",K);O.setTimeout(function()
{
T("setWraps",function()
{
G(7);BY();g();
}
);\\n
}
,0);
}
function CL(i)
{
var Cq=AX;AX=!!i;if(i!=Cq)
{
if(!i)
{
T("setStyled",function()
{
G(12);var Cr=[];for(var Cs in Ac)
{
Cr.push([Cs,""]);\\n
}
AR(0,A.alltext.length,Cr);
}
);
}

}

}
function Bv(i)
{
AQ=i;B.style.fontFamily=AQ;u.style.fontFamily=AQ;O.setTimeout(function()
{
AT();\\n
}
,0);
}
function Bl(i)
{
s=i;B.style.fontSize=s+"px";B.style.lineHeight=AV()+"px";W.style.lineHeight=AV()+"px";\\nu.style.fontSize=s+"px";O.setTimeout(function()
{
AT();
}
,0);
}
function BY()
{
AU(0,A.alltext.length);
}
function BG(i)
{
j=i;\\nif(!j)
{
Ay(false);
}
else
{
Ay(true);
}
S(B,"static",!j);
}
function Aw()
{
BG(j);
}
function CA(i,Ct,Cr)
{
var Cq;if(Cr)
{
if(i.charAt(i.length-1)!="\\\\n")
{
throw new Error("new raw text must end with newline");\\n
}
if(/[\\\\r\\\\t\\\\xa0]/.exec(i))
{
throw new Error("new raw text must not contain CR, tab, or nbsp");
}
Cq=i.substring(0,i.length-1).split("\\\\n");\\n
}
else
{
Cq=map(i.split("\\\\n"),CI);
}
var Cs="\\\\n";if(Cq.length>0)
{
Cs=Cq.join("\\\\n")+"\\\\n";
}
T("importText"+(Ct?"Undoable":""),function()
{
Bb(Cs);\\n
}
);if(Cr&&A.alltext!=i)
{
throw new Error("mismatch error setting raw text in importText");
}

}
function B9(i,Cq,Cs)
{
i=Changeset.cloneAText(i);\\nif(Cq)
{
var Cr=(new AttribPool()).fromJsonable(Cq);i.attribs=Changeset.moveOpsToNewPool(i.attribs,Cr,A.apool);\\n
}
T("importText"+(Cs?"Undoable":""),function()
{
Aa(i);
}
);
}
function Aa(Cr)
{
G(8);var Ct=A.lines.totalWidth();\\nvar Cs=A.lines.length();var Cv=A.lines.offsetOfIndex(Cs-1);var Cu=A.lines.atIndex(Cs-1).text.length;var Cq=Changeset.smartOpAssembler();\\nvar i=Changeset.newOp("-");i.chars=Cv;i.lines=Cs-1;Cq.append(i);i.chars=Cu;i.lines=0;Cq.append(i);Changeset.appendATextToAssembler(Cr,Cq);\\nvar Cw=Ct+Cq.getLengthChange();var Cx=Changeset.checkRep(Changeset.pack(Ct,Cw,Cq.toString(),Cr.text.slice(0,-1)));\\nc(Cx);d([0,A.lines.atIndex(0).lineMarker],[0,A.lines.atIndex(0).lineMarker]);H.atMost(100);if(A.alltext!=Cr.text)
{
t(htmlPrettyEscape(A.alltext));\\nt(htmlPrettyEscape(Cr.text));throw new Error("mismatch error setting raw text in setDocAText");
}

}
function Bb(i)
{
Aa(Changeset.makeAText(i));\\n
}
function CX()
{
var Cq=A.alltext;var i=Cq.length;if(i>0)
{
i--;
}
return Cq.substring(0,i);
}
function CM()
{
if(D&&!D.domClean)
{
T("exportText",function()
{
G(2);\\n
}
);
}
return CX();
}
function B7()
{
g();
}
function Bn(i)
{
Ar=i;
}
function Bq(i)
{
At=i;
}
function Bp(i)
{
An=i;
}
function Bm()
{
if(D&&!D.domClean)
{
T("getFormattedCode",p);\\n
}
var Cq=[];if(A.lines.length()>0)
{
var i=A.lines.atIndex(0);while(i)
{
var Cr=i.domInfo;Cq.push((Cr&&Cr.getInnerHTML())||domline.processSpaces(domline.escapeHTML(i.text),K)||"&nbsp;");\\ni=A.lines.next(i);
}

}
return\\\'\\x3cdiv class="syntax">\\x3cdiv>\\\'+Cq.join("\\x3c/div>\\\\n\\x3cdiv>")+"\\x3c/div>\\x3c/div>";
}
var AZ=
{
clearauthorship:function(i)
{
if((!(A.selStart&&A.selEnd))||P())
{
if(i)
{
i();\\n
}
else
{
AR(0,A.alltext.length,[["author",""]]);
}

}
else
{
Az("author","");
}

}
,
}
;function CS(i)
{
i=i.toLowerCase();\\nvar Cq=Array.prototype.slice.call(arguments,1);if(AZ[i])
{
N(i,function()
{
G(9);AZ[i].apply(AZ,Cq);
}
);
}

}
function CB(Cr,i,Cq)
{
N("replaceRange",function()
{
G(9);\\na(Cr,i,Cq);
}
);
}
C.ace_focus=Bc;C.ace_importText=CA;C.ace_importAText=B9;C.ace_exportText=CM;C.ace_editorChangedSize=B7;\\nC.ace_setOnKeyPress=Bn;C.ace_setOnKeyDown=Bq;C.ace_setNotifyDirty=Bp;C.ace_dispose=B8;C.ace_getFormattedCode=Bm;\\nC.ace_setEditable=BG;C.ace_execCommand=CS;C.ace_replaceRange=CB;C.ace_callWithAce=function(Cs,Cq,Cr)
{
var i=function()
{
return Cs(C);\\n
}
;if(Cr!==undefined)
{
var Ct=i;i=function()
{
C.ace_fastIncorp(9);Ct();
}
;
}
if(Cq!==undefined)
{
return C.ace_inCallStack(Cq,i);\\n
}
else
{
return i();
}

}
;C.ace_setProperty=function(Cr,i)
{
var Cq=Cr.toLowerCase();if(Cq=="wraps")
{
CE(i);
}
else
{
if(Cq=="showsauthorcolors")
{
S(B,"authorColors",!!i);\\n
}
else
{
if(Cq=="showsuserselections")
{
S(B,"userSelections",!!i);
}
else
{
if(Cq=="showslinenumbers")
{
AP=!!i;\\nS(W,"sidedivhidden",!AP);g();
}
else
{
if(Cq=="grayedout")
{
S(F.document.body,"grayedout",!!i);
}
else
{
if(Cq=="dmesg")
{
t=i;\\nwindow.dmesg=i;
}
else
{
if(Cq=="userauthor")
{
e=String(i);
}
else
{
if(Cq=="styled")
{
CL(i);
}
else
{
if(Cq=="textface")
{
Bv(i);\\n
}
else
{
if(Cq=="textsize")
{
Bl(i);
}

}

}

}

}

}

}

}

}

}

}
;C.ace_setBaseText=function(i)
{
M.setBaseText(i);
}
;C.ace_setBaseAttributedText=function(Cq,i)
{
AT();\\nM.setBaseAttributedText(Cq,i);
}
;C.ace_applyChangesToBase=function(Cr,i,Cq)
{
M.applyChangesToBase(Cr,i,Cq);\\n
}
;C.ace_prepareUserChangeset=function()
{
return M.prepareUserChangeset();
}
;C.ace_applyPreparedChangesetToBase=function()
{
M.applyPreparedChangesetToBase();\\n
}
;C.ace_setUserChangeNotificationCallback=function(i)
{
M.setUserChangeNotificationCallback(i);
}
;C.ace_setAuthorInfo=function(i,Cq)
{
CW(i,Cq);\\n
}
;C.ace_setAuthorSelectionRange=function(Cq,Cr,i)
{
M.setAuthorSelectionRange(Cq,Cr,i);
}
;C.ace_getUnhandledErrors=function()
{
return BU.slice();\\n
}
;C.ace_getDebugProperty=function(i)
{
if(i=="debugger")
{
window["eval"]("debugger");
}
else
{
if(i=="rep")
{
return A;\\n
}
else
{
if(i=="window")
{
return window;
}
else
{
if(i=="document")
{
return document;
}

}

}

}
return undefined;
}
;function U()
{
return(new Date()).getTime();\\n
}
function AB(Ct)
{
var Cr=U();var Cu=0;var i=false;var Cs=false;var Cq=function()
{
if(i)
{
if((!Cs))
{
Cs=true;\\n
}
return true;
}
var Cv=U()-Cr;if(Cv>Ct)
{
i=true;return true;
}
else
{
Cu=Cv;return false;
}

}
;Cq.elapsed=function()
{
return U()-Cr;\\n
}
;return Cq;
}
function Ca(Ct)
{
var i=null;var Cq=0;function Cs()
{
if(i)
{
O.clearTimeout(i);i=null;
}

}
function Cr(Cw)
{
Cs();\\nCq=Cw;var Cv=Cw-U();if(Cv\\x3c0)
{
Cv=0;
}
i=O.setTimeout(Cu,Cv);
}
function Cu()
{
i=null;Ct();
}
return
{
atMost:function(Cw)
{
var Cv=U()+Cw;\\nif((!i)||Cq>Cv)
{
Cr(Cv);
}

}
,atLeast:function(Cw)
{
var Cv=U()+Cw;if((!i)||Cq\\x3cCv)
{
Cr(Cv);
}

}
,never:function()
{
Cs();\\n
}

}
;
}
function G(i)
{
p(AB(0));
}
C.ace_fastIncorp=G;function A8()
{
var i=A8;var Cs=(i.failures||0);if(Cs\\x3c5)
{
var Cr=AB(40);\\nvar Ct=p(Cr);if(Cr())
{
i.failures=Cs+1;
}
return true;
}
else
{
var Cq=(i.skipCount||0);Cq++;if(Cq==20)
{
Cq=0;\\ni.failures=0;
}
i.skipCount=Cq;
}
return false;
}
var H=Ca(function()
{
if(!j)
{
return;
}
if(q)
{
H.atLeast(500);return;\\n
}
N("idleWorkTimer",function()
{
var i=AB(250);var Cr=false;var Cs=false;try
{
p(i);if(i())
{
return;
}
CO();if(i())
{
return;\\n
}
var Cu=BI();var Ct=[0,A.lines.totalWidth()];Cr=true;Cs=true;
}
finally
{
if(Cs)
{
H.atMost(1000);
}
else
{
if(Cr)
{
H.atMost(500);\\n
}
else
{
var Cq=Math.round(i.elapsed()/2);if(Cq\\x3c100)
{
Cq=100;
}
H.atMost(Cq);
}

}

}

}
);
}
);var B1=1;function L(Cq)
{
var i=Cq.id;\\nif(i)
{
return i;
}
return(Cq.id="magicdomid"+(B1++));
}
function AU(Cs,Cy,Ct,Cw)
{
if(Cy\\x3c=Cs)
{
return;
}
if(Cs\\x3c0||Cs>=A.lines.totalWidth())
{
return;\\n
}
var i=A.lines.atOffset(Cs);var Cq=A.lines.offsetOfEntry(i);var Cr=A.lines.indexOfEntry(i);var Cx=false;\\nvar Cz=null;var C2=null;Ct=(Ct||I);var Cv;var Cu=function(C3,C4)
{
i.domInfo.appendSpan(C3,C4);
}
;if(Cw)
{
var C1=Cu;\\nCu=function(C3,C4)
{
Cw(C3,C4,C1,Cv);Cv+=C3.length;
}
;
}
while(i&&Cq\\x3cCy&&!Ct())
{
var C0=Cq+i.width;Cv=Cq;i.domInfo.clearSpans();\\nBJ(i,Cu,Cq);i.domInfo.finishUpdate();y(i.lineNode);if(A.selStart&&A.selStart[0]==Cr||A.selEnd&&A.selEnd[0]==Cr)
{
Cx=true;\\n
}
if(Cz===null)
{
Cz=Cr;
}
C2=Cr;Cq=C0;i=A.lines.next(i);Cr++;
}
if(Cx)
{
D.selectionAffected=true;
}

}
function BJ(i,Ct,Cx)
{
var Cs=Cx;\\nif((typeof Cs)!="number")
{
Cs=A.lines.offsetOfEntry(i);
}
var Cq=i.text;var Cy=i.width;if(Cq.length==0)
{
var Cu=linestylefilter.getLineStyleFilter(0,"",Ct,A.apool);\\nCu("","");
}
else
{
var Cz=0;var Cr=linestylefilter.getFilterStack(Cq,Ct,browser);var Cv=A.lines.indexOfEntry(i);\\nvar Cw=A.alines[Cv];Cr=linestylefilter.getLineStyleFilter(Cq.length,Cw,Cr,A.apool);Cr(Cq,"");
}

}
function BH(i)
{
return"";\\n
}
var AE;function A3()
{
AE=
{
cleanNodesNearChanges:
{

}

}
;
}
A3();function k(Cr)
{
var i=Q("getCleanNodeByKey",false);\\ni.extra=0;var Cq=E.getElementById(Cr);while(Cq&&X(Cq))
{
i.extra++;Cq.id="";Cq=E.getElementById(Cr);
}
i.literal(i.extra,"extra");\\ni.end();return Cq;
}
function w(Ct)
{
var i;var Cv;if(!X(Ct))
{
i=Ct;var Cu=i.previousSibling;var Cs=i.nextSibling;\\nCv=((Cu&&X(Cu))||(Cs&&X(Cs)));
}
else
{
var Cq=Ct.previousSibling;while(Cq&&X(Cq))
{
Cq=Cq.previousSibling;\\n
}
if(Cq)
{
i=Cq;
}
else
{
var Cr=Ct.nextSibling;while(Cr&&X(Cr))
{
Cr=Cr.nextSibling;
}
if(Cr)
{
i=Cr;
}

}
if(!i)
{
return;\\n
}
Cv=true;
}
if(Cv)
{
AE.cleanNodesNearChanges["$"+L(i)]=true;
}
else
{
var Cy=L(i);var Cu=i.previousSibling;var Cs=i.nextSibling;\\nvar C2=((Cu&&L(Cu))||null);var C1=((Cs&&L(Cs))||null);var Cw=A.lines.prev(A.lines.atKey(Cy));var Cx=A.lines.next(A.lines.atKey(Cy));\\nvar C0=((Cw&&Cw.key)||null);var Cz=((Cx&&Cx.key)||null);if(C2!=C0||C1!=Cz)
{
AE.cleanNodesNearChanges["$"+L(i)]=true;\\n
}

}

}
function Av()
{
if(D.observedSelection)
{
return;
}
D.observedSelection=true;var Ct=Q("getSelection",false);\\nvar Cr=Ae();Ct.end();if(Cr)
{
function Cs(Cu)
{
if((!Cu)||Cu==B)
{
return null;
}
while(Cu.parentNode!=B)
{
Cu=Cu.parentNode;\\n
}
return Cu;
}
var Cq=Cs(Cr.startPoint.node);var i=Cs(Cr.endPoint.node);if(Cq)
{
w(Cq);
}
if(i&&Cq!=i)
{
w(i);\\n
}

}

}
function BV()
{
if(B.getElementsByTagName)
{
var Cs=B.getElementsByTagName("style");for(var Cr=0;Cr\\x3cCs.length;\\nCr++)
{
var Cq=Cs[Cr];while(Cq.parentNode&&Cq.parentNode!=B)
{
Cq=Cq.parentNode;
}
if(Cq.parentNode==B)
{
w(Cq);\\n
}

}

}

}
function p(DA)
{
if(D.domClean)
{
return false;
}
q=false;D.isUserChange=true;DA=(DA||function()
{
return false;\\n
}
);if(AK&&top.DONT_INCORP||window.DEBUG_DONT_INCORP)
{
return false;
}
var Cr=Q("incorp",false);if(!B.firstChild)
{
B.innerHTML="\\x3cdiv>\\x3c!-- -->\\x3c/div>";\\n
}
Cr.mark("obs");Av();BV();Cr.mark("dirty");var Cz=BK();var DO=true;var C6=0;var Cq,Cu;while(C6\\x3cCz.length)
{
Cq=Cz[C6][0];\\nCu=Cz[C6][1];if(!((Cq==0||k(A.lines.atIndex(Cq-1).key))&&(Cu==A.lines.length()||k(A.lines.atIndex(Cu).key))))
{
DO=false;\\nbreak;
}
C6++;
}
if(!DO)
{
var DT=B.childNodes.length;for(var C1=0;C1\\x3cDT;C1++)
{
var C8=B.childNodes.item(C1);\\nif((C8.tagName)&&((!C8.id)||(!A.lines.containsKey(C8.id))))
{
w(C8);
}

}
Cz=BK();
}
A3();Cr.mark("getsel");var Cw=Ae();\\nvar Ct,Cs;var DF=0;var C7=[];var C4=0;var C9=[];Cr.mark("ranges");Cr.literal(Cz.length,"numdirt");var DJ=[];\\nwhile(DF\\x3cCz.length)
{
var DH=Cz[DF];Cq=DH[0];Cu=DH[1];var C2=(((Cq==0)&&B.firstChild)||k(A.lines.atIndex(Cq-1).key).nextSibling);\\nC2=(C2&&X(C2)&&C2);var Cv=(((Cu==A.lines.length())&&B.lastChild)||k(A.lines.atIndex(Cu).key).previousSibling);\\nCv=(Cv&&X(Cv)&&Cv);if(C2&&Cv)
{
var C0=makeContentCollector(AX,browser,A.apool,null,Bd);C0.notifySelection(Cw);\\nvar DK=[];for(var Cy=C2;Cy&&!(Cy.previousSibling&&Cy.previousSibling==Cv);Cy=Cy.nextSibling)
{
if(browser.msie)
{
try
{
Cy.createTextRange().execCommand("unlink",false,null);\\n
}
catch(DS)
{

}

}
C0.collectContent(Cy);DK.push(Cy);
}
C0.notifyNextNode(Cv.nextSibling);var Cx=C0.getLines();\\nif((Cx.length\\x3c=1||Cx[Cx.length-1]!=="")&&Cv.nextSibling)
{
Cu++;var DG=Cv.nextSibling;C0.collectContent(DG);\\nC9.push(DG);C0.notifyNextNode(DG.nextSibling);
}
var C3=C0.finish();var DB=C3.selStart;var DC=C3.selEnd;\\nCx=C3.lines;var DQ=C3.lineAttribs;var DD=C3.linesWrapped;if(DD>0)
{
By("Editor warning: "+DD+" long line"+(DD==1?" was":"s were")+" hard-wrapped into "+C3.numLinesAfter+" lines.");\\n
}
if(DB[0]>=0)
{
Ct=[DB[0]+Cq+C4,DB[1]];
}
if(DC[0]>=0)
{
Cs=[DC[0]+Cq+C4,DC[1]];
}
var DM=[];var DP=Cv;var DI=new Array(Cx.length);\\nfor(var C1=0;C1\\x3cCx.length;C1++)
{
var DR=Cx[C1];var DL=AN(DR);DM.push(DL);DI[C1]=DL.domInfo;
}
DJ.push([DP,DI]);\\nforEach(DK,function(i)
{
C9.push(i);
}
);var DE=
{

}
;if(Ct)
{
DE.selStart=Ct;
}
if(Cs)
{
DE.selEnd=Cs;
}
C7.push([Cq+C4,Cu-Cq,DM,DQ,DE]);\\nC4+=(Cx.length-(Cu-Cq));
}
else
{
if(Cu>Cq)
{
C7.push([Cq+C4,Cu-Cq,[],[]]);
}

}
DF++;
}
var DN=(C7.length>0);Cr.mark("splice");\\nforEach(C7,function(i)
{
CJ(i[0],i[1],i[2],i[3],i[4]);
}
);Cr.mark("insert");forEach(DJ,function(i)
{
AH(i[0],i[1],DA);\\n
}
);Cr.mark("del");forEach(C9,function(i)
{
i.parentNode.removeChild(i);
}
);Cr.mark("findsel");if(Cw&&!Ct)
{
Ct=Aq(Cw.startPoint);\\n
}
if(Cw&&!Cs)
{
Cs=Aq(Cw.endPoint);
}
var C5=A.lines.length();if(Ct&&Ct[0]>=C5)
{
Ct[0]=C5-1;Ct[1]=A.lines.atIndex(Ct[0]).text.length;\\n
}
if(Cs&&Cs[0]>=C5)
{
Cs[0]=C5-1;Cs[1]=A.lines.atIndex(Cs[0]).text.length;
}
Cr.mark("repsel");if(Cw)
{
BR(Ct,Cs,Cw&&Cw.focusAtStart);\\n
}
Cr.mark("browsel");if(Cw&&(DN||P()))
{
D.selectionAffected=true;
}
D.domClean=true;Cr.mark("fixview");g();\\nCr.end("END");return DN;
}
function Cd(Cq)
{
var i=E.createElement("DIV");i.appendChild(Cq);return i.innerHTML;\\n
}
var Ac=
{
bold:true,italic:true,underline:true,strikethrough:true,list:true
}
;var CG=
{
insertorder:true,author:true
}
;\\nfunction A0(i)
{
return !!Ac[i];
}
function Cl(i)
{
return(!!Ac[i])||(!!CG[i]);
}
function AH(Cr,i,Cs)
{
Cs=(Cs||function()
{
return false;\\n
}
);var Cq;var Ct;if(i.length\\x3c1)
{
return;
}
var Cv=A.lines.atKey(L(i[0].node));var Cu=A.lines.atKey(L(i[i.length-1].node));\\nvar Cw=A.lines.offsetOfEntry(Cv);var Cx=A.lines.offsetOfEntry(Cu)+Cu.width;forEach(i,function(C1)
{
var Cy=Q("insertLine",false);\\nvar C0=C1.node;var C2=L(C0);var Cz;Cy.mark("findEntry");if(Cq)
{
var C3=A.lines.next(Cq);if(C3&&C3.key==C2)
{
Cz=C3;\\nCt+=Cq.width;
}

}
if(!Cz)
{
Cy.literal(1,"nonopt");Cz=A.lines.atKey(C2);Ct=A.lines.offsetOfKey(C2);
}
else
{
Cy.literal(0,"nonopt");\\n
}
Cq=Cz;Cy.mark("spans");BJ(Cz,function(C4,C5)
{
C1.appendSpan(C4,C5);
}
,Ct,Cs());Cy.mark("addLine");C1.prepareForAdd();\\nCz.lineMarker=C1.lineMarker;if(!Cr)
{
B.insertBefore(C0,B.firstChild);
}
else
{
B.insertBefore(C0,Cr.nextSibling);\\n
}
Cr=C0;C1.notifyAdded();Cy.mark("markClean");y(C0);Cy.end();
}
);
}
function P()
{
return(A.selStart&&A.selEnd&&A.selStart[0]==A.selEnd[0]&&A.selStart[1]==A.selEnd[1]);\\n
}
C.ace_isCaret=P;function l()
{
return A.selStart[0];
}
function r()
{
return A.selStart[1];
}
function A6()
{
return A.lines.offsetOfIndex(l())+r();\\n
}
function CF()
{
if(P()&&r()==0&&l()>0)
{
var i=l();var Cu=A.lines.atIndex(i);var Ct=A.lines.prev(Cu);var Cr=Ct.text;\\nvar Cq=/^ *(?:)/.exec(Cr)[0];if(/[\\\\[\\\\(\\\\
{
]\\\\s*$/.exec(Cr))
{
Cq+=Ad;
}
var Cs=Changeset.builder(A.lines.totalWidth()).keep(A.lines.offsetOfIndex(i),i).insert(Cq,[["author",e]],A.apool).toString();\\nc(Cs);d([i,Cq.length],[i,Cq.length]);
}

}
function Bk(Cs)
{
var Cr=A.lines.atIndex(Cs).lineNode;var i=Cr.firstChild;\\nwhile(AF(i)&&i.firstChild)
{
i=i.firstChild;
}
var Cq;if(isNodeText(i))
{
i.nodeValue=" "+i.nodeValue;Cq=i;\\n
}
else
{
Cq=E.createTextNode(" ");i.parentNode.insertBefore(Cq,i);
}
y(Cr);return
{
unhack:function()
{
if(Cq.nodeValue==" ")
{
Cq.parentNode.removeChild(Cq);\\n
}
else
{
Cq.nodeValue=Cq.nodeValue.substring(1);
}
y(Cr);
}

}
;
}
function Am(Cw)
{
var Cx=Cw[0];var Cq=Cw[1];var Cu=A.lines.atIndex(Cx);\\nCq-=Cu.lineMarker;if(Cq\\x3c0)
{
Cq=0;
}
var Cs=Cu.lineNode;var i=Cs;var Cr=false;if(Cq==0)
{
var Cv=0;if(browser.msie&&Cx==(A.lines.length()-1)&&Cs.childNodes.length==0)
{
Cv=1;\\n
}
return
{
node:Cs,index:Cv,maxIndex:1
}
;
}
while(!(i==Cs&&Cr))
{
if(Cr)
{
if(i.nextSibling)
{
i=i.nextSibling;Cr=false;\\n
}
else
{
i=i.parentNode;
}

}
else
{
if(isNodeText(i))
{
var Ct=i.nodeValue.length;if(Cq\\x3c=Ct)
{
return
{
node:i,index:Cq,maxIndex:Ct
}
;\\n
}
Cq-=Ct;Cr=true;
}
else
{
if(i.firstChild)
{
i=i.firstChild;
}
else
{
Cr=true;
}

}

}

}
return
{
node:Cs,index:1,maxIndex:1
}
;\\n
}
function BD(i)
{
return i.innerText||i.textContent||i.nodeValue||"";
}
function Aq(Cr)
{
if(Cr.node==B)
{
if(Cr.index==0)
{
return[0,0];\\n
}
else
{
var Cu=A.lines.length();var Cx=A.lines.atIndex(Cu-1);return[Cu-1,Cx.text.length];
}

}
else
{
var i=Cr.node;\\nvar Cq=0;if(isNodeText(i))
{
Cq=Cr.index;
}
else
{
if(Cr.index>0)
{
Cq=BD(i).length;
}

}
var Cs,Ct;while((Cs=i.parentNode)!=B)
{
if((Ct=i.previousSibling))
{
i=Ct;\\nCq+=BD(i).length;
}
else
{
i=Cs;
}

}
if(i.id=="")
{
V.debug("BAD");
}
if(i.firstChild&&AF(i.firstChild))
{
Cq+=1;
}
var Cv=A.lines.atKey(i.id);\\nvar Cw=A.lines.indexOfEntry(Cv);return[Cw,Cq];
}

}
function AN(Cr)
{
var Cq=CT(Cr.length>0);var i=Cq.node;\\nreturn
{
key:L(i),text:Cr,lineNode:i,domInfo:Cq,lineMarker:0
}
;
}
function Cp(i)
{
return Changeset.oldLen(i)==A.alltext.length;\\n
}
function c(Cq,Cs)
{
Ap(Cq,Cs);var i=null;if(A.selStart&&A.selEnd)
{
var Cw=A.lines.offsetOfIndex(A.selStart[0])+A.selStart[1];\\nvar Ct=A.lines.offsetOfIndex(A.selEnd[0])+A.selEnd[1];var Cr=Changeset.characterRangeFollow(Cq,Cw,Ct,Cs);\\ni=[Cr[0],Cr[1],A.selFocusAtStart];
}
var Cv=
{
splice:function(Cy,Cx,Cz)
{
Cu(Cy,Cx,map(Array.prototype.slice.call(arguments,2),function(C0)
{
return C0.slice(0,-1);\\n
}
),null);
}
,get:function(Cx)
{
return A.lines.atIndex(Cx).text+"\\\\n";
}
,length:function()
{
return A.lines.length();\\n
}
,slice_notused:function(Cy,Cx)
{
return map(A.lines.slice(Cy,Cx),function(Cz)
{
return Cz.text+"\\\\n";
}
);
}

}
;\\nChangeset.mutateTextLines(Cq,Cv);BN();if(i)
{
d(R(i[0]),R(i[1]),i[2]);
}
function Cu(Cx,Cy,C5,C0)
{
C0=(C0||AB(50));\\nvar C2=[];if(Cy>0)
{
var C1=A.lines.atIndex(Cx);for(var C4=0;C4\\x3cCy;C4++)
{
C2.push(C1.key);C1=A.lines.next(C1);\\n
}

}
var C3=map(C5,AN);AJ(Cx,Cy,C3);var Cz;if(Cx>0)
{
Cz=k(A.lines.atIndex(Cx-1).key);
}
else
{
Cz=null;
}
AH(Cz,map(C3,function(C6)
{
return C6.domInfo;\\n
}
),C0);forEach(C2,function(C7)
{
var C6=E.getElementById(C7);C6.parentNode.removeChild(C6);
}
);if((A.selStart&&A.selStart[0]>=Cx&&A.selStart[0]\\x3c=Cx+Cy)||(A.selEnd&&A.selEnd[0]>=Cx&&A.selEnd[0]\\x3c=Cx+Cy))
{
D.selectionAffected=true;\\n
}

}

}
function Bz(Cx)
{
return true;var Ct=Changeset.opIterator(Changeset.unpack(Cx).ops);var Cq=0;var Cs=0;\\nvar Cr=0;while(Ct.hasNext())
{
var i=Ct.next();if(i.opcode=="-"||i.opcode=="=")
{
Cq+=i.chars;if(i.lines)
{
Cs+=i.lines;\\nCr=0;
}
else
{
Cr+=i.chars;
}

}
var Cu=A.lines.indexOfOffset(Cq);var Cw=A.lines.offsetOfIndex(Cu);var Cv=Cq-Cw;\\nif(Cv!=Cr||Cu!=Cs)
{
return false;
}

}
return true;
}
function Ap(i,Cr)
{
Changeset.checkRep(i);if(Changeset.oldLen(i)!=A.alltext.length)
{
throw new Error("doRepApplyChangeset length mismatch: "+Changeset.oldLen(i)+"/"+A.alltext.length);\\n
}
if(!Bz(i))
{
throw new Error("doRepApplyChangeset line break mismatch");
}
(function Cq(Ct)
{
var Cs=D.editEvent;\\nif(Cs.eventType=="nonundoable")
{
if(!Cs.changeset)
{
Cs.changeset=Ct;
}
else
{
Cs.changeset=Changeset.compose(Cs.changeset,Ct,A.apool);\\n
}

}
else
{
var Cu=Changeset.inverse(Ct,
{
get:function(Cv)
{
return A.lines.atIndex(Cv).text+"\\\\n";
}
,length:function()
{
return A.lines.length();\\n
}

}
,A.alines,A.apool);if(!Cs.backset)
{
Cs.backset=Cu;
}
else
{
Cs.backset=Changeset.compose(Cu,Cs.backset,A.apool);\\n
}

}

}
)(i);Changeset.mutateAttributionLines(i,A.alines,A.apool);if(M.isTracking())
{
M.composeUserChangeset(i);\\n
}

}
function R(i)
{
var Cq=A.lines.atOffset(i);var Cr=A.lines.offsetOfEntry(Cq);var Cs=A.lines.indexOfEntry(Cq);\\nreturn[Cs,i-Cr];
}
function BA(Cr,Cq,i)
{
if(Cr==Cq&&i.length==0)
{
return;
}
if(Cq==A.alltext.length)
{
if(Cr==Cq)
{
Cr--;\\nCq--;i="\\\\n"+i.substring(0,i.length-1);
}
else
{
if(i.length==0)
{
Cr--;Cq--;
}
else
{
Cq--;i=i.substring(0,i.length-1);\\n
}

}

}
a(R(Cr),R(Cq),i);
}
function a(Cq,Cr,Ct)
{
if(Cq==undefined)
{
Cq=A.selStart;
}
if(Cr==undefined)
{
Cr=A.selEnd;\\n
}
var i=Changeset.builder(A.lines.totalWidth());As(i,Cq);BQ(i,Cq,Cr);i.insert(Ct,[["author",e]],A.apool);\\nvar Cs=i.toString();c(Cs);
}
function AR(Cr,i,Cq)
{
if(i>=A.alltext.length)
{
i=A.alltext.length-1;
}
AA(R(Cr),R(i),Cq);\\n
}
C.ace_performDocumentApplyAttributesToCharRange=AR;function AA(Cq,Cr,Ct)
{
var i=Changeset.builder(A.lines.totalWidth());\\nAs(i,Cq);AS(i,Cq,Cr,Ct,A.apool);var Cs=i.toString();c(Cs);
}
function As(Cq,i)
{
var Cr=A.lines.offsetOfIndex(i[0]);\\nCq.keep(Cr,i[0]);Cq.keep(i[1]);
}
function BQ(Cr,Cq,i)
{
var Ct=A.lines.offsetOfIndex(Cq[0]);var Cs=A.lines.offsetOfIndex(i[0]);\\nif(i[0]>Cq[0])
{
Cr.remove(Cs-Ct-Cq[1],i[0]-Cq[0]);Cr.remove(i[1]);
}
else
{
Cr.remove(i[1]-Cq[1]);
}

}
function AS(Cr,Cq,i,Ct,Cs)
{
var Cv=A.lines.offsetOfIndex(Cq[0]);\\nvar Cu=A.lines.offsetOfIndex(i[0]);if(i[0]>Cq[0])
{
Cr.keep(Cu-Cv-Cq[1],i[0]-Cq[0],Ct,Cs);Cr.keep(i[1],0,Ct,Cs);\\n
}
else
{
Cr.keep(i[1]-Cq[1],0,Ct,Cs);
}

}
function Az(i,Cq)
{
if(!(A.selStart&&A.selEnd))
{
return;
}
AA(A.selStart,A.selEnd,[[i,Cq]]);\\n
}
C.ace_setAttributeOnSelection=Az;function AD(Cr)
{
if(!(A.selStart&&A.selEnd))
{
return;
}
var Cq=true;var C2=Changeset.makeAttribsString("+",[[Cr,"true"]],A.apool);\\nvar C3=new RegExp(C2.replace(/\\\\*/g,"\\\\\\\\*")+"(\\\\\\\\*|$)");function C1(C4)
{
return C3.test(C4);
}
var Cy=A.selStart[0];\\nvar Cv=A.selEnd[0];for(var i=Cy;i\\x3c=Cv;i++)
{
var Ct=Changeset.opIterator(A.alines[i]);var C0=0;var Cx=0;\\nvar Cs=A.lines.atIndex(i).text.length;if(i==Cy)
{
Cx=A.selStart[1];
}
if(i==Cv)
{
Cs=A.selEnd[1];
}
while(Ct.hasNext())
{
var Cw=Ct.next();\\nvar Cz=C0;var Cu=Cz+Cw.chars;if(!C1(Cw.attribs))
{
if(!(Cu\\x3c=Cx||Cz>=Cs))
{
Cq=false;break;
}

}
C0=Cu;
}
if(!Cq)
{
break;\\n
}

}
if(Cq)
{
AA(A.selStart,A.selEnd,[[Cr,""]]);
}
else
{
AA(A.selStart,A.selEnd,[[Cr,"true"]]);
}

}
C.ace_toggleAttributeOnSelection=AD;\\nfunction AY(i)
{
if(!(A.selStart&&A.selEnd))
{
return;
}
a(A.selStart,A.selEnd,i);
}
function AJ(i,Cr,Cq)
{
forEach(Cq,function(Cy)
{
Cy.width=Cy.text.length+1;\\n
}
);var Ct=A.lines.offsetOfIndex(i);var Cu=A.lines.offsetOfIndex(i+Cr);var Cv=A.lines.offsetOfIndex(i);\\nvar Cx=A.lines.offsetOfIndex(i+Cr);A.lines.splice(i,Cr,Cq);D.docTextChanged=true;D.repChanged=true;var Cw=A.lines.offsetOfIndex(i+Cq.length);\\nvar Cs=map(Cq,function(Cy)
{
return Cy.text+"\\\\n";
}
).join("");A.alltext=A.alltext.substring(0,Ct)+Cs+A.alltext.substring(Cu,A.alltext.length);\\n
}
function CJ(Cw,C7,DF,DP,Cs)
{
var DG=A.lines.offsetOfIndex(Cw);var DL=A.lines.offsetOfIndex(Cw+C7);var DK=A.lines.offsetOfIndex(Cw);\\nvar DJ,DN;if(Cs&&Cs.selStart)
{
DJ=A.lines.offsetOfIndex(Cs.selStart[0])+Cs.selStart[1]-DK;
}
if(Cs&&Cs.selEnd)
{
DN=A.lines.offsetOfIndex(Cs.selEnd[0])+Cs.selEnd[1]-DK;\\n
}
var Ct=map(DF,function(DV)
{
return DV.text+"\\\\n";
}
).join("");var C2=A.alltext.substring(DG,DL);var DH=A.alines.slice(Cw,Cw+C7).join("");\\nvar C1=DP.join("|1+1")+"|1+1";var DD=B6(C2,Ct,DH,C1,DJ,DN);var C0=DD[0];var Cy=DD[1];var Cr=C2.substring(C0,C2.length-Cy);\\nvar i=Ct.substring(C0,Ct.length-Cy);var Cq=DG+C0;var Cu=DL-Cy;var Cx=false;if(Cr.charAt(Cr.length-1)=="\\\\n"&&i.charAt(i.length-1)=="\\\\n")
{
Cr=Cr.slice(0,-1);\\ni=i.slice(0,-1);Cu--;Cy++;
}
if(Cr.length==0&&Cq==A.alltext.length&&i.length>0)
{
Cq--;Cu--;i="\\\\n"+i.slice(0,-1);\\nCx=true;
}
if(Cu==A.alltext.length&&Cr.length>0&&i.length==0)
{
if(A.alltext.charAt(Cq-1)=="\\\\n")
{
Cq--;Cu--;\\n
}

}
if(!(Cr.length==0&&i.length==0))
{
var DS=A.alltext;var DU=DS.length;var C5=A.lines.indexOfOffset(Cq);\\nvar DB=A.lines.offsetOfIndex(C5);function C9()
{
var DV=Changeset.builder(DU);DV.keep(DB,C5);DV.keep(Cq-DB);\\nreturn DV;
}
function Cz(Dc,Db)
{
var DX=Changeset.opIterator(Dc);var DV=0;var DY=C0;var Da=Ct.length-Cy-(Cx?1:0);\\nwhile(DX.hasNext())
{
var DZ=DX.next();var DW=DV+DZ.chars;if(!(DW\\x3c=DY||DV>=Da))
{
Db(Math.max(DY,DV),Math.min(Da,DW),DZ.attribs);\\n
}
DV=DW;
}

}
var DQ=(i==Cr);var C6;if(DQ)
{
var DO=BT(function(DV)
{
return Changeset.mapAttribNumbers(DV,function(DX)
{
var DW=A.apool.getAttribKey(DX);\\nif(A0(DW))
{
return A.apool.putAttrib([DW,""]);
}
return false;
}
);
}
);var C4=C9();if(Cx)
{
C4.keep(1,1);
}
Cz(DH,function(DX,DV,DW)
{
C4.keepText(Ct.substring(DX,DV),DO(DW));\\n
}
);var DT=C4.toString();var C3=C9();if(Cx)
{
C3.keep(1,1);
}
Cz(C1,function(DX,DV,DW)
{
C3.keepText(Ct.substring(DX,DV),DW);\\n
}
);var DR=C3.toString();C6=Changeset.compose(DT,DR,A.apool);
}
else
{
var Cv=C9();var DI=A.lines.indexOfOffset(Cu);\\nvar DA=A.lines.offsetOfIndex(DI);if(DA>Cq)
{
Cv.remove(DA-Cq,DI-C5);Cv.remove(Cu-DA);
}
else
{
Cv.remove(Cu-Cq);\\n
}
var DM=false;var DE=Changeset.makeAttribsString("+",(e?[["author",e]]:[]),A.apool);var DC=BT(function(DV)
{
if(DM)
{
return Changeset.composeAttributes(DE,DV,true,A.apool);\\n
}
else
{
return Changeset.composeAttributes(DV,DE,true,A.apool);
}

}
);var C8="";Cz(C1,function(DY,DX,DW)
{
var DV=Changeset.attribsAttributeValue(DW,"author",A.apool);\\nif(DV&&DV!=C8)
{
if(!C8)
{
C8=DV;
}
else
{
DM=true;
}

}

}
);if(Cx)
{
Cv.insert("\\\\n",DC(""));
}
Cz(C1,function(DX,DV,DW)
{
Cv.insert(Ct.substring(DX,DV),DC(DW));\\n
}
);C6=Cv.toString();
}
Ap(C6);
}
AJ(Cw,C7,DF);BN();
}
function BT(Cq)
{
var i=
{

}
;return function(Cr)
{
if(!i[Cr])
{
i[Cr]=Cq(Cr);\\n
}
return i[Cr];
}
;
}
function B6(Cw,Cx,C7,C8,DB,Cy)
{
function Cz(DC)
{
return A0(A.apool.getAttribKey(DC));
}
function C6(DG)
{
var DD=[];\\nvar DF=[];var DC=Changeset.opIterator(DG);while(DC.hasNext())
{
var DE=DC.next();DD.push(DE.chars);DF.push(DE.attribs);\\n
}
return[DD,DF];
}
function Cu(DG,DF)
{
var DE=DG[0];var DH=DG[1];var DC=(DF?DE.length-1:0);var DD=0;return function DI()
{
while(DD>=DE[DC])
{
if(DF)
{
DC--;\\n
}
else
{
DC++;
}
DD=0;
}
var DJ=DH[DC];DD++;return DJ;
}
;
}
var Ct=Cw.length;var Cs=Cx.length;var C3=Math.min(Ct,Cs);\\nvar C4=C6(Changeset.filterAttribNumbers(C7,Cz));var C2=C6(Changeset.filterAttribNumbers(C8,Cz));var Cq=0;\\nvar DA=Cu(C4,false);var C9=Cu(C2,false);while(Cq\\x3cC3)
{
if(Cw.charAt(Cq)==Cx.charAt(Cq)&&DA()==C9())
{
Cq++;\\n
}
else
{
break;
}

}
var i=0;var C1=Cu(C4,true);var C5=Cu(C2,true);while(i\\x3cC3)
{
if(i==0)
{
C1();C5();i++;
}
else
{
if(Cw.charAt(Ct-1-i)==Cx.charAt(Cs-1-i)&&C1()==C5())
{
i++;\\n
}
else
{
break;
}

}

}
var Cr=-1;if((typeof Cy)=="number")
{
Cr=Cs-Cy;
}
if(Cq+i>Ct)
{
var Cv=Ct-Cq;var C0=i;if(Cr>=Cv&&Cr\\x3c=C0)
{
i=Cr;\\n
}
else
{
i=Cv;
}
Cq=Ct-i;
}
if(Cq+i>Cs)
{
var Cv=Cs-Cq;var C0=i;if(Cr>=Cv&&Cr\\x3c=C0)
{
i=Cr;
}
else
{
i=Cv;
}
Cq=Cs-i;
}
return[Cq,i];\\n
}
function A2(Cq,i)
{
if(!Cq)
{
return !i;
}
if(!i)
{
return !Cq;
}
return(Cq[0]==i[0]&&Cq[1]==i[1]);
}
function d(Cr,i,Cq)
{
if(BR(Cr,i,Cq))
{
D.selectionAffected=true;\\n
}

}
function BR(Cq,i,Cr)
{
Cr=!!Cr;var Cs=(Cr&&((!Cq)||(!i)||(Cq[0]!=i[0])||(Cq[1]!=i[1])));if((!A2(A.selStart,Cq))||(!A2(A.selEnd,i))||(A.selFocusAtStart!=Cs))
{
A.selStart=Cq;\\nA.selEnd=i;A.selFocusAtStart=Cs;if(z)
{
z.notifySelectionChanged();
}
D.repChanged=true;return true;
}
return false;\\n
}
function CT(Ct)
{
if(browser.msie&&(!Ct))
{
var i=
{
node:null,appendSpan:I,prepareForAdd:I,notifyAdded:I,clearSpans:I,finishUpdate:I,lineMarker:0
}
;\\nvar Cr=E.createElement("div");i.node=Cr;i.notifyAdded=function()
{
Cr.innerHTML="";setAssoc(Cr,"shouldBeEmpty",true);\\nsetAssoc(Cr,"unpasted",
{

}
);
}
;var Cq="ace-line";i.appendSpan=function(Cv,Cu)
{
if((!Cv)&&Cu)
{
Cq=domline.addToLineClass(Cq,Cu);\\n
}

}
;i.clearSpans=function()
{
Cq="";
}
;function Cs()
{
if(Cq!==null)
{
Cr.className=Cq;
}

}
i.prepareForAdd=Cs;i.finishUpdate=Cs;\\ni.getInnerHTML=function()
{
return"";
}
;return i;
}
else
{
return domline.createDomLine(Ct,K,browser,E);
}

}
function CI(i)
{
return i.replace(/[\\\\n\\\\r ]/g," ").replace(/\\\\xa0/g," ").replace(/\\\\t/g,"        ");\\n
}
var Br=
{
div:1,p:1,pre:1,li:1,ol:1,ul:1
}
;function AF(i)
{
return !!Br[(i.tagName||"").toLowerCase()];
}
function BK()
{
var i=Q("getDirtyRanges",false);\\ni.forIndices=0;i.consecutives=0;i.corrections=0;var Ct=
{

}
;var Cr=A.lines.length();function Cv(C8)
{
if(Ct[C8]===undefined)
{
i.forIndices++;\\nvar C9;if(C8\\x3c0||C8>=Cr)
{
C9=true;
}
else
{
var DA=A.lines.atIndex(C8).key;C9=(k(DA)||false);
}
Ct[C8]=C9;
}
return Ct[C8];\\n
}
var Cw=
{

}
;function Cx(C8)
{
if(Cw[C8]===undefined)
{
i.consecutives++;Cw[C8]=(function()
{
var DA=Cv(C8-1);\\nvar C9=Cv(C8);if((!DA)||(!C9))
{
return false;
}
if((DA===true)&&(C9===true))
{
return !B.firstChild;
}
if((DA===true)&&C9.previousSibling)
{
return false;\\n
}
if((C9===true)&&DA.nextSibling)
{
return false;
}
if((DA===true)||(C9===true))
{
return true;
}
return DA.nextSibling==C9;\\n
}
)();
}
return Cw[C8];
}
function Cy(C8)
{
return !!Cv(C8);
}
var Cq=[[-1,Cr+1]];function C5(C8)
{
var C9=-1;forEach(Cq,function(DA,DB)
{
if(C8>=DA[1])
{
return false;\\n
}
if(C8\\x3cDA[0])
{
return true;
}
C9=DB;return true;
}
);return C9;
}
function C4(C8,C9)
{
var DB=Cq[C8][0];var DA=Cq[C8][1];\\nif((DB+1)==DA)
{
Cq.splice(C8,1);
}
else
{
if(C9==DB)
{
Cq[C8][0]++;
}
else
{
if(C9==(DA-1))
{
Cq[C8][1]--;
}
else
{
Cq.splice(C8,1,[DB,C9],[C9+1,DA]);\\n
}

}

}

}
function Cu(C8,C9)
{
var DB=Cq[C8][0];var DA=Cq[C8][1];Cq.splice(C8,1,[DB,C9],[C9,DA]);
}
var C0=
{

}
;function C2(C8)
{
if(C0[C8])
{
return true;\\n
}
i.corrections++;C0[C8]=true;var C9=C5(C8);var DB=Cy(C8);if(C9\\x3c0)
{
if(DB)
{
V.debug("somehow lost clean line");\\n
}
return true;
}
if(!DB)
{
C4(C9,C8);return false;
}
else
{
var DD=Cq[C9][0];var DC=Cq[C9][1];var DA=false;if(DD\\x3cC8&&Cy(C8-1)&&!Cx(C8))
{
Cu(C9,C8);\\nDA=true;
}
if(DC>(C8+1)&&Cy(C8+1)&&!Cx(C8+1))
{
Cu(C9,C8+1);DA=true;
}
return !DA;
}

}
function Cz(DA,DB)
{
var C9=0;\\nvar C8=DA;while(C9\\x3cDB&&C8>=0)
{
if(C2(C8))
{
C9++;
}
else
{
C9=0;
}
C8--;
}
C9=0;C8=DA;while(C9\\x3cDB&&C8\\x3cCr)
{
if(C2(C8))
{
C9++;\\n
}
else
{
C9=0;
}
C8++;
}

}
if(Cr==0)
{
i.cancel();if(!Cx(0))
{
Cu(0,0);
}

}
else
{
i.mark("topbot");Cz(0,1);Cz(Cr-1,1);\\ni.mark("obs");for(var C7 in AE.cleanNodesNearChanges)
{
var C3=C7.substring(1);if(A.lines.containsKey(C3))
{
var C6=A.lines.indexOfKey(C3);\\nCz(C6,2);
}

}
i.mark("stats&calc");i.literal(i.forIndices,"byidx");i.literal(i.consecutives,"cons");i.literal(i.corrections,"corr");\\n
}
var C1=[];for(var Cs=0;Cs\\x3cCq.length-1;Cs++)
{
C1.push([Cq[Cs][1],Cq[Cs+1][0]]);
}
i.end();return C1;
}
function y(Cq)
{
var i=
{

}
;\\ni.nodeId=L(Cq);i.knownHTML=Cq.innerHTML;if(browser.msie)
{
i.knownText=Cq.innerText;
}
setAssoc(Cq,"dirtiness",i);\\n
}
function X(i)
{
var Cr=Q("cleanCheck",false);if(i.parentNode!=B)
{
return true;
}
var Cq=getAssoc(i,"dirtiness");\\nif(!Cq)
{
return true;
}
if(i.id!==Cq.nodeId)
{
return true;
}
if(browser.msie)
{
if(i.innerText!==Cq.knownText)
{
return true;\\n
}

}
if(i.innerHTML!==Cq.knownHTML)
{
return true;
}
Cr.end();return false;
}
function A1(Cu,Ct)
{
var Cr=Cu.lineNode;\\nvar Cq=Cr.offsetTop;var Cs=Cr.offsetHeight;var i=(Ct||
{

}
);i.top=Cq;i.bottom=(Cq+Cs);return i;
}
function B5()
{
var i=Ab();\\nvar Cr=F.document;var Cq=Cr.documentElement.clientHeight;return
{
top:i,bottom:(i+Cq)
}
;
}
function Bs()
{
var Cr=B5();\\nvar Cs=
{

}
;var Cq=A.lines.search(function(Ct)
{
return A1(Ct,Cs).bottom>Cr.top;
}
);var i=A.lines.search(function(Ct)
{
return A1(Ct,Cs).top>=Cr.bottom;\\n
}
);if(i\\x3cCq)
{
i=Cq;
}
return[Cq,i];
}
function BI()
{
var i=Bs();return[A.lines.offsetOfIndex(i[0]),A.lines.offsetOfIndex(i[1])];\\n
}
function CZ(Cq)
{
N("handleClick",function()
{
H.atMost(200);
}
);if((!Cq.ctrlKey)&&(Cq.button!=2)&&(Cq.button!=3))
{
function Cr(Cu)
{
return(Cu.tagName||"").toLowerCase()=="a"&&Cu.href;\\n
}
var i=Cq.target;while(i&&i.parentNode&&!Cr(i))
{
i=i.parentNode;
}
if(i&&Cr(i))
{
try
{
var Cs=window.open(i.href,"_blank");\\nCs.focus();
}
catch(Ct)
{

}
Cq.preventDefault();
}

}

}
function Bu()
{
if(!(A.selStart&&A.selEnd))
{
return;
}
var i=A.selStart[0];\\nvar Cq=Z(i);AY("\\\\n");if(Cq)
{
if(i+1\\x3cA.lines.length())
{
Bh(i+1,Cq);
}

}
else
{
CF();
}

}
function A7(Cx)
{
if(!(A.selStart&&A.selEnd))
{
return false;\\n
}
var Cr,Cw;Cr=A.selStart[0];Cw=Math.max(Cr,A.selEnd[0]-((A.selEnd[1]==0)?1:0));var Cs=[];var Ct=false;\\nfor(var Cq=Cr;Cq\\x3c=Cw;Cq++)
{
var i=Z(Cq);if(i)
{
i=/([a-z]+)([12345678])/.exec(i);if(i)
{
Ct=true;var Cy=i[1];\\nvar Cu=Number(i[2]);var Cv=Math.max(1,Math.min(BW,Cu+(Cx?-1:1)));if(Cu!=Cv)
{
Cs.push([Cq,Cy+Cv]);
}

}

}

}
if(Cs.length>0)
{
AI(Cs);\\n
}
return Ct;
}
C.ace_doIndentOutdent=A7;function Bw(i)
{
if(!A7(i))
{
AY(Ad);
}

}
function A4(C5)
{
var Cv=C5||
{

}
;\\nvar Cx=false;if(A.selStart)
{
if(P())
{
var Cw=l();var Cu=r();var Cq=A.lines.atIndex(Cw);var C1=Cq.text;var Cy=Cq.lineMarker;\\nif(/^ +$/.exec(C1.substring(Cy,Cu)))
{
var C4=Cu-Cy;var C2=Ad.length;var C0=((C4-1)%C2)+1;a([Cw,Cu-C0],[Cw,Cu],"");\\nCx=true;
}

}
if(!Cx)
{
if(P())
{
var i=l();var Cq=A.lines.atIndex(i);if(r()\\x3c=Cq.lineMarker)
{
var C7="delete_newline";\\nvar C3=(i>0?Z(i-1):"");var C6=Z(i);var Cr=(i>0&&A.lines.atIndex(i-1));var Cz=(Cr&&Cr.text.length==Cr.lineMarker);\\nif(C6)
{
if(Cz&&!C3)
{
a([i-1,Cr.text.length],[i,0],"");
}
else
{
a([i,0],[i,Cq.lineMarker],"");
}

}
else
{
if(i>0)
{
a([i-1,Cr.text.length],[i,0],"");\\n
}

}

}
else
{
var Cs=A6();if(Cs>0)
{
if(Cv.metaKey||Cv.ctrlKey||Cv.altKey)
{
var Ct=Cs-1;while(Ct>Cq.lineMarker&&m(A.alltext.charAt(Ct-1)))
{
Ct--;\\n
}
BA(Ct,Cs,"");
}
else
{
BA(Cs-1,Cs,"");
}

}

}

}
else
{
AY("");
}

}

}

}
var Bg=/[\\\\u0030-\\\\u0039\\\\u0041-\\\\u005A\\\\u0061-\\\\u007A\\\\u00C0-\\\\u00D6\\\\u00D8-\\\\u00F6\\\\u00F8-\\\\u00FF\\\\u0100-\\\\u1FFF\\\\u3040-\\\\u9FFF\\\\uF900-\\\\uFDFF\\\\uFE70-\\\\uFEFE\\\\uFF10-\\\\uFF19\\\\uFF21-\\\\uFF3A\\\\uFF41-\\\\uFF5A\\\\uFF66-\\\\uFFDC]/;\\nvar CV=/\\\\s/;function m(i)
{
return !!Bg.exec(i);
}
function Cg(i)
{
return !!CV.exec(i);
}
function v(Cv,Cw,Cs)
{
var Cq=Cw;\\nfunction Cu()
{
if(Cs)
{
return Cv.charAt(Cq);
}
else
{
return Cv.charAt(Cq-1);
}

}
function Ct()
{
if(Cs)
{
Cq++;
}
else
{
Cq--;\\n
}

}
function Cr()
{
if(Cs)
{
return Cq>=Cv.length;
}
else
{
return Cq\\x3c=0;
}

}
if(browser.windows&&Cs)
{
while((!Cr())&&m(Cu()))
{
Ct();\\n
}
while((!Cr())&&!m(Cu()))
{
Ct();
}

}
else
{
while((!Cr())&&!m(Cu()))
{
Ct();
}
while((!Cr())&&m(Cu()))
{
Ct();
}

}
return Cq;\\n
}
function AM(i)
{
if(AK&&top.DONT_INCORP)
{
return;
}
if(!j)
{
return;
}
var Cr=i.type;var Cw=i.charCode;var Cs=i.keyCode;\\nvar Ct=i.which;var Cy=((!Cw)&&((Cr=="keyup")||(Cr=="keydown"))&&(Cs==16||Cs==17||Cs==18||Cs==20||Cs==224||Cs==91));\\nif(Cy)
{
return;
}
var Cq=false;var Cv=((browser.msie||browser.safari)?(Cr=="keydown"):(Cr=="keypress"));\\nvar Cu=((browser.msie||browser.safari)?(Cr=="keydown"):(Cr=="keypress"));var Cx=false;N("handleKeyEvent",function()
{
if(Cr=="keypress"||(Cv&&Cs==13))
{
if(!Ar(i))
{
i.preventDefault();\\nCx=true;
}

}
else
{
if(Cr=="keydown")
{
At(i);
}

}
if(!Cx)
{
if(Cv&&Cs==8)
{
G(3);i.preventDefault();A4(i);Cq=true;\\n
}
if((!Cq)&&Cv&&Cs==13)
{
G(4);i.preventDefault();Bu();O.setTimeout(function()
{
F.scrollBy(-100,0);
}
,0);Cq=true;\\n
}
if((!Cq)&&Cv&&Cs==9&&!(i.metaKey||i.ctrlKey))
{
G(5);i.preventDefault();Bw(i.shiftKey);Cq=true;
}
if((!Cq)&&Cu&&String.fromCharCode(Ct).toLowerCase()=="z"&&(i.metaKey||i.ctrlKey))
{
G(6);\\ni.preventDefault();if(i.shiftKey)
{
x("redo");
}
else
{
x("undo");
}
Cq=true;
}
if((!Cq)&&Cu&&String.fromCharCode(Ct).toLowerCase()=="y"&&(i.metaKey||i.ctrlKey))
{
G(10);\\ni.preventDefault();x("redo");Cq=true;
}
if((!Cq)&&Cu&&String.fromCharCode(Ct).toLowerCase()=="b"&&(i.metaKey||i.ctrlKey))
{
G(13);\\ni.preventDefault();AD("bold");Cq=true;
}
if((!Cq)&&Cu&&String.fromCharCode(Ct).toLowerCase()=="i"&&(i.metaKey||i.ctrlKey))
{
G(14);\\ni.preventDefault();AD("italic");Cq=true;
}
if((!Cq)&&Cu&&String.fromCharCode(Ct).toLowerCase()=="u"&&(i.metaKey||i.ctrlKey))
{
G(15);\\ni.preventDefault();AD("underline");Cq=true;
}
if((!Cq)&&Cu&&String.fromCharCode(Ct).toLowerCase()=="h"&&(i.ctrlKey))
{
G(20);\\ni.preventDefault();A4();Cq=true;
}
if(z&&z.handleKeyEvent(i))
{
i.preventDefault();Cq=true;
}

}
if(Cr=="keydown")
{
H.atLeast(500);\\n
}
else
{
if(Cr=="keypress")
{
if((!Cq)&&AG.shouldNormalizeOnChar(Cw))
{
H.atMost(0);
}
else
{
H.atLeast(500);
}

}
else
{
if(Cr=="keyup")
{
var Cz=200;\\nH.atLeast(Cz);H.atMost(Cz);
}

}

}
var C1=(browser.mozilla&&i.altKey&&Cw==0&&Cs==0);var C0=(browser.safari&&i.altKey&&Cs==229);\\nif(AC||C1||C0)
{
H.atLeast(3000);AC=true;
}
if((!Cq)&&(!AC)&&(!q))
{
if(Cr!="keyup"||!A8())
{
Av();
}

}
if(Cr=="keyup")
{
AC=false;\\n
}

}
);
}
var AC=false;function x(Cq)
{
if(undoModule.enabled)
{
var i;if(Cq=="undo")
{
i="performUndo";
}
if(Cq=="redo")
{
i="performRedo";\\n
}
if(i)
{
var Cr=D.editEvent.eventType;D.startNewEvent(Cq);undoModule[i](function(Ct,Cs)
{
if(Ct)
{
c(Ct);
}
if(Cs)
{
d(R(Cs.selStart),R(Cs.selEnd),Cs.selFocusAtStart);\\n
}
var Cu=D.startNewEvent(Cr,true);return Cu;
}
);
}

}

}
C.ace_doUndoRedo=x;function Ba()
{
var i=A.selStart,Cq=A.selEnd;\\nif(!(i&&Cq))
{
AW(null);return;
}
var Cs=(false&&browser.mozilla&&i&&Cq&&i[0]==Cq[0]&&i[1]==A.lines.atIndex(i[0]).lineMarker&&Cq[1]==A.lines.atIndex(Cq[0]).lineMarker&&Bk(i[0]));\\nvar Cr=
{

}
;var Ct=[i[0],i[1]];if(Cs)
{
Ct[1]+=1;
}
Cr.startPoint=Am(Ct);var Cu=[Cq[0],Cq[1]];if(Cs)
{
Cu[1]+=1;\\n
}
Cr.endPoint=Am(Cu);Cr.focusAtStart=!!A.selFocusAtStart;AW(Cr);if(Cs)
{
Cs.unhack();
}

}
function Cb()
{
return map(A.lines.slice(),function(Cr)
{
var Cq=Cr.text;\\nvar i;if(Cq.length==0)
{
i=\\\'\\x3cspan style="color: #aaa">--\\x3c/span>\\\';
}
else
{
i=htmlPrettyEscape(Cq);
}
return"\\x3cdiv>\\x3ccode>"+i+"\\x3c/div>\\x3c/code>";\\n
}
).join("");
}
function h(i)
{
if(isNodeText(i))
{
return i.nodeValue.length;
}
else
{
return 1;
}

}
function CY()
{
var i;\\ntry
{
i=E.selection;
}
catch(Cr)
{

}
if(!i)
{
return false;
}
var Cq;try
{
Cq=i.createRange();
}
catch(Cr)
{

}
if(!Cq)
{
return false;\\n
}
var Cs=Cq.parentElement();if(Cs.ownerDocument!=E)
{
return false;
}
return true;
}
function Ae()
{
if(browser.msie)
{
var i;\\ntry
{
i=E.selection;
}
catch(Cy)
{

}
if(!i)
{
return null;
}
var Cs;try
{
Cs=i.createRange();
}
catch(Cy)
{

}
if(!Cs)
{
return null;\\n
}
var C1=Cs.parentElement();if(C1.ownerDocument!=E)
{
return null;
}
function C2()
{
return E.body.createTextRange();\\n
}
function Cw(C4)
{
var C3=C2();C3.moveToElementText(C4);return C3;
}
function Cu(C7)
{
var C3=C7.parentElement();\\nvar C6=-1;var C9=C3.childNodes.length;var C8=Cw(C3);if(C7.compareEndPoints("StartToStart",C8)==0)
{
return
{
node:C3,index:0,maxIndex:1
}
;\\n
}
else
{
if(C7.compareEndPoints("EndToEnd",C8)==0)
{
if(AF(C3)&&C3.nextSibling)
{
return
{
node:C3.nextSibling,index:0,maxIndex:1
}
;\\n
}
return
{
node:C3,index:1,maxIndex:1
}
;
}
else
{
if(C3.childNodes.length==0)
{
return
{
node:C3,index:0,maxIndex:1
}
;\\n
}

}

}
for(var C4=0;C4\\x3cC3.childNodes.length;C4++)
{
var DE=C3.childNodes.item(C4);if(!isNodeText(DE))
{
var DB=Cw(DE);\\nvar DF=C7.compareEndPoints("StartToStart",DB);var DI=C7.compareEndPoints("EndToEnd",DB);if(DF>=0&&DI\\x3c=0)
{
var DH=0;\\nif(DF>0)
{
DH=1;
}
return
{
node:DE,index:DH,maxIndex:1
}
;
}
else
{
if(DI>0)
{
if(C4>C6)
{
C6=C4;C8.setEndPoint("StartToEnd",DB);\\n
}

}
else
{
if(DF\\x3c0)
{
if(C4\\x3cC9)
{
C9=C4;C8.setEndPoint("EndToStart",DB);
}

}

}

}

}

}
if((C9-C6)==1)
{
if(C6>=0)
{
return
{
node:C3.childNodes.item(C6),index:1,maxIndex:1
}
;\\n
}
else
{
return
{
node:C3.childNodes.item(C9),index:0,maxIndex:1
}
;
}

}
var DG=0;var DA=C7.duplicate();var DJ=binarySearchInfinite(40,function(DM)
{
var DL=DM-DG;\\nvar DK=Math.abs(DA.move("character",-DL));if(DA.move("character",-1))
{
DA.move("character",1);
}
if(DL\\x3c0)
{
DG-=DK;\\n
}
else
{
DG+=DK;
}
return(DA.compareEndPoints("StartToStart",C8)\\x3c=0);
}
);var DC=C6+1;var DD=DJ;while(DC\\x3cC9)
{
var C5=C3.childNodes.item(DC);\\nif(DD\\x3c=C5.nodeValue.length)
{
return
{
node:C5,index:DD,maxIndex:C5.nodeValue.length
}
;
}
DD-=C5.nodeValue.length;\\nDC++;
}
var C5=C3.childNodes.item(DC-1);return
{
node:C5,index:C5.nodeValue.length,maxIndex:C5.nodeValue.length
}
;\\n
}
var Cr=
{

}
;if(Cs.compareEndPoints("StartToEnd",Cs)==0)
{
var Ct=Cu(Cs);Cr.startPoint=Ct;Cr.endPoint=
{
node:Ct.node,index:Ct.index,maxIndex:Ct.maxIndex
}
;\\n
}
else
{
var Cv=Cs.duplicate();Cv.collapse(true);var Cx=Cs.duplicate();Cx.collapse(false);Cr.startPoint=Cu(Cv);\\nCr.endPoint=Cu(Cx);
}
return Cr;
}
else
{
var i=window.getSelection();if(i&&i.type!="None"&&i.rangeCount!==0)
{
var Cq=i.getRangeAt(0);\\nfunction C0(C3)
{
while(C3&&!(C3.tagName&&C3.tagName.toLowerCase()=="body"))
{
C3=C3.parentNode;
}
return !!C3;\\n
}
function Cz(C8,C7)
{
if(!C0(C8))
{
return
{
node:B,index:0,maxIndex:1
}
;
}
var C3=C8;var C6=C3.childNodes.length;\\nif(isNodeText(C3))
{
return
{
node:C3,index:C7,maxIndex:C3.nodeValue.length
}
;
}
else
{
if(C6==0)
{
return
{
node:C3,index:0,maxIndex:1
}
;\\n
}
else
{
if(C7==C6)
{
var C4=C3.childNodes.item(C6-1);var C5=h(C4);return
{
node:C4,index:C5,maxIndex:C5
}
;
}
else
{
var C4=C3.childNodes.item(C7);\\nvar C5=h(C4);return
{
node:C4,index:0,maxIndex:C5
}
;
}

}

}

}
var Cr=
{

}
;Cr.startPoint=Cz(Cq.startContainer,Cq.startOffset);\\nCr.endPoint=Cz(Cq.endContainer,Cq.endOffset);Cr.focusAtStart=(((Cq.startContainer!=Cq.endContainer)||(Cq.startOffset!=Cq.endOffset))&&i.anchorNode&&(i.anchorNode==Cq.endContainer)&&(i.anchorOffset==Cq.endOffset));\\nreturn Cr;
}
else
{
return null;
}

}

}
function AW(i)
{
function Cw(C6)
{
return
{
node:C6.node,index:C6.index,maxIndex:C6.maxIndex
}
;\\n
}
if(browser.msie)
{
E.body.scrollHeight;function C0(C7,C6)
{
while(C6.firstChild&&!isNodeText(C6.firstChild))
{
C6=C6.firstChild;\\n
}
C7.moveToElementText(C6);
}
function C5()
{
return E.body.createTextRange();
}
function Ct(C6,C7)
{
if(isNodeText(C7))
{
if(C7.previousSibling&&!isNodeText(C7.previousSibling))
{
Cy(C6,C7.previousSibling);\\n
}
else
{
Ct(C6,C7.parentNode);
}

}
else
{
C0(C6,C7);if(C6.move("character",1))
{
C6.move("character",-1);
}
C6.collapse(true);\\n
}

}
function Cy(C6,C7)
{
if(isNodeText(C7))
{
Ct(C6,C7);C6.move("character",C7.nodeValue.length);
}
else
{
C0(C6,C7);\\nC6.collapse(false);
}

}
function Cz(C8)
{
var C6=C5();var C7=C8.node;if(isNodeText(C7))
{
Ct(C6,C7);C6.move("character",C8.index);\\n
}
else
{
if(C8.index==0)
{
Ct(C6,C7);
}
else
{
Cy(C6,C7);
}

}
return C6;
}
if(i)
{
if(!CY())
{
return;
}
var C2=Cw(i.startPoint);\\nvar Cq=Cw(i.endPoint);if(Cq.index==Cq.maxIndex&&Cq.node.nextSibling)
{
Cq.node=Cq.node.nextSibling;Cq.index=0;\\nCq.maxIndex=h(Cq.node);
}
var Cs=Cz(C2);Cs.setEndPoint("EndToEnd",Cz(Cq));function C4(C8)
{
var C7;try
{
C7=E.selection;\\n
}
catch(C9)
{

}
if(!C7)
{
return false;
}
var C6=C7.createRange();if(C6.parentElement().ownerDocument!=E)
{
return false;\\n
}
if(C8.compareEndPoints("StartToStart",C6)!==0)
{
return false;
}
if(C8.compareEndPoints("EndToEnd",C6)!==0)
{
return false;\\n
}
return true;
}
if(!C4(Cs))
{
Cs.select();
}

}
else
{
try
{
E.selection.empty();
}
catch(C3)
{

}

}

}
else
{
var Cx;function C1(C9)
{
var C6=Cw(C9);\\nif(Cx)
{
function C8()
{
while(C6.node.childNodes.length>0)
{
if(C6.index==0)
{
C6.node=C6.node.firstChild;C6.maxIndex=h(C6.node);\\n
}
else
{
if(C6.index==C6.maxIndex)
{
C6.node=C6.node.lastChild;C6.maxIndex=h(C6.node);C6.index=C6.maxIndex;\\n
}
else
{
break;
}

}

}

}
if(isNodeText(C6.node)&&C6.index==C6.maxIndex)
{
var C7=C6.node;while((!C7.nextSibling)&&(C7!=B)&&(C7.parentNode!=B))
{
C7=C7.parentNode;\\n
}
if(C7.nextSibling&&(!((typeof C7.nextSibling.tagName)=="string"&&C7.nextSibling.tagName.toLowerCase()=="br"))&&(C7!=C6.node)&&(C7!=B)&&(C7.parentNode!=B))
{
C6.node=C7.nextSibling;\\nC6.maxIndex=h(C6.node);C6.index=0;C8();
}

}
if(!isNodeText(C6.node))
{
C8();
}

}
if(isNodeText(C6.node))
{
return
{
container:C6.node,offset:C6.index
}
;\\n
}
else
{
return
{
container:C6.node.parentNode,offset:Bx(C6.node)+C6.index
}
;
}

}
var Cr=window.getSelection();\\nif(Cr)
{
Cr.removeAllRanges();if(i)
{
Cx=(i.startPoint.node===i.endPoint.node&&i.startPoint.index===i.endPoint.index);\\nvar Cu=C1(i.startPoint);var Cv=C1(i.endPoint);if((!Cx)&&i.focusAtStart&&Cr.collapse&&Cr.extend)
{
Cr.collapse(Cv.container,Cv.offset);\\nCr.extend(Cu.container,Cu.offset);
}
else
{
var Cs=E.createRange();Cs.setStart(Cu.container,Cu.offset);Cs.setEnd(Cv.container,Cv.offset);\\nCr.removeAllRanges();Cr.addRange(Cs);
}

}

}

}

}
function Bx(i)
{
var Cq=0;while(i.previousSibling)
{
Cq++;i=i.previousSibling;\\n
}
return Cq;
}
function g()
{
if(AO()==0||Ak()==0)
{
return;
}
function Cq(C4,C5,i)
{
if(C4[C5]!=i)
{
C4[C5]=i;
}

}
var Cy=W.firstChild.offsetWidth;\\nvar Ct=Cy+CD;if(Ct\\x3cAh)
{
Ct=Ah;
}
o=BS;if(AP)
{
o+=Ct+BO;
}
Cq(f.style,"left",o+"px");Cq(W.style,"width",Ct+"px");\\nfor(var Cw=0;Cw\\x3c2;Cw++)
{
var Cr=B.clientHeight;var Cs=(browser.msie?B.createTextRange().boundingWidth:B.clientWidth);\\nvar Cu=Ak()-Bo-Aj;var Cv=AO()-o-CR;if(Cr\\x3cCu)
{
Cr=Cu;if(browser.msie)
{
Cq(F.document.documentElement.style,"overflowY","auto");\\n
}

}
else
{
if(browser.msie)
{
Cq(F.document.documentElement.style,"overflowY","scroll");
}

}
if(K)
{
Cs=Cv;
}
else
{
if(Cs\\x3cCv)
{
Cs=Cv;\\n
}

}
if(Cr>32000)
{
Cr=32000;
}
if(Cs>32000)
{
Cs=32000;
}
Cq(f.style,"height",Cr+"px");Cq(f.style,"width",Cs+"px");\\nCq(W.style,"height",Cr+"px");
}
if(browser.mozilla)
{
if(!K)
{
var Cz=B;var Cx=Cu+"px";Cq(Cz.style,"height",Cx);\\n
}
else
{
Cq(B.style,"height","");
}

}
var C3=BB();var C2=Ab();var C1=F;var C0=20;Aw();n(W,"sidedivdelayed");\\n
}
function BE()
{
var Cq=F;var Cr=F.document;if(typeof(Cq.pageYOffset)=="number")
{
return
{
x:Cq.pageXOffset,y:Cq.pageYOffset
}
;\\n
}
var i=Cr.documentElement;if(i&&typeof(i.scrollTop)=="number")
{
return
{
x:i.scrollLeft,y:i.scrollTop
}
;
}

}
function BB()
{
return BE().x;\\n
}
function Ab()
{
return BE().y;
}
function Cn(i)
{
F.scrollTo(i,Ab());
}
function Cm(i)
{
F.scrollTo(BB(),i);
}
function Ci(i,Cq)
{
F.scrollTo(i,Cq);\\n
}
var BM=[];function BF()
{
forEach(BM,function(i)
{
i();
}
);
}
J(window,"load",CC);function Ay(i)
{
try
{
function Cq(Ct,Cv,Cu)
{
if(String(Ct[Cv]).toLowerCase()!=Cu)
{
Ct[Cv]=Cu;\\nreturn true;
}
return false;
}
if(browser.msie||browser.safari)
{
Cq(B,"contentEditable",(i?"true":"false"));\\n
}
else
{
var Cr=Cq(E,"designMode",(i?"on":"off"));if(Cr&&i&&browser.opera)
{
A9();
}

}
return true;
}
catch(Cs)
{
return false;\\n
}

}
var Ch=null;function B3(Cq)
{
var i=window.clipboardData&&window.clipboardData.getData("Text");if(i&&E.selection)
{

}

}
var q=false;\\nfunction A5(i)
{
if(i.type=="compositionstart")
{
q=true;
}
else
{
if(i.type=="compositionend")
{
q=false;
}

}

}
function A9()
{
J(window,"unload",BF);\\nJ(document,"keydown",AM);J(document,"keypress",AM);J(document,"keyup",AM);J(document,"click",CZ);J(B,"blur",CK);\\nif(browser.msie)
{
J(document,"click",CN);
}
if(browser.msie)
{
J(B,"paste",B3);
}
if((!browser.msie)&&document.documentElement)
{
J(document.documentElement,"compositionstart",A5);\\nJ(document.documentElement,"compositionend",A5);
}

}
function CN(i)
{
if((i.target.tagName||"").toLowerCase()!="html")
{
return;\\n
}
if(!(i.pageY>B.clientHeight))
{
return;
}
N("handleOuterClick",function()
{
G(11);if(P())
{
var Cq=A.lines.length()-1;\\nvar Cr=A.lines.atIndex(Cq).text.length;d([Cq,Cr],[Cq,Cr]);
}

}
);
}
function BC(Cr,i)
{
var Cq=[];(Cr.className||"").replace(/\\\\S+/g,function(Cs)
{
if((!i)||(i(Cs)))
{
Cq.push(Cs);\\n
}

}
);return Cq;
}
function Ax(i,Cq)
{
i.className=Cq.join(" ");
}
function n(Cr,Cq)
{
var i=false;var Cs=BC(Cr,function(Ct)
{
if(Ct==Cq)
{
i=true;\\n
}
return true;
}
);if(!i)
{
Cs.push(Cq);Ax(Cr,Cs);
}

}
function CH(Cq,Cr)
{
var i=false;var Cs=BC(Cq,function(Ct)
{
if(Ct==Cr)
{
i=true;\\nreturn false;
}
return true;
}
);if(i)
{
Ax(Cq,Cs);
}

}
function S(Cq,i,Cr)
{
if(Cr)
{
n(Cq,i);
}
else
{
CH(Cq,i);
}

}
function CC()
{
E=document;\\nN("setup",function()
{
var Cq=E.getElementById("innerdocbody");B=Cq;if(browser.mozilla)
{
n(B,"mozilla");\\n
}
if(browser.safari)
{
n(B,"safari");
}
if(browser.msie)
{
n(B,"msie");
}
if(browser.msie)
{
try
{
E.execCommand("BackgroundImageCache",false,true);\\n
}
catch(Cr)
{

}

}
S(B,"authorColors",true);S(B,"doesWrap",K);Bi();Aw();while(B.firstChild)
{
B.removeChild(B.firstChild);\\n
}
var i=AN("");AJ(0,A.lines.length(),[i]);AH(null,[i.domInfo],null);A.alines=Changeset.splitAttributionLines(Changeset.makeAttribution("\\\\n"),"\\\\n");\\nA9();
}
);O.setTimeout(function()
{
parent.readyFunc();
}
,0);B4=true;
}
function Bc()
{
window.focus();
}
function CK(i)
{
if(browser.msie)
{
AW(null);\\n
}

}
function J(Cq,Cr,i)
{
var Cs;if((typeof i._wrapper)!="function")
{
i._wrapper=function(Ct)
{
i(CP(Ct||window.event||
{

}
));\\n
}
;
}
var Cs=i._wrapper;if(Cq.addEventListener)
{
Cq.addEventListener(Cr,Cs,false);
}
else
{
Cq.attachEvent("on"+Cr,Cs);\\n
}
BM.push(function()
{
B2(Cq,Cr,i);
}
);
}
function B2(i,Cr,Cs)
{
var Cq=Cs._wrapper;if(i.removeEventListener)
{
i.removeEventListener(Cr,Cq,false);\\n
}
else
{
i.detachEvent("on"+Cr,Cq);
}

}
function B0(Cx)
{
var Cq=Cx.node;var Cu=Cx.index;function Cr(C1)
{
return C1.offsetLeft;\\n
}
function Cs(C1)
{
return C1.offsetLeft+C1.offsetWidth;
}
if(!isNodeText(Cq))
{
if(Cu==0)
{
return Cr(Cq);
}
else
{
return Cs(Cq);\\n
}

}
else
{
var Ct=Cu;var Cw=Cq.nodeValue.length-Cu;var i;for(i=Cq.previousSibling;i&&isNodeText(i);i=i.previousSibling)
{
Ct+=i.nodeValue;\\n
}
var Cv=(i?Cs(i):Cr(Cq.parentNode));for(i=Cq.nextSibling;i&&isNodeText(i);i=i.nextSibling)
{
Cw+=i.nodeValue;\\n
}
var C0=(i?Cr(i):Cs(Cq.parentNode));var Cy=(Ct/(Ct+Cw));var Cz=Cv+Cy*(C0-Cv);return Math.round(Cz);
}

}
function Ce()
{
var i=F;\\nvar Cq=i.document;if(i.innerHeight&&i.scrollMaxY)
{
return i.innerHeight+i.scrollMaxY;
}
else
{
if(Cq.body.scrollHeight>Cq.body.offsetHeight)
{
return Cq.body.scrollHeight;\\n
}
else
{
return Cq.body.offsetHeight;
}

}

}
function Co()
{
var i=F;var Cq=i.document;if(i.innerWidth&&i.scrollMaxX)
{
return i.innerWidth+i.scrollMaxX;\\n
}
else
{
if(Cq.body.scrollWidth>Cq.body.offsetWidth)
{
return Cq.body.scrollWidth;
}
else
{
return Cq.body.offsetWidth;\\n
}

}

}
function Ak()
{
var Cq=F;var Cr=Cq.document;var i;if(browser.opera)
{
i=Cq.innerHeight;
}
else
{
i=Cr.documentElement.clientHeight;\\n
}
if(i)
{
return i;
}
return Number(C.frame.parentNode.style.height.replace(/[^0-9]/g,"")||0);
}
function AO()
{
var Cq=F;\\nvar i=Cq.document;return i.documentElement.clientWidth;
}
function Bt(Cq)
{
var i=F;var Ct=F.document;var Cr=Cq.offsetTop+Aj-i.scrollY;\\nvar Cs=i.scrollY+Ak()-(Cq.offsetTop+Aj+Cq.offsetHeight);if(Cr\\x3c0)
{
i.scrollBy(0,Cr);
}
else
{
if(Cs\\x3c0)
{
i.scrollBy(0,-Cs);\\n
}

}

}
function CU(Cq)
{
var i=F;var Ct=F.document;Cq+=o;var Cr=Cq-i.scrollX;var Cs=i.scrollX+AO()-Cq;if(Cr\\x3c0)
{
i.scrollBy(Cr,0);\\n
}
else
{
if(Cs\\x3c0)
{
i.scrollBy(-Cs+1,0);
}

}

}
function CQ()
{
if(!A.selStart)
{
return;
}
g();var Cr=(A.selFocusAtStart?A.selStart[0]:A.selEnd[0]);\\nBt(A.lines.atIndex(Cr).lineNode);if(!K)
{
var i=Ae();if(i)
{
var Cs=(i.focusAtStart?i.startPoint:i.endPoint);\\nvar Cq=B0(Cs);CU(Cq);g();
}

}

}
function Z(Cr)
{
var Cq=A.alines[Cr];if(Cq)
{
var i=Changeset.opIterator(Cq);\\nif(i.hasNext())
{
return Changeset.opAttributeValue(i.next(),"list",A.apool)||"";
}

}
return"";
}
function Bh(Cq,i)
{
AI([[Cq,i]]);\\n
}
function AI(Cx)
{
var Cq=[0,0];var Cr=Changeset.builder(A.lines.totalWidth());for(var Cu=0;Cu\\x3cCx.length;\\nCu++)
{
var Cw=Cx[Cu];var Ct=Cw[0];var Cs=Cw[1];AS(Cr,Cq,(Cq=[Ct,0]));if(Z(Ct))
{
if(Cs)
{
AS(Cr,Cq,(Cq=[Ct,1]),[["list",Cs]],A.apool);\\n
}
else
{
BQ(Cr,Cq,(Cq=[Ct,1]));
}

}
else
{
if(Cs)
{
Cr.insert("*",[["author",e],["insertorder","first"],["list",Cs]],A.apool);\\n
}

}

}
var Cv=Cr.toString();if(!Changeset.isIdentity(Cv))
{
c(Cv);
}

}
function Bf()
{
if(!(A.selStart&&A.selEnd))
{
return;\\n
}
var Cq,Cr;Cq=A.selStart[0];Cr=Math.max(Cq,A.selEnd[0]-((A.selEnd[1]==0)?1:0));var Cu=true;for(var i=Cq;\\ni\\x3c=Cr;i++)
{
if(!Z(i))
{
Cu=false;break;
}

}
var Ct=[];for(var i=Cq;i\\x3c=Cr;i++)
{
var Cs=Z(i);Ct.push([i,Cu?"":(Cs?Cs:"bullet1")]);\\n
}
AI(Ct);
}
C.ace_doInsertUnorderedList=Bf;var z=(browser.mozilla&&(function()
{
var i=0;var Cq=false;function Cs(Cv)
{
var Cu=A.lines.atIndex(Cv).lineNode;\\nwhile(Cu.firstChild&&AF(Cu.firstChild))
{
Cu=Cu.firstChild;
}
return makeVirtualLineView(Cu);
}
function Ct(Cu,Cv)
{
return[Cu,Cv-A.lines.atIndex(Cu).lineMarker];\\n
}
function Cr(Cu,Cv)
{
return[Cu,Cv+A.lines.atIndex(Cu).lineMarker];
}
return
{
notifySelectionChanged:function()
{
if(!Cq)
{
i=0;\\n
}

}
,handleKeyEvent:function(C1)
{
if(C1.type!="keypress")
{
return false;
}
var Cx=C1.keyCode;if(Cx\\x3c37||Cx>40)
{
return false;\\n
}
p();if(!(A.selStart&&A.selEnd))
{
return true;
}
var Cy=(C1.altKey?"byWord":(C1.ctrlKey?"byWord":(C1.metaKey?"toEnd":"normal")));\\nvar Cv=Ct(A.selStart[0],A.selStart[1]);var Cu=Ct(A.selEnd[0],A.selEnd[1]);var DC=P();if(A.selFocusAtStart)
{
var DL=Cv;\\nCv=Cu;Cu=DL;
}
var DI=38,DK=40,C8=37,DF=39;var C9=false;if(DC&&!C1.shiftKey)
{
Cv=Cu;
}
else
{
if((!DC)&&(!C1.shiftKey))
{
if(Cx==C8)
{
if(A.selFocusAtStart)
{
Cv=Cu;\\n
}
else
{
Cu=Cv;
}
if(Cy=="normal")
{
C9=true;
}

}
else
{
if(Cx==DF)
{
if(A.selFocusAtStart)
{
Cu=Cv;
}
else
{
Cv=Cu;
}
if(Cy=="normal")
{
C9=true;\\n
}

}
else
{
Cv=Cu;
}

}

}

}
if(!C9)
{
function C2(DO)
{
var DN=A.lines.atIndex(DO);return DN.text.length-DN.lineMarker;\\n
}
function C5(DO)
{
var DN=A.lines.atIndex(DO);return DN.text.substring(DN.lineMarker);
}
if(Cx==DI||Cx==DK)
{
var Cz=(Cx==DI);\\nvar C4=((Cz&&Cu[0])||((!Cz)&&Cu[0]\\x3cA.lines.length()-1));var C7,C3,DB=false;if(K)
{
C7=Cs(Cu[0]);C3=C7.getVLineAndOffsetForChar(Cu[1]);\\nDB=((Cz&&C3.vline>0)||((!Cz)&&C3.vline\\x3c(C7.getNumVirtualLines()-1)));
}
var DM;if(Cy=="toEnd")
{
if(Cz)
{
Cu[0]=0;\\nCu[1]=0;
}
else
{
Cu[0]=A.lines.length()-1;Cu[1]=C2(Cu[0]);
}

}
else
{
if(Cy=="byWord")
{
if(Cz)
{
if(Cu[1]==0&&C4)
{
Cu[0]--;\\nCu[1]=0;
}
else
{
Cu[1]=0;
}

}
else
{
var C0=C2(Cu[0]);if(browser.windows)
{
if(C4)
{
Cu[0]++;Cu[1]=0;
}
else
{
Cu[1]=C0;\\n
}

}
else
{
if(Cu[1]==C0&&C4)
{
Cu[0]++;Cu[1]=C2(Cu[0]);
}
else
{
Cu[1]=C0;
}

}

}
i=0;
}
else
{
if(DB)
{
var C6=C3.vline;var Cw=C3.offset;\\nif(Cz)
{
C6--;
}
else
{
C6++;
}
if(i>Cw)
{
Cw=i;
}
else
{
i=Cw;
}
var DG=C7.getCharForVLineAndOffset(C6,Cw);Cu[1]=DG.lineChar;\\n
}
else
{
if(C4)
{
if(Cz)
{
Cu[0]--;
}
else
{
Cu[0]++;
}
var Cw=Cu[1];if(K)
{
Cw=C3.offset;
}
if(i>Cw)
{
Cw=i;
}
else
{
i=Cw;\\n
}
if(K)
{
var DH=Cs(Cu[0]);var C6=(Cz?DH.getNumVirtualLines()-1:0);var DG=DH.getCharForVLineAndOffset(C6,Cw);\\nCu[1]=DG.lineChar;
}
else
{
var C0=C2(Cu[0]);if(Cw>C0)
{
Cw=C0;
}
Cu[1]=Cw;
}

}
else
{
if(Cz)
{
Cu[1]=0;
}
else
{
Cu[1]=C2(Cu[0]);\\n
}
i=0;
}

}

}

}

}
else
{
if(Cx==C8||Cx==DF)
{
var DJ=(Cx==C8);if(DJ)
{
if(Cy=="toEnd")
{
Cu[1]=0;
}
else
{
if(Cu[1]>0)
{
if(Cy=="byWord")
{
Cu[1]=v(C5(Cu[0]),Cu[1],false);\\n
}
else
{
Cu[1]--;
}

}
else
{
if(Cu[0]>0)
{
Cu[0]--;Cu[1]=C2(Cu[0]);if(Cy=="byWord")
{
Cu[1]=v(C5(Cu[0]),Cu[1],false);\\n
}

}

}

}

}
else
{
var C0=C2(Cu[0]);if(Cy=="toEnd")
{
Cu[1]=C0;
}
else
{
if(Cu[1]\\x3cC0)
{
if(Cy=="byWord")
{
Cu[1]=v(C5(Cu[0]),Cu[1],true);\\n
}
else
{
Cu[1]++;
}

}
else
{
if(Cu[0]\\x3cA.lines.length()-1)
{
Cu[0]++;Cu[1]=0;if(Cy=="byWord")
{
Cu[1]=v(C5(Cu[0]),Cu[1],true);\\n
}

}

}

}

}
i=0;
}

}

}
var DA=((Cu[0]\\x3cCv[0])||(Cu[0]==Cv[0]&&Cu[1]\\x3cCv[1]));var DE=(DA?Cu:Cv);var DD=(DA?Cv:Cu);Cq=true;\\nd(Cr(DE[0],DE[1]),Cr(DD[0],DD[1]),DA);Cq=false;D.userChangedSelection=true;return true;
}

}
;
}
)());function CP(i)
{
var Cq=i;\\ni=extend(
{

}
,Cq);i.preventDefault=function()
{
if(Cq.preventDefault)
{
Cq.preventDefault();
}
Cq.returnValue=false;\\n
}
;i.stopPropagation=function()
{
if(Cq.stopPropagation)
{
Cq.stopPropagation();
}
Cq.cancelBubble=true;
}
;if(!i.target&&i.srcElement)
{
i.target=i.srcElement;\\n
}
if(browser.safari&&i.target.nodeType==3)
{
i.target=Cq.target.parentNode;
}
if(!i.relatedTarget&&i.fromElement)
{
i.relatedTarget=i.fromElement==i.target?i.toElement:i.fromElement;\\n
}
if(i.pageX==null&&i.clientX!=null)
{
var Cr=document.documentElement,Cs=document.body;i.pageX=i.clientX+(Cr&&Cr.scrollLeft||Cs.scrollLeft||0);\\ni.pageY=i.clientY+(Cr&&Cr.scrollTop||Cs.scrollTop||0);
}
if(!i.which&&(i.charCode||i.keyCode))
{
i.which=i.charCode||i.keyCode;\\n
}
if(!i.metaKey&&i.ctrlKey)
{
i.metaKey=i.ctrlKey;
}
if(!i.which&&i.button)
{
i.which=(i.button&1?1:(i.button&2?3:(i.button&4?2:0)));\\n
}
return i;
}
var b;var Ai;function BX()
{
b=1;W.innerHTML=\\\'\\x3ctable border="0" cellpadding="0" cellspacing="0" align="right">\\x3ctr>\\x3ctd id="sidedivinner">\\x3cdiv>1\\x3c/div>\\x3c/td>\\x3c/tr>\\x3c/table>\\\';\\nAi=F.document.getElementById("sidedivinner");
}
function CO()
{
var Cr=A.lines.length();if(Cr\\x3c1)
{
Cr=1;
}
if(Cr!=b)
{
var Cs=Ai;\\nvar Cw=F.document;while(b\\x3cCr)
{
b++;var Cx=b;var Cu=Cw.createElement("DIV");Cu.appendChild(Cw.createTextNode(String(Cx)));\\nCs.appendChild(Cu);
}
while(b>Cr)
{
Cs.removeChild(Cs.lastChild);b--;
}

}
if(D&&D.domClean)
{
var Cq=Ai.firstChild;\\nvar i=E.body.firstChild;while(Cq&&i)
{
var Ct=(i.clientHeight||i.offsetHeight);if(i.nextSibling)
{
Ct=i.nextSibling.offsetTop-i.offsetTop;\\n
}
if(Ct)
{
var Cv=Ct+"px";if(Cq.style.height!=Cv)
{
Cq.style.height=Cv;
}

}
Cq=Cq.nextSibling;i=i.nextSibling;\\n
}

}

}

}
OUTER(this);\'+\'//-->\\n\\x3c/script>\')'));
T.push('\'\\n<style type="text/css" title="dynamicsyntax"></style>\\n\'');T.push('\'</head><body id="innerdocbody" class="syntax" spellcheck="false">&nbsp;</body></html>\'');
var X='editorId = "'+A.id+'"; editorInfo = parent.'+I+'.registry[editorId]; window.onload = function() 
{
 window.onload = null; setTimeout(function() 
{
 var iframe = document.createElement("IFRAME"); iframe.scrolling = "no"; var outerdocbody = document.getElementById("outerdocbody"); iframe.frameBorder = 0; iframe.allowTransparency = true; outerdocbody.insertBefore(iframe, outerdocbody.firstChild); iframe.ace_outerWin = window; readyFunc = function() 
{
 editorInfo.onEditorReady(); readyFunc = null; editorInfo = null; 
}
; var doc = iframe.contentWindow.document; doc.open(); doc.write('+T.join("+")+"); doc.close(); 
}
, 0); 
}
";
var Y=[W,"<html><head>",('<style type="text/css">body
{
margin:0;white-space:nowrap;
}
#outerdocbody
{
background-color:#fff;
}
body.grayedout
{
background-color:#eee!important;
}
#innerdocbody
{
font-size:12px;font-family:monospace;line-height:16px;
}
body.doesWrap
{
white-space:normal;
}
#innerdocbody
{
padding-top:1px;padding-right:10px;padding-bottom:8px;padding-left:1px;overflow:hidden;background-image:url(data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
}
#sidediv
{
font-size:11px;font-family:monospace;line-height:16px;padding-top:8px;padding-right:3px;position:absolute;width:20px;top:0;left:0;cursor:default;color:white;
}
#sidedivinner
{
text-align:right;
}
.sidedivdelayed
{
background-color:#eee;color:#888!important;border-right:1px solid #999;
}
.sidedivhidden
{
display:none;
}
#outerdocbody iframe
{
display:block;position:relative;left:32px;top:7px;border:0;width:1px;height:1px;
}
#outerdocbody .hotrect
{
border:1px solid #999;position:absolute;
}
body.mozilla,body.safari
{
display:table-cell;
}
body.doesWrap
{
display:block!important;
}
.safari div
{
padding-right:1px;
}
p
{
margin:0;
}
#linemetricsdiv
{
position:absolute;left:-1000px;top:-1000px;color:white;z-index:-1;font-size:12px;font-family:monospace;
}
#overlaysdiv
{
position:absolute;left:-1000px;top:-1000px;
}
</style>'),'<link rel="stylesheet" type="text/css" href="data:text/css,"/>',"\x3cscript>",X,"\x3c/script>",'</head><body id="outerdocbody"><div id="sidediv"><!-- --></div><div id="linemetricsdiv">x</div><div id="overlaysdiv"><!-- --></div></body></html>'];
if(!Array.prototype.map)
{
Array.prototype.map=function(b)
{
if(typeof b!="function")
{
throw new TypeError();

}
var a=this.length;var c=new Array(a);var d=arguments[1];for(var Z=0;Z<a;Z++)
{
if(Z in this)
{
c[Z]=b.call(d,this[Z],Z,this);

}

}
return c;
}
;
}
var U=document.createElement("IFRAME");U.frameBorder=0;A.frame=U;document.getElementById(R).appendChild(U);
var V=U.contentWindow.document;V.open();V.write(Y.join(""));V.close();
}
)();
}
;return B;
}
$(window).bind("load",function()
{
getCollabClient.windowLoaded=true;

}
);function getCollabClient(A5,AP,Ah,Ab)
{
var AL=A5;var AM=AP.rev;var BF=AP.padId;var A0=AP.globalPadId;
var AN="IDLE";var AX;var Am;var AU="CONNECTING";var AY=null;var AW=0;var An=0;var AR=Ah.userId;var Ad;
var AI;var AK=
{

}
;AK[AR]=Ah;var AV=[];var Ag=[];var Av=[];var Ao=[];var AQ=[];Ap(AP.historicalAuthorData);
Aj(Ah);var AJ=
{
onUserJoin:function()
{

}
,onUserLeave:function()
{

}
,onUpdateUserInfo:function()
{

}
,onChannelStateChange:function()
{

}
,onClientMessage:function()
{

}
,onInternalAction:function()
{

}
,onConnectionTrouble:function()
{

}
,onServerMessage:function()
{

}

}
;
$(window).bind("unload",function()
{
if(AI)
{
AI.onclosed=function()
{

}
;AI.onhiccup=function()
{

}
;AI.disconnect(true);

}

}
);if($.browser.mozilla)
{
$(window).bind("keydown",function(A)
{
if(A.which==27)
{
A.preventDefault();
}

}
);

}
AL.setProperty("userAuthor",AR);AL.setBaseAttributedText(AP.initialAttributedText,AP.apool);AL.setUserChangeNotificationCallback(AO("handleUserChanges",AS));
function Ar(A)
{
if(AI)
{
AI.onclosed=function()
{

}
;AI.onhiccup=function()
{

}
;AI.disconnect();
}
AI=null;AT("DISCONNECTED",A);

}
function Ae(A)
{
if(typeof window.ajlog=="string")
{
window.ajlog+=A+"\n";
}
AQ.push(A);
}
function AS()
{
if((!AI)||AU=="CONNECTING")
{
if(AU=="CONNECTING"&&(((+new Date())-An)>20000))
{
Ar("initsocketfail");

}
else
{
setTimeout(AO("setTimeout(handleUserChanges)",AS),1000);
}
return;
}
var A=(+new Date());if(AN!="IDLE")
{
if(AN=="COMMITTING"&&(A-AW)>20000)
{
AY="slowcommit";
AI.disconnect();
}
else
{
if(AN=="COMMITTING"&&(A-AW)>5000)
{
AJ.onConnectionTrouble("SLOW");
}
else
{
setTimeout(AO("setTimeout(handleUserChanges)",AS),3000);

}

}
return;
}
var D=AW+500;if(A<D)
{
setTimeout(AO("setTimeout(handleUserChanges)",AS),D-A);return;
}
var C=false;
var B=AL.prepareUserChangeset();if(B.changeset)
{
AW=A;AN="COMMITTING";AX=
{
type:"USER_CHANGES",baseRev:AM,changeset:B.changeset,apool:B.apool
}
;
Am=Ad;Af(AX);C=true;AJ.onInternalAction("commitPerformed");
}
if(C)
{
setTimeout(AO("setTimeout(handleUserChanges)",AS),3000);

}

}
function A1()
{
var A=
{

}
;A.screen=[$(window).width(),$(window).height(),window.screen.availWidth,window.screen.availHeight,window.screen.width,window.screen.height].join(",");
A.ip=AP.clientIp;A.useragent=AP.clientAgent;return A;
}
function Au()
{
var A=false;Al("setUpSocket",function()
{
AY=null;
var B=Ad;Ad=String(Math.floor(Math.random()*1000000000000));AI=new WebSocket(Ad);AI.onmessage=AO("socket.onmessage",Ay);
AI.onclosed=AO("socket.onclosed",A7);AI.onopen=AO("socket.onopen",function()
{
AZ=0;AT("CONNECTED");var C=
{
type:"CLIENT_READY",roomType:"padpage",roomName:"padpage/"+A0,data:
{
lastRev:AM,userInfo:AK[AR],stats:A1()
}

}
;
if(B)
{
C.data.isReconnectOf=B;C.data.isCommitPending=(AN=="COMMITTING");
}
Af(C);A3();
}
);AI.onhiccup=AO("socket.onhiccup",A2);
AI.onlogmessage=Ae;AI.connect();A=true;
}
);if(A)
{
An=+new Date();
}
else
{
Ar("initsocketfail");
}

}
function As()
{
if(getCollabClient.windowLoaded)
{
Au();

}
else
{
setTimeout(As,200);
}

}
setTimeout(As,0);var AZ=0;function A2(A)
{
Ae("HICCUP (connected:"+(!!A.connected)+")");
var B=A.connected;if(!B)
{
AZ++;if(AZ>1)
{
AT("RECONNECTING");
}

}
else
{
AZ=0;AT("CONNECTED");
}

}
function Af(A)
{
AI.postMessage(JSON.stringify(
{
type:"COLLABROOM",data:A
}
));

}
function AO(B,A)
{
return function()
{
try
{
return A.apply(this,Array.prototype.slice.call(arguments));
}
catch(C)
{
Ag.push(C);
Av.push(B);Ao.push(+new Date());throw C;
}

}
;
}
function Al(B,A)
{
try
{
AO(B,A)();
}
catch(C)
{

}

}
function Ay(F)
{
if(!AI)
{
return;

}
if(!F.data)
{
return;
}
var E=JSON.parse(F.data);if(E.type!="COLLABROOM")
{
return;
}
var A=E.data;if(A.type=="NEW_CHANGES")
{
var C=A.newRev;
var G=A.changeset;var H=(A.author||"");var I=A.apool;if(C!=(AM+1))
{
Ae("bad message revision on NEW_CHANGES: "+C+" not "+(AM+1));
AI.disconnect();return;
}
AM=C;AL.applyChangesToBase(G,H,I);
}
else
{
if(A.type=="ACCEPT_COMMIT")
{
var C=A.newRev;
if(C!=(AM+1))
{
Ae("bad message revision on ACCEPT_COMMIT: "+C+" not "+(AM+1));AI.disconnect();return;
}
AM=C;
AL.applyPreparedChangesetToBase();At();Al("onInternalAction",function()
{
AJ.onInternalAction("commitAcceptedByServer");

}
);Al("onConnectionTrouble",function()
{
AJ.onConnectionTrouble("OK");
}
);AS();
}
else
{
if(A.type=="NO_COMMIT_PENDING")
{
if(AN=="COMMITTING")
{
At();
AS();
}

}
else
{
if(A.type=="USER_NEWINFO")
{
var B=A.userInfo;var D=B.userId;if(AK[D])
{
AK[D]=B;AJ.onUpdateUserInfo(B);
Ac();
}
else
{
AK[D]=B;AJ.onUserJoin(B);Ac();
}
Aj(B);
}
else
{
if(A.type=="USER_LEAVE")
{
var B=A.userInfo;var D=B.userId;
if(AK[D])
{
delete AK[B.userId];BD(B);AJ.onUserLeave(B);Ac();
}

}
else
{
if(A.type=="DISCONNECT_REASON")
{
AY=A.reason;

}
else
{
if(A.type=="CLIENT_MESSAGE")
{
AJ.onClientMessage(A.payload);
}
else
{
if(A.type=="SERVER_MESSAGE")
{
AJ.onServerMessage(A.payload);

}

}

}

}

}

}

}

}

}
function Az(A)
{
A.userId=AR;AK[AR]=A;Aj(A);if(!AI)
{
return;
}
Af(
{
type:"USERINFO_UPDATE",userInfo:A
}
);

}
function Aj(A)
{
Ai(A.userId,A.colorId);
}
function Ai(B,A,D)
{
if(A||(typeof A)=="number")
{
A=Number(A);if(Ab&&Ab.colorPalette&&Ab.colorPalette[A])
{
var C=Ab.colorPalette[A];
if(D)
{
AL.setAuthorInfo(B,
{
bgcolor:C,fade:0.5
}
);
}
else
{
AL.setAuthorInfo(B,
{
bgcolor:C
}
);
}

}

}

}
function BD(A)
{
Ai(A.userId,A.colorId,true);

}
function BB()
{
return A6(AK);
}
function Ap(B)
{
for(var A in B)
{
var C=B[A];if(!AK[A])
{
Ai(A,C.colorId,true);

}

}

}
function Ac()
{

}
function A7(C)
{
AI=null;$.each(A4(AK),function()
{
var F=String(this);if(F!=AR)
{
var G=AK[F];
delete AK[F];AJ.onUserLeave(G);Ac();
}

}
);var A=AY||C.reason;var D=C.reconnect;if(D)
{
AV.push(+new Date());
var B=8;var E=10000;if(AV.length>=B&&((+new Date())-AV[AV.length-B])<E)
{
AT("DISCONNECTED","looping");

}
else
{
AT("RECONNECTING",A);Au();
}

}
else
{
AT("DISCONNECTED",A);
}

}
function AT(A,B)
{
if(A!=AU)
{
AU=A;AJ.onChannelStateChange(AU,B);

}

}
function A4(B)
{
var A=[];$.each(B,function(C,D)
{
A.push(C);
}
);return A;
}
function A6(B)
{
var A=[];$.each(B,function(D,C)
{
A.push(C);

}
);return A;
}
var Aa=[];function BA(A,B)
{
return function()
{
var D=this;var E=arguments;function C()
{
A.apply(D,E);

}
C.tag=B;if(AU=="CONNECTING")
{
Aa.push(C);
}
else
{
C();
}

}
;
}
function A3(C)
{
var D=[];for(var A=0;A<Aa.length;
A++)
{
var B=Aa[A];if((!C)||(C==B.tag))
{
B();
}
else
{
D.push(B);
}

}
Aa=D;
}
function BE(A)
{
Af(
{
type:"CLIENT_MESSAGE",payload:A
}
);

}
function BC()
{
return AM;
}
function Ax()
{
var H=3;var J=3;var C=50;var I=500;function E(K)
{
return String(K).substring(0,I);

}
var A=
{
errors:
{
length:0
}

}
;function F(K,O,N)
{
var L=
{
catcher:O
}
;if(N)
{
L.time=N;
}
try
{
if(K.description)
{
L.description=K.description;

}

}
catch(M)
{

}
try
{
if(K.fileName)
{
L.fileName=K.fileName;
}

}
catch(M)
{

}
try
{
if(K.lineNumber)
{
L.lineNumber=K.lineNumber;

}

}
catch(M)
{

}
try
{
if(K.message)
{
L.message=K.message;
}

}
catch(M)
{

}
try
{
if(K.name)
{
L.name=K.name;
}

}
catch(M)
{

}
try
{
if(K.number)
{
L.number=K.number;

}

}
catch(M)
{

}
try
{
if(K.stack)
{
L.stack=E(K.stack);
}

}
catch(M)
{

}
A.errors[A.errors.length]=L;A.errors.length++;

}
for(var B=0;((B<Ag.length)&&(B<H));B++)
{
F(Ag[B],Av[B],Ao[B]);
}
if(AL)
{
var G=AL.getUnhandledErrors();for(var B=0;
((B<G.length)&&(B<J));B++)
{
var D=G[B];F(D.error,"ACE",D.time);
}

}
A.time=+new Date();A.collabState=AN;A.channelState=AU;
A.lastCommitTime=AW;A.numSocketReconnects=AV.length;A.userId=AR;A.currentRev=AM;A.participants=(function()
{
var K=[];
for(var L in AK)
{
K.push(L);
}
return K.join(",");
}
)();if(AQ.length>C)
{
AQ=AQ.slice(AQ.length-C,AQ.length);

}
A.debugMessages=
{
length:0
}
;for(var B=0;B<AQ.length;B++)
{
A.debugMessages[B]=E(AQ[B]);A.debugMessages.length++;

}
return A;
}
function A8()
{
var A=
{

}
;A.userInfo=AK[AR];A.baseRev=AM;if(AN=="COMMITTING"&&AX)
{
A.committedChangeset=AX.changeset;
A.committedChangesetAPool=AX.apool;A.committedChangesetSocketId=Am;AL.applyPreparedChangesetToBase();

}
var B=AL.prepareUserChangeset();if(B.changeset)
{
A.furtherChangeset=B.changeset;A.furtherChangesetAPool=B.apool;

}
return A;
}
function At()
{
AN="IDLE";AJ.onInternalAction("newlyIdle");Aq();
}
function Aw(A)
{
Ak.push(A);Aq();

}
var Ak=[];function Aq()
{
setTimeout(function()
{
if(AN=="IDLE")
{
while(Ak.length>0)
{
var A=Ak.shift();A();

}

}

}
,0);
}
var A9;return(A9=
{
setOnUserJoin:function(A)
{
AJ.onUserJoin=A;
}
,setOnUserLeave:function(A)
{
AJ.onUserLeave=A;

}
,setOnUpdateUserInfo:function(A)
{
AJ.onUpdateUserInfo=A;
}
,setOnChannelStateChange:function(A)
{
AJ.onChannelStateChange=A;

}
,setOnClientMessage:function(A)
{
AJ.onClientMessage=A;
}
,setOnInternalAction:function(A)
{
AJ.onInternalAction=A;

}
,setOnConnectionTrouble:function(A)
{
AJ.onConnectionTrouble=A;
}
,setOnServerMessage:function(A)
{
AJ.onServerMessage=A;

}
,updateUserInfo:BA(Az),getConnectedUsers:BB,sendClientMessage:BE,getCurrentRevisionNumber:BC,getDiagnosticInfo:Ax,getMissedChanges:A8,callWhenNotCommitting:Aw,addHistoricalAuthors:Ap
}
);

}
function selectElementContents(F)
{
if($.browser.msie)
{
var D=document.body.createTextRange();D.moveToElementText(F);
D.select();
}
else
{
if(window.getSelection)
{
var E=window.getSelection();if(E)
{
var D=document.createRange();
D.selectNodeContents(F);E.removeAllRanges();E.addRange(D);
}

}

}

}
var paduserlist=(function()
{
var U=(function()
{
function I()
{
return"usertr"+(I.counter++);

}
I.counter=1;var D=[];var C=[];var B=[];var O=-12;var y=12;function E(k,j)
{
var i=Math.abs(k/12);if(j==2)
{
i=i*i;

}
else
{
if(j==3)
{
i=i*i*i;
}
else
{
if(j==4)
{
i=i*i*i*i;
}
else
{
if(j>=5)
{
i=i*i*i*i*i;
}

}

}

}
return Math.round(26*(1-i));

}
var A=6;var t=20;var AA=2;var K=padutils.makeAnimationScheduler(z,t,AA).scheduleAnimation;var w=4;function M(i)
{
return'<td colspan="'+w+'" style="border:0;height:'+i+'px"><!-- --></td>';

}
function L(i)
{
return(!i.name)&&(i.status!="Disconnected");
}
function u(i,n,m)
{
var k=H(n,m).match(/<td.*?<\/td>/gi);
  if(L(m)&&i.find("td.usertdname input:enabled").length>0)
{
for(var j=0;j<k.length;j++)
{
var l=$(i.find("td").get(j));
  if(!l.hasClass("usertdname"))
{
l.replaceWith(k[j]);
}

}

}
else
{
i.html(k.join(""));
}
return i;
}
function H(k,i)
{
var j;
  var l=(i.id.charAt(0)!="p");if(i.name)
{
j=padutils.escapeHtml(i.name);if(l&&pad.getIsProPad())
{
j+=" (Guest)";
  
}

}
else
{
j='<input type="text" class="editempty newinput" value="unnamed" '+(L(i)?"":'disabled="disabled" ')+"/>";
  
}
return['<td style="height:',k,'px" class="usertdswatch"><div class="swatch" style="background:'+i.color+'">&nbsp;</div></td>','<td style="height:',k,'px" class="usertdname">',j,"</td>",'<td style="height:',k,'px" class="usertdstatus">',padutils.escapeHtml(i.status),"</td>",'<td style="height:',k,'px" class="activity">',padutils.escapeHtml(i.activity),"</td>"].join("");
  
}
function N(i,j)
{
return'<tr id="'+i+'">'+j+"</tr>";
}
function F(i)
{
return $("#"+i.domId);
}
function s(i)
{
if(i.data&&i.data.status=="Disconnected")
{
i.opacity=0.5;
  
}
else
{
delete i.opacity;
}

}
function G(i,j)
{
if(j.titleText)
{
i.attr("title",j.titleText);
}
else
{
i.removeAttr("title");
  
}

}
function J()
{
$("#otheruserstable input.newinput").each(function()
{
var l=$(this);var i=l.closest("tr");
  if(i.length>0)
{
var j=i.parent().children().index(i);if(j>=0)
{
var k=B[j].data.id;f($(this),k);
}

}

}
).removeClass("newinput");
  
}
function Q(l,n,i)
{
l=Math.max(0,Math.min(B.length,l));i=(i===undefined?4:i);var m=I();var j=
{
data:n,animationStep:O,domId:m,animationPower:i
}
;
  s(j);B.splice(l,0,j);var k;if(i==0)
{
k=$(N(m,H(E(0),n)));j.animationStep=0;
}
else
{
C.push(j);k=$(N(m,M(E(O))));
  
}
G(k,n);if(l==0)
{
$("table#otheruserstable").prepend(k);
}
else
{
F(B[l-1]).after(k);
}
if(i!=0)
{
K();
}
J();return j;
  
}
function AB(l,j)
{
var i=B[l];if(i)
{
i.data=j;s(i);if(i.animationStep==0)
{
var k=F(i);u(k,E(0),i.data).find("td").css("opacity",(i.opacity===undefined?1:i.opacity));
  G(k,j);J();
}

}

}
function P(k,j)
{
j=(j===undefined?4:j);var i=B[k];if(i)
{
B.splice(k,1);if(j==0)
{
F(i).remove();
  
}
else
{
i.animationStep=-i.animationStep;i.animationPower=j;D.push(i);K();
}

}

}
function x(j,l,i)
{
i=(i===undefined?1:i);
  var k=B[j];if(k&&j!=l)
{
var m=k.data;P(j,i);Q(l,m,i);
}

}
function z()
{
for(var m=C.length-1;m>=0;m--)
{
var i=C[m];
  var j=++i.animationStep;var l=E(j,i.animationPower);var k=F(i);var n=(i.opacity===undefined?1:i.opacity);
  if(j<=-A)
{
k.find("td").height(l);
}
else
{
if(j==-A+1)
{
k.html(H(l,i.data)).find("td").css("opacity",n*1/A);
  G(k,i.data);
}
else
{
if(j<0)
{
k.find("td").css("opacity",n*(A-(-j))/A).height(l);
}
else
{
if(j==0)
{
k.html(H(l,i.data)).find("td").css("opacity",n*1).height(l);
  G(k,i.data);C.splice(m,1);
}

}

}

}

}
for(var m=D.length-1;m>=0;m--)
{
var i=D[m];var j=++i.animationStep;var k=F(i);
  var l=E(j,i.animationPower);var n=(i.opacity===undefined?1:i.opacity);if(j<A)
{
k.find("td").css("opacity",n*(A-j)/A).height(l);
  
}
else
{
if(j==A)
{
k.html(M(l));
}
else
{
if(j<=y)
{
k.find("td").height(l);
}
else
{
D.splice(m,1);k.remove();
}

}

}

}
J();
return(C.length>0)||(D.length>0);
}
var v=
{
insertRow:Q,removeRow:P,moveRow:x,updateRow:AB
}
;return v;
}
());
var S=
{

}
;var R=[];var T=[];var Y=false;function f(A,B)
{
c(A,function()
{
var C=X(B);if(C>=0)
{
return R[C].name||"";

}
else
{
return"";
}

}
,function(C)
{
if(!C)
{
A.addClass("editempty");A.val("unnamed");
}
else
{
A.attr("disabled","disabled");
pad.suggestUserName(B,C);
}

}
);
}
function W()
{
if(S.name)
{
$("#myusernameedit").removeClass("editempty").val(S.name);

}
else
{
$("#myusernameedit").addClass("editempty").val("< enter your name >");
}
if(Y)
{
$("#myswatchbox").addClass("myswatchboxunhoverable").removeClass("myswatchboxhoverable");

}
else
{
$("#myswatchbox").addClass("myswatchboxhoverable").removeClass("myswatchboxunhoverable");
}
$("#myswatch").css("background",pad.getColorPalette()[S.colorId]);

}
function X(C)
{
var B=-1;for(var A=0;A<R.length;A++)
{
if(R[A].userId==C)
{
B=A;break;
}

}
return B;
}
function c(A,B,C)
{
A.bind("focus",function(G)
{
var F=B();
if(A.val()!==F)
{
A.val(F);
}
A.addClass("editactive").removeClass("editempty");
}
);A.bind("blur",function(G)
{
var F=A.removeClass("editactive").val();
C(F);
}
);padutils.bindEnterAndEscape(A,function E()
{
A.blur();
}
,function D()
{
A.val(B()).blur();
}
);A.removeAttr("disabled").addClass("editable");

}
function e()
{
if(!Y)
{
var B=pad.getColorPalette();for(var A=0;A<B.length;A++)
{
$("#mycolorpicker .n"+(A+1)+" .pickerswatch").css("background",B[A]);

}
$("#mycolorpicker").css("display","block");Y=true;W();
}
$("#mycolorpicker .pickerswatchouter").removeClass("picked");
$("#mycolorpicker .pickerswatchouter:eq("+(S.colorId||0)+")").addClass("picked");
}
function g(A)
{
return Number(A.get(0).className.match(/\bn([0-9]+)\b/)[1])-1;

}
function d(B)
{
if(B)
{
var A=g($("#mycolorpicker .picked"));if(A>=0)
{
S.colorId=A;pad.notifyChangeColor(A);

}

}
Y=false;$("#mycolorpicker").css("display","none");W();
}
function b()
{
if(R.length==0)
{
$("#otheruserstable").hide();
$("#nootherusers").show();
}
else
{
$("#nootherusers").hide();$("#otheruserstable").show();
}

}
var Z=
{

}
;var a=0;
var h=padutils.makeAnimationScheduler(function()
{
var A=$("#guestprompts .guestprompt");if(A.length==0)
{
return false;

}
a=1-a;if(a)
{
A.css("background","#ffa");
}
else
{
A.css("background","#ffe");
}
return true;
}
,1000);var V=
{
init:function(A)
{
V.setMyUserInfo(A);
$("#otheruserstable tr").remove();if(pad.getUserIsGuest())
{
$("#myusernameedit").addClass("myusernameedithoverable");
c($("#myusernameedit"),function()
{
return S.name||"";
}
,function(B)
{
S.name=B;pad.notifyChangeName(B);window.setTimeout(function()
{
W();

}
,0);
}
);
}
$("#myswatchbox").click(e);$("#mycolorpicker .pickerswatchouter").click(function()
{
$("#mycolorpicker .pickerswatchouter").removeClass("picked");
$(this).addClass("picked");
}
);$("#mycolorpickersave").click(function()
{
d(true);
}
);$("#mycolorpickercancel").click(function()
{
d(false);

}
);
}
,setMyUserInfo:function(A)
{
S=$.extend(
{

}
,A);W();
}
,userJoinOrUpdate:function(A)
{
if((!A.userId)||(A.userId==S.userId))
{
return;

}
var C=
{

}
;C.color=pad.getColorPalette()[A.colorId];C.name=A.name;C.status="";C.activity="";C.id=A.userId;
C.titleText=[A.userAgent||"",A.ip||""].join(" \n");var B=X(A.userId);var E=R.length;if(B>=0)
{
E--;
}
var D=padutils.binarySearch(E,function(F)
{
if(B>=0&&F>=B)
{
F++;

}
var H=R[F];var I=(H.name||"").toLowerCase();var G=(A.name||"").toLowerCase();var J=H.userId;var K=A.userId;
return(I>G)||(I==G&&J>K);
}
);if(B>=0)
{
if(B==D)
{
R[B]=A;T[B]=C;U.updateRow(B,C);
}
else
{
R.splice(B,1);T.splice(B,1);
R.splice(D,0,A);T.splice(D,0,C);U.updateRow(B,C);U.moveRow(B,D);
}

}
else
{
R.splice(D,0,A);T.splice(D,0,C);
U.insertRow(D,C);
}
b();
}
,userLeave:function(C)
{
var B=X(C.userId);if(B>=0)
{
var A=T[B];A.status="Disconnected";
U.updateRow(B,A);if(A.leaveTimer)
{
window.clearTimeout(A.leaveTimer);
}
var E=C.userId;var D=window.setTimeout(function()
{
var F=X(E);
if(F>=0)
{
var G=T[F];if(G.status=="Disconnected"&&G.leaveTimer==D)
{
R.splice(F,1);T.splice(F,1);U.removeRow(F);
b();
}

}

}
,8000);A.leaveTimer=D;
}
b();
}
,showGuestPrompt:function(C,D)
{
if(Z[C])
{
return;
}
var A=padutils.encodeUserId(C);
var E="hide-guest-prompt-"+A;padutils.cancelActions(E);var B=$("#guestprompt-"+A);if(B.length==0)
{
B=$('<div id="guestprompt-'+A+'" class="guestprompt"><div class="choices"><a href="javascript:void(paduserlist.answerGuestPrompt(\''+A+"',false))\">Deny</a> <a href=\"javascript:void(paduserlist.answerGuestPrompt('"+A+'\',true))">Approve</a></div><div class="guestname"><strong>Guest:</strong> '+padutils.escapeHtml(D)+"</div></div>");
$("#guestprompts").append(B);
}
else
{
B.find(".guestname").html("<strong>Guest:</strong> "+padutils.escapeHtml(D));

}
var F=padutils.getCancellableAction(E,function()
{
V.removeGuestPrompt(C);
}
);window.setTimeout(F,15000);
h.scheduleAnimation();
}
,removeGuestPrompt:function(A)
{
var B=$("#guestprompt-"+padutils.encodeUserId(A));
B.removeAttr("id").fadeOut("fast",function()
{
B.remove();
}
);Z[A]=true;window.setTimeout(function()
{
delete Z[A];

}
,5000);
}
,answerGuestPrompt:function(D,C)
{
var A=padutils.decodeUserId(D);var B=
{
type:"guestanswer",authId:pad.getUserId(),guestId:A,answer:(C?"approved":"denied")
}
;
pad.sendClientMessage(B);V.removeGuestPrompt(A);
}

}
;return V;
}
());var padchat=(function()
{
var b=[""];var U=[null];
var X=
{

}
;var T=[];var W=0;var Y=false;var h=50;function V(A,C)
{
if((typeof X[A])=="number")
{
return X[A];

}
else
{
if(C)
{
return -1;
}
else
{
var B=b.length;b.push(A);X[A]=B;return B;
}

}

}
function c(C)
{
var A=new Date(+C);
var D=String(A.getFullYear());var B=("0"+String(A.getMonth()+1)).slice(-2);var E=("0"+String(A.getDate())).slice(-2);
return D+"-"+B+"-"+E;
}
function j(C)
{
var A=new Date(+C);var E=(["January","February","March","April","May","June","July","August","September","October","November","December"])[A.getMonth()];
var B=A.getDate();var D=A.getFullYear();return E+" "+B+", "+D;
}
function f(C)
{
var B=c(C);var A=padutils.binarySearch(T.length,function(F)
{
return T[F].day>=B;

}
);if(A>=T.length||T[A].day!=B)
{
T.splice(A,0,
{
day:B,lines:[]
}
);var E='<div class="chatday" id="chatday'+B+'"><h2 class="dayheader">'+j(C)+"</h2></div>";
var D=$("#chatlines .chatday");if(A==D.length)
{
$("#chatlines").append(E);
}
else
{
D.eq(A).before(E);
}

}
return A;

}
function d(A,B,E,K,P)
{
var Q=f(B);var J=$("#chatday"+c(B));var L=new Date(+B);var M=L.getHours()+":"+("0"+L.getMinutes()).slice(-2);
var D;if(E)
{
D=padutils.escapeHtml(E);
}
else
{
D="<i>unnamed</i>";
}
var I="chatline";if(A)
{
var N=V(A);I+=" chatauthor"+N;

}
var O=padutils.escapeHtmlWithClickableLinks(K,"_blank");var C=$('<div class="'+I+'"><span class="chatlinetime">'+M+' </span><span class="chatlinename">'+D+': </span><span class="chatlinetext">'+O+"</span></div>");
var F=T[Q].lines;var G=
{
userId:A,time:B,name:E,lineText:K
}
;if(P)
{
J.find("h2").after(C);F.splice(0,0,G);

}
else
{
J.append(C);F.push(G);
}
if(A)
{
var H=a(A);if(H)
{
C.css("background",H);
}

}
return
{
lineNode:C
}
;
}
function e(A)
{
for(var D in A.historicalAuthorData)
{
var G=A.historicalAuthorData[D];
var F=V(D);if(!U[F])
{
U[F]=
{
colorId:G.colorId,faded:true
}
;
}

}
W=A.start;var E=A.lines;for(var C=E.length-1;
C>=0;C--)
{
var B=E[C];d(B.userId,B.time,B.name,B.lineText,true);
}
if(W>0)
{
$("a#chatloadmore").css("display","block");

}
else
{
$("a#chatloadmore").css("display","none");
}

}
function g(B)
{
var A=colorutils.css2triple(B);A=colorutils.blend(A,[1,1,1],0.5);
return colorutils.triple2css(A);
}
function a(D)
{
var C=V(D,true);if(C<0)
{
return"";
}
else
{
var B=U[C];if(!B)
{
return"";

}
else
{
var A=pad.getColorPalette()[B.colorId];if(B.faded)
{
A=g(A);
}
return A;
}

}

}
function Z(C,D)
{
var A=V(C);
U[A]=D;var B=a(C);if(B)
{
$("#chatlines .chatauthor"+A).css("background",B);
}

}
function i()
{
var B=$("#chatentrybox").val();
if(B)
{
$("#chatentrybox").val("").focus();var A=
{
type:"chat",userId:pad.getUserId(),lineText:B,senderName:pad.getUserName(),authId:pad.getUserId()
}
;
pad.sendClientMessage(A);S.receiveChat(A);S.scrollToBottom();
}

}
var S=
{
init:function(A,B)
{
f(+new Date);
$("a#chatloadmore").click(S.loadMoreHistory);S.handleUserJoinOrUpdate(B);e(A);padutils.bindEnterAndEscape($("#chatentrybox"),function(C)
{
i();

}
,null);S.scrollToBottom();
}
,receiveChat:function(A)
{
var B=$("#chatlines").get(0);var C=(B.scrollTop-(B.scrollHeight-$(B).height())>=-5);
d(A.userId,+new Date,A.senderName,A.lineText,false);if(C)
{
window.setTimeout(function()
{
S.scrollToBottom();

}
,0);
}

}
,handleUserJoinOrUpdate:function(A)
{
Z(A.userId,
{
colorId:A.colorId,faded:false
}
);
}
,handleUserLeave:function(A)
{
Z(A.userId,
{
colorId:A.colorId,faded:true
}
);

}
,scrollToBottom:function()
{
var A=$("#chatlines").get(0);A.scrollTop=A.scrollHeight;
}
,scrollToTop:function()
{
var A=$("#chatlines").get(0);
A.scrollTop=0;
}
,loadMoreHistory:function()
{
if(Y)
{
return;
}
var B=W;var F=Math.max(0,B-h);var D=pad.getPadId();
Y=true;$("#padchat #chatloadmore").css("display","none");$("#padchat #chatloadingmore").css("display","block");
$.ajax(
{
type:"get",url:"/ep/pad/chathistory",data:
{
padId:D,start:F,end:B
}
,success:C,error:E
}
);function C(K)
{
A();
var J=JSON.parse(K);var H=$("#chatlines").get(0);var I=function()
{
return 0;
}
;var G=$("#chatlines .chatday:first .chatline:first").children().eq(0);
if(G.length>0)
{
var M=G.position().top;var L=H.scrollTop;I=function()
{
var N=G.position().top;return N+(L-M);

}
;
}
e(J);H.scrollTop=Math.max(0,Math.min(H.scrollHeight,I()));
}
function E()
{
A();
}
function A()
{
Y=false;
$("#padchat #chatloadmore").css("display","block");$("#padchat #chatloadingmore").css("display","none");

}

}

}
;return S;
}
());var padimpexp=(function()
{
var O=null;var R=null;function Q()
{
$("#impexp-import .importframe").remove();
$("#impexp-import").append($('<iframe style="display: none;" name="importiframe" class="importframe"></iframe>'));

}
function X()
{
$("#importformfilediv").addClass("importformenabled");$("#importsubmitinput").removeAttr("disabled");
$("#importmessagefail").fadeOut("fast");$("#importarrow").show();$("#importarrow").animate(
{
paddingLeft:"0px"
}
,500).animate(
{
paddingLeft:"10px"
}
,150,"swing").animate(
{
paddingLeft:"0px"
}
,150,"swing").animate(
{
paddingLeft:"10px"
}
,150,"swing").animate(
{
paddingLeft:"0px"
}
,150,"swing").animate(
{
paddingLeft:"10px"
}
,150,"swing").animate(
{
paddingLeft:"0px"
}
,150,"swing");

}
function Z()
{
$("#importmessagefail").fadeOut("fast");var A=window.confirm("Importing a file will overwrite the current text of the pad. Are you sure you want to proceed?");
if(A)
{
R=paddocbar.hideLaterIfNoOtherInteraction();O=window.setTimeout(function()
{
if(!O)
{
return;
}
O=null;
T("Request timed out.");
}
,25000);$("#importsubmitinput").attr(
{
disabled:true
}
).val("Importing...");window.setTimeout(function()
{
$("#importfileinput").attr(
{
disabled:true
}
);

}
,0);$("#importarrow").stop(true,true).hide();$("#importstatusball").show();
}
return A;
}
function T(A)
{
P(A);
S();Q();
}
function S()
{
$("#importsubmitinput").removeAttr("disabled").val("Import Now");window.setTimeout(function()
{
$("#importfileinput").removeAttr("disabled");

}
,0);$("#importstatusball").hide();b();
}
function b()
{
if(O)
{
window.clearTimeout(O);O=null;
}

}
function P(B)
{
function A(C)
{
$("#importmessagefail").html('<strong style="color: red">Import failed:</strong> '+(B||"Please try a different file."))[(C?"fadeIn":"show")]();

}
if($("#importexport .importmessage").is(":visible"))
{
$("#importmessagesuccess").fadeOut("fast");$("#importmessagefail").fadeOut("fast",function()
{
A(true);

}
);
}
else
{
A();
}

}
function U(A)
{
$.ajax(
{
type:"post",url:"/ep/pad/impexp/import2",data:
{
token:A,padId:pad.getPadId()
}
,success:V,error:a,timeout:25000
}
);
Q();
}
function a(B,A,C)
{
P("Error during conversion.");S();
}
function V(A,B)
{
if(A.substr(0,2)=="ok")
{
if($("#importexport .importmessage").is(":visible"))
{
$("#importexport .importmessage").hide();

}
$("#importmessagesuccess").html('<strong style="color: green">Import successful!</strong>').show();$("#importformfilediv").hide();
window.setTimeout(function()
{
$("#importmessagesuccess").fadeOut("slow",function()
{
$("#importformfilediv").show();

}
);if(R)
{
R();
}

}
,3000);
}
else
{
if(A.substr(0,4)=="fail")
{
P('Couldn\'t update pad contents. This can happen if your web browser has "cookies" disabled.');

}
else
{
if(A.substr(0,4)=="msg:")
{
P(A.substr(4));
}

}

}
S();
}
function Y()
{
var A=$(this);if(A.hasClass("exporthrefpdf"))
{
A="PDF";

}
else
{
if(A.hasClass("exporthrefdoc"))
{
A="Microsoft Word";
}
else
{
if(A.hasClass("exporthrefodt"))
{
A="OpenDocument";

}
else
{
A="this file";
}

}

}
alert("Exporting as "+A+" format is disabled. Please contact your system administrator for details.");
return false;
}
var W=
{
init:function()
{
$("#impexp-close").click(function()
{
paddocbar.setShownPanel(null);

}
);Q();$("#importfileinput").change(X);$("#importform").submit(Z);$(".disabledexport").click(Y);
}
,handleFrameCall:function(B,A)
{
if(B=="importFailed")
{
T(A[0]);

}
else
{
if(B=="importSuccessful")
{
U(A[0]);
}

}

}
,disable:function()
{
$("#impexp-disabled-clickcatcher").show();
$("#impexp-import").css("opacity",0.5);$("#impexp-export").css("opacity",0.5);
}
,enable:function()
{
$("#impexp-disabled-clickcatcher").hide();
$("#impexp-import").css("opacity",1);$("#impexp-export").css("opacity",1);
}

}
;return W;
}
());var padsavedrevs=(function()
{
function x(B)
{
var A=B.slice();
A.reverse();return A;
}
function AH(B,C)
{
var A=$('<div class="srouterbox"><div class="srinnerbox"><a href="javascript:void(0)" class="srname"><!-- --></a><div class="sractions"><a class="srview" href="javascript:void(0)" target="_blank">view</a> | <a class="srrestore" href="javascript:void(0)">restore</a></div><div class="srtime"><!-- --></div><div class="srauthor"><!-- --></div><img class="srtwirly" src="/static/img/misc/status-ball.gif"></div></div>');
y(A,B.label);AE(A,B.timestamp);A.find(".srauthor").html("by "+padutils.escapeHtml(B.savedBy));var E="/ep/pad/view/"+pad.getPadId()+"/"+B.id;
A.find(".srview").attr("href",E);var D="javascript:void padsavedrevs.restoreRevision("+C+");";A.find(".srrestore").attr("href",D);
A.find(".srname").click(function(F)
{
AN(C,A);
}
);return A;
}
function y(B,A)
{
B.find(".srname").html(padutils.escapeHtml(A)).attr("title",A);

}
function AE(B,A)
{
B.find(".srtime").html(padutils.escapeHtml(padutils.timediff(new Date(A))));
}
function v(A)
{
return $("#savedrevisions .srouterbox").eq(A);

}
function AN(C,E)
{
var A=$('<input type="text" class="srnameedit"/>');E.find(".srnameedit").remove();var B=E.find(".srname");
A.width(B.width());A.height(B.height());A.css("top",B.position().top);A.css("left",B.position().left);
B.after(A);B.css("opacity",0);function G()
{
A.remove();B.css("opacity",1);
}
var D=h[C];var F=D.label;A.blur(function()
{
var J=A.val();
if(J&&J!=F)
{
AF(C,J);
}
G();
}
);A.val(D.label).focus().select();padutils.bindEnterAndEscape(A,function I()
{
A.blur();

}
,function H()
{
A.val("").blur();
}
);
}
function AF(D,A)
{
var E=h[D];$.ajax(
{
type:"post",url:"/ep/pad/saverevisionlabel",data:
{
userId:pad.getUserId(),padId:pad.getPadId(),revId:E.id,newLabel:A
}
,success:B,error:C
}
);
function B(G)
{
var F=JSON.parse(G);j.newRevisionList(F);pad.sendClientMessage(
{
type:"revisionLabel",revisionList:x(h),savedBy:pad.getUserName(),newLabel:A
}
);

}
function C(F)
{
alert("Oops! There was an error saving that revision label.  Please try again later.");

}

}
var h=[];function AK(A,F)
{
for(var B=0;B<h.length;B++)
{
var H=h[B];var D=A[B];if(D.label!=H.label)
{
y(v(B),D.label);

}

}
for(var C=h.length;C<A.length;C++)
{
var E=AH(A[C],C);$("#savedrevs-scrollinner").append(E);E.css("left",C*k);

}
var I=(A.length>h.length);h=A;if(I)
{
o(n());if(F)
{
q(i);
}
if(!F)
{
var G=h[h.length-1].label;AL(G);
}

}

}
function AI()
{
for(var A=0;
A<h.length;A++)
{
var B=h[A];var C=v(A);AE(C,B.timestamp);
}

}
var AB=padutils.makeShowHideAnimator(function(A)
{
if(A==-1)
{
$("#revision-notifier").css("opacity",0).css("display","block");

}
else
{
if(A==0)
{
$("#revision-notifier").css("opacity",1);
}
else
{
if(A==1)
{
$("#revision-notifier").css("opacity",0).css("display","none");

}
else
{
if(A<0)
{
$("#revision-notifier").css("opacity",1);
}
else
{
if(A>0)
{
$("#revision-notifier").css("opacity",1-A);

}

}

}

}

}

}
,false,25,300);function AL(A)
{
$("#revision-notifier .name").html(padutils.escapeHtml(A));AB.show();
padutils.cancelActions("hide-revision-notifier");var B=padutils.getCancellableAction("hide-revision-notifier",function()
{
AB.hide();

}
);window.setTimeout(B,3000);
}
var k=120;var m=0;var i=0;function z()
{
return k*h.length;
}
function AG()
{
return $("#savedrevs-scrollouter").width();

}
function t()
{
return Math.min(AG(),z());
}
function n()
{
return z();
}
function q(A)
{
m=A;$("#savedrevs-scrollinner").css("right",A);
w();
}
function o(B,A)
{
i=Math.min(n(),Math.max(t(),B));if(!A)
{
AM();
}

}
function AM()
{
w();AJ.scheduleAnimation();

}
function w()
{
$("#savedrevs-scrollleft").toggleClass("disabledscrollleft",i<=t());$("#savedrevs-scrollright").toggleClass("disabledscrollright",i>=n());

}
var AJ=padutils.makeAnimationScheduler(function()
{
o(i,true);if(Math.abs(i-m)<1)
{
q(i);return false;
}
else
{
q(m+(i-m)*0.5);
return true;
}

}
,50,2);var u=false;function r(A)
{
u=A;p();
}
function AC()
{
var A=pad.getPrivilege("maxRevisions");
return(!(A<0||A>h.length));
}
function p()
{
if(u||(!pad.isFullyConnected())||AC())
{
$("#savedrevs-savenow").css("opacity",0.75);

}
else
{
$("#savedrevs-savenow").css("opacity",1);
}

}
var l=null;var AD=0;function AA(B)
{
s();AD=+new Date;
l=window.setTimeout(function A()
{
if(!l)
{
return;
}
j.scroll(B);var C=(+new Date)-AD;var D=(C>2000?50:300);
l=window.setTimeout(A,D);
}
,300);$(document).bind("mouseup",s);
}
function s()
{
if(l)
{
window.clearTimeout(l);
l=null;
}
$(document).unbind("mouseup",s);
}
var j=
{
init:function(A)
{
j.newRevisionList(A,true);$("#savedrevs-savenow").click(function()
{
j.saveNow();

}
);$("#savedrevs-scrollleft").mousedown(function()
{
j.scroll("left");AA("left");
}
);$("#savedrevs-scrollright").mousedown(function()
{
j.scroll("right");
AA("right");
}
);$("#savedrevs-close").click(function()
{
paddocbar.setShownPanel(null);
}
);window.setInterval(function()
{
AI();

}
,60*1000);
}
,restoreRevision:function(C)
{
var D=h[C];var H=("Restoring this revision will overwrite the current text of the pad. Are you sure you want to continue?");
var E=paddocbar.hideLaterIfNoOtherInteraction();var B=v(C);if(confirm(H))
{
B.find(".srtwirly").show();
$.ajax(
{
type:"get",url:"/ep/pad/getrevisionatext",data:
{
padId:pad.getPadId(),revId:D.id
}
,success:G,error:F
}
);

}
function G(I)
{
A();var J=JSON.parse(I);padeditor.restoreRevisionText(J);window.setTimeout(function()
{
E();

}
,0);
}
function F(I)
{
A();alert("Oops!  There was an error retreiving the text (revNum= "+D.revNum+"; padId="+pad.getPadId());

}
function A()
{
B.find(".srtwirly").hide();
}

}
,showReachedLimit:function()
{
alert("Sorry, you do not have privileges to save more than "+pad.getPrivilege("maxRevisions")+" revisions.");

}
,newRevisionList:function(B,A)
{
var C=x(B);AK(C,A);p();
}
,saveNow:function()
{
if(u)
{
return;
}
if(!pad.isFullyConnected())
{
return;

}
if(AC())
{
j.showReachedLimit();return;
}
r(true);var A=pad.getUserName()||"unnamed";pad.callWhenNotCommitting(D);
function D()
{
$.ajax(
{
type:"post",url:"/ep/pad/saverevision",data:
{
padId:pad.getPadId(),savedBy:A,savedById:pad.getUserId(),revNum:pad.getCollabRevisionNumber()
}
,success:B,error:C
}
);

}
function B(F)
{
r(false);var E=JSON.parse(F);j.newRevisionList(E);pad.sendClientMessage(
{
type:"newRevisionList",revisionList:E,savedBy:A
}
);

}
function C(E)
{
r(false);alert("Oops!  The server failed to save the revision.  Please try again later.");

}

}
,handleResizePage:function()
{
w();
}
,handleIsFullyConnected:function(A)
{
p();
}
,scroll:function(D)
{
var A=t();
var B=n();if(D=="left")
{
if(i>A)
{
var C=Math.floor((i-1-A)/k);o(Math.max(0,C)*k+A);
}

}
else
{
if(D=="right")
{
if(i<B)
{
var C=Math.floor((B-i-1)/k);
o(B-Math.max(0,C)*k);
}

}

}

}

}
;return j;
}
());var padconnectionstatus=(function()
{
var C=
{
what:"connecting"
}
;
var D=
{
init:function()
{
$("button#forcereconnect").click(function()
{
pad.forceReconnect();
}
);
}
,connected:function()
{
C=
{
what:"connected"
}
;
padmodals.hideModal(500);
}
,reconnecting:function()
{
C=
{
what:"reconnecting"
}
;$("#connectionbox").get(0).className="modaldialog cboxreconnecting";
padmodals.showModal("#connectionbox",500);
}
,disconnected:function(B)
{
C=
{
what:"disconnected",why:B
}
;var A=String(B).toLowerCase();
if(!(A=="userdup"||A=="looping"||A=="slowcommit"||A=="initsocketfail"||A=="unauth"))
{
A="unknown";
}
var F="modaldialog cboxdisconnected cboxdisconnected_"+A;
$("#connectionbox").get(0).className=F;padmodals.showModal("#connectionbox",500);
}
,isFullyConnected:function()
{
return C.what=="connected";

}
,getStatus:function()
{
return C;
}

}
;return D;
}
());$(document).ready(function()
{
pad.init();
}
);$(window).unload(function()
{
pad.dispose();

}
);var pad=
{
collabClient:null,myUserInfo:null,diagnosticInfo:
{

}
,initTime:0,clientTimeOffset:(+new Date())-clientVars.serverTimestamp,preloadedImages:false,padOptions:
{

}
,getPadId:function()
{
return clientVars.padId;

}
,getClientIp:function()
{
return clientVars.clientIp;
}
,getIsProPad:function()
{
return clientVars.isProPad;

}
,getColorPalette:function()
{
return clientVars.colorPalette;
}
,getDisplayUserAgent:function()
{
return padutils.uaDisplay(clientVars.userAgent);

}
,getIsDebugEnabled:function()
{
return clientVars.debugEnabled;
}
,getPrivilege:function(B)
{
return clientVars.accountPrivs[B];

}
,getUserIsGuest:function()
{
return clientVars.userIsGuest;
}
,getUserId:function()
{
return pad.myUserInfo.userId;

}
,getUserName:function()
{
return pad.myUserInfo.name;
}
,sendClientMessage:function(B)
{
pad.collabClient.sendClientMessage(B);

}
,init:function()
{
pad.diagnosticInfo.uniqueId=padutils.uniqueId();pad.initTime=+(new Date());pad.padOptions=clientVars.initialOptions;
if((!$.browser.msie)&&(!($.browser.mozilla&&$.browser.version.indexOf("1.8.")==0)))
{
document.domain=document.domain;

}
if($.browser.msie)
{
try
{
doc.execCommand("BackgroundImageCache",false,true);
}
catch(D)
{

}

}
padcookie.init(clientVars.cookiePrefsToSet);
$("#widthprefcheck").click(pad.toggleWidthPref);$("#sidebarcheck").click(pad.toggleSidebar);pad.myUserInfo=
{
userId:clientVars.userId,name:clientVars.userName,ip:pad.getClientIp(),colorId:clientVars.userColor,userAgent:pad.getDisplayUserAgent()
}
;
if(clientVars.specialKey)
{
pad.myUserInfo.specialKey=clientVars.specialKey;if(clientVars.specialKeyTranslation)
{
$("#specialkeyarea").html("mode: "+String(clientVars.specialKeyTranslation).toUpperCase());

}

}
paddocbar.init(
{
isTitleEditable:pad.getIsProPad(),initialTitle:clientVars.initialTitle,initialPassword:clientVars.initialPassword,guestPolicy:pad.padOptions.guestPolicy
}
);
padimpexp.init();padsavedrevs.init(clientVars.initialRevisionList);padeditor.init(C,pad.padOptions.view||
{

}
);
paduserlist.init(pad.myUserInfo);padchat.init(clientVars.chatHistory,pad.myUserInfo);padconnectionstatus.init();
padmodals.init();pad.collabClient=getCollabClient(padeditor.ace,clientVars.collab_client_vars,pad.myUserInfo,
{
colorPalette:pad.getColorPalette()
}
);
pad.collabClient.setOnUserJoin(pad.handleUserJoin);pad.collabClient.setOnUpdateUserInfo(pad.handleUserUpdate);
pad.collabClient.setOnUserLeave(pad.handleUserLeave);pad.collabClient.setOnClientMessage(pad.handleClientMessage);
pad.collabClient.setOnServerMessage(pad.handleServerMessage);pad.collabClient.setOnChannelStateChange(pad.handleChannelStateChange);
pad.collabClient.setOnInternalAction(pad.handleCollabAction);function C()
{
padeditbar.init();setTimeout(function()
{
padeditor.ace.focus();

}
,0);
}

}
,dispose:function()
{
padeditor.dispose();
}
,notifyChangeName:function(B)
{
pad.myUserInfo.name=B;pad.collabClient.updateUserInfo(pad.myUserInfo);
padchat.handleUserJoinOrUpdate(pad.myUserInfo);
}
,notifyChangeColor:function(B)
{
pad.myUserInfo.colorId=B;
pad.collabClient.updateUserInfo(pad.myUserInfo);padchat.handleUserJoinOrUpdate(pad.myUserInfo);
}
,notifyChangeTitle:function(B)
{
pad.collabClient.sendClientMessage(
{
type:"padtitle",title:B,changedBy:pad.myUserInfo.name||"unnamed"
}
);

}
,notifyChangePassword:function(B)
{
pad.collabClient.sendClientMessage(
{
type:"padpassword",password:B,changedBy:pad.myUserInfo.name||"unnamed"
}
);

}
,changePadOption:function(F,E)
{
var D=
{

}
;D[F]=E;pad.handleOptionsChange(D);pad.collabClient.sendClientMessage(
{
type:"padoptions",options:D,changedBy:pad.myUserInfo.name||"unnamed"
}
);

}
,changeViewOption:function(F,E)
{
var D=
{
view:
{

}

}
;D.view[F]=E;pad.handleOptionsChange(D);pad.collabClient.sendClientMessage(
{
type:"padoptions",options:D,changedBy:pad.myUserInfo.name||"unnamed"
}
);

}
,handleOptionsChange:function(C)
{
if(C.view)
{
if(!pad.padOptions.view)
{
pad.padOptions.view=
{

}
;
}
for(var D in C.view)
{
pad.padOptions.view[D]=C.view[D];

}
padeditor.setViewOptions(pad.padOptions.view);
}
if(C.guestPolicy)
{
pad.padOptions.guestPolicy=C.guestPolicy;
paddocbar.setGuestPolicy(C.guestPolicy);
}

}
,getPadOptions:function()
{
return pad.padOptions;
}
,isPadPublic:function()
{
return(!pad.getIsProPad())||(pad.getPadOptions().guestPolicy=="allow");

}
,suggestUserName:function(D,C)
{
pad.collabClient.sendClientMessage(
{
type:"suggestUserName",unnamedId:D,newName:C
}
);

}
,handleUserJoin:function(B)
{
paduserlist.userJoinOrUpdate(B);padchat.handleUserJoinOrUpdate(B);
}
,handleUserUpdate:function(B)
{
paduserlist.userJoinOrUpdate(B);
padchat.handleUserJoinOrUpdate(B);
}
,handleUserLeave:function(B)
{
paduserlist.userLeave(B);padchat.handleUserLeave(B);

}
,handleClientMessage:function(C)
{
if(C.type=="suggestUserName")
{
if(C.unnamedId==pad.myUserInfo.userId&&C.newName&&!pad.myUserInfo.name)
{
pad.notifyChangeName(C.newName);
paduserlist.setMyUserInfo(pad.myUserInfo);
}

}
else
{
if(C.type=="chat")
{
padchat.receiveChat(C);
}
else
{
if(C.type=="padtitle")
{
paddocbar.changeTitle(C.title);

}
else
{
if(C.type=="padpassword")
{
paddocbar.changePassword(C.password);
}
else
{
if(C.type=="newRevisionList")
{
padsavedrevs.newRevisionList(C.revisionList);

}
else
{
if(C.type=="revisionLabel")
{
padsavedrevs.newRevisionList(C.revisionList);
}
else
{
if(C.type=="padoptions")
{
var D=C.options;
pad.handleOptionsChange(D);
}
else
{
if(C.type=="guestanswer")
{
paduserlist.removeGuestPrompt(C.guestId);
}

}

}

}

}

}

}

}

}
,editbarClick:function(B)
{
if(padeditbar)
{
padeditbar.toolbarClick(B);

}

}
,dmesg:function(F)
{
if(pad.getIsDebugEnabled())
{
var D=$("#djs").get(0);var E=(D.scrollTop-(D.scrollHeight-$(D).height())>=-20);
$("#djs").append("<p>"+F+"</p>");if(E)
{
D.scrollTop=D.scrollHeight;
}

}

}
,handleServerMessage:function(B)
{
if(B.type=="NOTICE")
{
if(B.text)
{
alertBar.displayMessage(function(A)
{
A.find("#servermsgdate").html(" ("+padutils.simpleDateTime(new Date)+")");
A.find("#servermsgtext").html(B.text);
}
);
}
if(B.js)
{
window["eval"](B.js);
}

}
else
{
if(B.type=="GUEST_PROMPT")
{
paduserlist.showGuestPrompt(B.userId,B.displayName);

}

}

}
,handleChannelStateChange:function(G,F)
{
var I=!!padconnectionstatus.isFullyConnected();var J=(padconnectionstatus.getStatus().what=="connecting");
if(G=="CONNECTED")
{
padconnectionstatus.connected();
}
else
{
if(G=="RECONNECTING")
{
padconnectionstatus.reconnecting();

}
else
{
if(G=="DISCONNECTED")
{
pad.diagnosticInfo.disconnectedMessage=F;pad.diagnosticInfo.padInitTime=pad.initTime;
pad.asyncSendDiagnosticInfo();if(typeof window.ajlog=="string")
{
window.ajlog+=("Disconnected: "+F+"\n");

}
padeditor.disable();padeditbar.disable();paddocbar.disable();padimpexp.disable();padconnectionstatus.disconnected(F);

}

}

}
var H=!!padconnectionstatus.isFullyConnected();if(H!=I)
{
pad.handleIsFullyConnected(H,J);
}

}
,handleIsFullyConnected:function(C,D)
{
if(C&&!pad.preloadedImages)
{
window.setTimeout(function()
{
if(!pad.preloadedImages)
{
pad.preloadImages();
pad.preloadedImages=true;
}

}
,1000);
}
padsavedrevs.handleIsFullyConnected(C);pad.determineSidebarVisibility(C&&!D);

}
,determineSidebarVisibility:function(C)
{
if(pad.isFullyConnected())
{
var D=padutils.getCancellableAction("set-sidebar-visibility",function()
{
$("body").toggleClass("hidesidebar",!!padcookie.getPref("hideSidebar"));

}
);window.setTimeout(D,C?3000:0);
}
else
{
padutils.cancelActions("set-sidebar-visibility");$("body").removeClass("hidesidebar");

}

}
,handleCollabAction:function(B)
{
if(B=="commitPerformed")
{
padeditbar.setSyncStatus("syncing");
}
else
{
if(B=="newlyIdle")
{
padeditbar.setSyncStatus("done");

}

}

}
,hideServerMessage:function()
{
alertBar.hideMessage();
}
,asyncSendDiagnosticInfo:function()
{
pad.diagnosticInfo.collabDiagnosticInfo=pad.collabClient.getDiagnosticInfo();
window.setTimeout(function()
{
$.ajax(
{
type:"post",url:"/ep/pad/connection-diagnostic-info",data:
{
padId:pad.getPadId(),diagnosticInfo:JSON.stringify(pad.diagnosticInfo)
}
,success:function()
{

}
,error:function()
{

}

}
);

}
,0);
}
,forceReconnect:function()
{
$("form#reconnectform input.padId").val(pad.getPadId());pad.diagnosticInfo.collabDiagnosticInfo=pad.collabClient.getDiagnosticInfo();
$("form#reconnectform input.diagnosticInfo").val(JSON.stringify(pad.diagnosticInfo));$("form#reconnectform input.missedChanges").val(JSON.stringify(pad.collabClient.getMissedChanges()));
$("form#reconnectform").submit();
}
,toggleWidthPref:function()
{
var B=!padcookie.getPref("fullWidth");padcookie.setPref("fullWidth",B);
$("#widthprefcheck").toggleClass("widthprefchecked",!!B).toggleClass("widthprefunchecked",!B);pad.handleWidthChange();

}
,toggleSidebar:function()
{
var B=!padcookie.getPref("hideSidebar");padcookie.setPref("hideSidebar",B);
$("#sidebarcheck").toggleClass("sidebarchecked",!B).toggleClass("sidebarunchecked",!!B);pad.determineSidebarVisibility();

}
,handleWidthChange:function()
{
var D=padcookie.getPref("fullWidth");if(D)
{
$("body").addClass("fullwidth").removeClass("limwidth").removeClass("squish1width").removeClass("squish2width");

}
else
{
$("body").addClass("limwidth").removeClass("fullwidth");var C=$(window).width();$("body").toggleClass("squish1width",(C<912&&C>812)).toggleClass("squish2width",(C<=812));

}

}
,handleImportExportFrameCall:function(C,D)
{
padimpexp.handleFrameCall.call(padimpexp,C,Array.prototype.slice.call(arguments,1));

}
,callWhenNotCommitting:function(B)
{
pad.collabClient.callWhenNotCommitting(B);
}
,getCollabRevisionNumber:function()
{
return pad.collabClient.getCurrentRevisionNumber();

}
,isFullyConnected:function()
{
return padconnectionstatus.isFullyConnected();
}
,addHistoricalAuthors:function(B)
{
if(!pad.collabClient)
{
window.setTimeout(function()
{
pad.addHistoricalAuthors(B);

}
,1000);
}
else
{
pad.collabClient.addHistoricalAuthors(B);
}

}
,preloadImages:function()
{
var E=["/static/img/jun09/pad/feedbackbox2.gif","/static/img/jun09/pad/sharebox4.gif","/static/img/jun09/pad/sharedistri.gif","/static/img/jun09/pad/colorpicker.gif","/static/img/jun09/pad/docbarstates.png","/static/img/jun09/pad/overlay.png"];
function F()
{
if(E.length==0)
{
return;
}
var A=new Image();A.src=E.shift();if(A.complete)
{
D();
}
else
{
$(A).bind("error load onreadystatechange",D);

}

}
function D()
{
window.setTimeout(F,0);
}
D();
}

}
;var alertBar=(function()
{
var D=padutils.makeShowHideAnimator(E,false,25,400);
function E(A)
{
if(A==-1)
{
$("#alertbar").css("opacity",0).css("display","block");
}
else
{
if(A==0)
{
$("#alertbar").css("opacity",1);

}
else
{
if(A==1)
{
$("#alertbar").css("opacity",0).css("display","none");
}
else
{
if(A<0)
{
$("#alertbar").css("opacity",A+1);

}
else
{
if(A>0)
{
$("#alertbar").css("opacity",1-A);
}

}

}

}

}

}
var F=
{
displayMessage:function(A)
{
D.show();A($("#alertbar"));

}
,hideMessage:function()
{
D.hide();
}

}
;return F;
}
());