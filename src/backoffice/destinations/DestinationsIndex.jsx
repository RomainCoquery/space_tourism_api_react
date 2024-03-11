import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../api';

const DestinationIndex = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const data = await get('/api/destinations');
        setPlanets(data);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <Layout>
      <div className="container mt-4 bg-dark">
        <h1 className="mb-4">Backoffice des destinations</h1>
        {/* Afficher le message de succès */}
        {sessionStorage.getItem('success') && (
          <div className="alert alert-success">{sessionStorage.getItem('success')}</div>
        )}

        {/* Formulaire pour l'ajout */}
        <div className="card mb-4 bg-secondary bg-gradient">
          <div className="card-body">
            <h2 className="card-title">Ajouter une planète</h2>
            <Link to="/destinations/create" className="btn btn-success btn-sm">Ajouter</Link>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">Liste des planètes</h2>
            {planets.map((planet, id) => (
              <div key={planet.id} className="list-group">
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Planète nom</div>
                  <div className="w-75">{planet.fr_name}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Planet name</div>
                  <div className="w-75">{planet.en_name}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Planète description</div>
                  <div className="w-75">{planet.fr_description}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Planet description</div>
                  <div className="w-75">{planet.en_description}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Distance</div>
                  <div className="w-75">{planet.distance}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Mesure distance</div>
                  <div className="w-75">{planet.distance_unit}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Durée</div>
                  <div className="w-75">{planet.duration}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Unité de durée</div>
                  <div className="w-75">{planet.fr_duration_unit}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Duration unit</div>
                  <div className="w-75">{planet.en_duration_unit}</div>
                </div>
                <div className="list-group-item border border-1 d-flex">
                  <div className="w-25">Image</div>
                  <div className="w-75">{planet.picture}</div>
                </div>

                <div className="btn-group" role="group" aria-label="Actions">
                  <Link to={`/destinations/show/${planet.id}`} className="btn btn-info btn-sm">Voir</Link>
                  <Link to={`/destinations/edit/${planet.id}`} className="btn btn-warning btn-sm">Éditer</Link>
                  <Link to={`/destinations/delete/${planet.id}`} className="btn btn-danger btn-sm">Supprimer</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DestinationIndex;