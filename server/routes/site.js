module.exports = function (app) {

    app.get("/", function (request, response) {
        response.render("home.html", {
            update: {
                date: "02/11/1929",
                notes: "Update notes."
            }
        });
    });

    app.get("/crew", async function (request, response) {
        const vm = await request.business.pet.getCrewPets();
        vm.selectedNavItem = 'crew';
        response.render("crew.html", vm);
    });

    app.get("/api/search-pets", async function (request, response) {
        response.send(await request.business.filter.search(request.query));
    });

    app.get("/kennels", async function (request, response) {
        response.render("kennels.html", {
            selectedNavItem: "kennels",
            filters: {
                breeds: await request.business.filter.getBreeds()
            },
            pets: [
                {
                    name: "pet name",
                    breed: "pet breed",
                    gender: true,
                    inbred: true,
                    origin: "original owner",
                    img: "image url"
                }
            ]
        });
    });

    app.get("/showroom", async function (request, response) {
        const vm = await request.business.entry.getShowroom();
        vm.selectedNavItem = 'showroom';
        response.render("showroom.html", vm);
        // console.log(vm.pets[0]);
    });

    app.get("/awards", async function (request, response) {
        const vm = await request.business.image.getAwardImages();
        vm.selectedNavItem = 'awards';
        response.render("awards.html", vm);
    });

    app.get("/gifts", async function (request, response) {
        const vm = await request.business.image.getGiftImages();
        vm.selectedNavItem = 'gifts';
        response.render("gifts.html", vm);
    });

    app.get("/album", async function (request, response) {
        const vm = await request.business.image.getAlbumImages();
        vm.selectedNavItem = 'album';
        response.render("album.html", vm);
    });

    app.get("/links", async function (request, response) {
        const vm = await request.business.image.getLinkImages();
        vm.selectedNavItem = 'links';
        response.render("links.html", vm);
    });

    app.get("/breeders", async function (request, response) {
        const vm = await request.business.download.getViewModel('Breeders');
        vm.selectedNavItem = 'breeders';
        response.render("breeders.html", vm);
    });

    app.get("/singles", async function (request, response) {
        const vm = await request.business.pet.getSingles();
        vm.selectedNavItem = 'singles';
        response.render("singles.html", vm);
    });

    app.get("/litters", async function (request, response) {
        const vm = await request.business.litter.getLitters();
        vm.selectedNavItem = 'litters';
        response.render("litters.html", vm);
    });

    app.get("/projects", async function (request, response) {
        const vm = await request.business.project.getProjects('Projects');
        vm.selectedNavItem = 'projects';
        response.render("projects.html", vm);
    });

    app.get("/apply", function (request, response) {
        response.render("apply.html", {
            selectedNavItem: "apply"
        });
    });

    app.get("/toys", async function (request, response) {
        const vm = await request.business.download.getViewModel('Toys');
        vm.selectedNavItem = 'toys';
        response.render("toys.html", vm);
    });

    app.get("/clothes", async function (request, response) {
        const vm = await request.business.download.getViewModel('Clothes');
        vm.selectedNavItem = 'clothes';
        response.render("clothes.html", vm);
    });

    app.get("/playscenes", async function (request, response) {
        const vm = await request.business.download.getViewModel('Playscenes');
        vm.selectedNavItem = 'playscenes';
        response.render("playscenes.html", vm);
    });

    app.get("/shows", async function (request, response) {
        const vm = await request.business.show.getShows();
        vm.selectedNavItem = 'shows';
        response.render("shows.html", vm);
    });

    app.get("/stamps", async function (request, response) {
        const vm = await request.business.image.getStampImages();
        vm.selectedNavItem = 'stamps';
        response.render("stamps.html", vm);
    });

    app.get("/guides", function (request, response) {
        response.render("guides.html", {
            selectedNavItem: "guides"
        });
    });

    app.get("/genes", function (request, response) {
        response.render("genes.html", {
            selectedNavItem: "guides"
        });
    });

    app.get("/contact", function (request, response) {
        response.render("contact.html", {
            selectedNavItem: "contact"
        });
    });

    app.get("/resources", function (request, response) {
        response.render("resources.html", {
            selectedNavItem: "resources"
        });
    });

    app.get("/find-it", function (request, response) {
        response.render("find-it.html", {
            selectedNavItem: "find-it",
            findIts: [
                {
                    title: "Friendship Bracelets",
                    description: "description",
                    img: "../img/findit-busy.png",
                }
            ]
        });
    });

    app.get("/found-it-U9X2", function (request, response) {
        response.render("found-it-01.html", {
            selectedNavItem: "find-it",
        });
    });
};