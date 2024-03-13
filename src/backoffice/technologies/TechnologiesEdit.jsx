import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { get, post } from '../../api';

const TechnologiesEdit = () => {
    const { id } = useParams();
    const [technology, setTechnology] = useState({
        en_name: '',
        fr_name: '',
        en_description: '',
        fr_description: '',
        picture: null,
    });

    const [imageFile, setImageFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchTechnology = async () => {
            try {
                const data = await get(`/api/technologies/${id}`);
                setTechnology(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchTechnology();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTechnology({ ...technology, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('en_name', technology.en_name);
            formData.append('fr_name', technology.fr_name);
            formData.append('en_description', technology.en_description);
            formData.append('fr_description', technology.fr_description);
            formData.append('picture', imageFile);

            await post(`/api/technologies/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setSuccessMessage('La technologie a été modifiée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la technologie:', error);
        }
    };

    return (
        <Layout>
            <div className="container mt-4 bg-light bg-gradient">
                <h1 className="mb-4">Modifier la technologie {technology.fr_name}</h1>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="en_name" className="form-label">Nom de la technologie (en anglais)</label>
                        <input type="text" className="form-control" id="en_name" name="en_name" value={technology.en_name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fr_name" className="form-label">Nom de la technologie (en français)</label>
                        <input type="text" className="form-control" id="fr_name" name="fr_name" value={technology.fr_name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="en_description" className="form-label">Description de la technologie (en anglais)</label>
                        <textarea className="form-control" id="en_description" name="en_description" rows="3" value={technology.en_description} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fr_description" className="form-label">Description de la technologie (en français)</label>
                        <textarea className="form-control" id="fr_description" name="fr_description" rows="3" value={technology.fr_description} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="picture" className="form-label">Image</label>
                        <input type="file" className="form-control" id="picture" name="picture" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Modifier la technologie</button>
                </form>
                <a href="/back/technologies/index">Revenir à l'index</a>
            </div>
        </Layout>
    );
};

export default TechnologiesEdit;
