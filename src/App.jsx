import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import './styles/global.css';
import Header from './components/Header';
import Home from './pages/Home';
import Destination from './pages/Destination';
import Crew from './pages/Crew';
import Technology from './pages/Technology';

const App = () => {

  return (
    <LangProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/crews" element={<Crew />} />
          <Route path="/technologies" element={<Technology />} />
        </Routes>
      </Router>
    </LangProvider>
  );
};

export default App;
