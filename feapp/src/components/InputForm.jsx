// src/components/InputForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const goToAllPlaces = () => {
    navigate('/allplaces');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://rekombex.onrender.com/recommend', {
        description: inputValue,
      });
      navigate('/result', { state: { recommendations: response.data } });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg">
      {/* <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Masukkan deskripsi yang diinginkan"
        className="p-3 mb-4 w-full text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
      /> */}
      <button
        type="Semua Tempat"
        onClick={goToAllPlaces}
        className="w-full px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors"
        
      >
        Semua Tempat
      </button>
    </form>
  );
};

export default InputForm;
