# Wardrobify

Team:

* Richard A Hofmann-Warner - Hats
* Austin Kim - Shoes

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

Austin:

I created two models Shoes and BinVO.

The Shoes model is an entity designed so that each Shoe object added to the database would keep track of its model name, manufacturer, color, a url to a picture of the specific shoe and the bin that the shoe would be stored in.

The BinVO model is a value object designed so that for each Bin object added to the database through the Bin model entity defined in the Wardrobe microservice, a copy of that Bin object (BinVO object) is created that tracks only the properties from the Bin model that we explicitly define in the BinVO model (closet name, import href, and bin number).

We use a Shoe Poller to access each bin that has been created in the database and to create a corresponding BinVO, bridging the gap between our shoes and wardrobe microservices and allowing each Shoe object to track the properties of interest (explicitly defined in our BinVO model) of whatever bin we assign it to.


## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.

Richard:

The models for the Hats Microservice are created from the Wardrobe’s models. The Wardrobe’s models were used to develop two models in the Hats Microservice to meet the project goals. Firstly, the Locations Value Object (VO) pulls from the Wardrobes database with a poller. The second model was a Hat model, which creates hats for the microservice via views.py and makes hats in the microservice’s database. The two models, Hat and LocationsVO, are then set up to provide the Main page with Hats from the Hats Microservice via the database.
