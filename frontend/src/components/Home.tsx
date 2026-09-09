    // src/components/Home.tsx

    import React from 'react';
    import { Link } from 'react-router-dom';
    import '../css/Home.css';

    const Home: React.FC = () => {
    return (
        <div className="home-container">
        <div className="home-content">
            <h1>Bienvenido a Nuestra Plataforma</h1>
            <p>Gestión profesional con roles y permisos</p>
            
            <div className="home-actions">
            <Link to="/register" className="btn-primary">
                Crear Cuenta
            </Link>
            <Link to="/login" className="btn-secondary">
                Iniciar Sesión
            </Link>
            </div>
        </div>
        </div>
    );
    };

    export default Home;