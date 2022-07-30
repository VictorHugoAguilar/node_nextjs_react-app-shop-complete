import { useContext, useEffect, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from "../../components/layout";
import { validations } from '../../utils';
import { AuthContext } from '../../context';
import { GetServerSideProps } from 'next';

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {

    const router = useRouter();
    const { loginUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            console.log('providers => ', prov);
            setProviders(prov);
        });
    }, []);

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);

        // const isValidLogin = await loginUser(email, password);

        // if (!isValidLogin) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        //     return;
        // }

        // const destination = router.query.p?.toString() || '/';
        // // Navegar a la pantalla que el usuario estaba antes de hacer login
        // router.replace(destination);

        await signIn('credentials', { email, password });
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
                                type='email'
                                label="Correo electrónico"
                                variant="filled"
                                autoComplete='email'
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
                                autoComplete='current-password'
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
                            <NextLink
                                href={router.query.p ? `/auth/register?p=${router.query.p}` : `/auth/register`}
                                passHref
                            >
                                <Link underline="hover" color={'black'} >¿No tienes una cuenta?, registrate aquí</Link>
                            </NextLink>
                        </Grid>

                        <Grid item
                            xs={12}
                            display='flex'
                            flexDirection='column'
                            justifyContent='end'
                        >
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values(providers).map(provider => {
                                    if (provider.id == 'credentials') {
                                        return (<div key={provider.id}></div>);
                                    }

                                    return (
                                        <Button key={provider.id}
                                            variant="outlined"
                                            color="primary"
                                            size="large"
                                            fullWidth
                                            onClick={() => signIn(provider.id)}
                                        >{provider.name}</Button>
                                    )
                                })
                            }
                        </Grid>

                    </Grid>

                </Box>

            </form>

        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {
        }
    }
}

export default LoginPage;