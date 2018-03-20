var express = require("express");
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

// Static file handling:
app.use(express.static("."));

// Nunjucks initial configuration:
nunjucks.configure("./views", {
    autoescape: true,
    express: app,
    noCache: true
});

require('./routes/site.js')(app);
require('./routes/admin.js')(app);

// Port listening:
app.listen(port, function () {
    console.log("Listening:" + port);
});