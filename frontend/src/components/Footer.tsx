    // src/components/Footer.tsx

    import React from 'react';
    import { Link } from 'react-router-dom';
    import '../css/Footer.css';

    const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
        <div className="footer-content">
            {/* ===== Columna 1: Marca ===== */}
            <div className="footer-column footer-brand-col">
            <Link to="/" className="footer-brand">
                <div className="footer-brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                </div>
                <span className="footer-brand-name">Ecoomencer</span>
            </Link>
            <p className="footer-brand-desc">
                Tu tienda online de confianza. Productos de calidad, envíos rápidos
                y las mejores ofertas para nuestros clientes.
            </p>

            {/* Redes sociales */}
            <div className="footer-socials">
                <a href="#" aria-label="Facebook" className="footer-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                </a>
                <a href="#" aria-label="Instagram" className="footer-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                </a>
                <a href="#" aria-label="Twitter" className="footer-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                </a>
                <a href="#" aria-label="YouTube" className="footer-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                </a>
            </div>
            </div>

            {/* ===== Columna 2: Tienda ===== */}
            <div className="footer-column">
            <h4 className="footer-title">Tienda</h4>
            <ul className="footer-links">
                <li><Link to="/products">Productos</Link></li>
                <li><Link to="/categories">Categorías</Link></li>
                <li><Link to="/offers">Ofertas</Link></li>
                <li><Link to="/new">Novedades</Link></li>
                <li><Link to="/brands">Marcas</Link></li>
            </ul>
            </div>

            {/* ===== Columna 3: Ayuda ===== */}
            <div className="footer-column">
            <h4 className="footer-title">Ayuda</h4>
            <ul className="footer-links">
                <li><Link to="/help">Centro de ayuda</Link></li>
                <li><Link to="/shipping">Envíos</Link></li>
                <li><Link to="/returns">Devoluciones</Link></li>
                <li><Link to="/contact">Contacto</Link></li>
                <li><Link to="/faq">Preguntas frecuentes</Link></li>
            </ul>
            </div>

            {/* ===== Columna 4: Empresa ===== */}
            <div className="footer-column">
            <h4 className="footer-title">Empresa</h4>
            <ul className="footer-links">
                <li><Link to="/about">Sobre nosotros</Link></li>
                <li><Link to="/careers">Trabaja con nosotros</Link></li>
                <li><Link to="/privacy">Privacidad</Link></li>
                <li><Link to="/terms">Términos</Link></li>
                <li><Link to="/blog">Blog</Link></li>
            </ul>
            </div>

            {/* ===== Columna 5: Contacto ===== */}
            <div className="footer-column">
            <h4 className="footer-title">Contacto</h4>
            <ul className="footer-contact">
                <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Av. Principal 123, Ciudad</span>
                </li>
                <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
                </li>
                <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>contacto@ecoomencer.com</span>
                </li>
            </ul>
            </div>
        </div>

        {/* ===== Línea inferior ===== */}
        <div className="footer-bottom">
            <div className="footer-bottom-content">
            <p className="footer-copyright">
                © {currentYear} Ecoomencer. Todos los derechos reservados.
            </p>

            <div className="footer-payments">
                <span className="footer-payment-text">Métodos de pago:</span>
                <div className="footer-payment-icons">
                <div className="payment-icon">VISA</div>
                <div className="payment-icon">MC</div>
                <div className="payment-icon">AMEX</div>
                <div className="payment-icon">PAYPAL</div>
                </div>
            </div>

            <div className="footer-legal">
                <Link to="/privacy">Privacidad</Link>
                <span>·</span>
                <Link to="/terms">Términos</Link>
                <span>·</span>
                <Link to="/cookies">Cookies</Link>
            </div>
            </div>
        </div>
        </footer>
    );
    };

    export default Footer;