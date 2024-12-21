import React, { useState, useEffect } from 'react';
import logo from '../../../assets/logo/mercado-libre-logo.png';
import disneySubscribe from '../../../assets/images/disney_subscribe.webp';
import disneySubscribe2 from '../../../assets/images/disney_subscribe_2.png';
import './LoginNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCartShopping, faChevronDown, faSearch, faChevronRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Div, LogoutButton } from '../../components_index.js';
import { useSearchBar } from '../../../hooks/hooks_index.js';
import { useSearchContext } from "../../../Context/SearchContext.jsx";

const LoginNavbar = () => {
  const [toogle, setToogle] = useState(false);
  const [toogleCategorias, setToogleCategorias] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const { searchTerm, handleInputChange, handleSearch } = useSearchBar();
  const customerName = sessionStorage.getItem('customers-name');
  const truncatedName =
    customerName?.length > 10
      ? `${customerName.slice(0, 10)}...`
      : customerName || 'Sin nombre';
  const { clearSearch } = useSearchContext();

  const handleHomeClick = () => {
    clearSearch(); 
    navigate("/");
  };

  const handleToogle = () => {
    setToogle(!toogle);
  };

  const handleToogleCategorias = () => {
    setToogleCategorias(!toogleCategorias);
  };

  const handleHamburgerToggle = () => {
    setHamburgerMenuOpen(!hamburgerMenuOpen); 
  };

  const categoriasDisponibles = [
    "Electrónica, Audio y Video",
    "Hogar, Muebles y Jardín",
    "Ropa, Zapatos y Accesorios",
    "Deportes y Fitness",
    "Bebés",
    "Salud y Belleza",
    "Juguetes y Hobbies",
    "Automóviles, Motos y Otros Vehículos",
    "Libros, Revistas y Comics",
    "Alimentos y Bebidas",
    "Servicios",
    "Inmuebles",
    "Mascotas",
    "Industria y Oficinas",
    "Arte y Antigüedades"
  ];

  return (
    <header className='login-navbar'>
      <div className="upper-section">
        <Link to="/" onClick={handleHomeClick}>
          <img src={logo} alt="Mercado Libre Logo" className="logo" />
        </Link>

        <Div className="search-bar">
          <input type="text" placeholder="Buscar productos, marcas y más..." value={searchTerm}
            onChange={handleInputChange} />
          <button type="submit" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Div>

        <img src={disneySubscribe} alt="Disney Plus Subscribe" className="promo-banner" />
      </div>

      <nav className="lower-section">
        <div className="buttonContainer">
          <button className="menu-icon" onClick={handleHamburgerToggle}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          {hamburgerMenuOpen && (
            <div className="hamburger-toggle-box">
              <div className="trianguloForma-hamburger"></div>
              <ul>
                <li className='categorias-li' onClick={handleToogleCategorias}>
                  Categorías
                  <FontAwesomeIcon icon={faChevronDown} />
                </li>
                {toogleCategorias && (
                  <div className="dropdown-menu-categorias" onMouseEnter={() => setToogleCategorias(true)} onMouseLeave={() => setToogleCategorias(false)}>
                    <div className="trianguloForma-categorias"></div>
                    <ul>
                      {categoriasDisponibles.map((categoryName, index) => (
                        <li key={index} className="dropdown-category">
                          <Link to={`/category/${encodeURIComponent(categoryName.replace(/\s+/g, '-'))}`} className='link-category'>{categoryName}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <li>Ofertas</li>
                <li>Historial</li>
                <li><Link to="/AddProducts" className='link'>Vender</Link></li>
                <li>Ayuda</li>
              </ul>
            </div>
          )}

        </div>

        <ul className='menu' >
          <li className='categorias-li' onClick={handleToogleCategorias}>Categorías <FontAwesomeIcon icon={faChevronDown} /></li>
          {toogleCategorias && (
            <div className="dropdown-menu-categorias" onMouseEnter={() => setToogleCategorias(true)} onMouseLeave={() => setToogleCategorias(false)}>
              <div className="trianguloForma-categorias"></div>
              <ul>
                {categoriasDisponibles.map((categoryName, index) => (
                  <li key={index} className="dropdown-category">
                    <Link to={`/category/${encodeURIComponent(categoryName.replace(/\s+/g, '-'))}`} className='link-category'>{categoryName}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <li>Ofertas</li>
          <li>Historial</li>
          <li><Link to="/AddProducts" className='link'>Vender</Link></li>
          <li>Ayuda</li>
        </ul>

 
        <div className="right-container">
          <div className="profile-container" onClick={handleToogle}>
            <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
            <span>{truncatedName}<FontAwesomeIcon icon={faChevronDown} /></span>
            {toogle && (
              <div className="dropdown-menu" onMouseEnter={() => setToogle(true)} onMouseLeave={() => setToogle(false)}>
                <div className="trianguloFormaLogin"></div>
                <ul>
                  <li className='perfil-li'>
                    <Link className='link-perfil-upper'>
                      <Div className='perfil-container-upper'>
                        <FontAwesomeIcon icon={faUserCircle} />
                        <Div className='perfil-name-container'>
                          <h1>{customerName}</h1>
                          <span>Mi Perfil <FontAwesomeIcon icon={faChevronRight} /></span>
                        </Div>
                      </Div>
                    </Link>
                    <img src={disneySubscribe2} alt="disney plus" className='disney' />
                  </li>
                  <li><Link to="/purchases" className='link'>Mis Compras</Link></li>
                  <li><Link to="/ShowProductByUserId" className='link'>Mis Ventas</Link></li>
                  <li><Link to="/AddProducts" className='link'>Vender</Link></li>
                  <li className='logout-li'>
                    <LogoutButton className='logout'>
                      Salir
                    </LogoutButton>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <span><Link to="/purchases" className="link">Mis compras</Link></span>
          <span><FontAwesomeIcon icon={faCartShopping} /></span>
        </div>
      </nav>
    </header>
  );
};

export default LoginNavbar;
