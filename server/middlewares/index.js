var express = require('express');
var nunjucks = require('nunjucks');
var path = require('path');

module.exports.install = function (app) {
    addStatic(app);
    addNunjucks(app);
};

function addStatic(app) {
    const pathToStatic = path.resolve(__dirname, "../wwwroot");
    app.use(express.static(pathToStatic));
}

function addNunjucks(app) {
    const pathToViews = path.resolve(__dirname, "../views");
    nunjucks.configure(pathToViews, {
        autoescape: true,
        express: app,
        noCache: true
    });
}