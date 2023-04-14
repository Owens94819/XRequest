require("./HTTPParser");

const express = require("express"),
  app = express(),
  // fetch = require("node-fetch"),
  url = require("url"),
  http = require("http"),
  https = require("https"),
  server = app.listen(process.env.PORT || 12345, () => {
     /* fetch("http:/\/localhost:12345?id=0&src=http://localhost:8158/test.js")
   .then(e=>e.text())
   .then(console.log)
  */
    var port = server.address().port;
    console.log(`http://localhost:${port}\n-----------`);
  }),
  _end="XRequest.res[$][1].remove();XRequest.resId--;"

app.use((req, res) => {
  res.setHeader("content-type", "text/javascript");
  var src= req.query.src;
  var id = req.query.id;
  var _http;
  var end=_end.replace("$",id)
  
  try{
  	
  src=url.parse(src)
  
  "https:"===src.protocol && (_http = https)
  ||
  "http:"===src.protocol && (_http = http);
  
 // src.headers=req.headers;
  //console.log(src)
  
  _http
    .get(src, (req) => {
      req.setEncoding("utf8");
      res.write(end+`XRequest.res[${id}][0](delete XRequest.res[${id}] &&\``);
      req.on("data", (ch) => res.write(ch.replace(/[\`\\\$\{]/g, "\\$&")));
      req.on("end", () => res.end(`\`);`));
    })
    .on("error", (e) => {
      console.log("err", src, e);
      res.end(end+`XRequest.res[${id}][0]("",delete XRequest.res[${id}])`);
    });

  }catch(e){
  	console.error(e)
      res.end(end+`XRequest.res[${id}][0]("",delete XRequest.res[${id}])`);
  	return
   }
  
});
