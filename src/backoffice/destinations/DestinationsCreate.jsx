import React, { useState } from 'react';
import Layout from '../components/Layout';
import { post } from '../../api';

const DestinationsCreate = () => {
    const [planet, setPlanet] = useState({
        en_name: '',
        fr_name: '',
        en_description: '',
        fr_description: '',
        distance: 0,
        distance_unit: '',
        duration: 0,
        en_duration_unit: '',
        fr_duration_unit: '',
        picture: null,
    });

    const [imageFile, setImageFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlanet({ ...planet, [name]: value });
    };

    const handleFileChange = (e) => {
        setPlanet({ ...planet, picture: e.target.files[0] });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('en_name', planet.en_name);
            formData.append('fr_name', planet.fr_name);
            formData.append('en_description', planet.en_description);
            formData.append('fr_description', planet.fr_description);
            formData.append('distance', planet.distance);
            formData.append('distance_unit', planet.distance_unit);
            formData.append('duration', planet.duration);
            formData.append('en_duration_unit', planet.en_duration_unit);
            formData.append('fr_duration_unit', planet.fr_duration_unit);
            formData.append('picture', planet.picture);

            await post(`/api/destinations`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setSuccessMessage('La planète a été ajoutée avec succès !');
            setErrorMessage('');
            setPlanet({
                en_name: '',
                fr_name: '',
                en_description: '',
                fr_description: '',
                distance: '',
                distance_unit: '',
                duration: '',
                en_duration_unit: '',
                fr_duration_unit: '',
                picture: null,
            });
        } catch (error) {
            setErrorMessage('Erreur lors de l\'ajout de la planète.');
            console.error('Erreur lors de l\'ajout de la planète:', error);
        }
    };

    return (
        <Layout>
            <div className="container mt-4 bg-light bg-gradient">
                <h1 className="mb-4">Ajouter une planète</h1>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="en_name" className="form-label">Nom de la planète (en anglais)</label>
                        <input type="text" className="form-control" id="en_name" name="en_name" value={planet.en_name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fr_name" className="form-label">Nom de la planète (en français)</label>
                        <input type="text" className="form-control" id="fr_name" name="fr_name" value={planet.fr_name} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="en_description" className="form-label">Description de la planète (en anglais)</label>
                        <textarea className="form-control" id="en_description" name="en_description" rows="3" value={planet.en_description} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fr_description" className="form-label">Description de la planète (en français)</label>
                        <textarea className="form-control" id="fr_description" name="fr_description" rows="3" value={planet.fr_description} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="distance" className="form-label">Distance</label>
                        <input type="number" className="form-control" id="distance" name="distance" value={planet.distance} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="distance_unit" className="form-label">Unité de distance</label>
                        <input type="text" className="form-control" id="distance_unit" name="distance_unit" value={planet.distance_unit} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Durée</label>
                        <input type="number" className="form-control" id="duration" name="duration" value={planet.duration} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="en_duration_unit" className="form-label">Unité de durée (en anglais)</label>
                        <input type="text" className="form-control" id="en_duration_unit" name="en_duration_unit" value={planet.en_duration_unit} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fr_duration_unit" className="form-label">Unité de durée (en français)</label>
                        <input type="text" className="form-control" id="fr_duration_unit" name="fr_duration_unit" value={planet.fr_duration_unit} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="picture" className="form-label">Image</label>
                        <input type="file" className="form-control" id="picture" name="picture" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Ajouter la planète</button>
                </form>
            </div>
        </Layout>
    );
};

export default DestinationsCreate;
