// src/pages/AllPlaces.jsx

import React, { useEffect, useState } from 'react';
import ResultItem from '../components/Item'; // Gunakan komponen yang sudah ada

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPlaces = async () => {
    try {
      const response = await fetch('https://rekombex.onrender.com/places');
      const data = await response.json();
      setPlaces(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching places:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPlaces();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Semua Tempat Wisata</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-screen-lg">
        {places.length > 0 ? (
          places.map((place, index) => (
            <ResultItem 
              key={index}
              title={place.Place_Name}
              description={place.Description}
              showSimilarityScore={false}
            />
          ))
        ) : (
          <p>Tidak ada tempat wisata tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default AllPlaces;
