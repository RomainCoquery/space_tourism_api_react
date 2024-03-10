import axios from 'axios';
import { useAuth } from './context/AuthContext';

// Configuration de l'URL de base
const baseURL = 'http://localhost:8000';

// Configuration d'Axios avec l'URL de base et les en-têtes
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction pour vérifier si le token d'accès est expiré
const isAccessTokenExpired = () => {
  const expiresAt = localStorage.getItem('expiresAt');
  return expiresAt ? new Date(expiresAt) < new Date() : true;
};

// Intercepteur Axios pour gérer automatiquement la déconnexion lorsque le token d'accès expire
axios.interceptors.request.use(async (config) => {
  const { logout } = useAuth();

  // Vérifiez si le token d'accès est expiré
  if (isAccessTokenExpired()) {
    // Déconnectez l'utilisateur
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout user:', error);
      throw new Error('Failed to logout user');
    }
  }

  return config;
}, (error) => {
  // Gérer les erreurs de requête
  return Promise.reject(error);
});

// Intercepteur pour ajouter le jeton d'authentification à chaque requête sortante
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const cleanedToken = JSON.parse(token).token;
      config.headers.Authorization = `Bearer ${cleanedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

// Fonction utilitaire pour gérer les erreurs de réponse
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

// Fonction pour envoyer une requête POST
export const post = async (url, data) => {
  try {
    const response = await api.post(baseURL + url, data); // Concaténer le baseURL avec l'URL relative
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error('Une erreur est survenue lors de l\'envoi des données');
  }
};

// Fonction pour envoyer une requête PUT
export const put = async (url, data) => {
  try {
    const response = await api.put(baseURL + url, data); // Concaténer le baseURL avec l'URL relative
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error('Une erreur est survenue lors de la mise à jour des données');
  }
};

// Fonction pour envoyer une requête DELETE
export const remove = async (url) => {
  try {
    const response = await api.delete(baseURL + url);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error('Une erreur est survenue lors de la suppression des données');
  }
};


export { baseURL };

export default api;
