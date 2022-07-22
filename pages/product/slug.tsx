import { FC } from "react";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layout";
import { initialData } from "../../database/products";
import { IProduct } from "../../interfaces";
import { ProductSlideshow } from '../../components/products';
import { ItemCounter } from "../../components/ui";

interface Props {
    product: IProduct;
}

const product = initialData.products[0]

const ProductPage: FC<Props> = () => {
    return (
        <ShopLayout title={product.title} pageDescription={product.description}  >
            <Grid container spacing={3} >
                {/* Slide of products */}
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}  >
                    <Box display={'flex'} flexDirection={'column'} >
                        {/* titulos */}
                        <Typography variant='h1' component='h1'>{product.title}  </Typography>
                        <Typography variant='subtitle1' component='h2' >{`€ ${product.price}`}  </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} >
                        <Typography variant='subtitle2' >Cantidad </Typography>
                        <ItemCounter />
                    </Box>
                    {/* agregar al carrito */}
                    <Button color='secondary' className="circular-btn" fullWidth  >Agregar al carrito </Button>
                    {/* No hay disponibles */}
                    {/*<Chip label='No hay disponibles' color='error' variant='outlined' fullWidth/>*/}
                    {/* Description */}
                    <Box sx={{ mt: 3 }} >
                        <Typography variant='subtitle2' >Descripción </Typography>
                        <Typography variant='body2' >{product.description}</Typography>
                    </Box>

                </Grid>
            </Grid>
        </ShopLayout>
    );
}

export default ProductPage;