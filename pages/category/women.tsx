import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { useProducts } from '../../hooks';
import { ShopLayout } from '../../components/layout';
import { FullScreenLoading } from '../../components/ui';
import { ProductList } from '../../components/products';

const WomenPage: NextPage = () => {
    const { products, isLoading } = useProducts('/products?gender=women');
    return (
        <ShopLayout
            title="Shop Live"
            pageDescription="Busca los mejores productos para tu tienda"
            imageFull="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        >
            <Typography variant="h1" component='h1' >Mujeres</Typography>
            <Typography variant="h2" sx={{ mb: 1 }} >Productos para ella</Typography>
            {
                isLoading ?
                    (<FullScreenLoading />)
                    :
                    (<ProductList products={products} />)
            }
        </ShopLayout>
    )
}

export default WomenPage;
