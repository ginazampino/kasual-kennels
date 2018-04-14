const upload = require('../upload.js');

module.exports = function (app) {
    app.get("/test", async function (request, response) {
        response.send({
            pet: { /* TODO: Populate me */ },
            dropdowns: {
                breeds: await request.business.dropdown.getBreeds(),
                genders: request.business.dropdown.getGenders()
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
    
        Pets
        
    */

    app.get("/admin/pets", async function (request, response) {
        response.render("admin/admin-pets.html", {
            pets: await request.business.pet.getAll()
        });
    });

    app.post("/admin/delete-pet", async function (request, response) {
        await request.business.pet.delete(request.query.id);
        response.send({});
    });

    app.get("/admin/edit-pet", async function (request, response) {
        let vm = {
            pet: {},
            dropdowns: {
                breeds: await request.business.dropdown.getBreeds(),
                genders: request.business.dropdown.getGenders(),
                origins: request.business.dropdown.getOrigins(),
                statuses: request.business.dropdown.getStatuses(),
                petpages: await request.business.dropdown.getPetPages(),
                litters: await request.business.dropdown.getLitters()
            }
        };

        if (request.query.id) {
            vm.pet = await request.business.pet.getOne(request.query.id);
        }
        else {
            vm.pet = {};
        }

        response.render("admin/admin-edit-pet.html", vm);
    });

    app.post("/admin/edit-pet", [
        upload('dali', 'dane', 'photo', 'thumb')
    ], async function (request, response) {
        var id;

        if (request.query.id) {
            await request.business.pet.update(request);
            response.send({});
        }
        else {
            id = await request.business.pet.create(request);
            response.send({ id });
        }
    });

    /*
    
        Litters
        
    */

    app.get("/admin/litters", async function (request, response) {
        response.render("admin/admin-litters.html", {
            litters: await request.business.litter.getAll()
        });
    });

    app.post("/admin/delete-litter", async function (request, response) {
        await request.business.litter.delete(request.query.id);
        response.send({});
    });

    app.get("/admin/edit-litter", async function (request, response) {
        let vm = {
            litter: {},
        };

        if (request.query.id) {
            vm.litter = await request.business.litter.getOne(request.query.id);
        }
        else {
            vm.litter = {};
        }

        response.render("admin/admin-edit-litter.html", vm);
    });

    app.post("/admin/edit-litter", [
        upload("family")
    ], async function (request, response) {
        var id;

        if (request.query.id) {
            await request.business.litter.update(request);
            response.send({});
        }
        else {
            id = await request.business.litter.create(request);
            response.send({ id });
        }
    });

    /*
    
        Downloads
        
    */

    app.get("/admin/downloads", async function (request, response) {
        response.render("admin/admin-downloads.html", {
            downloads: await request.business.download.getAll()
        });
    });


    app.get("/admin/edit-download", async function (request, response) {
        let vm = {
            download: {},
            dropdowns: {
                downloadpages: await request.business.dropdown.getDownloadPages()
            }
        };

        if (request.query.id) {
            vm.download = await request.business.download.getOne(request.query.id);
        }
        else {
            vm.download = {};
        }

        response.render("admin/admin-edit-download.html", vm);
    });

    app.post("/admin/edit-download", [
        upload('image', 'files')
    ], async function (request, response) {
        var id;
        if (request.query.id) {
            await request.business.download.update(request);
            response.send({});
        }
        else {
            id = await request.business.download.create(request);
            response.send({id});
        }
    });

    app.post("/admin/edit-download-delete-file", async function (request, response) {
        await request.business.download.deleteFile(request.body.id);
        response.send({ });
    });

    /*
    
        Projects
        
    */

    app.get("/admin/projects", async function (request, response) {
        response.render("admin/admin-projects.html", {
            projects: await request.business.project.getAll()
        });
    });

    app.post("/admin/delete-project", async function (request, response) {
        await request.business.project.delete(request.query.id);
        response.send({});
    });

    app.get("/admin/edit-project", async function (request, response) {
        let vm = {
            project: {},
            dropdowns: {
                categories: request.business.dropdown.getProjectCategories(),
                statuses: request.business.dropdown.getProjectStatuses()
            }
        };

        if (request.query.id) {
            vm.project = await request.business.project.getOne(request.query.id);
        }
        else {
            vm.project = {};
        }

        response.render("admin/admin-edit-project.html", vm);
    });

    app.post("/admin/edit-project", [
        upload('image')
    ], async function (request, response) {
        var id;

        if (request.query.id) {
            await request.business.project.update(request);
            response.send({});
        }
        else {
            id = await request.business.project.create(request);
            response.send({ id });
        }
    });

    /*
    
        Shows
        
    */

    app.get("/admin/shows", async function (request, response) {
        response.render("admin/admin-shows.html", {
            shows: await request.business.show.getAll()
        });
    });

    app.post("/admin/delete-show", async function (request, response) {
        await request.business.show.delete(request.query.id);
        response.send({});
    });

    app.get("/admin/edit-show", async function (request, response) {
        let vm = {
            show: {},
            dropdowns: {
                venues: await request.business.dropdown.getShowVenues(),
                categories: await request.business.dropdown.getShowCategories()
            }
        };

        if (request.query.id) {
            vm.show = await request.business.show.getOne(request.query.id);
        }
        else {
            vm.show = {
                entries: await request.business.show.getDefaultPlacements()
            };
        }

        response.render("admin/admin-edit-show.html", vm);
    });

    app.post("/admin/edit-show", upload(''),
        async function (request, response) {
            var id;

            if (request.query.id) {
                await request.business.show.update(request);
                response.send({});
            }
            else {
                id = await request.business.show.create(request);
                response.send({ id });
            }
        });

    app.post("/admin/edit-show", upload(''),
        async function (request, response) {
            var id;

            if (request.query.id) {
                await request.business.show.update(request);
                response.send({});
            }
            else {
                id = await request.business.show.create(request);
                response.send({ id });
            }
        });

    /*
    
        Entries
        
    */

    app.get("/admin/entries", async function (request, response) {
        response.render("admin/admin-entries.html", {
            entries: await request.business.entry.getAll()
        });
    });

    app.post("/admin/delete-entries", async function (request, response) {
        await request.business.entry.delete(request.query.id);
        response.send({});
    });

    app.get("/admin/edit-entry", async function (request, response) {
        let vm = {
            entry: {},
            dropdowns: {
                placements: await request.business.dropdown.getShowPlacements(),
                categories: await request.business.dropdown.getShowCategories(),
                venues: await request.business.dropdown.getShowVenues()
            }
        }

        if (request.query.id) {
            vm.entry = await request.business.entry.getOne(request.query.id);
        }
        else {
            vm.entry = {};
        }

        response.render("admin/admin-edit-entry.html", vm);
    });

    app.post("/admin/edit-entry", upload(''),
        async function (request, response) {
            var id;

            if (request.query.id) {
                await request.business.entry.update(request);
                response.send({});
            }
            else {
                id = await request.business.entry.create(request);
                response.send({ id });
            }
        });

    /*
    
        Images
        
    */

    app.get("/admin/images", async function (request, response) {
        response.render("admin/admin-images.html", {
            images: await request.business.image.getAll()
        });
    });

    app.post("/admin/delete-images", async function (request, response) {
        await request.business.image.delete(request.query.id);
        response.send({});
    });

    app.get("/admin/edit-image", async function (request, response) {
        let vm = {
            image: {},
            dropdowns: {
                categories: await request.business.dropdown.getImageCategories()
            }
        };

        if (request.query.id) {
            vm.image = await request.business.image.getOne(request.query.id);
        }

        response.render("admin/admin-edit-image.html", vm);
    });

    app.post("/admin/edit-image", [
        upload("image")
    ], async function (request, response) {
        var id;

        if (request.query.id) {
            await request.business.image.update(request);
            response.send({});
        }
        else {
            id = await request.business.image.create(request);
            response.send({ id });
        }
    });

    app.get("/admin/ajax/pets", async function (request, response) {
        // The search term:
        const term = request.query.term;
        const results = await request.business.pet.search(term || '');

        response.json({
            results
        });
    });
};