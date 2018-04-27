var bodyParser = require('body-parser');
var express = require('express');
var expressSession = require('express-session');
var mysql = require('../mysql');
var nunjucks = require('nunjucks');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../user');
var FileStore = require('session-file-store')(expressSession);

var config = require('../config');

module.exports.install = function (app) {
    addMysql(app);
    addStatic(app);
    addNunjucks(app);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressSession({ 
        secret: config.secret, 
        resave: true, 
        saveUninitialized: true,
        store: new FileStore({
            path: path.resolve(__dirname, '../../.session-cache'),
            ttl: 864000
        })
    }));
    addAuthentication(app);

    require('./business').install(app);
};

function addAuthentication(app) {
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            try {
                const conn = await mysql.connect();
                const users = await conn.query('SELECT * FROM users WHERE username = ?', username);
                const user = new User(users && users[0]);

                if (!user) return done();
                if (!user.verifyPassword(password)) return done();
                return done(null, user);
            }
            catch (err) {
                done(err);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const conn = await mysql.connect();
            const users = await conn.query('SELECT * FROM users WHERE id = ?', id);
            const user = new User(users && users[0]);

            done(null, user);
        }
        catch (err) {
            done(err);
        }
    });

    app.use(passport.initialize());
    app.use(passport.session());
}

function addMysql(app) {
    const config = require('../config');

    mysql.setConnectionInfo(config.mysql);    
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