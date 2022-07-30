import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    isLoggedIn: boolean;
    user?: IUser;

    // methods
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean, message?: string | undefined | any }>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);