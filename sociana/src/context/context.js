import { createContext, useContext, useState } from "react";


export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [ auth, setAuth ] = useState(localStorage.getItem("auth") || null )
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => { return useContext(AuthContext) } 