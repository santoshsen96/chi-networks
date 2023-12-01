import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div style={{ ...styles.navbar, ...styles.fixedNavbar }}>
        <Link to={'/'} style={styles.link}>
        Home
      </Link>
      <Link to={'/favorites'} style={styles.link}>
        Favorite
      </Link>
      <Link to={'/login'} style={styles.link}>
        Login
      </Link>
      <Link to={'/signup'} style={styles.link}>
        Signup
      </Link>
    </div>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    zIndex: 1000, 
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    padding: '10px',
    transition: 'background-color 0.3s ease',
  },
  fixedNavbar: {
    position: 'fixed',
    top: 0,
  },
};


