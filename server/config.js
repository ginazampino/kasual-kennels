module.exports = {
    mysql: {
        host     : "localhost",
        database : "kasualkennels",
        user     : "kasualkennels",
        password : ""
    },
    secret: '< change for production >',
    server: {
        port: 8085
    },
    "mailer": {
        "from"   : "zampino.gina@gmail.com",
        "replyTo": "zampino.gina@gmail.com"
    },
    "smtp": {
        "username": "< change for production >",
        "password": "< change for production >",
        "server"  : "in-v3.mailjet.com",
        "tls"     : true,
        "port"    : 465
    }
};