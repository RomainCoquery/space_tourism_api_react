import React, { useState, useEffect } from 'react';
import { baseURL, get } from '../api';
import './Technology.css';
import { useLang } from '../context/LangContext';
import en from '../lang/en.json';
import fr from '../lang/fr.json';
import useNavigationClick from '../hooks/useNavigationClick';

const Technology = () => {
    const [lang, setLang] = useLang();
    const texts = lang === 'en' ? en : fr;
    const [technologies, setTechnologies] = useState([]);
    const [activeTechnology, setActiveTechnology] = useState(0);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const data = await get('/api/technologies');
                setTechnologies(data);
            } catch (error) {
                console.error('Error fetching technologies:', error);
            }
        };

        fetchTechnologies();
    }, []);

    useNavigationClick((nameResult) => {
        const technologyIndex = technologies.findIndex(technology => technology.en_name === nameResult);
        setActiveTechnology(technologyIndex !== -1 ? technologyIndex : 0);
    });

    document.body.className = 'technology';
    return (
        <>
            <h1 className="title5 technology_title"><strong>03</strong> {texts.technologyH1}</h1>
            <div className="technology_body main">
                <div className="navbar">
                    <nav className="nav_bar_technology navigation">
                        <ul className="nav_bar_technology_list">
                            {technologies.map((technology, index) => (
                                <li key={technology.id}><button className={`button navigation ${index === activeTechnology ? 'active' : 'hidden'}`} data-name={technology.en_name}>{technology.id}</button></li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="technology_content">
                    {technologies.map((technology, index) => (
                        <div key={technology.id} data-name={technology.en_name} className={`technology_description description ${index === activeTechnology ? 'active' : 'hidden'}`}>
                            <h2 className="navigation">{texts.terminology}</h2>
                            <h3 className="title3">{technology[`${lang}_name`]}</h3>
                            <p className="body">{technology[`${lang}_description`]}</p>
                        </div>
                    ))}
                </div>

                <div className="technology_picture picture">
                    {technologies.map((technology, index) => (
                        <img key={technology.id} data-name={technology.en_name} className={index === activeTechnology ? 'active' : 'hidden'} src={`${baseURL}/${technology.picture}`} alt={technology[`${lang}_name`]} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Technology;
