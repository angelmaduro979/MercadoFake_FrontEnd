import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <ul className="footer-links">
          <li><Link to="/home">Términos y condiciones</Link></li>
          <li><Link to="/home">Política de privacidad</Link></li>
          <li><Link to="/home">Ayuda</Link></li>
          <li><Link to="/home">Acerca de nosotros</Link></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p className="footer-author">
          © {new Date().getFullYear()} MercadoFake. Todos los derechos reservados.
        </p>
        <p className="footer-links-social">
          <a href="https://www.linkedin.com/in/angel-maduro-dev/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            🔗 LinkedIn
          </a>
          {' | '}
          <a href="https://github.com/angelmaduro979" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            🚀 GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
