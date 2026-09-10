    // src/services/api.ts

import type {
  RegisterData,
  LoginData,
  ApiResponse,
  ForgotPasswordData,
  VerifyTokenData,
  ResetPasswordData,
  PasswordResetResponse,
} from '../types/api';


    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

    export const api = {
    async register(data: RegisterData): Promise<ApiResponse> {
        try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result: ApiResponse = await response.json();
        
        if (!response.ok) {
            const errorMessage = result.errors 
            ? Object.values(result.errors).flat().join(', ')
            : result.message || 'Error al registrar usuario';
            throw new Error(errorMessage);
        }
        
        return result;
        } catch (error) {
        console.error('Error en register:', error);
        throw error;
        }
    },

    async login(data: LoginData): Promise<ApiResponse> {
        try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const result: ApiResponse = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Error al iniciar sesión');
        }
        
        return result;
        } catch (error) {
        console.error('Error en login:', error);
        throw error;
        }
    },
    
    // ===== RECUPERACIÓN DE CONTRASEÑA =====
    async forgotPassword(data: ForgotPasswordData): Promise<PasswordResetResponse> {
        const response = await fetch(`${API_URL}/password/forgot`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
        });

        const result: PasswordResetResponse = await response.json();

        if (!response.ok) {
        const errorMessage = result.errors
            ? Object.values(result.errors).flat().join(', ')
            : result.message || 'Error al enviar el correo';
        throw new Error(errorMessage);
        }
        return result;
    },

    async verifyResetToken(data: VerifyTokenData): Promise<PasswordResetResponse> {
        const response = await fetch(`${API_URL}/password/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
        });

        const result: PasswordResetResponse = await response.json();

        if (!response.ok) {
        throw new Error(result.message || 'Token inválido');
        }
        return result;
    },

    async resetPassword(data: ResetPasswordData): Promise<PasswordResetResponse> {
        const response = await fetch(`${API_URL}/password/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
        });
        
        const result: PasswordResetResponse = await response.json();
        if (!response.ok) {
        const errorMessage = result.errors
            ? Object.values(result.errors).flat().join(', ')
            : result.message || 'Error al restablecer la contraseña';
        throw new Error(errorMessage);
        }
        return result;
    },
};