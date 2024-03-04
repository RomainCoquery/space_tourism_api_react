import React, { useState, useEffect } from 'react';
import { baseURL, get } from '../api';
import './Destination.css';
import decoration from '../img/decoration.png';
import { useLang } from '../context/LangContext';
import en from '../lang/en.json';
import fr from '../lang/fr.json';
import useNavigationClick from '../hooks/useNavigationClick'; // Import du hook

const Destination = () => {
    const [lang, setLang] = useLang();
    const texts = lang === 'en' ? en : fr;
    const [planets, setPlanets] = useState([]);
    const [activePlanet, setActivePlanet] = useState(0); // État pour suivre l'indice de la planète active

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const data = await get('/api/destinations');
                setPlanets(data);
            } catch (error) {
                console.error('Error fetching planets:', error);
            }
        };

        fetchPlanets();
    }, []);

    // Utilisation du hook useNavigationClick
    useNavigationClick((nameResult) => {
        const planetIndex = planets.findIndex(planet => planet.en_name === nameResult);
        setActivePlanet(planetIndex !== -1 ? planetIndex : 0);
    });

    document.body.className = 'destination';
    return (
        <div className="page_body">
            <h1 className="title5 page_title"><strong>01</strong> {texts.destinationH1}</h1>

            <div className="planet_body main">
                <div className="planet_picture picture">
                    {planets.map((planet, index) => (
                        <img key={planet.id} data-name={planet.en_name} className={index === activePlanet ? 'active' : 'hidden'} src={`${baseURL}/${planet.picture}`} alt={planet[`${lang}_name`]} />
                    ))}
                </div>

                <div className="planet_content">
                    <div className="navbar">
                        <nav className="nav_bar_planet navigation">
                            <ul className="nav_bar_planet_list">
                                {planets.map((planet, index) => (
                                    <li key={planet.id}><button className={`button navigation ${index === activePlanet ? 'active' : 'hidden'}`} data-name={planet.en_name}>{planet[`${lang}_name`]}</button></li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {planets.map((planet, index) => (
                        <div key={planet.id} data-name={planet.en_name} className={`planet_description description ${index === activePlanet ? 'active' : 'hidden'}`}>
                            <h2 className="title2">{planet[`${lang}_name`]}</h2>
                            <p className="body">{planet[`${lang}_description`]}</p>
                            <div className="line_planet">
                                <img src={decoration} alt="Decoration" />
                            </div>
                            <div className="planet_travel">
                                <div className="planet_distance">
                                    <ul>
                                        <li className="subtitle2">Distance</li>
                                        <li></li>
                                        <li className="subtitle1">{planet.distance} {planet.distance_unit}</li>
                                    </ul>
                                </div>
                                <div className="planet_duration">
                                    <ul>
                                        <li className="subtitle2">{texts.duration}</li>
                                        <li></li>
                                        <li className="subtitle1">{planet.duration} {planet[`${lang}_duration_unit`]}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Destination;
