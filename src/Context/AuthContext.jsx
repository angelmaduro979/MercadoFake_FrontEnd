import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
    let nombre = 'pepe'
   
    const [isAuthenticated_state, setIsAuthenticatedState] = useState(Boolean(sessionStorage.getItem('accesToken')))
    useEffect(
        ()=>{
            Boolean(sessionStorage.getItem('accesToken')) && setIsAuthenticatedState(true)
        }
    )
    const navigate = useNavigate()
    const login = (token) => {
        setIsAuthenticatedState(true)
        sessionStorage.setItem('accesToken', token)
        navigate('/home')
    }
    return (
        <AuthContext.Provider value={
            {
                isAuthenticated_state
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}