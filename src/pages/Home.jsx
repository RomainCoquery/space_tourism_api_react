import React from 'react';
import './Home.css';
import { useLang } from '../context/LangContext';
import en from '../lang/en.json';
import fr from '../lang/fr.json';

const Home = () => {
    const [lang, setLang] = useLang();
    const texts = lang === 'en' ? en : fr;

    document.body.className = 'home';
    return (
        <div className="page_body">
            <div className="home_body_text">
                <h1 className="title5">{texts.homeH1}</h1>
                <h2 className="title1">{texts.homeH2}</h2>
                <p className="body">{texts.homeBody}</p>
            </div>

            <div className="home_body_button circle">
                <a href="/destination">{texts.homeButton}</a>
            </div>
        </div>
    );
}

export default Home;