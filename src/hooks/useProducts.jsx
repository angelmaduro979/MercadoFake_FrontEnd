import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products_state, setProducts] = useState([]); 
  const [products_loading_state, setProductsLoading] = useState(true); 
  const [products_error_state, setProductsError] = useState(null); 

  const obtenerProductos = async () => {
    setProductsLoading(true);
 
    try {
      
      const dataHTTP = await fetch('https://mercadofake-backend.onrender.com/api/products/mostrarProductos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const dataHTTPJson = await dataHTTP.json();
      console.log('Respuesta del servidor:', dataHTTPJson);


      if (!dataHTTPJson.ok) {
        setProductsError(dataHTTPJson.message || 'Error al cargar productos.');
        console.error(dataHTTPJson);
        setProductsLoading(false);
        return; 
      }

      
      const products = dataHTTPJson.data.products
      console.log('products',products)
      setProducts(prevProducts => [...prevProducts, ...products]) 
      
      
    } catch (error) {
      setProductsError('Error al realizar la solicitud');
      console.error(error);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return {
    products_state,
    products_loading_state,
    products_error_state,
  };
};

export default useProducts;
