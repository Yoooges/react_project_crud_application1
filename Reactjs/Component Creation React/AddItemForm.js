import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to the backend to create a new item
    axios.post('/api/items', { name, description }).then((response) => {
      onItemAdded(response.data); // Notify parent component about the new item
      setName('');
      setDescription('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
