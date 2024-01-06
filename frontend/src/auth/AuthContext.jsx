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
        const checkAuth = async () => {
            try {
                const accessToken = cookie.get('access_token');
                const refreshToken = cookie.get('refresh_token');

                if (accessToken && refreshToken) {
                    // Verify the access token
                    await AuthAPI.checkAuthentication();
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [cookie]);

    const login = async (credentials) => {
        try {
            const response = await AuthAPI.LoginUser(credentials);

            // Store the access and refresh tokens in cookies
            cookie.set('access_token', response.data.access);
            cookie.set('refresh_token', response.data.refresh);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            await AuthAPI.SignupUser(userData);
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const refreshToken = cookie.get('refresh_token');
            await AuthAPI.logoutUser(refreshToken);
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
