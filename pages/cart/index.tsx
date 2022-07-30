import { useContext } from "react";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layout";
import { CartContext } from "../../context";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CartPage = () => {

    const { isLoaded, cart } = useContext(CartContext);
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && cart.length === 0) {
            console.log("CartPage - useEffect - isLoaded: false");
            router.replace("/cart/empty");
        }
    }, [isLoaded, cart, router]);

    if (!isLoaded || cart.length === 0) {
        return (<></>);
    }

    return (
        <ShopLayout title="Carrito" pageDescription="Carrito de compras de la tienda" >

            <Typography variant="h1" component="h1">Carrito</Typography>

            <Grid container >

                <Grid item xs={12} sm={7}>
                    {/* CartList */}
                    <CartList editable />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className="summary-cart" sx={{ padding: '5%' }}>
                        <CardContent>
                            <Typography variant="h2" component="h2">Resumen</Typography>
                            <Divider sx={{ my: 1 }} />
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button 
                                    color="secondary" 
                                    className='circular-btn' 
                                    fullWidth
                                    href="/checkout/address"
                                    >Checkout</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

        </ShopLayout >
    );
}

export default CartPage;