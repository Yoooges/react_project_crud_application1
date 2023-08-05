import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from backend
    axios.get('/api/items').then((response) => {
      setItems(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {/* Add an Edit button to trigger the EditItemForm */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
