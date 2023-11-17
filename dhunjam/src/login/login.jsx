// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
        console.log(11);
      const response = await axios.post('https://stg.dhunjam.in/account/admin/login', { 
        username, password 
    });
    console.log(response);
      
      history('/dashboard');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
     <div style={styles.box}>
     <h1 style={styles.heading}>Venue Admin Login</h1>
      <form>
        <label style={styles.label}>
          
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Username"
          />
        </label>
        <br />
        <label style={styles.label}>
       
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Password"
          />
          <span
            style={styles.eyeIcon}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '👁️' : '👁️'}
          </span>
        </label>
        <br />
        <button type="button" onClick={handleLogin} style={styles.button}>
          Sign In
        </button>
        <p style={{ 'padding-left': '27vh' }}>New Registration?</p>
      </form>
     </div>
    </div>
  );
};

const styles = {
  container: {
    background: '#030303',
    color: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '214.8vh', // Full height of the viewport
  },
  heading: {
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '20px',
    paddingLeft:'100px'
  },
  box:{
    marginRight:'130px'
  },
  label: {
    marginBottom: '10px',
    display: 'block',
    position: 'relative',
  },
  input: {
    width: '130%',
    padding: '14px',
    border: '1px solid #FFFFFF',
    borderRadius: '7px',
    boxSizing: 'border-box',
    marginBottom: '10px',
    color: '#FFFFFF',
    background: '#030303',
  },
  button: {
    background: '#6741D9',
    color: '#FFFFFF',
    padding: '6px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '130%',
  },
  eyeIcon: {
    position: 'absolute',
    top: '40%',
    right: '-110px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    fontSize: '18px',
  },
};

export default Login;
