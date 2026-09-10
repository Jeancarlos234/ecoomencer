    // src/types/api.ts

    export interface RegisterData {
    nombres: string;
    apellidos: string;
    nombre_usuario: string;
    correo: string;
    numero_cedula: string;
    edad: string;
    contraseña: string;
    contraseña_confirmation: string;
    rol: 'usuario' | 'administrador' | 'moderador' | 'owner';
    }

    export interface LoginData {
    correo: string;
    contraseña: string;
    }

    export interface User {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_usuario: string;
    correo: string;
    numero_cedula: string;
    edad: string;
    rol: 'usuario' | 'administrador' | 'moderador' | 'owner';
    created_at?: string;
    updated_at?: string;
    }

    export interface ApiResponse {
    status: 'success' | 'error';
    message: string;
    data?: User;
    errors?: Record<string, string[]>;
    token?: string;
    user?: User;
    }

    // ===== RECUPERACIÓN DE CONTRASEÑA =====
    export interface ForgotPasswordData {
    correo: string;
    }

    export interface VerifyTokenData {
    correo: string;
    token: string;
    }

    export interface ResetPasswordData {
    correo: string;
    token: string;
    contraseña: string;
    contraseña_confirmation: string;
    }

    export interface PasswordResetResponse {
    status: 'success' | 'error';
    message: string;
    errors?: Record<string, string[]>;
    }