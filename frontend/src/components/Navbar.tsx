    // src/components/Navbar.tsx

    import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useAuth } from '../context/useAuth';
    import '../css/Navbar.css';

    const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    // ============================================
    // Iniciales del avatar
    // ============================================
    const getInitials = (): string => {
        if (!user) return '?';
        const n = user.nombres?.charAt(0)?.toUpperCase() || '';
        const a = user.apellidos?.charAt(0)?.toUpperCase() || '';
        return `${n}${a}` || user.nombre_usuario?.charAt(0)?.toUpperCase() || '?';
    };

    // ============================================
    // Logout
    // ============================================
    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/login');
    };

    // ============================================
    // Cerrar menú al hacer click fuera
    // ============================================
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.user-menu-wrapper')) {
            setShowUserMenu(false);
        }
        };

        if (showUserMenu) {
        document.addEventListener('click', handleClickOutside);
        }

        return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, [showUserMenu]);

    return (
        <header className="navbar">
        <div className="navbar-content">
            {/* ===== Marca ===== */}
            <Link to="/" className="navbar-brand">
            <div className="navbar-brand-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
            </div>
            <span className="navbar-brand-name">Ecoomencer</span>
            </Link>

            {/* ===== Navegación central ===== */}
            <nav className="navbar-nav">
            <Link to="/products" className="navbar-link">Productos</Link>
            <Link to="/categories" className="navbar-link">Categorías</Link>
            <Link to="/offers" className="navbar-link">Ofertas</Link>
            </nav>

            {/* ===== Acciones derecha ===== */}
            <div className="navbar-actions">
            {/* Buscador */}
            <div className="navbar-search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input type="text" placeholder="Buscar productos..." />
            </div>

            {/* Carrito */}
            <Link to="/cart" className="navbar-icon-btn" aria-label="Carrito">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span className="navbar-badge">0</span>
            </Link>

            {/* ===== Si está logueado → Menú de usuario ===== */}
            {isAuthenticated && user ? (
                <div className="user-menu-wrapper">
                <button
                    type="button"
                    className="user-menu-trigger"
                    onClick={() => setShowUserMenu(prev => !prev)}
                    aria-expanded={showUserMenu}
                >
                    <span className="user-avatar">{getInitials()}</span>
                    <span className="user-name">{user.nombres}</span>
                    <svg
                    className={`user-chevron ${showUserMenu ? 'open' : ''}`}
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    >
                    <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>

                {showUserMenu && (
                    <div className="user-menu-dropdown">
                    <div className="user-menu-header">
                        <div className="user-menu-avatar">{getInitials()}</div>
                        <div className="user-menu-info">
                        <strong>{user.nombres} {user.apellidos}</strong>
                        <span>@{user.nombre_usuario}</span>
                        <span className="user-menu-email">{user.correo}</span>
                        </div>
                    </div>

                    <div className="user-menu-divider"></div>

                    <Link to="/dashboard" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"/>
                        <rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/>
                        <rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        Mi Panel
                    </Link>

                    <Link to="/profile" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Mi Perfil
                    </Link>

                    <Link to="/orders" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                        Mis Pedidos
                    </Link>

                    <div className="user-menu-divider"></div>

                    <button type="button" className="user-menu-item logout" onClick={handleLogout}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Cerrar Sesión
                    </button>
                    </div>
                )}
                </div>
            ) : (
                <>
                <Link to="/login" className="navbar-login">Iniciar Sesión</Link>
                <Link to="/register" className="navbar-register">Crear Cuenta</Link>
                </>
            )}
            </div>
        </div>
        </header>
    );
    };

    export default Navbar;