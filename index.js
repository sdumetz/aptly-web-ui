'use strict';

const webpack = require("webpack");
const express = require("express");
const proxy = require('express-http-proxy');
const fs = require("fs")

const isProduction = process.env["NODE_ENV"];
//Newer conf env vars
const conf = {
  url : process.env.PROXY_URL ||process.env.APTLY_WEB_UI_PROXY_API_URL,
  username: process.env.PROXY_AUTH ||process.env.APTLY_WEB_UI_PROXY_API_BASIC_AUTH_USERNAME,
  password: process.env.PROXY_PASS ||process.env.APTLY_WEB_UI_PROXY_API_BASIC_AUTH_PASSWORD,
  port: process.env.PORT ||process.env.APTLY_WEB_UI_PORT||8080
}


// Returns an Express server
var server = express()
var transpiler = webpack(require("./webpack.config.js"))
var routes = require("./fixtures/routes.json")
server.use("/ui/vendor",express.static('vendor'));
server.get("/",function(req,res){
  res.redirect(301, '/ui/');
})
//Actual service
server.get("/ui*",function(req,res){
  res.setHeader("content-type", "text/html");
  fs.stat(__dirname+req.path.replace(/^\/ui/,""),function(err,stats){
    if(err||!stats.isFile()){
      console.log("serving index on : ",req.path.replace(/^\/ui/,""))
      fs.createReadStream(__dirname+"/index.html").pipe(res)
    }else{
      fs.createReadStream(__dirname+req.path.replace(/^\/ui/,"")).pipe(res)
    }
  })

})

//Proxy to aptly's API if configured
if (conf.url) {
  server.use(/^\/(api|pool|dist)/, proxy(conf.url, {
     limit: '10mb',
    forwardPath: function(req, res) {
      return req.originalUrl;
    },
    decorateRequest: function(reqOpt, req) {
      if (conf.username && conf.password) {
        var auth = 'Basic ' + new Buffer(
          conf.username + ':' + conf.password
        ).toString('base64');
        reqOpt.headers['Authorization'] = auth;
      }
      if (!isProduction) console.log('Sending request to ' + conf.url + req.originalUrl);
      return reqOpt;
    }
  }));
} else {
  //DUMMY responses
  console.log("Using DUMMY API for development")
  console.log("Set PROXY_URL env var to configure proxy")
  Object.keys(routes).forEach((route)=>{
    server.get("/api/"+route,function(req,res){
      res.status(200).send(routes[route])
    })
  })
}
//TODO non-watch transpiler for production builds
transpiler.watch({ // watch options:
}, function(err, stats) {
    if(err){
      console.warn(err);
    }
    var jsonStats = stats.toJson();
    if(jsonStats.errors.length > 0)
        return handleCompileError(jsonStats.errors);
    if(jsonStats.warnings.length > 0)
      return handleCompileWarn(jsonStats.warnings)
    console.log("done compiling");
});
console.log("port:",conf.port);
server.listen(conf.port, function() {
  console.log("Loaded server at : http://localhost:" + conf.port)
});


/**
 * HELPERS
 */
 var handleCompileWarn = function(warns){
   warns.forEach(function(warn){
     console.warn(warn);
   })
 }
 var handleCompileError = function(errors){
   errors.forEach(function(error){
     console.error(error);
   })
 }
