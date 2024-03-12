import React, { createContext, useContext, useState } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [access_token, setAccessToken] = useState(localStorage.getItem('access_token') || null);
  const [headers, setHeaders] = useState(null);  

  const register = async (userData) => {
    try {
      const response = await api.post('/api/register', userData);
      setUser(response.data.data.user);
      setAccessToken(response.data.data.access_token);
      setHeaders(response.headers);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('access_token', response.data.data.access_token);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  };

  const login = async (userData) => {
    try {
      const response = await api.post('/api/login', userData);
      setUser(response.data.data.user);
      setAccessToken(response.data.data.access_token);
      setHeaders(response.headers);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('access_token', JSON.stringify(response.data.data.access_token));
    } catch (error) {
      console.error('Error logging in user:', error);
      throw new Error('Failed to login user');
    }
  };

  const logout = async () => {
    try {
      const response = await api.post('/api/logout', null, { headers });
      console.log('Logout response:', response);
      setUser(null);
      setAccessToken(null);
      setHeaders(null);
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('headers')
    } catch (error) {
      console.error('Error logging out user:', error);
      throw new Error('Failed to logout user');
    }
  };

  return (
    <AuthContext.Provider value={{ access_token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
