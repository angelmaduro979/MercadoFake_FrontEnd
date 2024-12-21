import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFunctionPost } from "../Utils/fetching";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchFunctionPost("https://mercadofake-backend.onrender.com/api/authUser/logout");

            if (!response.ok) {
                setError("Error al cerrar sesión. Inténtalo nuevamente.");
            }

            console.log("Sesión cerrada con éxito");
            
            sessionStorage.clear();

            navigate("/login");

        } catch (err) {
            console.error("Error durante el cierre de sesión:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading, error };
};

export default useLogout;
