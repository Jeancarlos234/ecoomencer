    // src/components/ForgotPassword.tsx

    import React, { useState } from 'react';
    import type { FormEvent } from 'react';
    import { Link } from 'react-router-dom';
    import { api } from '../services/api';
    import '../css/ForgotPassword.css';

    const ForgotPassword: React.FC = () => {
    const [correo, setCorreo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        const response = await api.forgotPassword({ correo });
        if (response.status === 'success') {
            setSent(true);
        } else {
            setError(response.message || 'Error al enviar el correo');
        }
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Error de conexión');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="forgot-container">
        {/* Panel izquierdo - Info */}
        <div className="forgot-info-panel">
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
                <span className="info-badge">Recuperación</span>
                <h1>¿Olvidaste tu <span className="info-highlight">contraseña</span>?</h1>
                <p className="info-description">
                No te preocupes. Te enviaremos un enlace seguro a tu correo
                para que puedas restablecerla en minutos.
                </p>

                <div className="info-features">
                <div className="info-feature">
                    <div className="feature-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    </div>
                    <div>
                    <h4>Revisa tu correo</h4>
                    <p>Recibirás un enlace de recuperación</p>
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
                    <h4>Expira en 60 minutos</h4>
                    <p>Por seguridad, el enlace caduca</p>
                    </div>
                </div>

                <div className="info-feature">
                    <div className="feature-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M9 12l2 2 4-4"/>
                    </svg>
                    </div>
                    <div>
                    <h4>Conexión segura</h4>
                    <p>Tus datos siempre protegidos</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="info-footer">
                <p>© {new Date().getFullYear()} Ecoomencer. Todos los derechos reservados.</p>
            </div>
            </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="forgot-form-panel">
            <div className="forgot-card">
            {sent ? (
                <div className="success-state">
                <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <h2>Revisa tu correo</h2>
                <p>
                    Si <strong>{correo}</strong> está registrado, recibirás un enlace
                    para restablecer tu contraseña en los próximos minutos.
                </p>
                <p className="success-hint">No olvides revisar tu carpeta de spam.</p>
                <Link to="/login" className="back-link">Volver al inicio de sesión</Link>
                </div>
            ) : (
                <>
                <div className="forgot-header">
                    <h2>Recuperar contraseña</h2>
                    <p>Ingresa tu correo y te enviaremos un enlace de recuperación.</p>
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

                <form onSubmit={handleSubmit} className="forgot-form">
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
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="tu@correo.com"
                        autoComplete="email"
                        required
                        />
                    </div>
                    </div>

                    <button type="submit" disabled={loading} className="submit-button">
                    {loading ? (
                        <>
                        <span className="spinner"></span>
                        <span>Enviando...</span>
                        </>
                    ) : (
                        <>
                        <span>Enviar enlace</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                        </>
                    )}
                    </button>
                </form>

                <div className="forgot-footer">
                    <p>¿Recordaste tu contraseña?</p>
                    <Link to="/login" className="login-link">
                    Iniciar sesión
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    </Link>
                </div>
                </>
            )}
            </div>
        </div>
        </div>
    );
    };

    export default ForgotPassword;