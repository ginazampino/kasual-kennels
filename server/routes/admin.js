const multer = require('multer');
const upload = multer({ dest: 'C:/temp' });

module.exports = function (app) {
    app.get("/admin", function (request, response) {
        response.render("admin/admin.html", {});
    });
    
    app.get("/admin/pets", function (request, response) {
        response.render("admin/admin-pets.html", {});
    });
    
    app.get("/admin/edit-pet", function (request, response) {
        response.render("admin/admin-edit-pet.html", {});
    });
    
    app.get("/admin/litters", function (request, response) {
        response.render("admin/admin-litters.html", {});
    });
    
    app.get("/admin/edit-litter", function (request, response) {
        response.render("admin/admin-edit-litter.html", {});
    });
    
    app.get("/admin/downloads", function (request, response) {
        response.render("admin/admin-downloads.html", {});
    });
    
    app.get("/admin/edit-download", function (request, response) {
        response.render("admin/admin-edit-download.html", {});
    });
    
    app.get("/admin/projects", function (request, response) {
        response.render("admin/admin-projects.html", {});
    });
    
    app.get("/admin/edit-project", function (request, response) {
        response.render("admin/admin-edit-project.html", {});
    });
    
    app.get("/admin/shows", function (request, response) {
        response.render("admin/admin-shows.html", {});
    });
    
    app.get("/admin/edit-show", function (request, response) {
        response.render("admin/admin-edit-show.html", {});
    });
    
    app.get("/admin/entries", function (request, response) {
        response.render("admin/admin-entries.html", {});
    });
    
    app.get("/admin/edit-entry", function (request, response) {
        response.render("admin/admin-edit-entry.html", {});
    });
    
    app.get("/admin/images", function (request, response) {
        response.render("admin/admin-images.html", {});
    });
    
    app.get("/admin/edit-image", function (request, response) {
        response.render("admin/admin-edit-image.html", {});
    });
};