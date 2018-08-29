module.exports = {
    mysql: {
        host     : process.env.MYSQL_HOST || "localhost",
        database : process.env.MYSQL_DATABASE || "kasualkennels",
        user     : process.env.MYSQL_USER || "kasualkennels",
        password : process.env.MYSQL_PASSWORD || ""
    },
    secret: process.env.SECRET_KEY || "secret",
    server: {
        port: parseInt(process.env.HTTP_PORT || "8085")
    },
    "mailer": {
        "from"   : "zampino.gina@gmail.com",
        "replyTo": "zampino.gina@gmail.com"
    },
    "smtp": {
        "username": process.env.SMTP_USERNAME,
        "password": process.env.SMTP_PASSWORD,
        "server"  : "in-v3.mailjet.com",
        "tls"     : true,
        "port"    : 465
    }
};