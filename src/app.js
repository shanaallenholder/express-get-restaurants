const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req,res) => {
     
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants);
})
  
    
app.use(express.json()); //Use express to create a GET/restaurants/:id endpoint

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id; // Get the ID using req.params object
    const restaurant = await Restaurant.findByPk(id); // Get the restaurant via the method findbypk

    if(restaurant){
        res.json(restaurant) // Send the found restaurant as a json response
    } else {
        res.status(404).json({error: 'No restaurant found'});
    }
        return;

});

app.use(express.json());


// Creating a restaurant endpoint with POST and CREATE 
app.post("/restaurants" , async (req,res) => {
    const restaurant = await Restaurant.create({ //Async method to create 
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine
    })
    // 201 created - success
    res.status(201).json(restaurant);
  
})

// Updating(replacing) an existing restaurant with a new restaurant in the database based on ID.
// With a new restaurant in your restaurant database based on ID in the route 
app.put("/restaurants/:id", async (req,res) => {
    let restaurant = await Restaurant.findByPk(req.params.id); //async method to find by primary key/id

    if(!restaurant) {
        res.status(404).json({error: "Restaurant not found"});
        return;
    }
    restaurant = await restaurant.update(req.body);
    res.json(restaurant);
})

// Deleting restaurant using endpoints by their id endpoint 
app.delete("/restaurants/:id" , async (req,res) => {
    const restaurant = await Restaurant.findByPk(req.params.id); // async method to delete by its id.

    if(!restaurant) { // if the restaurant DOES NOT exist
        res.status(404).json({error: "Restaurant does not exist"}); //give this error status/message
        return;
    }
    await restaurant.destroy(); // if it does then delete the restaurant
    res.status(204).send();
})




module.exports = app;