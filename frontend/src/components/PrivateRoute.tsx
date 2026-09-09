    // src/components/PrivateRoute.tsx

    import React from 'react';
    import { Navigate } from 'react-router-dom';

    interface PrivateRouteProps {
    children: React.ReactNode;
    requiredRole?: 'usuario' | 'administrador' | 'moderador' | 'owner';
    }

    const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
    children, 
    requiredRole 
    }) => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
        // Si no hay token, redirigir al login
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Si el rol no coincide, redirigir al dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
    };

    export default PrivateRoute;