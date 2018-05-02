module.exports = async function () {
    const inquirer = require('inquirer');
    const mysql = require('./mysql');
    const User = require('./user');

    const answers = await inquirer.prompt([
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
    ]);

    if (!answers.password)
        return Promise.reject('Password is required');

    if (answers.password !== answers.password2)
        return Promise.reject('Passwords must match.');

    const conn = await mysql.connect();
    const u = new User({ username: answers.username });
    u.setPassword(answers.password);

    await conn.query('INSERT INTO users SET ?', u);
};