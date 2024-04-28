const express = require("express");
const BusModel = require("../models/bus.model");

const app = express.Router();

app.post("/addnew", async (req, res) => {
  // console.log(req.body);
  try {
    let newbus = await BusModel.create({ ...req.body });
    // console.log(newbus);
    return res.send(newbus);
  } catch (error) {
    return res.send(error.message);
  }
});

app.post('/bus/update/:id', async (req, res) => {
  try {
    const busId = req.params.id;
    const updateData = req.body;

    // Find the bus by id and update it with the new data
    const updatedBus = await Bus.findByIdAndUpdate(busId, updateData, { new: true });

    if (updatedBus) {
      res.status(200).json(updatedBus);
    } else {
      res.status(404).send('Bus not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post("/getall", async (req, res) => {
  // console.log(req.body);
  try {
    // Fetch all buses from the database
    const buses = await BusModel.find();
    res.status(200).json(buses); // Send the fetched buses as JSON response
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ message: 'Failed to fetch buses' }); // Send an error response
  }
  
});

app.get("/getall", async (req, res) => {
  // console.log(req.body);
  try {
    // Fetch all buses from the database
    const buses = await BusModel.find();
    res.status(200).json(buses); // Send the fetched buses as JSON response
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ message: 'Failed to fetch buses' }); // Send an error response
  }
  
});
app.post("/one", async (req, res) => {
  // console.log("hi");
  try {
    let bus = await BusModel.find({ _id: req.body.id });
    return res.send(bus);
  } catch (error) {
    return res.send(error.message);
  }
});
// Route to get the count of all buses
app.get("/count", async (req, res) => {
  try {
    const busCount = await BusModel.countDocuments();
    res.status(200).json({ count: busCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { from, to, price } = req.body; // Assuming the request body contains fields to be updated
  
  try {
    const updatedBus = await BusModel.findByIdAndUpdate(
      id,
      { from, to, price },
      { new: true } // Return the updated document
    );

    if (!updatedBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.status(200).json(updatedBus); // Send back the updated bus details
  } catch (err) {
    console.error('Error updating bus:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route handler to delete a bus
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBus = await BusModel.findByIdAndDelete(id);

    if (!deletedBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (err) {
    console.error('Error deleting bus:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
