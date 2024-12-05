// src/components/Header.jsx

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the dropdown menu
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section (Back Button + Logo) */}
        <div className="flex items-center">
          {location.pathname !== '/' && (
            <button 
              className="text-blue-500 hover:bg-blue-100 transition-all duration-200 ease-in-out p-2 rounded-full flex items-center mr-4"
              onClick={handleBackClick}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            </button>
          )}
          <Link to="/" className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200 ease-in-out">
            Rekom
          </Link>
        </div>

        {/* Right Section (Hamburger Menu) */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 hover:text-blue-500 transition-colors duration-200 ease-in-out"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-xl" />
          </button>
        </div>

        {/* Navigation Menu for larger screens */}
        <nav className="hidden sm:flex space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link to="/allplaces" className="text-gray-600 hover:text-blue-500 text-sm sm:text-base transition-colors duration-200 ease-in-out">
                Semua Tempat
              </Link>
            </li>
            <li>
              <Link to="/nearmap" className="text-gray-600 hover:text-blue-500 text-sm sm:text-base transition-colors duration-200 ease-in-out">
                Tempat Terdekat
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-500 text-sm sm:text-base transition-colors duration-200 ease-in-out">
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Dropdown menu for mobile */}
        {isOpen && (
          <div className="absolute top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg w-48 sm:hidden z-50">
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <Link 
                  to="/allplaces" 
                  className="text-gray-600 hover:text-blue-500 text-base transition-colors duration-200 ease-in-out"
                  onClick={toggleMenu}
                >
                  Semua Tempat
                </Link>
              </li>
              <li>
                <Link 
                  to="/nearmap" 
                  className="text-gray-600 hover:text-blue-500 text-base transition-colors duration-200 ease-in-out"
                  onClick={toggleMenu}
                >
                  Tempat Terdekat
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-blue-500 text-base transition-colors duration-200 ease-in-out"
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
