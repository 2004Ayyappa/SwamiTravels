const express = require("express");
const CityModel = require("../models/city.model");

const app = express.Router();

app.get("/", async (req, res) => {
  // console.log(req.body);
  let data = await CityModel.find({});
  // console.log(data);
  res.send(data);
});

app.post("/", async (req, res) => {
  // console.log(req.body)
  try {
    
    let q;
    if(req.body.destination){
      q=req.body.destination
    }else{
      q = req.body.source;
    }

    q = q.toUpperCase();
     console.log(q);
    let data = await CityModel.find();

    let city = data.filter((ele) => {
      return ele.name.toUpperCase().includes(q);
    });

     console.log(city);

    return res.send(city);
  } catch (error) {
    return res.send(error.message);
  }
});

app.post("/showcity", async (req, res) => {
  let sourceStr = req.body.source;
  let destinationStr = req.body.destination;
  let source = sourceStr.charAt(0).toUpperCase() + sourceStr.substr(1);
  let destination =
    destinationStr.charAt(0).toUpperCase() + destinationStr.substr(1);
  try {
    let fromcheck= await CityModel.findOne({name:source})
    let destinationcheck=await CityModel.findOne({name:destination})
    // console.log(fromcheck)
    // console.log(destinationcheck)
    if(fromcheck){
      if(destinationcheck){
        return res.send({status:"success",data:"Buses In Your City Are Here"})
      }else{
        return res.send({status:"failed",data:"destination is not found"})
      }
    }else{
      return res.send({status:"failed",data:"source is not found"})
    }
  } catch (error) {
    return res.send(error.message)
  }
})



// Add a new city
app.post("/addcity", async (req, res) => {
  try {
    const { name, state } = req.body;
    const newCity = new CityModel({ name, state });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Route to handle DELETE requests to delete cities
app.delete("/deleteCity/:id", async (req, res) => {

  try {
    const cityId =  req.params.id;

    // Find the city by its ID and delete it
    const deletedCity = await CityModel.findByIdAndDelete(cityId);

    if (!deletedCity) {
      // If the city with the provided ID does not exist, respond with 404
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    // If an error occurs during the deletion process, respond with 500 and the error message
    res.status(500).json({ error: error.message });
  }
});


// Route to handle PUT requests to update cities
app.put("/updateCity/:id", async (req, res) => {
  try {
    const cityId = req.params.id;
    const { name, state } = req.body;

    // Find the city by its ID and update its name and state
    const updatedCity = await CityModel.findByIdAndUpdate(
      cityId,
      { name, state },
      { new: true }
    );
    await updatedCity.save();

    if (!updatedCity) {
      // If the city with the provided ID does not exist, respond with 404
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(updatedCity);
  } catch (error) {
    // If an error occurs during the update process, respond with 500 and the error message
    res.status(500).json({ error: error.message });
  }
});

// Route to get the count of all cities
app.get("/count", async (req, res) => {
  try {
    const cityCount = await CityModel.countDocuments();
    res.status(200).json({ count: cityCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = app;
