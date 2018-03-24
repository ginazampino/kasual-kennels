module.exports.install = function(app) {
    require('./admin.js')(app);
    require('./site.js')(app);
};