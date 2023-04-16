function XRequest(url, foo, blk) {
  if ("function" !== typeof foo) {
    console.error("callback not provided!.")
    return
  }
  var id = XRequest.resId++;
  var s;
  
  url=(XRequest.script.src=url,XRequest.script.src)
  url= XRequest.host + "?id=" + id + "&src=" + url;

  if (!document.currentScript||document.readyState === "complete") {
    s = document.createElement("script");
    blk&&(s.blocking = "render");
   // s.fetchpriority ="high"
    s.src = url;
    document.head.appendChild(s);
  }else{
    document.write('<script src="'+url+'" xid="'+id+'" '+(blk&&'blocking="render"'||'')+'></script>')
    s=document.querySelector('script[xid="'+id+'"]');
    s.remove()
  }
  

  s.onerror = function () {
    XRequest.resId--;
    s.remove();
    foo && XRequest.res[id][2].foo("",delete XRequest.res[id][2].foo);
    delete XRequest.res[id];
  };
  XRequest.res[id] = [foo, s, {
    foo:foo,
    status:0,
    statusText:"",
    getResponseHeader:function() {
     return arguments.callee.header
    }
  }];
  return XRequest.res[id][2]
}

XRequest.script=document.createElement("script")
//XRequest.errEv = document.createEvent("Event");
//XRequest.errEv.initEvent(name, false, false);
XRequest.res = {};
XRequest.resId = 0;
XRequest.host = 
location.host.includes("localhost")&&"http://localhost:12345/XRequest"||

"https://x.cyclic.app/XRequest";


