// Login.js

import React, { useState } from 'react';
import { AuthService } from '../fn/AuthService';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleLogin = () => {
    const user = AuthService.login(username, password);

    if (user) {
      navigate('/')
    } else {
      alert('Invalid username or password Please Sign Up');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <label style={styles.label}>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </label>
      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};


const styles = {
    container: {
      maxWidth: '400px', 
      margin: 'auto',
      padding: '20px',
      marginTop:"5%"
    },
    label: {
      display: 'block',
      margin: '10px 0',
    },
    input: {
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
      marginBottom: '15px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    '@media (min-width: 768px)': {
      container: {
        maxWidth: '600px', 
      },
    },
  };

  
