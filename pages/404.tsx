import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layout';

const Custom404 = () => {
    return (
        <ShopLayout title={'Page not found'} pageDescription={'No se puede mostrar nada'} >
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
            >
                <Typography
                    variant='h1'
                    component='h1'
                    fontSize={100}
                    fontWeight={200}
                > 404 | </Typography>
                <Typography
                    marginLeft={2}
                > Page not found </Typography>
            </Box>

        </ShopLayout>
    );
}

export default Custom404;