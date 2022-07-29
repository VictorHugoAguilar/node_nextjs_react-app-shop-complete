import { useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from "../../components/layout";
import { validations } from '../../utils';
import { shopApi } from '../../api';

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async ({ email, password }: FormData) => {
        console.log('onLoginUser', email, password);

        setShowError(false);
        try {
            const { data } = await shopApi.post('/user/login', { email, password });
            const { token, user } = data;
        } catch (error) {
            setShowError(true);
            if (axios.isAxiosError(error)) {
                console.error(error.message);
            }
            setTimeout(() => setShowError(false), 3000);
        }

        // TODO: navegar a la pantalla que el usuario estaba antes de hacer login
    }

    return (
        <AuthLayout title="Iniciar sesión" pageDescription="Iniciar sesión">
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 450, padding: '10px 20px' }}>

                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Iniciar sesión</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type={'email'}
                                label="Correo electrónico"
                                variant="filled"
                                fullWidth
                                {...register('email', {
                                    required: 'El correo electrónico es requerido',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                {...register('password', {
                                    required: 'El password es requerido',
                                    minLength: { value: 6, message: 'El password debe tener al menos 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        {
                            showError ? (
                                <Grid item xs={12} display='flex' justifyContent='right'>
                                    <Chip
                                        label='No reconocemos ese usuario/contraseña'
                                        color='error'
                                        icon={<ErrorOutline />}
                                        variant='outlined'
                                        className='fadeIn'
                                        sx={{ width: '80%' }}
                                    />
                                </Grid>
                            ) : null
                        }

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                className="circular-btn"
                                color="secondary"
                                size="large"
                                sx={{ mt: 1 }}
                                fullWidth
                            >Iniciar sesión</Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end' >
                            <NextLink href="/auth/register" passHref>
                                <Link underline="hover" color={'black'} >¿No tienes una cuenta?, registrate aquí</Link>
                            </NextLink>
                        </Grid>

                    </Grid>

                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage;