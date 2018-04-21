var express = require("express");
var path = require("path");
const minimist = require('minimist');
var nunjucks = require("nunjucks");
var mysql = require("./mysql");

// Express instance creation:
var app = express();
var port = 8085;

var middlewares = require('./middlewares');
middlewares.install(app);

var routes = require('./routes');
routes.install(app);

const argv = require('minimist')(process.argv.slice(2));

if (argv.initialize) {
    const inquirer = require('inquirer');
    const User = require('./user');
    
    inquirer.prompt([
        {
            type: "input",
            default: "admin",
            name: "username",
            message: "Enter admin username"
        },
        {
            type: "password",
            name: "password",
            message: "Enter admin password"
        },
        {
            type: "password",
            name: "password2",
            "message": "Repeat admin password"
        }
    ]).then(answers => {
        if (answers.password != answers.password2) {
            console.error("Admin passwords do not match.");
            process.exit(1);
        } else {
            mysql.connect().then(conn => {
                const admin = new User({ username: answers.username });
                admin.setPassword(answers.password);

                conn.query('INSERT INTO users SET ?', admin).then(() => {
                    console.log(`User ${answers.username} created successfully. Please start server.js without --initialize.`);
                    process.exit();
                });
            });
        }
    });

    // console.log('Initializing default user.');
    // const User = require('./user');
    // const mysql = require('./mysql');
    // mysql.connect().then(conn => {
    //     const admin = new User({ username: 'admin' });
    //     admin.setPassword('admin');

    //     conn.query(`INSERT INTO users SET ?`, admin);
    // });
}
else 
// Port listening:
app.listen(port, function () {
    console.log("Listening:" + port);
});