import { Cookie } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FC, useEffect, useReducer } from 'react';
import { shopApi } from '../../api';
import { IUser } from '../../interfaces';
import { authReducer, AuthContext } from './';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            const { data } = await shopApi.post('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await shopApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });

            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.message);
                return false
            }

            return false
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean, message?: string | undefined | any }> => {
        try {
            const { data } = await shopApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });

            return {
                hasError: false,
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error.message);
                return {
                    hasError: true,
                    message: error.response?.data
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente nuevamente'
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // methods
            loginUser,
            registerUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}