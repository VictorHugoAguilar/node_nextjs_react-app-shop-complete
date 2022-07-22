import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { ShopLayout } from "../../components/layout";
import { IProduct } from "../../interfaces";

interface Props {
    product: IProduct;
}

const ProductPage: FC<Props> = ({ product }) => {
    return (
        <ShopLayout title={product.title} pageDescription={product.description}  >
            <Grid container spacing={3} >
                <Grid item xs={12} sm={7}>
                </Grid>
                <Grid item xs={12} sm={5}  >
                    <Box display={'flex'} flexDirection={'column'} >
                        {/* titulos */}
                        <Typography variant='h1' component='h1'>{product.title}  </Typography>
                        <Typography variant='subtitle1' component='h2' >{`€ ${product.price}`}  </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} >
                        <Typography variant='subtitle2' >Cantidad </Typography>
                    </Box>
                    {/* agregar al carrito */}
                    <Box color='secondary' className="circular-btn" > Agregar al carrito </Box>
                    {/*  */}
                </Grid>
            </Grid>
        </ShopLayout>
    );
}

export default ProductPage;