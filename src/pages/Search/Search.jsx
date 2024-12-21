import React, { useEffect } from "react";
import { Div, Loader, Error, LogoutNavbar, LoginNavbar, ProductCard, Footer } from "../../components/components_index";
import { useSearchContext } from "../../Context/SearchContext.jsx";
import "./Search.css";

const Search = () => {
  const { results, error, loading } = useSearchContext();
  const accesToken = sessionStorage.getItem("accesToken");

  return (
    <Div className="search-container">
      {!accesToken ? <LogoutNavbar /> : <LoginNavbar />}
      <Div className='search-container-inner'>
        <Div className="search-content">
          <h1 className="search-title">Resultados de Búsqueda</h1>
          {loading ? (
            <Loader />
          ) : (
            <Div className="product-list-container">
              {results.length > 0 ? (
                <Div className="product-list">
                  {results.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </Div>
              ) : (
                <Error message={error} />
              )}
            </Div>
          )}
        </Div>
      </Div>
      <Footer />
    </Div>
  );
};

export default Search;
