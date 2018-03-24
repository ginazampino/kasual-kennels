var express = require('express');
var mysql = require('../mysql');
var nunjucks = require('nunjucks');
var path = require('path');

module.exports.install = function (app) {
    addMysql(app);
    addStatic(app);
    addNunjucks(app);

    require('./business').install(app);
};

function addMysql(app) {
    mysql.setConnectionInfo({
        host     : "localhost",
        database : "kasualkennels",
        user     : "root",
        password : ""
    });    
}

function addStatic(app) {
    const pathToStatic = path.resolve(__dirname, "../../wwwroot");
    app.use(express.static(pathToStatic));
}

function addNunjucks(app) {
    const pathToViews = path.resolve(__dirname, "../../views");
    nunjucks.configure(pathToViews, {
        autoescape: true,
        express: app,
        noCache: true
    });
}