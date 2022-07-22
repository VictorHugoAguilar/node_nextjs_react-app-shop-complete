import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layout'

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title="Shop Live"
      pageDescription="Busca los mejores productos para tu tienda"
      imageFull="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
    >
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }} >Todos los productos</Typography>

    </ShopLayout>
  )
}

export default HomePage
