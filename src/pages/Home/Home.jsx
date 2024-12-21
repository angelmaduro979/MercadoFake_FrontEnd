import React from 'react';
import '../../styles/global.css';
import './Home.css';
import { useProducts } from '../../hooks/hooks_index.js';
import { Div, Footer, ProductCard, Loader, Error, Prefooter, LoginNavbar, LogoutNavbar, Slider, Main } from '../../components/components_index.js';
import { Link } from 'react-router-dom';
import Banner1 from '../../assets/images/BannerMarketing1.webp';
import LogoMercadoPlay from "../../assets/images/logo-mercado-play-v3.png"



const Home = () => {
  const { products_state, products_loading_state, products_error_state } = useProducts();
  console.log('products_state:', JSON.stringify(products_state, null, 2));
  const accesToken = sessionStorage.getItem('accesToken');


  return (
    <Div className="home-container">

      {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
      {products_loading_state ? (
        <Loader />
      ) : products_error_state ? (
        <Div className="error-container-outer-product">
          <Div className="error-container">
            <h1 className="error-title">Error al cargar productos</h1>
            <Error message={products_error_state} />
          </Div>
        </Div>

      ) : (

        <Div className="products-container">
          <Main />
          <section className='slider-section'>
            {products_state && (
              <Slider slides={products_state} cardsToShow={4} />
            )}

          </section>

          <div className="bannerContainer">
          
            <div className="bannerContent">
              <div className="logoContainer">
                <img src={LogoMercadoPlay} alt="Logo Mercado Play" />
              </div>
              <h2>Ahora podés ver series y películas</h2>
              <span className="tag">GRATIS</span>
              <button className="ctaButton">Ir a Mercado Play</button>
            </div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/LL7-o30o9ec?si=xZzXHTcReLCzZlWb" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe>
          </div>

          <section className='products-list-section'>
            <Div className="products-list">

              {products_state.length > 0 ? (
                products_state.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <span className="no-products-message">No hay productos</span>
              )}
            </Div>
          </section>



        </Div>
      )}
      <Prefooter />
      <Footer />
    </Div>
  );
};

export default Home;
