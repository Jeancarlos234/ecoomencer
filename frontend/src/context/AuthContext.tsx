    // src/context/AuthContext.tsx

    import { createContext } from 'react';

    export interface UserData {
    id: number;
    nombres: string;
    apellidos: string;
    nombre_usuario: string;
    correo: string;
    rol: 'usuario' | 'administrador' | 'moderador' | 'owner';
    }

    export interface AuthContextType {
    user: UserData | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: UserData) => void;
    logout: () => void;
    }

    export const AuthContext = createContext<AuthContextType | undefined>(undefined);