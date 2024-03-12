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
import DestinationIndex from './backoffice/destinations/DestinationsIndex';
import DestinationShow from './backoffice/destinations/DestinationsShow';
import DestinationsDelete from './backoffice/destinations/DestinationsDelete';
import DestinationsEdit from './backoffice/destinations/DestinationsEdit';
import DestinationsCreate from './backoffice/destinations/DestinationsCreate';


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
      <Route path="/destinations/index" element={<DestinationIndex />} />
      <Route path="/destinations/show/:id" element={<DestinationShow />} />
      <Route path="/destinations/delete/:id" element={<DestinationsDelete />} />
      <Route path="/destinations/edit/:id" element={<DestinationsEdit />} />
      <Route path="/destinations/create" element={<DestinationsCreate />} />
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