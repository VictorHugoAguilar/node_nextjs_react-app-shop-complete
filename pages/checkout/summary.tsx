import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layout";
import NextLink from 'next/link';
import { useContext } from "react";
import { CartContext } from "../../context";
import { countries } from "../../utils";

const SummaryPage = () => {

    const { shippingAddress, numberOfItems } = useContext(CartContext);

    if (!shippingAddress) {
        return (<></>);
    }

    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

    return (
        <ShopLayout title="Resumen de compra" pageDescription="Resumen de la orden" >

            <Typography variant="h1" component="h1">Resumen</Typography>

            <Grid container >

                <Grid item xs={12} sm={7}>
                    {/* CartList */}
                    <CartList editable />
                </Grid>

                <Grid item xs={12} sm={5}>

                    <Card className="summary-cart" sx={{ padding: '5%' }}>

                        <CardContent>

                            <Typography variant="h2" component="h2">Resumen ({numberOfItems}{numberOfItems === 1 ? ' producto' : ' productos'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="subtitle1" > Dirección de entrega</Typography>
                                <NextLink href={"/cart"} passHref>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{address}{address2 ? `, ${address2}` : ''} </Typography>
                            <Typography>{city}, {zip}</Typography>
                            <Typography>{countries.find(c => c.code === country)?.name}</Typography>
                            <Typography>{phone}</Typography>

                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle1" > Orden</Typography>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color="primary" className='circular-btn' fullWidth>Confirmar compra</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout >
    );
}

export default SummaryPage;