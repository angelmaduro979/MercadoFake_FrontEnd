import { useState, useEffect } from 'react';

const useProductDetail = (id) => {
  const [productDetailState, setProductDetailState] = useState([]);
  const [productDetailLoadingState, setProductDetailLoadingState] = useState(false);
  const [productDetailErrorState, setProductDetailErrorState] = useState(null);

  const getProductDetail = async () => {
    setProductDetailLoadingState(true);
    const token = sessionStorage.getItem('accesToken');

    try {
      const responseHTTP = await fetch(`https://mercadofake-backend.onrender.com/api/products/mostrarProductosById/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const response = await responseHTTP.json();
      if (!response.ok) {
        setProductDetailErrorState(response?.message?.error_message || "Error inesperado en data");
      } else {
        setProductDetailState([response.data]); 
      }
    } catch (error) {
      setProductDetailErrorState("Error inesperado al conectar con el servidor.");
    } finally {
      setProductDetailLoadingState(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
  }, [id]); 

  return {
    productDetailState,
    productDetailLoadingState,
    productDetailErrorState,
  };
};

export default useProductDetail;