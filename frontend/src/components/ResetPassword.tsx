    // src/components/ResetPassword.tsx

    import React, { useState, useEffect } from 'react';
    import type { FormEvent } from 'react';
    import { Link, useNavigate, useSearchParams } from 'react-router-dom';
    import { api } from '../services/api';
    import '../css/ResetPassword.css';

    const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';

    const [contraseña, setContraseña] = useState('');
    const [confirmacion, setConfirmacion] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Validar token al montar
    useEffect(() => {
        const validate = async () => {
        if (!token || !email) {
            setError('Enlace inválido o incompleto.');
            setValidating(false);
            return;
        }

        try {
            const response = await api.verifyResetToken({ correo: email, token });
            if (response.status === 'success') {
            setTokenValid(true);
            } else {
            setError('Token inválido o expirado.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Token inválido o expirado.');
        } finally {
            setValidating(false);
        }
        };

        validate();
    }, [token, email]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (contraseña !== confirmacion) {
        setError('Las contraseñas no coinciden');
        return;
        }

        if (contraseña.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres');
        return;
        }

        setLoading(true);

        try {
        const response = await api.resetPassword({
            correo: email,
            token,
            contraseña,
            contraseña_confirmation: confirmacion,
        });

        if (response.status === 'success') {
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2500);
        } else {
            setError(response.message || 'Error al restablecer la contraseña');
        }
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Error de conexión');
        } finally {
        setLoading(false);
        }
    };

    // Estado: validando
    if (validating) {
        return (
        <div className="reset-container">
            <div className="reset-card centered">
            <div className="spinner large"></div>
            <p>Verificando enlace...</p>
            </div>
        </div>
        );
    }

    // Estado: token inválido
    if (!tokenValid && !success) {
        return (
        <div className="reset-container">
            <div className="reset-card centered">
            <div className="error-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
            </div>
            <h2>Enlace inválido</h2>
            <p>{error}</p>
            <Link to="/forgot-password" className="back-link">
                Solicitar un nuevo enlace
            </Link>
            </div>
        </div>
        );
    }

    // Estado: éxito
    if (success) {
        return (
        <div className="reset-container">
            <div className="reset-card centered">
            <div className="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            </div>
            <h2>¡Contraseña actualizada!</h2>
            <p>Serás redirigido al inicio de sesión en un momento.</p>
            <Link to="/login" className="back-link">Ir al inicio de sesión</Link>
            </div>
        </div>
        );
    }

    // Estado: formulario
    return (
        <div className="reset-container">
        <div className="reset-card">
            <div className="reset-header">
            <h2>Nueva contraseña</h2>
            <p>Ingresa tu nueva contraseña para <strong>{email}</strong></p>
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

            <form onSubmit={handleSubmit} className="reset-form">
            <div className="form-group">
                <label htmlFor="contraseña">Nueva Contraseña</label>
                <div className="input-wrapper password-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar' : 'Mostrar'}
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

            <div className="form-group">
                <label htmlFor="confirmacion">Confirmar Contraseña</label>
                <div className="input-wrapper password-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmacion"
                    value={confirmacion}
                    onChange={(e) => setConfirmacion(e.target.value)}
                    placeholder="Repite la contraseña"
                    required
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                >
                    {showConfirmPassword ? (
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

            <button type="submit" disabled={loading} className="submit-button">
                {loading ? (
                <>
                    <span className="spinner"></span>
                    <span>Actualizando...</span>
                </>
                ) : (
                <>
                    <span>Restablecer contraseña</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </>
                )}
            </button>
            </form>

            <div className="reset-footer">
            <Link to="/login" className="login-link">Volver al inicio de sesión</Link>
            </div>
        </div>
        </div>
    );
    };

    export default ResetPassword;