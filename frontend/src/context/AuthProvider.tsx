    // src/context/AuthProvider.tsx

    import React, { useState, useCallback, useMemo } from 'react';
    import { AuthContext } from './AuthContext';
    import type { UserData } from './AuthContext';

    // ============================================
    // Función lazy para leer sesión inicial
    // ============================================
    const getInitialAuth = (): { token: string | null; user: UserData | null } => {
    try {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('userData');

        if (savedToken && savedUser) {
        const parsedUser: UserData = JSON.parse(savedUser);
        return { token: savedToken, user: parsedUser };
        }
    } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('userRole');
    }
    return { token: null, user: null };
    };

    export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => getInitialAuth().token);
    const [user, setUser] = useState<UserData | null>(() => getInitialAuth().user);

    const login = useCallback((newToken: string, newUser: UserData) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('userData', JSON.stringify(newUser));
        localStorage.setItem('userRole', newUser.rol);
        setToken(newToken);
        setUser(newUser);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('userRole');
        localStorage.removeItem('rememberedCredentials');
        setToken(null);
        setUser(null);
    }, []);

    const isAuthenticated = !!token && !!user;

    const value = useMemo(
        () => ({ user, token, isAuthenticated, login, logout }),
        [user, token, isAuthenticated, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
    };