import React from "react";
import {useLogout} from "../../hooks/hooks_index";
import "./Logout.css";

const LogoutButton = ({ children, className }) => {
    const { logout, loading, error } = useLogout();

    return (
        
            <button onClick={logout} disabled={loading} className={className? className : "logout-button"}>
                {loading && "Cerrando sesión..."  }
                {children}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </button>
            
        
    );
};

export default LogoutButton;
