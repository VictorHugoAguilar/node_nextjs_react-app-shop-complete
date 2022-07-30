import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layout";
import { CartContext } from "../../context";
import { countries, jwt } from "../../utils";

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}


const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
    }
}

const AddressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onSubmitAddress = (data: FormData) => {
        updateAddress(data);
        router.push('/checkout/summary');
    }


    return (
        <ShopLayout title="Dirección" pageDescription="Dirección de envío" >

            <form onSubmit={handleSubmit(onSubmitAddress)}>
                <Typography variant="h1" component="h1">Dirección</Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre"
                            fullWidth
                            variant="filled"
                            {
                            ...register('firstName', {
                                required: 'este campo es requerido'
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Apellido"
                            fullWidth
                            variant="filled"
                            {
                            ...register('lastName', {
                                required: 'este campo es requerido'
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Dirección"
                            fullWidth
                            variant="filled"
                            {
                            ...register('address', {
                                required: 'este campo es requerido'
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Direccion 2 (opcional)"
                            fullWidth
                            variant="filled"
                            {
                            ...register('address2', {
                            })}
                            error={!!errors.address2}
                            helperText={errors.address2?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Código Postal"
                            fullWidth
                            variant="filled"
                            {
                            ...register('zip', {
                                required: 'este campo es requerido'
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Ciudad"
                            fullWidth
                            variant="filled"
                            {
                            ...register('city', {
                                required: 'este campo es requerido'
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>País</InputLabel>
                            <Select
                                defaultValue={countries[0].code}
                                variant="filled"
                                label='País'
                                value={'ARG'}
                                {
                                ...register('country', {
                                    required: 'este campo es requerido'
                                })}
                                error={!!errors.country}
                            // helperText={errors.country?.message}
                            >
                                {
                                    countries.map(country => (
                                        <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Teléfono"
                            fullWidth
                            variant="filled"
                            {
                            ...register('phone', {
                                required: 'este campo es requerido'
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>

                </Grid>

                {/* Button */}
                <Box sx={{ mt: 5 }} display='flex' justifyContent={'center'} >
                    <Button type='submit' color='secondary' className="circular-btn" size='large'>
                        Revisar pedido
                    </Button>
                </Box>

            </form>

        </ShopLayout>
    )
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken(token);
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {},
//     }
// }


export default AddressPage;