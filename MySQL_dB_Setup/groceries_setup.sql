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

CREATE TABLE IF NOT EXISTS user (
	username VARCHAR(63) PRIMARY KEY,
    password VARCHAR(63) NOT NULL
);

CREATE TABLE IF NOT EXISTS store (
	user_username VARCHAR(63) NOT NULL,
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    store_name VARCHAR(63) NOT NULL,
    neighborhood VARCHAR(63) NOT NULL,
    CONSTRAINT user_store_fk FOREIGN KEY (user_username) REFERENCES user(username)
);

CREATE TABLE IF NOT EXISTS category (
	id CHAR(3) PRIMARY KEY,
    category_name VARCHAR(63) NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
	user_username VARCHAR(63) NOT NULL,
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(63) NOT NULL,
    category_id CHAR(3),
    selected TINYINT,
    CONSTRAINT user_item_fk FOREIGN KEY (user_username) REFERENCES user(username),
    CONSTRAINT category_fk FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS store_item (
	user_username VARCHAR(63) NOT NULL,
	store_id INTEGER,
    item_id INTEGER,
	CONSTRAINT store_item_composite_key PRIMARY KEY(store_id, item_id),
    CONSTRAINT user_store_item_fk FOREIGN KEY (user_username) REFERENCES user(username),
    CONSTRAINT store_fk FOREIGN KEY (store_id) REFERENCES store(id),
    CONSTRAINT item_fk FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE INDEX user_stores ON store(user_username);
CREATE INDEX user_items ON item(user_username);
CREATE INDEX user_store_items ON store_item(user_username);