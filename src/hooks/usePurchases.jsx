import React, { useEffect, useState } from 'react';

const usePurchases = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const accesToken = sessionStorage.getItem('accesToken');

    const getPurchases = async () => {
        setLoading(true);
        setError(null);

        try {
            const responseHTTP = await fetch(`https://mercadofake-backend.onrender.com/api/purchases/mostrarPurchasesByUserId`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accesToken}`
                }
            });

            const response = await responseHTTP.json();
            console.log(response);

            if (!response.ok) {
                setError(response?.message?.error_message || "Error en la respuesta del servidor");
            }

            if (Array.isArray(response.data?.products)) {
                setPurchases(response.data.products);
            } else {
                setError("La estructura de la respuesta no es válida.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPurchases();
    }, []);

    return {
        purchases,
        loading,
        error
    };
};

export default usePurchases;
