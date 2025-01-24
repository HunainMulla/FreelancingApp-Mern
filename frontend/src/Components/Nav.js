


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../ComponentsStyle/Nav.css';  // Import the CSS file
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from './loginSlice';

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.islogged.value);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/" style={{ listStyle: "none", color: "white", fontFamily: "cursive" }}>EasyLance</Link>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>

        
        {!user && (
          <>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        
        {user && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            
            <li onClick={() => dispatch(signOut())}><Link to="/login">Sign Out</Link></li>
          </>
        )}

        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li onClick={()=>alert("This feature would be added soon")}>
          <Link to="#" >
          Chat
          
          </Link>
          </li>
      </ul>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776; 
      </div>
    </div>
  );
};

export default Nav;
