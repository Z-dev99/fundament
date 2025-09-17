'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface DecodedToken {
    exp: number;
    role: string;
}

interface AuthContextType {
    isAuthenticated: boolean | null;
    login: (token: string) => void;
    logout: () => void;
    debugMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
    debugMode?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, debugMode = false }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const checkToken = () => {
        if (debugMode) {
            setIsAuthenticated(true);
            return;
        }

        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const isTokenValid = decoded.exp * 1000 > Date.now();
                if (isTokenValid) {
                    setIsAuthenticated(true);
                    return;
                }
            } catch (error) {
                console.error(error);
            }
        }
        setIsAuthenticated(false);
    };

    useEffect(() => {
        checkToken();
        const interval = setInterval(checkToken, 60 * 1000 * 10);
        return () => clearInterval(interval);
    }, [debugMode]);

    const login = (token: string) => {
        Cookies.set('token', token, { expires: 7 });
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, debugMode }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
