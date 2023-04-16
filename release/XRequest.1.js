function XRequest(url, foo, blk) {
  if ("function" !== typeof foo) {
    console.error("callback not provided!.")
    return
  }
  var id = XRequest.resId++;
  var s = document.createElement("script");
  blk && (s.blocking = "render");
  s.src = url;
  s.src = XRequest.host + "?id=" + id + "&src=" + s.src;
  document.head.appendChild(s);

  XRequest.res[id] = [foo, s];

  s.onerror = function () {
    XRequest.resId--;
    s.remove();
    foo && foo("",true);
    delete XRequest.res[id];
  };
}

XRequest.errEv = document.createEvent("Event");
XRequest.errEv.initEvent(name, false, false);
XRequest.res = {};
XRequest.resId = 0;
XRequest.host = "https://x.cyclic.app/XRequest";
