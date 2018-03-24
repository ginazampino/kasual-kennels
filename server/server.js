var express = require("express");
var path = require("path");
var nunjucks = require("nunjucks");
var mysql = require("./mysql");

// Express instance creation:
var app = express();
var port = 8085;

mysql.setConnectionInfo({
    host     : "localhost",
    database : "kasualkennels",
    user     : "root",
    password : ""
});

var middlewares = require('./middlewares');
middlewares.install(app);

require('./routes/site.js')(app);
require('./routes/admin.js')(app);

// Port listening:
app.listen(port, function () {
    console.log("Listening:" + port);
});