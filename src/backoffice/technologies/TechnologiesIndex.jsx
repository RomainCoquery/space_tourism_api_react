import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../api';

const TechnologiesIndex = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await get('/api/technologies');
        setTechnologies(data);
      } catch (error) {
        console.error('Error fetching technologies:', error);
      }
    };

    fetchTechnologies();
  }, []);

  return (
    <Layout>
      <div className="container mt-4 bg-dark">
        <h1 className="mb-4">Backoffice des technologies</h1>
        {/* Afficher le message de succès */}
        {sessionStorage.getItem('success') && (
          <div className="alert alert-success">{sessionStorage.getItem('success')}</div>
        )}

        {/* Formulaire pour l'ajout */}
        <div className="card mb-4 bg-secondary bg-gradient">
          <div className="card-body">
            <h2 className="card-title">Ajouter une technologie</h2>
            <Link to="/back/technologies/create" className="btn btn-success btn-sm">Ajouter</Link>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Liste des technologies</h2>
            {technologies.map((technology, id) => (
              <div key={technology.id} className="list-group">
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Technologie nom</div>
                  <div className="w-75">{technology.fr_name}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Technology name</div>
                  <div className="w-75">{technology.en_name}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Technologie description</div>
                  <div className="w-75">{technology.fr_description}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Technology description</div>
                  <div className="w-75">{technology.en_description}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Image</div>
                  <div className="w-75">{technology.picture}</div>
                </div>

                <div className="btn-group" role="group" aria-label="Actions">
                  <Link to={`/back/technologies/show/${technology.id}`} className="btn btn-info btn-sm">Voir</Link>
                  <Link to={`/back/technologies/edit/${technology.id}`} className="btn btn-warning btn-sm">Éditer</Link>
                  <Link to={`/back/technologies/delete/${technology.id}`} className="btn btn-danger btn-sm">Supprimer</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TechnologiesIndex;