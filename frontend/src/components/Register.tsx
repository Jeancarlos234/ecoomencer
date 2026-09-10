    // src/components/Register.tsx

    import React, { useState } from 'react';
    import type { FormEvent } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { api } from '../services/api';
    import type { RegisterData } from '../types/api';
    import '../css/Register.css';

    const Register: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterData>({
        nombres: '',
        apellidos: '',
        nombre_usuario: '',
        correo: '',
        numero_cedula: '',
        edad: '',
        contraseña: '',
        contraseña_confirmation: '',
        rol: 'usuario'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    // ============================================
    // MANEJO DE CAMBIOS CON VALIDACIÓN POR CAMPO
    // ============================================
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let cleanValue = value;

        // Solo letras (incluye acentos y ñ) y espacios para nombres y apellidos
        if (name === 'nombres' || name === 'apellidos') {
        cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
        }

        // Solo números para cédula (máximo 10 dígitos)
        if (name === 'numero_cedula') {
        cleanValue = value.replace(/\D/g, '').slice(0, 10);
        }

        // Solo números para edad (máximo 2 dígitos)
        if (name === 'edad') {
        cleanValue = value.replace(/\D/g, '').slice(0, 2);
        }

        // Sin espacios para nombre de usuario (opcional)
        if (name === 'nombre_usuario') {
        cleanValue = value.replace(/\s/g, '');
        }

        setForm(prev => ({
        ...prev,
        [name]: cleanValue
        }));
    };

    // ============================================
    // VALIDACIONES ANTES DE ENVIAR
    // ============================================
    const validateForm = (): boolean => {
        // Nombres: solo letras, mínimo 2 caracteres
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,}$/.test(form.nombres.trim())) {
        setError('El nombre solo puede contener letras (mínimo 2 caracteres)');
        return false;
        }

        // Apellidos: solo letras, mínimo 2 caracteres
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,}$/.test(form.apellidos.trim())) {
        setError('El apellido solo puede contener letras (mínimo 2 caracteres)');
        return false;
        }

        // Nombre de usuario
        if (form.nombre_usuario.length < 3) {
        setError('El nombre de usuario debe tener al menos 3 caracteres');
        return false;
        }

        // Cédula: exactamente 10 dígitos
        if (!/^\d{10}$/.test(form.numero_cedula)) {
        setError('El número de cédula debe tener exactamente 10 dígitos');
        return false;
        }

        // Edad: número entre 18 y 99
        const edadNum = parseInt(form.edad, 10);
        if (isNaN(edadNum) || edadNum < 18 || edadNum > 99) {
        setError('La edad debe estar entre 18 y 99 años');
        return false;
        }

        // Contraseñas coinciden
        if (form.contraseña !== form.contraseña_confirmation) {
        setError('Las contraseñas no coinciden');
        return false;
        }

        // Contraseña mínima
        if (form.contraseña.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres');
        return false;
        }

        // Términos aceptados
        if (!acceptTerms) {
        setError('Debes aceptar los términos y condiciones');
        return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
        return;
        }

        setLoading(true);

        try {
        const response = await api.register({
            ...form,
            rol: 'usuario'
        });

        if (response.status === 'success') {
            setSuccess(response.message || 'Usuario registrado exitosamente');

            setForm({
            nombres: '',
            apellidos: '',
            nombre_usuario: '',
            correo: '',
            numero_cedula: '',
            edad: '',
            contraseña: '',
            contraseña_confirmation: '',
            rol: 'usuario'
            });
            setAcceptTerms(false);

            setTimeout(() => {
            navigate('/login');
            }, 2000);
        } else {
            setError(response.message || 'Error al registrar usuario');
        }
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Error de conexión con el servidor');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="register-container">
        {/* Panel Izquierdo - Información */}
        <div className="register-info-panel">
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
                <span className="info-badge">Únete a nosotros</span>
                <h1>
                Crea tu cuenta y empieza a
                <span className="info-highlight"> comprar mejor</span>
                </h1>
                <p className="info-description">
                Regístrate gratis y accede a beneficios exclusivos, seguimiento de pedidos
                y ofertas personalizadas para ti.
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
                    <h4>Registro gratuito</h4>
                    <p>Sin costos ni compromisos</p>
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
                    <h4>Seguimiento de pedidos</h4>
                    <p>Rastrea tus compras en tiempo real</p>
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
                    <p>Descuentos solo para miembros</p>
                    </div>
                </div>

                <div className="info-feature">
                    <div className="feature-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    </div>
                    <div>
                    <h4>Soporte 24/7</h4>
                    <p>Siempre disponibles para ayudarte</p>
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
        <div className="register-form-panel">
            <div className="register-card">
            <div className="register-header">
                <h2>Crear Cuenta</h2>
                <p>Completa el formulario para comenzar</p>
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

            {success && (
                <div className="alert alert-success">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <div className="alert-content">
                    <strong>¡Registro exitoso!</strong>
                    <span>{success}</span>
                </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="nombres">Nombres</label>
                    <div className="input-wrapper">
                    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                        type="text"
                        id="nombres"
                        name="nombres"
                        value={form.nombres}
                        onChange={handleChange}
                        placeholder="Ingresa tus nombres"
                        autoComplete="given-name"
                        maxLength={50}
                        required
                    />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos</label>
                    <div className="input-wrapper">
                    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <input
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        value={form.apellidos}
                        onChange={handleChange}
                        placeholder="Ingresa tus apellidos"
                        autoComplete="family-name"
                        maxLength={50}
                        required
                    />
                    </div>
                </div>
                </div>

                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="nombre_usuario">Nombre de Usuario</label>
                    <div className="input-wrapper">
                    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <input
                        type="text"
                        id="nombre_usuario"
                        name="nombre_usuario"
                        value={form.nombre_usuario}
                        onChange={handleChange}
                        placeholder="Elige un nombre de usuario"
                        autoComplete="username"
                        maxLength={50}
                        required
                    />
                    </div>
                </div>

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
                        placeholder="correo@ejemplo.com"
                        autoComplete="email"
                        maxLength={100}
                        required
                    />
                    </div>
                </div>
                </div>

                <div className="form-row">
                <div className="form-group">
                    <label htmlFor="numero_cedula">Número de Cédula</label>
                    <div className="input-wrapper">
                    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="5" width="20" height="14" rx="2"/>
                        <line x1="2" y1="10" x2="22" y2="10"/>
                    </svg>
                    <input
                        type="text"
                        id="numero_cedula"
                        name="numero_cedula"
                        value={form.numero_cedula}
                        onChange={handleChange}
                        placeholder="10 dígitos"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        required
                    />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="edad">Edad</label>
                    <div className="input-wrapper">
                    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <input
                        type="text"
                        id="edad"
                        name="edad"
                        value={form.edad}
                        onChange={handleChange}
                        placeholder="18"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={2}
                        required
                    />
                    </div>
                </div>
                </div>

                <div className="form-row">
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
                        placeholder="Mínimo 8 caracteres"
                        autoComplete="new-password"
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

                <div className="form-group">
                    <label htmlFor="contraseña_confirmation">Repetir Contraseña</label>
                    <div className="input-wrapper password-wrapper">
                    <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="contraseña_confirmation"
                        name="contraseña_confirmation"
                        value={form.contraseña_confirmation}
                        onChange={handleChange}
                        placeholder="Repite la contraseña"
                        autoComplete="new-password"
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
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
                </div>

                <div className="form-terms">
                <label className="checkbox-wrapper">
                    <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    required
                    />
                    <span className="checkbox-mark"></span>
                    <span className="checkbox-label">
                    Acepto los <Link to="/terms">términos y condiciones</Link> y la <Link to="/privacy">política de privacidad</Link>
                    </span>
                </label>
                </div>

                <button
                type="submit"
                className="submit-button"
                disabled={loading}
                >
                {loading ? (
                    <>
                    <span className="spinner"></span>
                    <span>Registrando...</span>
                    </>
                ) : (
                    <>
                    <span>Crear Cuenta</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                    </>
                )}
                </button>
            </form>

            <div className="register-footer">
                <p>¿Ya tienes una cuenta?</p>
                <Link to="/login" className="login-link">
                Iniciar sesión
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
                <span>Tus datos están protegidos y cifrados</span>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Register;