var express = require("express");
var path = require("path");
var nunjucks = require("nunjucks");
var mysql = require("./mysql");

// Express instance creation:
var app = express();
var port = 8085;

var middlewares = require('./middlewares');
middlewares.install(app);

var routes = require('./routes');
routes.install(app);

// Port listening:
app.listen(port, function () {
    console.log("Listening:" + port);
});