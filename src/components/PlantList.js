import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import Search from "./Search";

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:6001/plants");
        if (!response.ok) {
          throw new Error("Failed to fetch plants");
        }
        const data = await response.json();
        setPlants(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // Filter plants based on searrch tem
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Search onSearch={handleSearch} />
      <ul className="cards">
        {filteredPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            name={plant.name}
            image={plant.image}
            price={plant.price}
            inStock={plant.inStock}
          />
        ))}
      </ul>
    </div>
  );
}

export default PlantList;