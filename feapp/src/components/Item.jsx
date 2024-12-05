// src/components/Result.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultItem = ({ title, description, similarityScore, showSimilarityScore = true }) => {
  const navigate = useNavigate();

  // Fungsi untuk membuat slug dari title
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')        // Ganti spasi dengan tanda "-"
      .replace(/[^\w-]+/g, '')     // Hapus karakter non-word (escape character tidak diperlukan di sini)
      .replace(/--+/g, '-')        // Ganti banyak tanda "-" dengan satu "-"
      .replace(/^-+/, '')          // Hapus tanda "-" di awal
      .replace(/-+$/, '');         // Hapus tanda "-" di akhir
  };
  
  
  const handleDetailsClick = () => {
    const slug = slugify(title); // Menggunakan slug title
    navigate(`/detail/${slug}`); // Mengarahkan ke halaman detail dengan slug
  };

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-lg text-gray-700 mb-4">
        {description.length > 150 ? description.substring(0, 150) + '...' : description}
      </p>
      {showSimilarityScore && (
        <p className="text-sm text-gray-500 mb-4">Skor Kesamaan: {similarityScore.toFixed(4)}</p>
      )}

      <button 
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-150"
        onClick={handleDetailsClick}
      >
        Selengkapnya
      </button>
    </div>
  );
};

export default ResultItem;
