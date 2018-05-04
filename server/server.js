var express = require("express");
var path = require("path");
const minimist = require('minimist');
var nunjucks = require("nunjucks");
var mysql = require("./mysql");
var nodemailer = require("nodemailer");

// Express instance creation:
const config = require("./config.js");
var app = express();
var port = config.server.port;

var middlewares = require('./middlewares');
middlewares.install(app);

var routes = require('./routes');
routes.install(app);

const argv = require('minimist')(process.argv.slice(2));

if (argv.initialize) {
    require('./initialize')().then(() => {
        console.log(`User created successfully. Please start server.js without --initialize.`);
        process.exit();
    }).catch(err => {
        console.error(err);
        process.exit(1);
    });
}
else 
// Port listening:
app.listen(port, function () {
    console.log("Listening:" + port);
});

// Mail transporter.

const smtpTransporter = nodemailer.createTransport({
    "port": config.smtp.port,
    "host": config.smtp.server,
    "auth": {
        "type": "login",
        "user": config.smtp.username,
        "pass": config.smtp.password
    },
    "secure": config.smtp.tls
});

// Post mail.
app.post("/contact", function(request, response) {
    const form = request.body;
    const email = Object.keys(form).map(function(key) {
        return `<strong>${key}:</strong> ${form[key]}`;
    }).join("<br><br>");

    const message = {
        from: config.mailer.from,
        to: config.mailer.from,
        subject: "Application Form Submission",
        html: email
    };

    smtpTransporter.sendMail(message, function(error, info) {
        if (error) {
            response.status(500).send(error);
            return;
        }

        response.redirect("/");
    });
});