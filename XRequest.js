function XRequest(url, foo, blk) {
  if ("function" !== typeof foo) {
    console.error("callback not provided!.")
    return
  }
  var id = XRequest.resId++;
  var s;
  
  url=(XRequest.script.src=url,XRequest.script.src)
  url= XRequest.host + "?id=" + id + "&src=" + url;
  
  if (XRequest.useImport) {
    import(url);
  } else {
  if (!document.currentScript||document.readyState === "complete") {
    s = document.createElement("script");
    blk&&(s.blocking = "render");
    s.fetchpriority ="high"
    s.src = url;
    (document.body||document.head).appendChild(s);
  }else{
    document.write('<script fetchpriority="high" src="'+url+'" xid="'+id+'" '+(blk&&'blocking="render"'||'')+'></script>')
    s=document.querySelector('script[xid="'+id+'"]');
   // s.remove()
  }
  
  s.logger=function(msg) {
   console.error(msg)
  }

  s.onerror = function () {
    XRequest.resId--;
    s.remove();
    foo && XRequest.res[id][2].foo("",delete XRequest.res[id][2].foo);
    delete XRequest.res[id];
  };
  }
  
  
  XRequest.res[id] = [s, {
    foo:foo,
    status:0,
    statusText:"",
    getResponseHeader:function() {
     return "";
    }
  }];
  
  return XRequest.res[id][2]
}

XRequest.script=document.createElement("script")
//XRequest.errEv = document.createEvent("Event");
//XRequest.errEv.initEvent(name, false, false);
XRequest.res = {};
XRequest.resId = 0;
XRequest.host = "https://x.cyclic.app/XRequest";

/*

try {
  eval("var import;")
} catch (e) {
  XRequest.useImport=true;
}
*/