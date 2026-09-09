    // src/components/NotFound.tsx

    import React from 'react';
    import { Link } from 'react-router-dom';
    import '../css/NotFound.css';

    const NotFound: React.FC = () => {
    return (
        <div className="notfound-container">
        <div className="notfound-content">
            {/* Número 404 con animación */}
            <div className="notfound-code">
            <span className="code-number">4</span>
            <div className="code-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
            </div>
            <span className="code-number">4</span>
            </div>

            {/* Mensaje */}
            <h1 className="notfound-title">¡Página no encontrada!</h1>
            <p className="notfound-description">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>

            {/* Sugerencias */}
            <div className="notfound-suggestions">
            <p className="suggestions-title">Quizás te interese:</p>
            <ul className="suggestions-list">
                <li>Verificar la URL ingresada</li>
                <li>Explorar nuestros productos</li>
                <li>Volver a la página principal</li>
            </ul>
            </div>

            {/* Acciones */}
            <div className="notfound-actions">
            <Link to="/" className="btn-home">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"/>
                </svg>
                Volver al Inicio
            </Link>
            <Link to="/products" className="btn-products">
                Ver Productos
            </Link>
            </div>

            {/* Contacto */}
            <div className="notfound-contact">
            <p>¿Necesitas ayuda?</p>
            <Link to="/contact" className="contact-link">Contáctanos</Link>
            </div>
        </div>
        </div>
    );
    };

    export default NotFound;