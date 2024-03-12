import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import LogoutButton from '../backoffice/components/LogoutButton';

const AuthPage = ({ type }) => {
  const { register, login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'register') {
        await register(formData);
        window.location.href= '/back/dashboard';
      } else if (type === 'login') {
        await login(formData);
        window.location.href= '/back/dashboard';
      }
    } catch (error) {
      console.error('Error:', error);
      // Gérer les erreurs d'inscription ou de connexion
    }
  };

  return (
    <div>
      {type === 'logout' ? (
        <LogoutButton />
      ) : (
        <>
          <h2>{type === 'register' ? 'Inscription' : 'Connexion'}</h2>
          <form onSubmit={handleSubmit}>
            {type === 'register' && (
              <div>
                <label>Nom:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
            )}
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label>Mot de passe:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">{type === 'register' ? "S'inscrire" : 'Se connecter'}</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AuthPage;
