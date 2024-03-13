import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/global.css';
import Header from './components/Header';
import Home from './pages/Home';
import Destination from './pages/Destination';
import Crew from './pages/Crew';
import Technology from './pages/Technology';
import AuthPage from './pages/AuthPage';
import LogoutButton from './backoffice/components/LogoutButton'
import Dashboard from './backoffice/Home';
import DestinationsIndex from './backoffice/destinations/DestinationsIndex';
import DestinationsCreate from './backoffice/destinations/DestinationsCreate';
import DestinationsShow from './backoffice/destinations/DestinationsShow';
import DestinationsEdit from './backoffice/destinations/DestinationsEdit';
import DestinationsDelete from './backoffice/destinations/DestinationsDelete';
import CrewsIndex from './backoffice/crews/CrewsIndex';
import CrewsCreate from './backoffice/crews/CrewsCreate';
import CrewsShow from './backoffice/crews/CrewsShow';
import CrewsEdit from './backoffice/crews/CrewsEdit';
import CrewsDelete from './backoffice/crews/CrewsDelete';
import TechnologiesIndex from './backoffice/technologies/TechnologiesIndex';
import TechnologiesCreate from './backoffice/technologies/TechnologiesCreate';
import TechnologiesShow from './backoffice/technologies/TechnologiesShow';
import TechnologiesEdit from './backoffice/technologies/TechnologiesEdit';
import TechnologiesDelete from './backoffice/technologies/TechnologiesDelete';

const PublicRoutes = () => (
  <AuthProvider>
    <LangProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/api/login" element={<AuthPage type="login" />} />
        <Route path="/api/register" element={<AuthPage type="register" />} />
      </Routes>
    </LangProvider>
  </AuthProvider>
);

const PrivateRoutes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Si l'authentification est toujours en cours, affichez une indication de chargement
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
  if (!user) {
    navigate('/');
    return null;
  }
  
  return (
    <Routes>
      <Route path="api/logout" element={<LogoutButton />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/destinations/index" element={<DestinationsIndex />} />
      <Route path="/destinations/create" element={<DestinationsCreate />} />
      <Route path="/destinations/show/:id" element={<DestinationsShow />} />
      <Route path="/destinations/edit/:id" element={<DestinationsEdit />} />
      <Route path="/destinations/delete/:id" element={<DestinationsDelete />} />
      <Route path="/crews/index" element={<CrewsIndex />} />
      <Route path="/crews/create" element={<CrewsCreate />} />
      <Route path="/crews/show/:id" element={<CrewsShow />} />
      <Route path="/crews/edit/:id" element={<CrewsEdit />} />
      <Route path="/crews/delete/:id" element={<CrewsDelete />} />
      <Route path="/technologies/index" element={<TechnologiesIndex />} />
      <Route path="/technologies/create" element={<TechnologiesCreate />} />
      <Route path="/technologies/show/:id" element={<TechnologiesShow />} />
      <Route path="/technologies/edit/:id" element={<TechnologiesEdit />} />
      <Route path="/technologies/delete/:id" element={<TechnologiesDelete />} />
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
};

// App principal
const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="back/*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;