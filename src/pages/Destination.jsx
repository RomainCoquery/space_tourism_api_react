import React, { useState, useEffect } from 'react';
import { get } from '../api';
import './Destination.css';
import decoration from '../img/decoration.png';
import { useLang } from '../context/LangContext';
import en from '../lang/en.json';
import fr from '../lang/fr.json';


const Destination = () => {
    const [lang, setLang] = useLang();
    const texts = lang === 'en' ? en : fr;

    document.body.className = 'destination';
    return (
        <div className="page_body">
            <h1 className="title5 page_title"><strong>01</strong>{texts.destinationH1}</h1>

            <div className="planet_body main">
                <div className="planet_picture picture">
                    {planets.map((planet, index) => (
                        <img key={index} data-name={planet.name} className={index === 0 ? 'active' : 'hidden'} src={planet.picture} alt={planet.name} />
                    ))};
                </div>

                <div className="planet_content">
                    <div className="navbar">
                        <nav className="nav_bar_planet navigation">
                            <ul className="nav_bar_planet_list">
                                {planets.map((planet, index) => (
                                    <li key={index}><button className={`button navigation ${index === 0 ? 'active' : 'hidden'}`} data-name={planet.name}>{planet.name}</button></li>
                                ))};
                            </ul>
                        </nav>
                    </div>

                    {planets.map((planet, index) => (
                        <div key={index} data-name={planet.name} className={`planet_description description ${index === 0 ? 'active' : 'hidden'}`}>
                            <h2 className="title2">{planet.name}</h2>
                            <p className="body">{planet.description}</p>
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
                                        <li className="subtitle1">{planet.duration} {planet.duration_unit}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))};
                </div>
            </div>
        </div>
    );
}

export default Destination;