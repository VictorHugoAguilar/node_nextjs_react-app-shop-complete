import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ShopLayout } from "../../components/layout";
import NextLink from "next/link";

const EmptyPage = () => {
    return (
        <ShopLayout title="Carrito vacio" pageDescription="Carrito vacio" >
            <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh -200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }} >
                <RemoveShoppingCartOutlined />
                <Box display={'flex'} flexDirection={'column'} alignItems='center'>
                    <Typography variant="h1" component="h1" marginLeft={2}>Carrito está vacio</Typography>
                    <NextLink href="/" passHref>
                        <Link typography={'h4'} color='secondary'>
                            Regresar
                        </Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    )
}

export default EmptyPage;