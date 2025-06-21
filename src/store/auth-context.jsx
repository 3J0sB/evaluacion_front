import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    token: null,
    saveToken: async (token) => {},
    logout: () => {}
});

export default function AuthContextProvider({ children }) { 
    const [token, setToken] = useState(null);

    useEffect(() => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            setToken(localToken);
        }
    }, []);

    async function saveToken(token) {
        localStorage.setItem("token", token);
        setToken(token);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setToken(null);
    }

    const value = {
        token: token,
        saveToken: saveToken,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
       

    
}