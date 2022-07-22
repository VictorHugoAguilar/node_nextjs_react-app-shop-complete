import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <NextLink href="/" passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant="h6">Live |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>
                {/** todo flex */}
                <Box flex={1} >
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href={'/category/men'} passHref>
                        <Link >
                            <Button  >Hombre</Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/women'} passHref>
                        <Link>
                            <Button >Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/kid'} passHref>
                        <Link>
                            <Button >Niños</Button>
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
                <Button>
                    Menú
                </Button>
            </Toolbar>
        </AppBar>
    )
}