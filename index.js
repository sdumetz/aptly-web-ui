'use strict';
const webpack = require("webpack");
const express = require("express");
const fs = require("fs")
// Returns an Express server
var server = express()
var transpiler = webpack(require("./webpack.config.js"))
var routes = require("./fixtures/routes.json")
server.use("/ui/vendor",express.static('vendor'));
server.get("/",function(req,res){
  res.redirect(301, '/ui/');
})
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

Object.keys(routes).forEach((route)=>{
  server.get("/api/"+route,function(req,res){
    res.status(200).send(routes[route])
  })
})
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
server.listen(8080,function(){
  console.log("Loaded server at : http://localhost:8080")
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
