import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseURL, get } from '../../api';

const DestinationShow = () => {
  const [planet, setPlanet] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const data = await get(`/api/destinations/${id}`);
        setPlanet(data);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanet();
  },);

  return (
    <Layout>
      <div className="container mt-4">
        {/* Afficher le message de succès */}
        {sessionStorage.getItem('success') && (
          <div className="alert alert-success">{sessionStorage.getItem('success')}</div>
        )}

        <div className="card">
          <div className="card-header">
            <h2>{planet.en_name}</h2>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>Nom de la planète :</strong> {planet.fr_name}
            </div>
            <div className="mb-3">
              <strong>Planet name :</strong> {planet.en_name}
            </div>
            <div className="mb-3">
              <strong>Description (français) :</strong> {planet.fr_description}
            </div>
            <div className="mb-3">
              <strong>Description (anglais) :</strong> {planet.en_description}
            </div>
            <div className="mb-3">
              <strong>Distance :</strong> {planet.distance}
            </div>
            <div className="mb-3">
              <strong>Durée :</strong> {planet.duration}
              <p className="d-inline"> (Anglais : {planet.en_duration_unit})</p>
              <p className="d-inline"> (Français : {planet.fr_duration_unit})</p>
            </div>
            <div className="mb-3">
              <strong>Image :</strong><br />
              <img src={`${baseURL}/${planet.picture}`} alt={planet.name} style={{ maxWidth: '300px' }} />
            </div>

            <div className="btn-group" role="group" aria-label="Actions">
              <Link to={`/back/destinations/index`} className="btn btn-info btn-sm">Index</Link>
              <Link to={`/back/destinations/edit/${planet.id}`} className="btn btn-warning btn-sm">Éditer</Link>
              <Link to={`/back/destinations/delete/${planet.id}`} className="btn btn-danger btn-sm">Supprimer</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DestinationShow;