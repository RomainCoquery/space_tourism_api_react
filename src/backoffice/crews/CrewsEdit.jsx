import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { get, post } from '../../api';

const CrewsEdit = () => {
    const { id } = useParams();
    const [crew, setCrew] = useState({
        name: '',
        en_description: '',
        fr_description: '',
        en_job: '',
        fr_job: '',
        picture: null,
    });

    const [imageFile, setImageFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchCrew = async () => {
            try {
                const data = await get(`/api/crews/${id}`);
                setCrew(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchCrew();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCrew({ ...crew, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', crew.name);
            formData.append('en_description', crew.en_description);
            formData.append('fr_description', crew.fr_description);
            formData.append('en_job', crew.en_job);
            formData.append('fr_job', crew.fr_job);
            formData.append('picture', imageFile);

            await post(`/api/crews/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setSuccessMessage('Le membre d\'équipage a été modifiée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du membre d\'équipage:', error);
        }
    };

    return (
        <Layout>
            <div className="container mt-4 bg-light bg-gradient">
            <h1 className="mb-4">Ajouter un membre d'équipage</h1>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom du membre d'équipage</label>
                        <input type="text" className="form-control" id="name" name="name" value={crew.name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="en_description" className="form-label">Description du membre d'équipage (en anglais)</label>
                        <textarea className="form-control" id="en_description" name="en_description" rows="3" value={crew.en_description} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fr_description" className="form-label">Description du membre d'équipage (en français)</label>
                        <textarea className="form-control" id="fr_description" name="fr_description" rows="3" value={crew.fr_description} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="en_job" className="form-label">Description du travail du membre d'équipage (en anglais)</label>
                        <textarea className="form-control" id="en_job" name="en_job" rows="3" value={crew.en_job} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fr_job" className="form-label">Description travail du du membre d'équipage (en français)</label>
                        <textarea className="form-control" id="fr_job" name="fr_job" rows="3" value={crew.fr_job} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="picture" className="form-label">Image</label>
                        <input type="file" className="form-control" id="picture" name="picture" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Modifier le membre d'équipage</button>
                </form>
                <a href="/back/crews/index">Revenir à l'index</a>
            </div>
        </Layout>
    );
};

export default CrewsEdit;
