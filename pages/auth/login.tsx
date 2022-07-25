import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layout";
import NextLink from 'next/link';


const LoginPage = () => {
    return (
        <AuthLayout title="Iniciar sesión" pageDescription="Iniciar sesión">
            <Box sx={{ width: 450, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">Iniciar sesión</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Correo electrónico" variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Contraseña" type='password' variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
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
        </AuthLayout>
    )
}

export default LoginPage;