import { FC } from "react";
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layout";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

const OrderPage: FC = () => {
    return (
        <ShopLayout title="Resumen de orden 123" pageDescription="Resumen de la orden" >

            <Typography variant="h1" component="h1">Orden: ABC123</Typography>

            <Chip sx={{ my: 2 }} label="Pago Pendiente" variant="outlined"
                color='error' icon={<CreditCardOffOutlined />}
            />

            <Chip sx={{ my: 2 }} label="La orden ya fue pagada" variant="outlined"
                color='success' icon={<CreditScoreOutlined />}
            />

            <Grid container >
                <Grid item xs={12} sm={7}>
                    {/* CartList */}
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-cart" sx={{ padding: '5%' }}>
                        <CardContent>
                            <Typography variant="h2" component="h2">Resumen (3 productos)</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant="subtitle1" > Dirección de entrega</Typography>
                                <NextLink href={"/cart"} passHref>
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography>Victor Hugo Aguilar</Typography>
                            <Typography>Av. Siempre Viva 123</Typography>
                            <Typography>Ciudad</Typography>
                            <Typography>Código Postal</Typography>
                            <Typography>Teléfono</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle1" > Orden</Typography>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <h1>Pagar</h1>
                                <Chip sx={{ my: 2 }} label="La orden ya fue pagada" variant="outlined"
                                    color='success' icon={<CreditScoreOutlined />}
                                />
                                <Button color="secondary" className='circular-btn' fullWidth>Confirmar compra</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout >
    );

}

export default OrderPage;