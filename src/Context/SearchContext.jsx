import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    setError(null);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        results,
        setResults,
        loading,
        setLoading,
        clearSearch,
        error,
        setError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => useContext(SearchContext);

export {
  useSearchContext,
  SearchProvider
}