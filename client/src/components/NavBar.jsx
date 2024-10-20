import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import '../components/assets/styles/Navbar.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(prevState => !prevState);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo" aria-label="Homepage">
          {/* Logo with lazy loading */}
          <img 
            src={require('./assets/image/Green Modern Illustrated Electricity Logo.png')} 
            alt="Company Logo" 
            className="navbar-logo" 
            loading="lazy" 
          />
        </Link>
      </div>
      <button 
        className="menu-icon" 
        onClick={toggleMenu} 
        aria-label="Toggle Navigation" 
        aria-expanded={showMenu} 
        aria-controls="navbar-links" 
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={`nav-links ${showMenu ? 'show' : ''}`} id="navbar-links">
        <li><Link to="/" aria-label="Home">Home</Link></li>
        <li><Link to="/about" aria-label="About Us">About</Link></li>
        <li><Link to="/services" aria-label="Services">Services</Link></li>
        <li><Link to="/contact" aria-label="Contact Us">Contact</Link></li>
        <li><Link to="/blog" aria-label="Blog">Blog</Link></li>
        <li className="sign-in">
          <Link to="/signup" aria-label="Sign In">
            <FontAwesomeIcon icon={faUser} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <form className="search-form" onSubmit={(e) => e.preventDefault()} aria-label="Search form">
            <input 
              type="text" 
              placeholder="Search" 
              aria-label="Search input" 
              className="search-input" 
            />
            <button 
              type="submit" 
              aria-label="Search button" 
              className="search-button"
            >
              <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
