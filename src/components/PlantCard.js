import React, { useState } from "react";

function PlantCard({ name, image, price, inStock, onStockChange }) {
  const [isInStock, setIsInStock] = useState(inStock);

  const handleStockToggle = () => {
    const newStockStatus = !isInStock;
    setIsInStock(newStockStatus);
    if (onStockChange) {
      onStockChange(name, newStockStatus);
    }
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image || "https://via.placeholder.com/400"} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${Number(price).toFixed(2)}</p>
      <button
        className={isInStock ? "primary" : ""}
        onClick={handleStockToggle}
      >
        {isInStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;