import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { initialData } from "../../database/products";
import NextLink from "next/link";
import { ItemCounter } from "../ui";
import { FC } from "react";


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {

    return (
        <>
            {
                productsInCart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
                        <Grid item xs={3} >
                            {/* TODO: llevar a la página del productp */}
                            <NextLink href={`/product/slug`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.images[0]}`}
                                            component="img"
                                            alt={product.title}
                                            sx={{ borderRadius: '5%' }} />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display={'flex'} flexDirection={'column'} >
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'> Talla: <strong>M</strong></Typography>
                                {/* Condicional si es editable */}
                                {
                                    editable ? (
                                        <ItemCounter />
                                    ) : (
                                        <Typography variant='body1'>3 items<strong>1</strong></Typography>
                                    )
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='h2'>{`€ ${product.price}`}</Typography>
                            {/* Condicional si es editable */}
                            {
                                editable && (
                                    <Button variant='text' color='secondary' >Eliminar</Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    );
}
