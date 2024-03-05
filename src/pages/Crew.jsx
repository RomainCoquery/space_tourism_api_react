import React, { useState, useEffect } from 'react';
import { baseURL, get } from '../api';
import './Crew.css';
import { useLang } from '../context/LangContext';
import en from '../lang/en.json';
import fr from '../lang/fr.json';
import useNavigationClick from '../hooks/useNavigationClick';

const Crew = () => {
    const [lang, setLang] = useLang();
    const texts = lang === 'en' ? en : fr;
    const [crews, setCrews] = useState([]);
    const [activeCrew, setActiveCrew] = useState(0);
    useEffect(() => {
        const fetchCrews = async () => {
            try {
                const data = await get('/api/crews');
                setCrews(data);
            } catch (error) {
                console.error('Error fetching crews:', error);
            }
        };

        fetchCrews();
    }, []);

    useNavigationClick((nameResult) => {
        const crewIndex = crews.findIndex(crew => crew.name === nameResult);
        setActiveCrew(crewIndex !== -1 ? crewIndex : 0);
    });

    document.body.className = 'crew';
    return (
        <div className="crew_body main">
            <div className="crew_body main">
                <div className="crew_content">
                    <h1 className="title5 crew_title"><strong>02</strong> {texts.crewH1}</h1>
                    {crews.map((crew, index) => (
                        <div key={crew.id} data-name={crew.name} className={`crew_description description ${index === activeCrew ? 'active' : 'hidden'}`}>
                            <h2 className="title4">{crew[`${lang}_job`]}</h2>
                            <h3 className="title3">{crew.name}</h3>
                            <p className="body">{crew[`${lang}_description`]}</p>
                        </div>
                    ))}

                    <div className="navbar">
                        <nav className="nav_bar_crew navigation">
                            <ul className="nav_bar_crew_list">
                                {crews.map((crew, index) => (
                                    <li key={crew.id}><button className={`button navigation ${index === activeCrew ? 'active' : 'hidden'}`} data-name={crew.name}>&bull;</button></li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="crew_picture picture">
                    {crews.map((crew, index) => (
                        <img key={crew.id} data-name={crew.name} className={index === activeCrew ? 'active' : 'hidden'} src={`${baseURL}/${crew.picture}`} alt={crew.name} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Crew;