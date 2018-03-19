drop schema `kasualkennels`;
create schema `kasualkennels`;
use `kasualkennels`;

--
--  General Tables
--

CREATE TABLE images (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    file_name       VARCHAR(1000) NOT NULL,
    title           VARCHAR(255) NULL,
    url             VARCHAR(255) NULL
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

CREATE TABLE pets (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

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
    traits          INT NULL, -- (Binary trick?)
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
    image_photo_id  INT NOT NULL, -- images
    image_thumb_id  INT NULL, -- images

    -- Foreign Keys
    FOREIGN KEY (breed_id) REFERENCES pet_breeds(id),
    FOREIGN KEY (image_dali_id) REFERENCES images(id),
    FOREIGN KEY (image_dane_id) REFERENCES images(id),
    FOREIGN KEY (image_photo_id) REFERENCES images(id),
    FOREIGN KEY (image_thumb_id) REFERENCES images(id)

);

CREATE TABLE litters (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
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

CREATE TABLE shows (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
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
    entry_name      VARCHAR(255) UNIQUE NOT NULL,
    place           INT NOT NULL,
    show_id         INT NOT NULL
);

CREATE TABLE my_entries (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pet_id          INT NOT NULL, -- pets
    show_name       VARCHAR(255) NOT NULL,
    place           INT NOT NULL,
    url             VARCHAR(1000) NULL,
    venue_id        INT NOT NULL, -- show_venues
    category_id     INT NOT NULL, -- show_categories
    show_date       VARCHAR(255) NULL,
    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (venue_id) REFERENCES show_venues(id),
    FOREIGN KEY (category_id) REFERENCES show_categories(id) 
);

--
--  Download Tables
--

CREATE TABLE downloads (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    download_name   VARCHAR(255) UNIQUE NOT NULL,
    description     TEXT NULL,
    image_id        INT NOT NULL, -- images
    page_id         INT NOT NULL, -- pages
    FOREIGN KEY (image_id) REFERENCES images(id),
    FOREIGN KEY (page_id) REFERENCES pages(id)
);

CREATE TABLE download_files (
    id              INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    download_name   VARCHAR(255) UNIQUE NOT NULL,
    file_name       VARCHAR(1000) NOT NULL,
    file_size       VARCHAR(255) NOT NULL,
    download_id     INT NOT NULL, -- downloads
    FOREIGN KEY (download_id) REFERENCES downloads(id)
);


