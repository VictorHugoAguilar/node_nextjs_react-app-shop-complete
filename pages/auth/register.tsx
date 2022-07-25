import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../../components/layout";

const RegisterPage = () => {
    return (
        <AuthLayout title="Iniciar sesión" pageDescription="Iniciar sesión">
            <Box sx={{ width: 450, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">Crear cuenta</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Nombre completo" variant="filled" fullWidth />
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
                        >Crear cuenta</Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='end' >
                        <NextLink href="/auth/login" passHref>
                            <Link underline="hover" color={'black'} > ¿Ya tienes cuenta? </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage;