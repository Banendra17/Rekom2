// src/pages/Result.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultItem from '../components/Item'; // Pastikan menggunakan ResultItem

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Mengambil rekomendasi yang dikirim melalui state
    const { recommendations } = location.state || { recommendations: [] };

    // Filter rekomendasi yang memiliki similarity score > 0
    const filteredRecommendations = recommendations.filter(rec => rec.Similarity_Score > 0);

    // Ambil rekomendasi teratas (maksimum 3)
    const topRecommendations = filteredRecommendations.slice(0, 3);

    return (
      <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Hasil Rekomendasi</h2>
        
        {topRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-screen-lg">
            {topRecommendations.map((rec, index) => (
              <ResultItem 
                key={index} 
                title={rec.Place_Name} 
                description={rec.Description} 
                similarityScore={rec.Similarity_Score}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-4">Tidak ada yang mirip.</p>
            <button 
              onClick={() => navigate(-1)} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Kembali
            </button>
          </div>
        )}
      </div>
    );
  };

export default Result;
