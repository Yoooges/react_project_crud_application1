// dependencies  Axios, react-router-dom  using npm install.


import React, { useState } from 'react';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import EditItemForm from './EditItemForm';

const App = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemUpdated = (updatedItem) => {
    setItems(items.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
    setSelectedItem(null); // Clear selectedItem state after the update
  };

  return (
    <div>
      <ItemList items={items} setSelectedItem={setSelectedItem} />
      {selectedItem ? (
        <EditItemForm item={selectedItem} onItemUpdated={handleItemUpdated} />
      ) : (
        <AddItemForm onItemAdded={handleItemAdded} />
      )}
    </div>
  );
};

export default App;
