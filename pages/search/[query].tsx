import type { GetServerSideProps, NextPage } from 'next'
import { Box, Typography } from '@mui/material'
import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layout';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';
import { db, dbProducts } from '../../database';
import { IProduct } from '../../interfaces';


interface Props {
    products: IProduct[],
    foundProducts: boolean,
    query: string,
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    return (
        <ShopLayout
            title="Shop Live"
            pageDescription="Busca los mejores productos para tu tienda"
            imageFull="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        >
            <Typography variant="h1" component='h1' >Buscar producto</Typography>
            {foundProducts
                ? (<Typography variant="h2" sx={{ mb: 1 }} textTransform='capitalize' > Término: {query}</Typography>)
                :
                (
                    <Box display='flex'>
                        <Typography variant="h2" sx={{ mb: 1 }}> No se han encontrado productos para </Typography>
                        <Typography variant="h2" sx={{ mb: 1 }} color='secondary'> : {query}</Typography>
                    </Box>
                )
            }
            <ProductList products={products} />
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string };

    if (query.trim().length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    // y no hay productos
    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0;

    // retornar todos los productos
    if (!foundProducts) {
        products = await dbProducts.getAllProducts();
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage;
