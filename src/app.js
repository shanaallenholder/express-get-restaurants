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
app.use(express.urlencoded());

// Creating a restaurant endpoint
app.post("/restaurants" , async (req,res) => {
    const restaurant = await Restaurant.create({
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine
    })
    // 201 created - success
    res.status(201).json(restaurant);
  
})




module.exports = app;