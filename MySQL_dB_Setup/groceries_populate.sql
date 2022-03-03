INSERT INTO store VALUES 
	(null,"Trader Joe's","Eagle Rock"),
    (null,"Sprouts","Highland Park"),
    (null,"Vons","Eagle Rock"),
    (null,"Super A","Highland Park"),
    (null,"Home Depot","Cypress Park");
    
INSERT INTO category VALUES
	("PDE", "Produce"),
    ("DRY", "Dairy"),
    ("MET", "Meat"),
    ("FZN", "Frozen"),
    ("PCD", "Packaged"),
    ("BVE", "Beverage"),
    ("HGE", "Hygiene"),
    ("HHD", "Household"),
    ("HWE", "Hardware"),
    ("ETS", "Electronics"),
    ("GDG", "Gardening"),
    ("ZZZ", "Other");
    
INSERT INTO item VALUES 
	(null,"Dark chocolate peanut butter cups", "PCD", 1),
    (null,"Everything pretzels", "PCD", 1),
    (null,"Molcajete salsa", "PCD", 0),
    (null,"Tree saw blade", "HWE", 0),
    (null,"Mediterranean hummus", "PCD", 1),
    (null,"Frozen waffles", "FZN", 1),
    (null,"Cherry-Lime La Croix", "BVE", 1),
    (null,"Peanut M&M's", "PCD", 1),
    (null,"Wake-up Blend coffee", "PCD", 1),
    (null,"Yogurt tubes", "DRY", 1);
    
INSERT INTO store_item VALUES 
(1,1),
(3,2),
(4,3),
(5,4),
(1,5),
(1,6),
(2,6),
(3,6),
(4,7),
(3,8),
(1,9),
(1,10),
(2,10);