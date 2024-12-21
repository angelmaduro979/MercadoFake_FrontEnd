import React , { useState, useEffect } from "react";
import { useSearchContext } from "../Context/SearchContext.jsx";
import { useNavigate } from "react-router-dom";

const useSearchBar = () => {
  const { searchTerm, setSearchTerm, results, setResults, setLoading, setError } =
    useSearchContext();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);
    
    if (!searchTerm.trim()) {
      setLoading(false);
      setResults([]);
      setError("No hay términos de búsqueda.");
      return;
    }

    try {
      const response = await fetch("https://mercadofake-backend.onrender.com/api/products/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm:searchTerm }),
      });
      const data = await response.json();

      if (!data.ok) {
        setError(prevState => prevState === data?.message?.error_message || "Error inesperado en data");
        navigate("/Search");
        console.error("Error del servidor:", data?.message?.error_message);
      }

      if (Array.isArray(data.data.products)) {
        setResults(prevState => [...prevState, ...data.data.products]);
        setError(null);
        navigate("/Search"); 
      } else {
        setResults([]);
        setError("No se encontraron productos.");
      }
    } catch (error) {
      setError(`Ocurrió un error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchTerm,
    results,
    handleInputChange,
    handleSearch,
  };
};

export default useSearchBar;
