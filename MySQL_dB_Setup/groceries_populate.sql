INSERT INTO user VALUES
	("brockleys","$2a$10$gbez2c2.qvAJzdjjaioSLu8R0BtrR6BfBSBdxRSI0bSbDMRkpYOvW"),
    ("alamedans","$2a$10$GT5rXxKEp3E7/rOI8wHGi.wkuBGkKJGN158sVAa4rS.2n6k4d/V52"),
    ("chefmatt","$2a$10$ylwKmUD1nk40IsjaOTZomeK.NMsAuiB9AHvl90xctT9PccnfxfQx6");

INSERT INTO store VALUES 
    ("alamedans",null,"Trader Joe's","Alameda"),
    ("chefmatt",null,"Whole Foods","Cupertino"),
	("brockleys",null,"Trader Joe's","Eagle Rock"),
    ("brockleys",null,"Sprouts","Highland Park"),
    ("brockleys",null,"Vons","Eagle Rock"),
    ("brockleys",null,"Super A","Highland Park");

    
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
	("alamedans",null,"Pork tenderloin", "MET", 1),
	("brockleys",null,"Dark chocolate peanut butter cups", "PCD", 1),
    ("brockleys",null,"Everything pretzels", "PCD", 1),
    ("brockleys",null,"Molcajete salsa", "PCD", 0),
    ("brockleys",null,"Mediterranean hummus", "PCD", 1),
    ("brockleys",null,"Frozen waffles", "FZN", 1),
    ("brockleys",null,"Cherry-Lime La Croix", "BVE", 1),
    ("brockleys",null,"Peanut M&M's", "PCD", 1),
    ("brockleys",null,"Wake-up Blend coffee", "PCD", 1),
    ("brockleys",null,"Yogurt tubes", "DRY", 1);
    
INSERT INTO store_item VALUES 
	("alamedans",1,1),
    ("brockleys",3,2),
    ("brockleys",3,5),
    ("brockleys",3,6),
    ("brockleys",3,9),
    ("brockleys",3,10),
    ("brockleys",4,6),
    ("brockleys",4,10),
    ("brockleys",5,3),
    ("brockleys",5,8),
    ("brockleys",6,4),
    ("brockleys",6,7);