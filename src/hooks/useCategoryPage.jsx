import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useCategoryPage = () => {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName?.replace(/-/g, " "));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://mercadofake-backend.onrender.com/api/products/mostrarProductosByCategory/${categoryName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      

        const data = await response.json();

        if (!data.ok) {
          setError(data?.message || "Error inesperado en data");
        }

        setProducts(data.data); 
      } catch (err) {
        setError(err.message || "Error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName]); 

  return {
    decodedCategory,
    products,
    loading,
    error,
  };
};

export default useCategoryPage;
