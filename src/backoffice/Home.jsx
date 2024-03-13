import React from 'react';
import Layout from './components/Layout';
import LogoutButton from '../backoffice/components/LogoutButton';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div>
        <h1>Bienvenue dans le tableau de bord</h1>
        {/* Autres composants spécifiques au tableau de bord */}
        {user && (
          <div className="mb-4"><LogoutButton /></div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;