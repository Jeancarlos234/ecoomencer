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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const validateForm = (): boolean => {
        if (form.contraseña !== form.contraseña_confirmation) {
        setError('Las contraseñas no coinciden');
        return false;
        }

        if (parseInt(form.edad) < 18) {
        setError('Debes ser mayor de 18 años');
        return false;
        }

        if (form.contraseña.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres');
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
        const response = await api.register(form);

        if (response.status === 'success') {
            setSuccess(response.message || 'Usuario registrado exitosamente');
            
            // Limpiar formulario
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

            // Redirigir al login después de 2 segundos
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
        <div className="register-card">
            <div className="register-header">
            <h1>Crear Cuenta</h1>
            <p>Regístrate para acceder a nuestra plataforma</p>
            </div>

            {error && (
            <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
            </div>
            )}

            {success && (
            <div className="alert alert-success">
                <span className="alert-icon">✓</span>
                <span>{success}</span>
            </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
                <div className="form-group">
                <label htmlFor="nombres">Nombres</label>
                <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={form.nombres}
                    onChange={handleChange}
                    placeholder="Ingresa tus nombres"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    placeholder="Ingresa tus apellidos"
                    required
                />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                <label htmlFor="nombre_usuario">Nombre de Usuario</label>
                <input
                    type="text"
                    id="nombre_usuario"
                    name="nombre_usuario"
                    value={form.nombre_usuario}
                    onChange={handleChange}
                    placeholder="Elige un nombre de usuario"
                    required
                />
                </div>

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
            </div>

            <div className="form-row">
                <div className="form-group">
                <label htmlFor="numero_cedula">Número de Cédula</label>
                <input
                    type="text"
                    id="numero_cedula"
                    name="numero_cedula"
                    value={form.numero_cedula}
                    onChange={handleChange}
                    placeholder="Ingresa tu número de cédula"
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="edad">Edad</label>
                <input
                    type="number"
                    id="edad"
                    name="edad"
                    value={form.edad}
                    onChange={handleChange}
                    placeholder="18"
                    min="18"
                    max="100"
                    required
                />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                <label htmlFor="contraseña">Contraseña</label>
                <div className="password-input">
                    <input
                    type={showPassword ? 'text' : 'password'}
                    id="contraseña"
                    name="contraseña"
                    value={form.contraseña}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
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

                <div className="form-group">
                <label htmlFor="contraseña_confirmation">Repetir Contraseña</label>
                <div className="password-input">
                    <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="contraseña_confirmation"
                    name="contraseña_confirmation"
                    value={form.contraseña_confirmation}
                    onChange={handleChange}
                    placeholder="Repite la contraseña"
                    required
                    />
                    <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                    {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="rol">Rol</label>
                <select
                id="rol"
                name="rol"
                value={form.rol}
                onChange={handleChange}
                className="form-select"
                >
                <option value="usuario">Usuario</option>
                <option value="administrador">Administrador</option>
                <option value="moderador">Moderador</option>
                <option value="owner">Owner</option>
                </select>
            </div>

            <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
            >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
            </form>

            <div className="register-footer">
            <p>¿Ya tienes cuenta?</p>
            <Link to="/login">Inicia sesión aquí</Link>
            </div>
        </div>
        </div>
    );
    };

    export default Register;