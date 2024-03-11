import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import './styles/global.css';
import Header from './components/Header';
import Home from './pages/Home';
import Destination from './pages/Destination';
import Crew from './pages/Crew';
import Technology from './pages/Technology';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import LogoutButton from './backoffice/components/LogoutButton'
import Dashboard from './backoffice/Home';
import DestinationIndex from './backoffice/destinations/DestinationsIndex';
import DestinationShow from './backoffice/destinations/DestinationsShow';
import DestinationsDelete from './backoffice/destinations/DestinationsDelete';
import DestinationsEdit from './backoffice/destinations/DestinationsEdit';
import DestinationsCreate from './backoffice/destinations/DestinationsCreate';


const App = () => {

  return (
    <LangProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/api/login" element={<AuthPage type="login" />} />
            <Route path="/api/register" element={<AuthPage type="register" />} />
            <Route path="api/logout" element={<LogoutButton />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/destinations/index" element={<DestinationIndex />} />
            <Route path="/destinations/show/:id" element={<DestinationShow />} />
            <Route path="/destinations/delete/:id" element={<DestinationsDelete />} />
            <Route path="/destinations/edit/:id" element={<DestinationsEdit />} />
            <Route path="/destinations/create" element={<DestinationsCreate />} />

          </Routes>
        </Router>
      </AuthProvider>
    </LangProvider>
  );
};

export default App;
