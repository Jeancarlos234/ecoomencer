    // src/components/Home.tsx

    import React from 'react';
    import { Link } from 'react-router-dom';
    import '../css/Home.css';

    const Home: React.FC = () => {
    return (
        <div className="home-container">
        {/* Header */}
        <header className="header">
            <div className="header-content">
            <div className="header-brand">
                <div className="brand-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                </div>
                <span className="brand-name">Ecommencer</span>
            </div>
            
            <nav className="header-nav">
                <Link to="/products" className="nav-link">Productos</Link>
                <Link to="/categories" className="nav-link">Categorías</Link>
                <Link to="/offers" className="nav-link">Ofertas</Link>
                <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                <Link to="/register" className="nav-button">Crear Cuenta</Link>
            </nav>
            </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
            <div className="hero-content">
            <div className="hero-badge">
                <span className="badge-dot"></span>
                Nuevos productos disponibles
            </div>
            
            <h1 className="hero-title">
                Compra lo Mejor
                <span className="title-highlight"> al Mejor Precio</span>
            </h1>
            
            <p className="hero-description">
                Descubre nuestra amplia selección de productos de calidad. 
                Envíos rápidos y pagos seguros.
            </p>
            
            <div className="hero-actions">
                <Link to="/register" className="btn-primary">
                <span>Comenzar a Comprar</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                </svg>
                </Link>
                <Link to="/login" className="btn-secondary">
                Ya soy Cliente
                </Link>
            </div>
            </div>

            {/* Stats */}
            <div className="hero-stats">
            <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Productos</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Clientes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Calificación</span>
            </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
            <h2 className="features-title">Beneficios de Comprar con Nosotros</h2>
            <div className="features-grid">
            <div className="feature-card">
                <div className="feature-icon blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" rx="2"/>
                    <polyline points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                </div>
                <h3>Envío Rápido</h3>
                <p>Recibe tus productos en 24-48 horas</p>
            </div>

            <div className="feature-card">
                <div className="feature-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                </svg>
                </div>
                <h3>Compra Segura</h3>
                <p>Protección en todas tus transacciones</p>
            </div>

            <div className="feature-card">
                <div className="feature-icon purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                </div>
                <h3>Atención Personalizada</h3>
                <p>Soporte dedicado para cada cliente</p>
            </div>

            <div className="feature-card">
                <div className="feature-icon orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                </div>
                <h3>Mejores Precios</h3>
                <p>Ofertas y descuentos exclusivos</p>
            </div>
            </div>
        </section>

        {/* Categories Preview */}
        <section className="categories-section">
            <h2 className="categories-title">Categorías Destacadas</h2>
            <div className="categories-grid">
            <div className="category-card">
                <div className="category-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                </div>
                <h3>Electrónica</h3>
                <p>2,500+ productos</p>
            </div>

            <div className="category-card">
                <div className="category-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.59 13.41l-6.18 6.18a2 2 0 0 1-2.83 0L2 10V2h8l9.59 9.59a2 2 0 0 1 0 2.82z"/>
                    <circle cx="7" cy="7" r="2"/>
                </svg>
                </div>
                <h3>Moda</h3>
                <p>3,200+ productos</p>
            </div>

            <div className="category-card">
                <div className="category-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 11h18a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                </div>
                <h3>Hogar</h3>
                <p>1,800+ productos</p>
            </div>

            <div className="category-card">
                <div className="category-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
                </div>
                <h3>Deportes</h3>
                <p>900+ productos</p>
            </div>
            </div>
        </section>
        </div>
    );
    };

    export default Home;