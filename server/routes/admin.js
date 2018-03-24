//const multer = require('multer');
//const upload = multer({ dest: 'C:/temp' });
// const business = require('../business');
const upload = require('../upload.js');

module.exports = function (app) {
    app.get("/test", async function (request, response) {
        response.send({
            pet: { /* TODO: Populate me */ },
            dropdowns: {
                breeds    : await request.business.dropdown.getBreeds(),
                genders   : request.business.dropdown.getGenders()
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
    
    app.get("/admin/pets", async function (request, response) {
        response.render("admin/admin-pets.html", {
            pets: await request.business.pet.getAll()
        });
    });

    /*
    
        Edit Pets
        
    */

    app.post("/admin/delete-pet", async function (request, response) {
        await request.business.pet.delete(request.query.id);
        response.send({ });
    });
    
    app.get("/admin/edit-pet", async function (request, response) {
        let vm = {
            pet: { /* TODO: Populate me */ },
            dropdowns: {
                breeds    : await request.business.dropdown.getBreeds(),
                genders   : request.business.dropdown.getGenders(),
                origins   : request.business.dropdown.getOrigins(),
                statuses  : request.business.dropdown.getStatuses(),
                petpages  : await request.business.dropdown.getPetPages(),
                litters   : await request.business.dropdown.getLitters()
            }
        };

        if (request.query.id) {
            vm.pet = await request.business.pet.getOne(request.query.id);
        }
        else {
            vm.pet = {}; // TODO
        }

        response.render("admin/admin-edit-pet.html", vm);
    });

    app.post("/admin/edit-pet", [
        upload('dali', 'dane', 'photo', 'thumb')
    ], async function (request, response) {
        var id;

        if (request.query.id) {
            // TODO: update the entry.
            await request.business.pet.update(request);
            response.send({ });
        }
        else {
            // TODO: create the entry.
            id = await request.business.pet.create(request);
            response.send({ id });
        }
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
                downloadpages : await request.business.dropdown.getDownloadPages()
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
                categories  : request.business.dropdown.getProjectCategories(),
                statuses    : request.business.dropdown.getProjectStatuses()
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
                venues      : request.business.dropdown.getShowVenues(),
                categories  : request.business.dropdown.getShowCategories()
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
                placements  : request.business.dropdown.getPlacements(),
                venues      : request.business.dropdown.getShowVenues(),
                categories  : request.business.dropdown.getShowCategories()
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
                categories  : request.business.dropdown.getImageCategories()
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