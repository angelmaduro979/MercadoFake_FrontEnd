import React, { useState } from 'react';
import './DeleteButton.css';

const DeleteButton = ({ children, productId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const accesToken = sessionStorage.getItem('accesToken');

    const deleteHandler = async () => {
        if (!accesToken) {
            alert("No se encontró un token de acceso. Por favor, inicia sesión nuevamente.");
            return;
        }

        console.log("ID del producto a eliminar:", productId);

        setLoading(true);
        setError(null);

        try {
            const responseHTTP = await fetch(
                'https://mercadofake-backend.onrender.com/api/products/deleteProductosByUserId',
                {
                    method: "PUT",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accesToken}`,
                    },
                    body: JSON.stringify({ productId }),
                }
            );

            if (!responseHTTP.ok) {
                const errorData = await responseHTTP.json();
                throw new Error(
                    errorData?.message?.error_message || "Error inesperado al eliminar el producto."
                );
            }

        
            const response = await responseHTTP.json();
            alert("Producto eliminado exitosamente.");
            console.log("Respuesta del servidor:", response);

        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            setError(error.message || "Error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`btn-delete ${loading ? "disabled" : ""}`}
            onClick={deleteHandler}
            disabled={loading} 
        >
            {loading ? "Eliminando..." : children}
        </button>
    );
};

export default DeleteButton;
