-- Items from a particular Store --
SELECT i.item_name AS Items
FROM store s JOIN store_item si ON s.id = si.store_id
			JOIN item i ON i.id = si.item_id
WHERE si.user_username = "brockleys" AND s.store_name = "Trader Joe's";


-- Number of Items at each Store --
SELECT s.store_name AS Store, COUNT(si.store_id) AS "Number of Items"
FROM store s JOIN store_item si ON s.id = si.store_id
			JOIN item i ON i.id = si.item_id
WHERE si.user_username = "alamedans"
GROUP BY s.store_name
ORDER BY COUNT(si.store_id) DESC, s.store_name;


-- All Store names and neighborhoods --
SELECT * FROM store WHERE user_username = "alamedans";


 -- All Item name and Store name combinations --
SELECT s.id AS "store_id", s.store_name AS "store_name", s.neighborhood AS "neighborhood", i.id AS "item_id", i.item_name AS "item_name"
FROM item i JOIN store_item si ON i.id = si.item_id
			JOIN store s ON s.id = si.store_id
WHERE si.user_username = "alamedans" AND i.selected = 1
ORDER BY s.id;


-- All Category names --
SELECT category_name FROM category;


-- All Item names and corresponding Category names --
SELECT c.id AS 'category_id', c.category_name AS 'category_name', i.id AS 'item_id', i.item_name AS 'item_name', i.selected AS 'selected'
FROM item i JOIN category c ON i.category_id = c.id
ORDER BY c.id;

-- Add new Store --
INSERT INTO store VALUES
	(null, "","");

-- Add new Item --
INSERT INTO item VALUES
	(null, "", 0);
    
-- Add new Item to each corresponding Store --
INSERT INTO store_item VALUES
	(0,0);
    
SELECT  DISTINCT i.id AS "item_id", i.item_name AS "item_name"
FROM item i JOIN store_item si ON i.id = si.item_id
WHERE i.selected = 1
ORDER BY i.id;

SELECT  DISTINCT s.id AS "store_id", s.store_name AS "store_name", s.neighborhood AS "neighborhood"
FROM item i JOIN store_item si ON i.id = si.item_id
			JOIN store s ON s.id = si.store_id
WHERE i.selected = 1
ORDER BY s.id;

SELECT  i.id AS "item_id", si.store_id AS "store_id"
FROM item i JOIN store_item si ON i.id = si.item_id
WHERE i.selected = 1
ORDER BY i.id;

SELECT * FROM store_item;

SELECT * FROM item;

SELECT * FROM store;

DELETE FROM store WHERE id IN (6,7);

DELETE FROM store_item WHERE item_id = 27 AND store_id = 4;

DELETE FROM item WHERE id IN (24);

INSERT INTO item VALUES (null,'Cherry-Lime La Croix', 'BVE', 1);

INSERT INTO store_item VALUES (1,27);

UPDATE item
SET item_name = 'Avocado', category_id = 'PDE'
WHERE id = 27;

SELECT item_name, category_id FROM item WHERE id = 27;

SELECT store_id FROM store_item WHERE item_id = 27;
