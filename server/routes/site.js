module.exports = function (app) {
    // Nunjucks route configuration:
    app.get("/", function (request, response) {
        response.render("home.html", {});
    });

    // Visit submenu:
    app.get("/crew", async function (request, response) {
        // response.render('crew.html', {
        //     selectedNavItem: 'crew',
        //     pets: await business.crew.getCrewPets()
        // });
        response.render("crew.html", {
            selectedNavItem: "crew",
            pets: [
                {
                    name: "Hush",
                    gender: true,
                    img: "../img/crew/hush.gif",
                    description: "This is a pet description!"
                }
            ]
        });
    });

    app.get("/kennels", function (request, response) {
        response.render("kennels.html", {
            selectedNavItem: "kennels",
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

    app.get("/showroom", function (request, response) {
        response.render("showroom.html", {
            selectedNavItem: "showroom",
            pets: [
                {
                    name: "Verdant",
                    showName: "SGCh. KK's Peace on Paper",
                    title: "Supreme Grand Champion (SGCh.)",
                    poses: {
                        dali: "../img/showroom/kk-verdant-dali.png",
                        dane: "../img/showroom/kk-verdant-dane.png"
                    },
                    active: true,
                    bis: [
                        { name: "Commander's EBW Dali Show #27"},
                        { name: "Show name 2"}
                    ],
                    first: [
                        { name: "Commander's EBW Dali Show #27"},
                        { name: "Show name 2"}
                    ],
                    second: [
                        { name: "Commander's EBW Dali Show #27"},
                    ],
                    third: [
                        { name: "Commander's EBW Dali Show #27"},
                    ],
                    hm: [
                        { name: "Commander's EBW Dali Show #27"},
                    ],
                    part: [
                        { name: "Commander's EBW Dali Show #27"},
                    ]
                }
            ]
        });
    });

    app.get("/awards", function (request, response) {
        response.render("awards.html", {
            selectedNavItem: "awards",
            awards: [
                { img: "../img/awards/award-1.png" }
            ]
        });
    });

    app.get("/gifts", function (request, response) {
        response.render("gifts.html", {
            selectedNavItem: "gifts",
            gifts: [
                { img: "../img/gifts/ww-vday-2018-1.png" },
                { img: "../img/gifts/ww-vday-2018-2.jpg" }
            ]
        });
    });

    app.get("/albums", function (request, response) {
        response.render("albums.html", {
            selectedNavItem: "albums",
            albums: [
                {
                    title: "Paws and Busy",
                    images: [
                        { img: "../img/albums/paws-busy-01.png" },
                        { img: "../img/albums/paws-busy-02.png" }
                    ]
                }
            ]
        });
    });

    app.get("/links", function (request, response) {
        response.render("links.html", {
            selectedNavItem: "links",
            communityLinks: [
                {
                    title: "RKC Petz Forum",
                    url: "http://petzforum.proboards.com/",
                    img: "../img/links/link-rkc.png"
                },
                {
                    title: "Whiskerwick",
                    url: "http://whiskerwick.boards.net/",
                    img: "../img/links/link-whiskerwick.gif"
                },
                {
                    title: "Petz Universal Game Site",
                    url: "https://www.petzuniversal.com/index.php",
                    img: "../img/links/link-pugs.png"
                },
                {
                    title: "Petz Kennel Club",
                    url: "http://petzkennelclub.co.uk",
                    img: "../img/links/link-petzkennelclub.png"
                },
                {
                    title: "Duke's Group",
                    url: "http://dj7.proboards.com/",
                    img: "../img/links/link-dukesgroup.png"
                },
            ],
            personalLinks: [
                {
                    title: "Halcyon",
                    url: "http://homebody.eu/halcyon/",
                    img: "../img/links/link-halcyon.png"
                }
            ]
        });
    });

    // Adopt submenu:
    app.get("/breeders", function (request, response) {
        response.render("breeders.html", {
            selectedNavItem: "breeders",
            breeders: [
                {
                    title: "Patchless AC Mutts",
                    description: "",
                    pets: [
                        {
                            label: "Right Ear",
                            img: "../img/breeders/kk-mutt-patchless-right.png",
                            genders: {
                                male: "",
                                female: "../files/KK Breeders - Patchless AC Mutts - Right Ear (F).zip"
                            }
                        },
                        {
                            label: "Both Ears",
                            img: "../img/breeders/kk-mutt-patchless-both.png",
                            genders: {
                                male: "../files/KK Breeders - Patchless AC Mutts - Both Ears (M).zip",
                                female: "../files/KK Breeders - Patchless AC Mutts - Both Ears (F).zip"
                            }
                        },
                        {
                            label: "Left Ear",
                            img: "../img/breeders/kk-mutt-patchless-left.png",
                            genders: {
                                male: "../files/KK Breeders - Patchless AC Mutts - Left Ear (M).zip",
                                female: ""
                            }
                        }
                    ]
                },
                {
                    title: "One-Patch AC Mutts",
                    description: "",
                    pets: [
                        {
                            label: "Tail Tip",
                            img: "../img/breeders/kk-mutt-onepatch-tailtip.png",
                            genders: {
                                female: "../files/KK Breeders - One-Patch AC Mutts - Tail Tip (F).zip"
                            }
                        }
                    ]
                }
            ]
        });
    });

    app.get("/singles", function (request, response) {
        response.render("singles.html", {
            selectedNavItem: "singles",
            adoptions: [
                {
                    name: "Howdy",
                    breed: "Mixed Breed",
                    gender: false,
                    inbred: true,
                    description: "This is a description. This dog has eyes, a nose, and a mouth.",
                    img: "../img/singles/kk-singles-howdy.png"
                },
                {
                    name: "Patchi",
                    breed: "Mixed Breed",
                    gender: true,
                    inbred: true,
                    description: "",
                    img: "../img/singles/kk-singles-patchi.png"
                }
            ]
        });
    });

    app.get("/litters", function (request, response) {
        response.render("litters.html", {
            selectedNavItem: "litters",
            litters: [
                {
                    name: "Alistair & Hart",
                    requester: "Jill",
                    description: "Lomond features a curly coat, a stub tail, white mutt patches, and a double chest patch. Lomond features a curly coat, a stub tail, white mutt patches, and a double chest patch.",
                    img: "../img/litters/kk-litter-alistair_hart.png",
                    adoptions: [
                        {
                            name: "Lomond",
                            breed: "Mixed Breed",
                            gender: true,
                            inbred: true,
                            img: "../img/litters/kk-litter-alistair_hart-lomond.png"
                        },
                        {
                            name: "Lomond2",
                            breed: "Mixed Breed",
                            gender: true,
                            inbred: true,
                            img: "../img/litters/kk-litter-alistair_hart-lomond.png"
                        }
                    ]
                },
                {
                    name: "Alistair & Hart",
                    requester: "Jill",
                    description: "Lomond features a curly coat, a stub tail, white mutt patches, and a double chest patch. Lomond features a curly coat, a stub tail, white mutt patches, and a double chest patch.",
                    img: "../img/litters/kk-litter-alistair_hart.png",
                    adoptions: [
                        {
                            name: "Lomond",
                            breed: "Mixed Breed",
                            gender: false,
                            inbred: true,
                            img: "../img/litters/kk-litter-alistair_hart-lomond.png"
                        },
                        {
                            name: "Lomond2",
                            breed: "Mixed Breed",
                            gender: false,
                            inbred: true,
                            img: "../img/litters/kk-litter-alistair_hart-lomond.png"
                        }
                    ]
                }
            ]
        });
    });

    app.get("/archive", function (request, response) {
        response.render("archive.html", {
            selectedNavItem: "archive",
            projects: [
                {
                    name: "Threaded Dalis",
                    status: "Closed",
                    date: "September 2017",
                    description: "project description",
                    img: "../img/archive/kk-archive-threaded_dalis.png"
                }
            ]
        });
    });

    app.get("/apply", function (request, response) { // WIP
        response.render("apply.html", {
            selectedNavItem: "apply"
        });
    });

    // Work submenu:
    app.get("/toys", function (request, response) {
        response.render("toys.html", {
            selectedNavItem: "toys",
            toys: [
                {
                    name: "Blue Pillow Recolor Set",
                    file: "../files/Blue Pillow Recolor Set (v1).zip",
                    img: "../img/toys/kk-blue-pillow-recolors.png"
                },
                {
                    name: "Brown Picture Frame Set",
                    file: "../files/Brown Picture Frame Set (v4b).zip",
                    img: "../img/toys/kk-brown-picture-frames.png"
                }
            ]
        });
    });

    app.get("/clothes", function (request, response) {
        response.render("clothes.html", {
            selectedNavItem: "clothes",
            clothes: [
                {
                    name: "Friendship Bracelets",
                    file: "#",
                    img: "../img/clothes/kk-friendship-bracelets.png"
                }
            ]
        });
    });

    app.get("/playscenes", function (request, response) {
        response.render("playscenes.html", {
            selectedNavItem: "playscenes",
            playscenes: [
                {
                    name: "Roller Rink",
                    description: "",
                    files: [
                        {
                            version: "Petz 4 (Sound)",
                            url: "../files/Roller Rink (v1).zip",
                        },
                        {
                            version: "Petz 4 (Silent)",
                            url: "../files/Roller Rink (v1b).zip",
                        }
                    ],
                    img: "../img/playscenes/kk-roller-rink.png"
                }
            ]
        });
    });

    app.get("/shows", function (request, response) {
        response.render("shows.html", {
            selectedNavItem: "shows",
            shows: [
                {
                    title: "Kas's EBW Dali Pose Show #1",
                    venue: "Whiskerwick",
                    date: "February 21, 2018",
                    stamp: "../img/shows/winner.png",
                    bis: "PF's Show Name",
                    first: "PF's Show Name 2",
                    second: "PF's Show Name 3",
                    third: "PF's Show Name 4",
                    hm: "PF's Show Name 5",
                    url: "http://whiskerwick.boards.net/thread/5693/kass-dali-pose-show-full"
                },
                {
                    title: "Kas's EBW Dali Pose Show #1",
                    venue: "Whiskerwick",
                    date: "February 21, 2018",
                    stamp: "../img/shows/winner.png",
                    bis: "PF's Show Name",
                    first: "PF's Show Name 2",
                    second: "PF's Show Name 3",
                    third: "PF's Show Name 4",
                    hm: "PF's Show Name 5",
                    url: "http://whiskerwick.boards.net/thread/5693/kass-dali-pose-show-full"
                }
            ]
        });
    });

    app.get("/stamps", function (request, response) {
        response.render("stamps.html", {
            selectedNavItem: "stamps",
            limitedStamps: [
                { img: "../img/stamps/kk-le-vday.png" }
            ],
            ffaStamps: [
                { img: "../img/stamps/kk-ffa-busy.png" },
                { img: "../img/stamps/kk-ffa-paws.png" }
            ],
            collectedStamps: [
                {
                    img: "../img/stamps/lpk10.png",
                    url: "https://lukkypenniedal.wixsite.com/luckypennykennels"
                }
            ]
        });
    });

    app.get("/find-it", function (request, response) {
        response.render("find-it.html", {
            selectedNavItem: "find-it",
            findIts: [
                {
                    title: "Busy is hiding!",
                    description: "He was playing hide-and-seek. Can you find him?",
                    img: "../img/find-its/findit-busy.png",
                },
                {
                    title: "Busy is hiding!",
                    description: "He was playing hide-and-seek. Can you find him?",
                    img: "../img/find-its/findit-busy.png",
                }
            ]
        });
    });
};