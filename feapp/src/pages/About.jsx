// src/pages/About.jsx

import React from 'react';

const About = () => {
  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="text-left">
        <h2 className="text-2xl font-bold mb-4 text-center">About Us</h2>
        <p className="text-lg mb-4 text-justify leading-relaxed">
          Kami adalah platform yang didedikasikan untuk memberikan rekomendasi terbaik 
          mengenai tempat wisata di Yogyakarta. Misi kami adalah membantu wisatawan 
          menemukan destinasi yang sesuai dengan preferensi mereka.
        </p>
        <p className="text-lg mb-4 text-justify leading-relaxed">
          Baik Anda mencari landmark budaya, keajaiban alam, atau tempat-tempat tersembunyi, 
          rekomendasi kami dirancang untuk memastikan Anda memiliki pengalaman yang tak terlupakan.
        </p>
      </div>
    </div>
  );
};

export default About;
