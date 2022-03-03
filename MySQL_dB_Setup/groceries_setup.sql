DROP DATABASE groceries;

SET default_storage_engine=InnoDB;

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS groceries
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'user'@'localhost';
SET PASSWORD FOR 'user'@'localhost' = 'pass';
GRANT ALL PRIVILEGES ON * . * TO 'user'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

USE groceries;

DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user (
	username VARCHAR(63) PRIMARY KEY,
    password VARCHAR(63) NOT NULL
);

CREATE TABLE IF NOT EXISTS store (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    store_name VARCHAR(63) NOT NULL,
    neighborhood VARCHAR(63) NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
	id CHAR(3) PRIMARY KEY,
    category_name VARCHAR(63) NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(63) NOT NULL,
    category_id CHAR(3),
    selected TINYINT,
    CONSTRAINT category_fk FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS store_item (
	store_id INTEGER,
    item_id INTEGER,
	CONSTRAINT store_item_composite_key PRIMARY KEY(store_id, item_id),
    CONSTRAINT store_fk FOREIGN KEY (store_id) REFERENCES store(id),
    CONSTRAINT item_fk FOREIGN KEY (item_id) REFERENCES item(id)
);
