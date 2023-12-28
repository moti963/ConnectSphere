// AuthContext.jsx

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AuthAPI from './AuthAPI';
import { Cookies } from 'react-cookie';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const cookie = useMemo(() => new Cookies(), []); 


    useEffect(() => {
        AuthAPI.checkAuthentication()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setLoading(false));
    }, [cookie]);

    const login = async (credentials) => {
        try {
            const response = await AuthAPI.LoginUser(credentials);

            // Store the access and refresh tokens in cookies
            cookie.set('access_token', response.access);
            cookie.set('refresh_token', response.refresh);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            await AuthAPI.SignupUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AuthAPI.logoutUser();
            cookie.remove('access_token');
            cookie.remove('refresh_token');
            setIsAuthenticated(false);
        } catch (error) {
            throw error;
        }
    };

    const value = {
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};