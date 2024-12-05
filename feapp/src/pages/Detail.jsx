// src/pages/Detail.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const Detail = () => {
  const { slug } = useParams();
  const location = useLocation(); // Tambahkan useLocation untuk mendeteksi perubahan rute
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [nearestPlaces, setNearestPlaces] = useState([]);

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const fetchPlaceDetail = useCallback(async () => {
    try {
      const response = await axios.get('https://rekombex.onrender.com/places');
      const data = response.data;

      const selectedPlace = data.find((place) => slugify(place.Place_Name) === slug);
      setPlace(selectedPlace);

      // if (selectedPlace) {
      //   const distanceResponse = await axios.post('https://rekombex.onrender.com/distance', {
      //     lat: selectedPlace.Lat,
      //     lon: selectedPlace.Long,
      //   });

      //   const nearestData = distanceResponse.data;
      //   const filteredNearestPlaces = nearestData.filter((p) => p.Distance > 0).slice(0, 3);
      //   setNearestPlaces(filteredNearestPlaces);
      // }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching place detail:', error);
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPlaceDetail();
  }, [fetchPlaceDetail]);

  // Scroll restoration setiap kali lokasi berubah
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Jalankan efek ini ketika lokasi berubah

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!place) {
    return <div>Tempat wisata tidak ditemukan.</div>;
  }

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="mb-4">
        <img
          src={place.Image || "https://via.placeholder.com/400x200?text=Image+Not+Available"}
          alt={place.Place_Name}
          className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="text-left">
        <h2 className="text-2xl font-bold mb-4">{place.Place_Name}</h2>
        <p className="text-lg mb-4 text-justify leading-relaxed">{place.Description}</p>
      </div>

      {/* Peta tempat wisata */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Lokasi Tempat Wisata</h3>
        <MapContainer center={[place.Lat, place.Long]} zoom={13} className="w-full h-96 mb-6 z-10">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Menggunakan CircleMarker sebagai titik */}
          <CircleMarker
            center={[place.Lat, place.Long]}
            radius={10} // ukuran titik
            fillColor="blue" // warna titik
            color="blue" // warna tepi titik
            fillOpacity={0.8} // tingkat transparansi titik
          >
            <Popup>{place.Place_Name}</Popup>
          </CircleMarker>
        </MapContainer>
      </div>

      {/* Bagian tempat wisata terdekat */}
      {/* {nearestPlaces.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Tempat Wisata Terdekat</h3>
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
      )} */}

      {/* {nearestPlaces.length === 0 && (
        <p className="text-red-500">Tidak ada tempat wisata terdekat yang ditemukan.</p>
      )} */}
    </div>
  );
};

export default Detail;
