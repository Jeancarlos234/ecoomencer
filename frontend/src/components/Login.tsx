        // src/components/Login.tsx

        import React, { useState } from 'react';
        import type { FormEvent } from 'react';
        import { Link, useNavigate } from 'react-router-dom';
        import { api } from '../services/api';
        import { useAuth } from '../context/useAuth';
        import type { LoginData } from '../types/api';
        import '../css/Login.css';

        // ============================================
        // Función para leer credenciales guardadas
        // ============================================
        const getSavedCredentials = (): { correo: string; contraseña: string; remember: boolean } => {
        try {
            const saved = localStorage.getItem('rememberedCredentials');
            if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.correo && parsed.contraseña) {
                return {
                correo: parsed.correo,
                contraseña: parsed.contraseña,
                remember: true,
                };
            }
            }
        } catch {
            localStorage.removeItem('rememberedCredentials');
        }
        return { correo: '', contraseña: '', remember: false };
        };

        const Login: React.FC = () => {
        const navigate = useNavigate();
        const { login: saveAuth } = useAuth();

        // ============================================
        // Estado inicial con lazy initialization
        // Lee localStorage UNA sola vez al montar
        // ============================================
        const [form, setForm] = useState<LoginData>(() => {
            const saved = getSavedCredentials();
            return {
            correo: saved.correo,
            contraseña: saved.contraseña,
            };
        });

        const [rememberMe, setRememberMe] = useState<boolean>(() => {
            return getSavedCredentials().remember;
        });

        const [showPassword, setShowPassword] = useState(false);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setForm(prev => ({
            ...prev,
            [name]: value
            }));
        };

        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            try {
            const response = await api.login(form);

            if (response.status === 'success' && response.token && response.user) {
                // ============================================
                // Guardar en el contexto (esto también actualiza localStorage)
                // ============================================
                saveAuth(response.token, response.user);

                // ============================================
                // Guardar o eliminar credenciales según "Recordarme"
                // ============================================
                if (rememberMe) {
                localStorage.setItem('rememberedCredentials', JSON.stringify({
                    correo: form.correo,
                    contraseña: form.contraseña
                }));
                } else {
                localStorage.removeItem('rememberedCredentials');
                }

                // Redirigir al Home
                navigate('/');
            } else {
                setError(response.message || 'Credenciales inválidas');
            }
            } catch (err) {
            setError(err instanceof Error ? err.message : 'Error de conexión con el servidor');
            } finally {
            setLoading(false);
            }
        };

        return (
            <div className="login-container">
            {/* Panel Izquierdo - Texto Explicativo */}
            <div className="login-info-panel">
                <div className="info-content">
                <Link to="/" className="info-brand">
                    <div className="brand-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    </div>
                    <span className="brand-text">Ecoomencer</span>
                </Link>

                <div className="info-main">
                    <span className="info-badge">Bienvenido de nuevo</span>
                    <h1>
                    Accede a tu cuenta y continúa
                    <span className="info-highlight"> comprando</span>
                    </h1>
                    <p className="info-description">
                    Gestiona tus pedidos, revisa tu historial de compras y aprovecha
                    ofertas exclusivas diseñadas para nuestros clientes registrados.
                    </p>

                    <div className="info-features">
                    <div className="info-feature">
                        <div className="feature-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="M9 12l2 2 4-4"/>
                        </svg>
                        </div>
                        <div>
                        <h4>Compra 100% segura</h4>
                        <p>Tus datos y pagos están protegidos</p>
                        </div>
                    </div>

                    <div className="info-feature">
                        <div className="feature-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="3" width="15" height="13" rx="2"/>
                            <polyline points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                            <circle cx="5.5" cy="18.5" r="2.5"/>
                            <circle cx="18.5" cy="18.5" r="2.5"/>
                        </svg>
                        </div>
                        <div>
                        <h4>Envíos rápidos</h4>
                        <p>Recibe tus pedidos en 24-48 horas</p>
                        </div>
                    </div>

                    <div className="info-feature">
                        <div className="feature-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.59 13.41l-6.18 6.18a2 2 0 0 1-2.83 0L2 10V2h8l9.59 9.59a2 2 0 0 1 0 2.82z"/>
                            <circle cx="7" cy="7" r="2"/>
                        </svg>
                        </div>
                        <div>
                        <h4>Ofertas exclusivas</h4>
                        <p>Descuentos solo para clientes registrados</p>
                        </div>
                    </div>

                    <div className="info-feature">
                        <div className="feature-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        </div>
                        <div>
                        <h4>Historial de compras</h4>
                        <p>Accede a todos tus pedidos anteriores</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="info-footer">
                    <p>© {new Date().getFullYear()} Ecoomencer. Todos los derechos reservados.</p>
                </div>
                </div>
            </div>

            {/* Panel Derecho - Formulario */}
            <div className="login-form-panel">
                <div className="login-card">
                <div className="login-header">
                    <h2>Iniciar Sesión</h2>
                    <p>Ingresa tus credenciales para acceder</p>
                </div>

                {error && (
                    <div className="alert alert-error">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <div className="alert-content">
                        <strong>Error</strong>
                        <span>{error}</span>
                    </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                    <label htmlFor="correo">Correo Electrónico</label>
                    <div className="input-wrapper">
                        <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={form.correo}
                        onChange={handleChange}
                        placeholder="tu@correo.com"
                        autoComplete="email"
                        required
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <label htmlFor="contraseña">Contraseña</label>
                    <div className="input-wrapper password-wrapper">
                        <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <input
                        type={showPassword ? 'text' : 'password'}
                        id="contraseña"
                        name="contraseña"
                        value={form.contraseña}
                        onChange={handleChange}
                        placeholder="Ingresa tu contraseña"
                        autoComplete="current-password"
                        required
                        />
                        <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                        {showPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                            </svg>
                        )}
                        </button>
                    </div>
                    </div>

                    <div className="form-options">
                    <label className="checkbox-wrapper">
                        <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="checkbox-mark"></span>
                        <span className="checkbox-label">Recordarme</span>
                    </label>
                    <Link to="/forgot-password" className="forgot-link">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    </div>

                    <button type="submit" disabled={loading} className="submit-button">
                    {loading ? (
                        <>
                        <span className="spinner"></span>
                        <span>Iniciando sesión...</span>
                        </>
                    ) : (
                        <>
                        <span>Iniciar Sesión</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                        </>
                    )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>¿No tienes una cuenta?</p>
                    <Link to="/register" className="register-link">
                    Crear cuenta nueva
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    </Link>
                </div>

                <div className="security-note">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <span>Conexión segura y cifrada</span>
                </div>
                </div>
            </div>
            </div>
        );
        };

        export default Login;