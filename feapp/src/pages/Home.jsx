// src/pages/Home.jsx

import React from 'react';
// import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import homeimage from '../data/image.png';

const Home = () => {
  // const navigate = useNavigate();

  // // const goToAllPlaces = () => {
  // //   navigate('/allplaces');
  // // };

  // // const goToNearestMap = () => {
  // //   navigate('/nearmap');
  // // };

  return (
    <div className="flex flex-col min-h-[100%]">
      <div className="flex-grow flex flex-col justify-center items-center p-4">
        <div className="w-full sm:w-2/3 lg:w-1/2">
          <div className="h-48 sm:h-64 overflow-hidden mb-4"> {/* Adjust height for mobile */}
            <img
              src={homeimage}
              alt="Placeholder"
              className="w-full h-full object-cover"
            />
          </div>
          <InputForm />

          {/* Tambahkan tombol di bawah InputForm */}
          {/* <div className="flex space-x-4 mt-4 w-full">
            <button
              onClick={goToAllPlaces}
              className="w-1/2 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-colors"
            >
              Semua Tempat
            </button>
            <button
              onClick={goToNearestMap}
              className="w-1/2 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition-colors"
            >
              Tempat Terdekat
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
