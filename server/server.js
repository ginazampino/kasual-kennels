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

// Static file handling:
const pathToStatic = path.resolve(__dirname, "../wwwroot");
app.use(express.static(pathToStatic));

// Nunjucks initial configuration:
const pathToViews = path.resolve(__dirname, "../views");
nunjucks.configure(pathToViews, {
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