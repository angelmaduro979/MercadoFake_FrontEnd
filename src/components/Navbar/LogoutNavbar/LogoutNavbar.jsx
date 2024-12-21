import React, { useState } from 'react'
import logo from '../../../assets/logo/mercado-libre-logo.png';
import disneySubscribe from '../../../assets/images/disney_subscribe.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch, faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import './LogoutNavbar.css';
import { Link } from 'react-router-dom';
import { useSearchBar } from '../../../hooks/hooks_index.js';
import { useSearchContext } from "../../../Context/SearchContext.jsx";

const LogoutNavbar = () => {
  const [toogle, setToogle] = useState(false);
  const { searchTerm, handleInputChange, handleSearch } = useSearchBar()
  const { clearSearch } = useSearchContext();
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const handleToogle = () => {
    setToogle(!toogle);
  }

  const handleHomeClick = () => {
    clearSearch();
    navigate("/");
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
  ]
  return (
    <div>
      <header className='logout-navbar'>

        <div className="upper-section">
          <Link to="/"
            onClick={handleHomeClick}>
            <img src={logo} alt="Mercado Libre Logo" className="logo" /></Link>

          <div className="search-bar">
            <input type="text" placeholder="Buscar productos, marcas y más..." value={searchTerm}
              onChange={handleInputChange} />
            <button type="submit" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

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
                <li className='categorias-li' onClick={handleToogle}>
                  Categorías
                  <FontAwesomeIcon icon={faChevronDown} />
                </li>
                {toogle && (
                  <div className="dropdown-menu-categorias" onMouseEnter={() => setToogle(true)} onMouseLeave={() => setToogle(false)}>
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
          <ul className="menu-container" >

            <li className='link-profile-li' onClick={handleToogle} >Categorías <FontAwesomeIcon icon={faChevronDown} /></li>
            {toogle && (
              <div className="dropdown-menu" onMouseEnter={() => setToogle(true)} onMouseLeave={() => setToogle(false)}>
                <div className="trianguloForma"></div>
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
            <li><Link to="/AddProducts" className='link-profile'>Vender</Link></li>
            <li>Ayuda</li>

          </ul>

          
          <div className="ingresar-cuenta-container" >
            <span><Link to="/register" className='link-profile'>Crea tu cuenta</Link></span>
            <span><Link to="/login" className='link-profile'>Ingresá</Link></span>
            <span><Link to="/cart" className='link-profile'><FontAwesomeIcon icon={faCartShopping} /></Link></span>
          </div>
        </nav>


      </header>
    </div>
  )
}

export default LogoutNavbar
