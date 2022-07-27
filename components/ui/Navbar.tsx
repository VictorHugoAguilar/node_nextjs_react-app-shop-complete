import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material";
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { CartContext, UiContext } from '../../context';

export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toogleSideMenu } = useContext(UiContext);
    const { numberOfItems } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return;
        push(`/search/${searchTerm}`);
    }

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
                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
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
                <Box flex={1} />


                {/* Pantallas pantallas grandes */}
                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        :
                        (
                            <IconButton
                                onClick={() => setIsSearchVisible(true)}
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }


                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toogleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color="secondary">
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