import { useContext, useState } from "react";
import { GetServerSideProps, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { dbProducts } from "../../database";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { ItemCounter } from "../../components/ui";
import { ShopLayout } from "../../components/layout";
import { ProductSlide } from '../../components/products';
import { SizeSelector } from "../../components/ui/SizeSelector";
import { CartContext } from "../../context";

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

    const router = useRouter();
    const { addProductToCart } = useContext(CartContext);

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        description: product.description,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    });

    const selectedSize = (size: ISize) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            size
        }));
    }

    const onUpdateQuantity = (quantity: number) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            quantity
        }));
    }

    const onAddProduct = () => {
        if (!tempCartProduct.size) {
            console.info('Please select a size');
            return;
        }

        // Llamar a la accion del context para agregar al carrito
        addProductToCart(tempCartProduct);
        console.log({ tempCartProduct });
        router.push('/cart');
    }

    return (
        <ShopLayout title={product.title} pageDescription={product.description}  >
            <Grid container spacing={3} >
                {/* Slide of products */}
                <Grid item xs={12} sm={7}>
                    <ProductSlide images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}  >
                    <Box display={'flex'} flexDirection={'column'} >
                        {/* titulos */}
                        <Typography variant='h1' component='h1'>{product.title}  </Typography>
                        <Typography variant='subtitle1' component='h2' >{`€ ${product.price}`}  </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }} >
                        <Typography variant='subtitle2' >Cantidad </Typography>

                        <ItemCounter
                            currentValue={tempCartProduct.quantity}
                            updateQuantity={onUpdateQuantity}
                            maxValue={product.inStock > 10 ? 10 : product.inStock}
                        />
                        <SizeSelector
                            sizes={product.sizes}
                            selectedSize={tempCartProduct.size}
                            onSelectedSize={selectedSize}
                        />
                    </Box>
                    {/* agregar al carrito */}
                    {/* No hay disponibles */}
                    {
                        product.inStock > 0 ?
                            (
                                <Button color='secondary' className="circular-btn" fullWidth onClick={onAddProduct}>
                                    {
                                        tempCartProduct.size ? 'Agregar al carrito' : 'Selecciona un tamaño'
                                    }

                                </Button>
                            ) : (
                                <Chip color='error' label='No hay disponibles' variant='outlined' sx={{ width: '100%', mt: 1 }} />
                            )
                    }
                    <Box sx={{ mt: 3 }} >
                        <Typography variant='subtitle2' >Descripción </Typography>
                        <Typography variant='body2' >{product.description}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    );
}

// You should use getServerSideProps to fetch data from the server.
// This is the only way to fetch data from the server.
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const { slug = '' } = params as { slug: string };
//     const product = await dbProducts.getProductBySlug(slug);
//     if (!product) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             }
//         }
//     }
//     return {
//         props: {
//             product: product
//         }
//     }
// }

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const productSlugs = await dbProducts.getAllProductSlugs();
    return {
        paths: productSlugs.map(({ slug }) => ({
            params: {
                slug
            },
        })),
        fallback: "blocking"
    }
}

export const getStaticProps: GetServerSideProps = async ({ params }) => {
    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug(slug);
    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}

export default ProductPage;