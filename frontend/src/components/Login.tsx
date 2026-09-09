    // src/components/Login.tsx

    import React, { useState } from 'react';
    import type { FormEvent } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { api } from '../services/api';
    import type { LoginData } from '../types/api';
    import '../css/Login.css';

    const Login: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginData>({
        correo: '',
        contraseña: ''
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

        if (response.status === 'success') {
            // Guardar datos del usuario en localStorage
            if (response.token) {
            localStorage.setItem('token', response.token);
            }
            if (response.user) {
            localStorage.setItem('userRole', response.user.rol);
            localStorage.setItem('userData', JSON.stringify(response.user));
            }
            
            // Redirigir al dashboard después del login exitoso
            navigate('/dashboard');
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
        <div className="login-card">
            <h2>Iniciar Sesión</h2>
            
            {error && <div className="alert-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="correo">Correo Electrónico</label>
                <input
                type="email"
                id="correo"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="contraseña">Contraseña</label>
                <div className="password-input">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="contraseña"
                    name="contraseña"
                    value={form.contraseña}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    required
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
                </div>
            </div>

            <button type="submit" disabled={loading} className="submit-button">
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
            </form>

            <div className="login-footer">
            <p>¿No tienes cuenta?</p>
            <Link to="/register">Regístrate aquí</Link>
            </div>
        </div>
        </div>
    );
    };

    export default Login;