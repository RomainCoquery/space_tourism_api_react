import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../api';

const CrewsIndex = () => {
  const [crews, setCrews] = useState([]);

  useEffect(() => {
    const fetchCrews = async () => {
      try {
        const data = await get('/api/crews');
        setCrews(data);
      } catch (error) {
        console.error('Error fetching crews:', error);
      }
    };

    fetchCrews();
  }, []);

  return (
    <Layout>
      <div className="container mt-4 bg-dark">
        <h1 className="mb-4">Backoffice des membres d'équipage</h1>
        {/* Afficher le message de succès */}
        {sessionStorage.getItem('success') && (
          <div className="alert alert-success">{sessionStorage.getItem('success')}</div>
        )}

        {/* Formulaire pour l'ajout */}
        <div className="card mb-4 bg-secondary bg-gradient">
          <div className="card-body">
            <h2 className="card-title">Ajouter un membre d'équipage</h2>
            <Link to="/back/crews/create" className="btn btn-success btn-sm">Ajouter</Link>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Liste des membres d'équipage</h2>
            {crews.map((crew, id) => (
              <div key={crew.id} className="list-group">
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Nom du membre d'équipage</div>
                  <div className="w-75">{crew.name}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Membre d'équipage description</div>
                  <div className="w-75">{crew.fr_description}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Membre d'équipage description</div>
                  <div className="w-75">{crew.en_description}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Membre d'équipage job</div>
                  <div className="w-75">{crew.fr_job}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Membre d'équipage job</div>
                  <div className="w-75">{crew.en_job}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Image</div>
                  <div className="w-75">{crew.picture}</div>
                </div>

                <div className="btn-group" role="group" aria-label="Actions">
                  <Link to={`/back/crews/show/${crew.id}`} className="btn btn-info btn-sm">Voir</Link>
                  <Link to={`/back/crews/edit/${crew.id}`} className="btn btn-warning btn-sm">Éditer</Link>
                  <Link to={`/back/crews/delete/${crew.id}`} className="btn btn-danger btn-sm">Supprimer</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrewsIndex;