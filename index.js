'use strict';
const webpack = require("webpack");
const express = require("express")
// Returns an Express server
var server = express()
var transpiler = webpack(require("./webpack.config.js"))
var routes = require("./fixtures/routes.json")
server.use(express.static('.'));
/*
server.get("/api/:cmd",function(req,res){
  if(routes[req.params.cmd]){
    res.status(200).send(routes[req.params.cmd])
  }else{
    console.log("unkwnown command : ",req.params.cmd)
    res.status(404).send({code:404,message:"Not Found"});
  }
})*/
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
