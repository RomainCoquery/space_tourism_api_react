import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Rediriger l'utilisateur vers la page d'accueil après la déconnexion réussie
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      // Gérer les erreurs de déconnexion
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default LogoutButton;
