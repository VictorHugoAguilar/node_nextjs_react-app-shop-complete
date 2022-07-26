import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { UiContext } from '../../context';

export const Navbar = () => {

    const { asPath } = useRouter();
    const { toogleSideMenu } = useContext(UiContext);

    return (
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref>
                    <Link display='flex' alignItems='center' underline='none' color='black'>
                        <Typography variant="h6">Live |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>
                {/** todo flex */}
                <Box flex={1} >
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href={'/category/men'} passHref>
                        <Link underline='none' color='black'>
                            <Button color={asPath === '/category/men' ? 'secondary' : 'primary'} >Hombre</Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/women'} passHref>
                        <Link underline='none' color='black'>
                            <Button color={asPath === '/category/women' ? 'secondary' : 'primary'}>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/kid'} passHref>
                        <Link underline='none' color='black'>
                            <Button color={asPath === '/category/kid' ? 'secondary' : 'primary'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>
                {/** todo flex */}
                <Box flex={1} >
                </Box>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
                <Button onClick={toogleSideMenu}>
                    Menú
                </Button>
            </Toolbar>
        </AppBar>
    )
}