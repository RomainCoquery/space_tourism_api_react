import Layout from '../components/Layout';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseURL, get } from '../../api';

const TechnologiesShow = () => {
  const [technology, setTechnology] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTechnology = async () => {
      try {
        const data = await get(`/api/technologies/${id}`);
        setTechnology(data);
      } catch (error) {
        console.error('Error fetching technologies:', error);
      }
    };

    fetchTechnology();
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
            <h2>{technology.en_name}</h2>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>Nom de la technologie :</strong> {technology.fr_name}
            </div>
            <div className="mb-3">
              <strong>Technology name :</strong> {technology.en_name}
            </div>
            <div className="mb-3">
              <strong>Description (français) :</strong> {technology.fr_description}
            </div>
            <div className="mb-3">
              <strong>Description (anglais) :</strong> {technology.en_description}
            </div>
            <div className="mb-3">
              <strong>Image :</strong><br />
              <img src={`${baseURL}/${technology.picture}`} alt={technology.en_name} style={{ maxWidth: '300px' }} />
            </div>

            <div className="btn-group" role="group" aria-label="Actions">
              <Link to={`/back/technologies/index`} className="btn btn-info btn-sm">Index</Link>
              <Link to={`/back/technologies/edit/${technology.id}`} className="btn btn-warning btn-sm">Éditer</Link>
              <Link to={`/back/technologies/delete/${technology.id}`} className="btn btn-danger btn-sm">Supprimer</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TechnologiesShow;