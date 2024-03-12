import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { remove } from '../../api';

const ConfirmationDeletePlanet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await remove(`/api/destinations/${id}`);
      // Rediriger l'utilisateur vers la page d'index après la suppression réussie
      navigate('/destinations/index');
    } catch (error) {
      console.error('Error deleting planet:', error);
      // Gérer les erreurs de suppression
    }
  };

  return (
    <Layout>
      <div className="container mt-4 bg-light bg-gradient">
        <h1 className="mb-4">Confirmation de suppression de la planète</h1>
        <p>Êtes-vous sûr de vouloir supprimer la planète ?</p>
        <form
          className="card mb-4 bg-danger"
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          <button className="bg-danger" type="submit">Confirmer la suppression</button>
        </form>
        <a href="/back/destinations/index">Revenir à l'index</a>
      </div>
    </Layout>
  );
};

export default ConfirmationDeletePlanet;
