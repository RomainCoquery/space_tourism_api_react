import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { remove } from '../../api';

const ConfirmationDeleteTechnology = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await remove(`/api/technologies/${id}`);
      // Rediriger l'utilisateur vers la page d'index après la suppression réussie
      navigate('/back/technologies/index');
    } catch (error) {
      console.error('Error deleting technology:', error);
      // Gérer les erreurs de suppression
    }
  };

  return (
    <Layout>
      <div className="container mt-4 bg-light bg-gradient">
        <h1 className="mb-4">Confirmation de suppression de la technologie</h1>
        <p>Êtes-vous sûr de vouloir supprimer la technologie ?</p>
        <form
          className="card mb-4 bg-danger"
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          <button className="bg-danger" type="submit">Confirmer la suppression</button>
        </form>
        <a href="/back/technologies/index">Revenir à l'index</a>
      </div>
    </Layout>
  );
};

export default ConfirmationDeleteTechnology;
