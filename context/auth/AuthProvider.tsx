import { FC, useEffect, useReducer } from 'react';

import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

import Cookies from 'js-cookie';
import axios from 'axios';

import { authReducer, AuthContext } from './';
import { IUser } from '../../interfaces';
import { shopApi } from '../../api';

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
    const { data, status } = useSession();
    const router = useRouter();



    useEffect(() => {
        if (status === 'authenticated') {
            console.log({ user: data?.user });
            dispatch({ type: '[Auth] - Login', payload: data?.user as IUser })
        }

    }, [status, data])




    // useEffect(() => {
    //     checkToken();
    // }, []);

    const checkToken = async () => {

        if (!Cookies.get('token')) {
            return;
        }

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

    const logout = () => {
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');

        dispatch({ type: '[Auth] - Logout' });
        signOut();
        // router.reload();
        // Cookies.remove('token');
    }


    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}