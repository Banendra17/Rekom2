// src/pages/NearestPlace.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NearestPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');
  const [nearestPlaces, setNearestPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Slugify function
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with "-"
      .replace(/[^\w-]+/g, '')     // Remove non-word characters
      .replace(/--+/g, '-')        // Replace multiple "-" with a single "-"
      .replace(/^-+/, '')          // Trim "-" from start of text
      .replace(/-+$/, '');         // Trim "-" from end of text
  };

  // Fetch places
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('https://rekombex.onrender.com/places');
        setPlaces(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching places:', err);
        setError('Gagal memuat data tempat wisata');
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Handle place selection
  const handlePlaceSelect = async (event) => {
    const placeName = event.target.value;
    setSelectedPlace(placeName);

    const selected = places.find((place) => place.Place_Name === placeName);

    if (selected) {
      try {
        const response = await axios.post('https://rekombex.onrender.com/distance', {
          lat: selected.Lat,
          lon: selected.Long,
        });
        const filteredPlaces = response.data.filter((place) => place.Distance > 0).slice(0, 3);
        setNearestPlaces(filteredPlaces);
      } catch (err) {
        console.error('Error fetching nearest places:', err);
        setError('Gagal memuat tempat wisata terdekat');
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cari Tempat Wisata Terdekat</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="w-full max-w-md mb-6">
        <label htmlFor="place-dropdown" className="block text-lg font-medium text-gray-700 mb-2">
          Pilih Tempat Wisata
        </label>
        <select
          id="place-dropdown"
          value={selectedPlace}
          onChange={handlePlaceSelect}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
        >
          <option value="">Pilih tempat wisata</option>
          {places.map((place, index) => (
            <option key={index} value={place.Place_Name}>
              {place.Place_Name}
            </option>
          ))}
        </select>
      </div>

      {selectedPlace && nearestPlaces.length > 0 && (
        <div className="w-full max-w-screen-lg">
          <h3 className="text-xl font-semibold mb-4">3 Tempat Wisata Terdekat</h3>
          <ul className="space-y-4">
            {nearestPlaces.map((place, index) => (
              <li key={index} className="p-4 bg-white shadow-md rounded-lg">
                <Link to={`/detail/${slugify(place.Place_Name)}`}>
                  <h4 className="text-lg font-bold text-gray-800 hover:text-blue-500 hover:bg-blue-100 transition-all duration-200 ease-in-out p-2 rounded-lg">
                    {place.Place_Name}
                  </h4>
                  <p className="text-gray-600">Jarak: {place.Distance.toFixed(2)} km</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NearestPlaces;
