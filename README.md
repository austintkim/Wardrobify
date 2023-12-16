# Wardrobify

Team:

* Richard A Hofmann-Warner - Hats
* Austin Kim - Shoes

## Design

**Instructions on how to run application:**

```

1. Go to remote repository using this link: https://gitlab.com/akim24/microservice-two-shot
2. Click on blue 'Code' dropdown button
3. Click on clipboard icon that copies the url corresponding to 'Clone with HTTPS'
4. Open up a terminal window and run the command: cd into whatever directory you would like to clone this project into
5. Once in that directory, run the command: git clone https://gitlab.com/akim24/microservice-two-shot.git
6. Run the command: ls (to see what the name of the cloend project is)'
7. Run the command: cd in to that directory
8. Run the command: docker-compose up to get all of the necessary docker containers up and running
9. Type localhost:3000 into your browser to access the application
10. Explore!

```

**Diagram of Bounded Contexts:**

```

https://files.slack.com/files-pri/T03S39PU5HS-F069ZEQS09H/image.png

Note: Port numbers in the API endpoints displayed in the diagram for hats and shoes should be swapped

```

**High level design:**

```

Wardrobify is made up of 3 microservices (bounded contexts) interacting with each other and a postgres database for each:

- *Wardrobe*
- *Shoes*
- *Hats*

```

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

Austin:

**Models Description:**

```

I created two models Shoes and BinVO.

The Shoes model is an entity designed so that each Shoe object added to the database would keep track of its:
- *model name*
- *manufacturer*
- *color*
- *picture url*
- *bin* (that the shoe would be stored in)

The BinVO model is a value object designed so that for each Bin object added to the database through the Bin model entity defined in the Wardrobe microservice, a copy of that Bin object (BinVO object) is created that tracks only the properties from the Bin model that we explicitly define in the BinVO model:
- *closet name*
- *import href*
- *bin number*

We use a Shoe Poller to access each bin that has been created in the database and to create a corresponding BinVO, bridging the gap between our shoes and wardrobe microservices and allowing each Shoe object to track the properties of interest (explicitly defined in our BinVO model) of whatever bin we assign it to.

In order to interact with the wardrobe microservice and its database there were data encoders written and accessed by view functions in shoes.api.shoes_rest_api_views.

```

**API Endpoints**

```
| Action | Method | URL
| ---------- | ---------- | ----------
| List Shoes | GET | http://localhost:8080/api/shoes/
------------------------------------------------------
| Get Details of a specific Shoe | GET | http://localhost:8080/api/shoes/id/
------------------------------------------------------
| Create a Shoe | POST | http://localhost:8080/api/shoes/
------------------------------------------------------
| Delete a specific Shoe | DELETE | http://localhost:8080/api/shoes/id/
------------------------------------------------------
| Update the details of a specific Shoe | PUT | http://localhost:8080/api/shoes/id/

```

*When requesting the list of shoes in the database, the JSON response will look like this:*
```
{
	"shoes": [
		{
			"id": 3,
			"model_name": "Gel-1130",
			"manufacturer": "ASICS",
			"color": "White/Silver",
			"picture_url": "https://cdn.clothbase.com/uploads/53cf8b36-4310-4f50-8195-bb90c847348b/off-white-and-silver-gel-1130-sneakers.jpg",
			"bin": {
				"bin_number": 3,
				"closet_name": "Backroom closet",
				"import_href": "/api/bins/3/",
				"id": 3
			}
		}
	]
}

```

*When requesting a specific shoe's details, the JSON response will look like this:*
```
{
	"id": 3,
	"model_name": "Gel-1130",
	"manufacturer": "ASICS",
	"color": "White/Silver",
	"picture_url": "https://cdn.clothbase.com/uploads/53cf8b36-4310-4f50-8195-bb90c847348b/off-white-and-silver-gel-1130-sneakers.jpg",
	"bin": {
		"bin_number": 3,
		"closet_name": "Backroom closet",
		"import_href": "/api/bins/3/",
		"id": 3
	}
}

```

*To create a new shoe, send a JSON body following this format:*
```
{
	"model_name": "Gel-1130",
	"manufacturer": "ASICS",
	"color": "White/Silver",
	"picture_url":
	"https://cdn.clothbase.com/uploads/53cf8b36-4310-4f50-8195-bb90c847348b/off-white-and-silver-gel-1130-sneakers.jpg",
	"bin": "/api/bins/3/"
}

```
*When deleting a specific shoe, the JSON response will look like this (if the designated shoe does not exist in the database, the value for "deleted" will be false):*
```
{
	"deleted": true
}

```

*To update a specific detail of a shoe, send a JSON body following this format (i.e. want to move shoe #3 to bin #2):*
```
{
	"bin": "/api/bins/2/"
}

```

## Hats microservice

The models for the Hats Microservice are created from the Wardrobe’s models. The Wardrobe’s models were used to develop two models in the Hats Microservice to meet the project goals. Firstly, the Locations Value Object (VO) pulls from the Wardrobes database with a poller. The second model was a Hat model, which creates hats for the microservice via views.py and makes hats in the microservice’s database. The two models, Hat and LocationsVO, are then set up to provide the Main page with Hats from the Hats Microservice via the database.
