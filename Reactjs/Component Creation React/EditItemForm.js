import React, { useState } from 'react';
import axios from 'axios';

const EditItemForm = ({ item, onItemUpdated }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to the backend to update the item
    axios
      .put(`/api/items/${item._id}`, { name, description })
      .then((response) => {
        onItemUpdated(response.data); // Notify parent component about the updated item
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Item</h2>
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
      <button type="submit">Update Item</button>
    </form>
  );
};

export default EditItemForm;
