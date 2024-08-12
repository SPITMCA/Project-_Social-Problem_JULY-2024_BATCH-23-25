// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, user: null });

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setAuth({ token });
        }
    }, []);

    const login = (token, user) => {
        setAuth({ token, user });
        sessionStorage.setItem('token', token);
    };

    const logout = () => {
        setAuth({ token: null, user: null });
        sessionStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
