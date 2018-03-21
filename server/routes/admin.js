//const multer = require('multer');
//const upload = multer({ dest: 'C:/temp' });
const business = require('../business');
const upload = require('../upload.js');

module.exports = function (app) {
    app.get("/test", async function (request, response) {
        response.send({
            pet: { /* TODO: Populate me */ },
            dropdowns: {
                breeds    : await business.admin.getBreeds(),
                genders   : business.admin.getGenders()
            }
        });
    });

    /*

        Admin Panel

    */

    app.get("/admin", function (request, response) {
        response.render("admin/admin.html", {});
    });

    /*
    
        Browse Pets
        
    */
    
    app.get("/admin/pets", function (request, response) {
        response.render("admin/admin-pets.html", {});
    });

    /*
    
        Edit Pets
        
    */
    
    app.get("/admin/edit-pet", async function (request, response) {
        let vm = {
            pet: { /* TODO: Populate me */ },
            dropdowns: {
                breeds    : await business.admin.getBreeds(),
                genders   : business.admin.getGenders(),
                origins   : business.admin.getOrigins(),
                statuses  : business.admin.getStatuses(),
                petpages  : await business.admin.getPetPages(),
                litters   : await business.admin.getLitters()
            }
        };

        if (request.query.id) {
            vm.pet = {}; // TODO
        }
        else {
            vm.pet = {}; // TODO
        }

        response.render("admin/admin-edit-pet.html", vm);
    });

    app.post("/admin/edit-pet", [
        upload('daliImage', 'daneImage', 'photo', 'thumb')
    ], function (request, response) {
        var id;
        if (request.query.id) {
            // TODO: update the entry.
        }
        else {
            // TODO: create the entry.
        }
        response.send({ id });
    });

    /*
    
        Browse Litters
        
    */

    app.get("/admin/litters", function (request, response) {
        response.render("admin/admin-litters.html", {});
    });

    /*
    
        Edit Litters
        
    */
    
    app.get("/admin/edit-litter", function (request, response) {
        response.render("admin/admin-edit-litter.html", {});
    });

    /*
    
        Browse Downloads
        
    */
    
    app.get("/admin/downloads", function (request, response) {
        response.render("admin/admin-downloads.html", {});
    });
    
    /*
    
        Edit Downloads
        
    */
    
    app.get("/admin/edit-download", async function (request, response) {
        let vm = {
            download: { /* TODO */ },
            picklists: {
                downloadpages : await business.admin.getDownloadPages()
            }
        };

        if (request.query.id) {
            vm.download = {}; // TODO
        }
        else {
            vm.download = {}; // TODO
        }

        response.render("admin/admin-edit-download.html", vm);
    });

    /*
    
        Browse Projects
        
    */
    
    app.get("/admin/projects", function (request, response) {
        response.render("admin/admin-projects.html", {});
    });

    /*
    
        Edit Projects
        
    */
    
    app.get("/admin/edit-project", function (request, response) {
        let vm = {
            project: { /* TODO */ },
            dropdowns: {
                categories  : business.admin.getProjectCategories(),
                statuses    : business.admin.getProjectStatuses()
            }
        };

        if (request.query.id) {
            vm.pet = {}; // TODO
        }
        else {
            vm.pet = {}; // TODO
        }

        response.render("admin/admin-edit-project.html", vm);
    });

    /*
    
        Browse Shows
        
    */
    
    app.get("/admin/shows", function (request, response) {
        response.render("admin/admin-shows.html", {});
    });
    
    /*
    
        Edit Shows
        
    */

    app.get("/admin/edit-show", function (request, response) {
        let vm = {
            show: { /* TODO */},
            dropdowns: {
                venues      : business.admin.getShowVenues(),
                categories  : business.admin.getShowCategories()
            }
        };

        if (request.query.id) {
            vm.pet = {}; // TODO
        }
        else {
            vm.pet = {}; // TODO
        }

        response.render("admin/admin-edit-show.html", vm);
    });

    /*
    
        Browse Entries
        
    */
    
    app.get("/admin/entries", function (request, response) {
        response.render("admin/admin-entries.html", {});
    });

    /*
    
        Edit Entries
        
    */
    
    app.get("/admin/edit-entry", function (request, response) {
        let vm = {
            show: { /* TODO */ },
            dropdowns: {
                placements  : business.admin.getPlacements(),
                venues      : business.admin.getShowVenues(),
                categories  : business.admin.getShowCategories()
            }
        };

        if (request.query.id) {
            vm.pet = {}; // TODO
        }
        else {
            vm.pet = {}; // TODO
        }

        response.render("admin/admin-edit-entry.html", vm);
    });
    

    /*
    
        Browse Images
        
    */

    app.get("/admin/images", function (request, response) {
        response.render("admin/admin-images.html", {});
    });

    /*
    
        Edit Images
        
    */
    
    app.get("/admin/edit-image", function (request, response) {
        let vm = {
            image: { /* TODO */},
            dropdowns: {
                categories  : business.admin.getImageCategories()
            }
        };

        if (request.query.id) {
            vm.pet = {}; // TODO
        }
        else {
            vm.pet = {}; // TODO
        }

        response.render("admin/admin-edit-image.html", vm);
    });
};