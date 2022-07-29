import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layout";
import { validations } from '../../utils';

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = (data: FormData) => {
        console.log(data);
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