import { useState } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from "../../components/layout";
import { shopApi } from '../../api';
import { validations } from '../../utils';

type FormData = {
    name: string;
    email: string;
    password: string;
};

const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onRegisterUser = async ({ name, email, password }: FormData) => {
        setShowError(false);
        try {
            const { data } = await shopApi.post('/user/register', { name, email, password });
            const { token, user } = data;

        } catch (error) {
            setShowError(true);
            if (axios.isAxiosError(error)) {
                console.error(error.response?.data);
            }
            setTimeout(() => setShowError(false), 3000);
        }

        // TODO: navegar a la pantalla que el usuario estaba antes de hacer login
    }

    return (
        <AuthLayout title="Iniciar sesión" pageDescription="Iniciar sesión">

            <form onSubmit={handleSubmit(onRegisterUser)} noValidate>

                <Box sx={{ width: 450, padding: '10px 20px' }}>

                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Crear cuenta</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Nombre completo"
                                autoComplete='name'
                                variant="filled"
                                fullWidth
                                {...register('name', {
                                    required: 'El nombre es requerido',
                                    minLength: {
                                        value: 6,
                                        message: 'El nombre debe tener al menos 6 caracteres'
                                    }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label="Correo electrónico"
                                variant="filled"
                                autoComplete='email'
                                fullWidth
                                {...register('email', {
                                    required: 'El email es requerido',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                autoComplete='current-password'
                                fullWidth
                                {...register('password', {
                                    required: 'El password es requerido',
                                    minLength: {
                                        value: 6,
                                        message: 'El password debe tener al menos 6 caracteres'
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message} />
                        </Grid>

                        {
                            showError ? (
                                <Grid item xs={12} display='flex' justifyContent='right'>
                                    <Chip
                                        label='Error en algún campo'
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
                            >Crear cuenta</Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end' >
                            <NextLink href="/auth/login" passHref>
                                <Link underline="hover" color={'black'} > ¿Ya tienes cuenta? </Link>
                            </NextLink>
                        </Grid>

                    </Grid>

                </Box>

            </form>

        </AuthLayout >
    )
}

export default RegisterPage;