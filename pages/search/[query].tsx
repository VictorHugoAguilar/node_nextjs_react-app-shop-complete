import type { GetServerSideProps, NextPage } from 'next'
import { Typography } from '@mui/material'
import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layout';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';
import { db, dbProducts } from '../../database';
import { IProduct } from '../../interfaces';


interface Props {
    products: IProduct[]
}

const SearchPage: NextPage<Props> = ({ products }) => {

    return (
        <ShopLayout
            title="Shop Live"
            pageDescription="Busca los mejores productos para tu tienda"
            imageFull="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        >
            <Typography variant="h1" component='h1'  >Buscar producto</Typography>
            <Typography variant="h2" sx={{ mb: 1 }}   >Todos los productos</Typography>

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

    // TODO: retornar un error si no hay productos

    return {
        props: {
            products
        }
    }
}

export default SearchPage;
