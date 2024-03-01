import axios from 'axios';

let baseURL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction utilitaire pour gérer les erreurs
const handleError = (error) => {
  if (error.response) {
    // La requête a été faite et le serveur a répondu avec un code d'erreur
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // La requête a été faite mais pas de réponse reçue
    console.error('Request:', error.request);
  } else {
    // Une erreur s'est produite lors de la configuration de la requête
    console.error('Error:', error.message);
  }
  console.error('Config:', error.config);
};

// Fonction pour envoyer une requête GET
export const get = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error('Une erreur est survenue lors de la récupération des données');
  }
};

export default api;
