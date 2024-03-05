import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './Header.css';
import logo from '../img/logo.svg';
import decoration from '../img/decoration.png';
import flagUsa from '../img/flag-usa.jpg';
import flagFrance from '../img/flag-france.jpg';
import en from '../lang/en.json';
import fr from '../lang/fr.json';
import useHamburgerClick from '../hooks/useHamburgerClick';

const Header = () => {
  const location = useLocation();
  const activeLink = location.pathname;
  const [lang, setLang] = useLang();
  const texts = lang === 'en' ? en : fr;
  const isOpen = useHamburgerClick();

  const handleChangeLang = (newLang) => {
    setLang(newLang);
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo de space tourism" />
      </div>

      <div className="line">
        <img src={decoration} alt="Decoration" />
      </div>

      <div id="hamburger" className={isOpen ? 'open' : ''}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav id="menu" className={`nav_top navigation ${isOpen ? 'overlay' : ''}`}>
        <div className="language-selector">
          <button onClick={() => handleChangeLang('en')}>
            <img src={flagUsa} alt="English" />
          </button>
          <button onClick={() => handleChangeLang('fr')}>
            <img src={flagFrance} alt="Français" />
          </button>
        </div>

        <ul className="nav_top_list navigation">
          <li>
            <Link to="/" className={`navigation ${activeLink === '/' ? 'active' : ''}`}>
              <strong>00</strong> {texts.home}
            </Link>
          </li>
          <li>
            <Link to="/destinations" className={`navigation ${activeLink === '/destinations' ? 'active' : ''}`}>
              <strong>01</strong> {texts.destination}
            </Link>
          </li>
          <li>
            <Link to="/crews" className={`navigation ${activeLink === '/crews' ? 'active' : ''}`}>
              <strong>02</strong> {texts.crew}
            </Link>
          </li>
          <li>
            <Link to="/technologies" className={`navigation ${activeLink === '/technologies' ? 'active' : ''}`}>
              <strong>03</strong> {texts.technology}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;