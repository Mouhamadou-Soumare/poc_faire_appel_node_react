import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthForm: React.FC<{ isRegister?: boolean }> = ({ isRegister = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    adresse: '',
    email: '',
    telephone: '',
    categorieCours: '',
    niveau: '',
    categorieAge: '',
    role: 'adherent'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isRegister ? `${baseUrl}/auth/register` : `${baseUrl}/auth/login`;
    try {
      const response = await axios.post(url, formData);
      Cookies.set('auth_token', response.data.token);
      console.log(isRegister ? 'Inscription réussi:' : 'Authentification réussi:', response.data);
      if (isRegister) {
        navigate('/payment');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error(isRegister ? ':' : 'Authentication échoué:', error.response?.data || error.message);
      setError(error.response?.data?.message || (isRegister ? 'Inscription échoué' : 'Authentification échoué'));
    }
  };
  return (
    <>
      <div className="bg-white flex flex-column h-screen pb-0">
        <div className="mx-auto max-w-7xl px-24 lg:px-44 flex-sportsync items-center content-center">
          <h2 className="text-4xl text-center pb-12">{isRegister ? 'Inscription' : 'Identification'}</h2>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Identifiant
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block bg-slate-300 pt-3 pb-3 px-3 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {isRegister && (
              <>
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nom
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prenom"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Prénom
                  </label>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateNaissance"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date de Naissance
                  </label>
                  <input
                    id="dateNaissance"
                    name="dateNaissance"
                    type="date"
                    required
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="adresse"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Adresse
                  </label>
                  <input
                    id="adresse"
                    name="adresse"
                    type="text"
                    required
                    value={formData.adresse}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Téléphone
                  </label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="text"
                    required
                    value={formData.telephone}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="categorieCours"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Catégorie de Cours
                  </label>
                  <input
                    id="categorieCours"
                    name="categorieCours"
                    type="text"
                    required
                    value={formData.categorieCours}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="niveau"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Niveau
                  </label>
                  <input
                    id="niveau"
                    name="niveau"
                    type="text"
                    required
                    value={formData.niveau}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="categorieAge"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Catégorie d'Âge
                  </label>
                  <input
                    id="categorieAge"
                    name="categorieAge"
                    type="text"
                    required
                    value={formData.categorieAge}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Rôle
                  </label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full bg-slate-300 pt-3 pb-3 px-3 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isRegister ? 'S\'inscrire' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>

        <div className="authenticator-cards-container flex-sportsync">
          <div className="column">
            <div className="card">
              <img src="https://i.ibb.co/CvWKRfy/couple-ballet-vue-face.webp" alt="" />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="https://i.ibb.co/VTWDjpW/cool-hip-hop-man.webp"
                alt=""
              />
            </div>

            <div className="card">
              <img
                src="https://i.ibb.co/Gx7xr01/blonde-jeune-femme-danse-dans-studio-danse.webp"
                alt=""
              />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="https://i.ibb.co/S36Tdyz/couple-dansant-dans-salle-bal-homme-robe-rouge.webp"
                alt=""
              />
            </div>
            <div className="card">
              <img
                src="https://i.ibb.co/99fVz77/femme-heureuse-casque-sautant-air.webp" alt="cool-hip-hop-man"
              />
            </div>
            <div className="card">
              <img
                src="https://i.ibb.co/z2bspZF/front-view-dancers-couple-performance.webp"
                alt=""
              />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="https://i.ibb.co/wKV6Ks9/full-shot-latin-amateurs-dancing-salsa.webp"
                alt=""
              />
            </div>
            <div className="card">
              <img
                src="https://i.ibb.co/drYnVk3/full-shot-professional-plus-size-dancer-training.webp"
                alt=""
              />
            </div>
            <div className="card">
              <img
                src="https://i.ibb.co/j6kwgry/gens-qui-s-entrainent-tenues-annees-80.webp"
                alt=""
              />
            </div>
            <div className="card">
              <img
                src="https://i.ibb.co/pjsyqD0/heureuse-jeune-femme-sautant.webp"
                alt=""
              />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img
                src="https://i.ibb.co/3CxYWCY/jeune-couple-amoureux-danse-danse-sociale-kizomba-bachata-fond-blanc-espace-copie.webp"
                alt=""
              />
            </div>
            <div className="card">
              <img
                src="https://i.ibb.co/994p8Hr/jeune-femme-ancienne-danse-isolee-vert.webp"
                alt=""
              />
            </div>
            <div className="card">
              <img
                src="https://i.ibb.co/1LtGm11/man-woman-dancing-argentinian-tango.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthForm;
