import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseURL, get } from '../../api';

const CrewsShow = () => {
  const [crew, setCrew] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchCrew = async () => {
      try {
        const data = await get(`/api/crews/${id}`);
        setCrew(data);
      } catch (error) {
        console.error('Error fetching crews:', error);
      }
    };

    fetchCrew();
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
            <h2>{crew.name}</h2>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>Nom du membre d'équipage :</strong> {crew.name}
            </div>
            <div className="mb-3">
              <strong>Description (français) :</strong> {crew.fr_description}
            </div>
            <div className="mb-3">
              <strong>Description (anglais) :</strong> {crew.en_description}
            </div>
            <div className="mb-3">
              <strong>Emploi (français) :</strong> {crew.fr_job}
            </div>
            <div className="mb-3">
              <strong>Emploi (anglais) :</strong> {crew.en_job}
            </div>
            <div className="mb-3">
              <strong>Image :</strong><br />
              <img src={`${baseURL}/${crew.picture}`} alt={crew.name} style={{ maxWidth: '300px' }} />
            </div>

            <div className="btn-group" role="group" aria-label="Actions">
              <Link to={`/back/crews/index`} className="btn btn-info btn-sm">Index</Link>
              <Link to={`/back/crews/edit/${crew.id}`} className="btn btn-warning btn-sm">Éditer</Link>
              <Link to={`/back/crews/delete/${crew.id}`} className="btn btn-danger btn-sm">Supprimer</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrewsShow;