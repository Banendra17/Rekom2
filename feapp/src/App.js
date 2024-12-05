// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllPlaces from './pages/AllPlaces';
import About from './pages/About';
import Result from './pages/Result';
import Detail from './pages/Detail';
import NearestPlaces from './pages/NearestPlace';
import NearestMap from './pages/NearstMap'

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allplaces" element={<AllPlaces />} />
            <Route path="/about" element={<About />} />
            <Route path="/result" element={<Result />} />
            <Route path="/near" element={<NearestPlaces />} />
            <Route path="/nearmap" element={<NearestMap />} />
            <Route path="/detail/:slug" element={<Detail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
