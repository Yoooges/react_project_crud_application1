const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/itemModel');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

// Routes for CRUD operations
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving items from the database' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newItem = new Item({ name, description });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error saving item to the database' });
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item in the database' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndRemove(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item from the database' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
