drop schema `kasualkennels`;
create schema `kasualkennels`;
use `kasualkennels`;

--
--  General Tables
--

CREATE TABLE users (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username        VARCHAR(255) UNIQUE NOT NULL,
    password        VARCHAR(255) DEFAULT '' NOT NULL
);

CREATE TABLE image_categories (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    category_name   VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE images (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    file_name       VARCHAR(1000) NOT NULL,
    title           VARCHAR(255) NULL,
    url             VARCHAR(255) NULL,
    active          BIT DEFAULT 1 NOT NULL,
    category_id     INT NULL, -- image_categories
    FOREIGN KEY (category_id) REFERENCES image_categories(id)
);

CREATE TABLE pages (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    page_name       VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE projects (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    project_name    VARCHAR(255) UNIQUE NOT NULL,
    category        ENUM('Hexed Breed', 'Selective Breed', 'Purebred/Noninbred Line'),
    project_status  ENUM('Open', 'Limited', 'Closed') NOT NULL,
    completed_date  VARCHAR(255) NULL,
    description     TEXT NULL,
    active          BIT DEFAULT 1 NOT NULL,
    image_id        INT NOT NULL, -- images   
    FOREIGN KEY (image_id) REFERENCES images(id)
);

--
--  Pet Tables
--

CREATE TABLE pet_breeds (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    breed_name      VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE pet_traits (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    trait_name      VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE pets (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    active          BIT DEFAULT 1 NOT NULL,

    -- Biography
    pet_name       VARCHAR(255) UNIQUE NOT NULL,
    gender          ENUM('Male', 'Female') NOT NULL,
    breed_id        INT NOT NULL, -- pet_breeds
    generation      INT NULL,
    birth_date      VARCHAR(255) NULL,
    adoption_date   VARCHAR(255) NULL,
    origin          ENUM('Breeding', 'Purchase', 'Freebie', 'Application', 'Project', 'Gift') NULL,
    previous_owner  VARCHAR(255) NULL,
    previous_site   VARCHAR(255) NULL,
    previous_url    VARCHAR(255) NULL,
    description     TEXT NULL,

    -- Career
    career_status   ENUM('Inactive', 'Active', 'Retired') NULL,
    prefix_titles   VARCHAR(255) NULL,
    show_prefixes   VARCHAR(255) NULL,
    show_name       VARCHAR(255) NULL,
    suffix_titles   VARCHAR(255) NULL,
    pkc_number      VARCHAR(50) NULL,
    image_dali_id   INT NULL, -- images
    image_dane_id   INT NULL, -- images

    -- Website
    page_id         INT NULL, -- pages
    litter_id       INT NULL, -- litters
    image_photo_id  INT NULL, -- images
    image_thumb_id  INT NULL, -- images

    -- Foreign Keys
    FOREIGN KEY (breed_id) REFERENCES pet_breeds(id),
    FOREIGN KEY (image_dali_id) REFERENCES images(id),
    FOREIGN KEY (image_dane_id) REFERENCES images(id),
    FOREIGN KEY (image_photo_id) REFERENCES images(id),
    FOREIGN KEY (image_thumb_id) REFERENCES images(id)
); 

CREATE TABLE pet_trait_values (
    pet_id          INT NOT NULL,
    trait_id        INT NOT NULL,
    PRIMARY KEY (pet_id, trait_id),
    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (trait_id) REFERENCES pet_traits(id)
);

CREATE TABLE litters (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    active          BIT DEFAULT 1 NOT NULL,
    litter_name     VARCHAR(255) UNIQUE NOT NULL,
    requester       VARCHAR(255) NULL,
    description     TEXT NULL,
    image_id        INT NOT NULL, -- images
    FOREIGN KEY (image_id) REFERENCES images(id)
);

--
--  Shows and Show Entries Tables
--

CREATE TABLE show_venues (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    venue_name      VARCHAR(255) UNIQUE NOT NULL,
    url             VARCHAR(1000) NULL
);

CREATE TABLE show_categories (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    category_name   VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE placements (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    placement_name  VARCHAR(255) NOT NULL,
    points          INT NOT NULL
);

CREATE TABLE shows (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    active          BIT DEFAULT 1 NOT NULL,
    show_name       VARCHAR(255) UNIQUE NOT NULL,
    url             VARCHAR(1000) NOT NULL,
    venue_id        INT NOT NULL, -- show_venues
    category_id     INT NOT NULL, -- show_categories
    show_date       VARCHAR(255) NULL,
    FOREIGN KEY (venue_id) REFERENCES show_venues(id),
    FOREIGN KEY (category_id) REFERENCES show_categories(id)
);

CREATE TABLE show_entries (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    entry_name      VARCHAR(255) NOT NULL,
    placement_id    INT NOT NULL, -- placements
    show_id         INT NOT NULL,
    FOREIGN KEY (placement_id) REFERENCES placements(id),
    FOREIGN KEY (show_id) REFERENCES shows(id)
);

CREATE TABLE my_entries (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    active          BIT DEFAULT 1 NOT NULL,
    pet_id          INT NOT NULL, -- pets
    show_name       VARCHAR(255) NOT NULL,
    placement_id    INT NOT NULL, -- placements
    url             VARCHAR(1000) NULL,
    venue_id        INT NOT NULL, -- show_venues
    category_id     INT NOT NULL, -- show_categories
    show_date       VARCHAR(255) NULL,
    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (venue_id) REFERENCES show_venues(id),
    FOREIGN KEY (category_id) REFERENCES show_categories(id),
    FOREIGN KEY (placement_id) REFERENCES placements(id)
);

--
--  Download Tables
--

CREATE TABLE downloads (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    active          BIT DEFAULT 1 NOT NULL,
    download_name   VARCHAR(255) NOT NULL,
    description     TEXT NULL,
    image_id        INT NOT NULL, -- images
    page_id         INT NOT NULL, -- pages
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (page_id) REFERENCES pages(id)
);

CREATE TABLE download_files (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    download_name   VARCHAR(255) NOT NULL,
    file_name       VARCHAR(1000) NOT NULL,
    file_size       VARCHAR(255) NOT NULL,
    download_id     INT NOT NULL, -- downloads
    FOREIGN KEY (download_id) REFERENCES downloads(id)
);

--
--  Other Tables
--

CREATE TABLE updates (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    update_date     VARCHAR(255) NOT NULL,
    update_notes    TEXT NULL
);

--
--  Data Inserts
--

INSERT INTO image_categories (category_name)
VALUES ('Albums'), ('Awards'), ('Community Hubs'), 
       ('Fan Sites'), ('Free-For-All Stamps'), ('Gifts'),
       ('Limited Edition Stamps'), ('Stamp Collection');

INSERT INTO pages (page_name)
VALUES ('Crew'), ('Kennels'), ('Litters'), ('Singles'),
       ('Breeders'), ('Clothes'), ('Playscenes'), ('Toys');

INSERT INTO pet_breeds (breed_name)
VALUES ('Bulldog'), ('Chihuahua'), ('Dachshund'), ('Dalmatian'),
       ('Great Dane'), ('Labrador'), ('Mutt'), ('Poodle'),
       ('Scottie'), ('Sheepdog'), ('Hexed Breed'), ('Wildz'),
       ('Overwrite'), ('Nonoverwrite');

INSERT INTO pet_traits (trait_name)
VALUES ('Mixed Breed'),
       ('Inbred'),
       ('Tree-Trimmed'),
       ('Full-Tree'),
       ('Selective Breed'), 
       ('Custom'),
       ('Brexed'),
       ('Gender Swapped'),
       ('Legacy');

INSERT INTO show_venues (venue_name, url)
VALUES ('RKC Petz Forum (RKC)', 'http://petzforum.proboards.com/'),
       ('Whiskerwick (WW)', 'http://whiskerwick.boards.net/'),
       ('Kasual Kennels (KK)', 'http://kasualkennels.petz.site');

INSERT INTO show_categories (category_name)
VALUES ('EBW Pose Show (Dali)'),
       ('EBW Pose Show (Dane)'),
       ('Standard Pose Show (Dali)'),
       ('Standard Pose Show (Dane)'),
       ('Contest');

INSERT INTO placements (placement_name, points)
VALUES ('BIS', 5),
       ('1st', 4),
       ('2nd', 3),
       ('3rd', 2),
       ('HM', 1),
       ('P', 0);