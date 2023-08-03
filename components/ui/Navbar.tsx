import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
    AppBar,
    Badge,
    Box,
    Button,
    IconButton,
    Input,
    InputAdornment,
    Link,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    ClearOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from '@mui/icons-material';

import { CartContext, UIContext } from '@/context';

export const Navbar = () => {
    const { asPath, push } = useRouter();

    const { toggleSideMenu } = useContext(UIContext);
    const { numberOfItems } = useContext(CartContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.length === 0) return;
        push(`/search/${searchTerm}`);
    };

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref legacyBehavior>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6'>Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box sx={{ flex: 1 }} />

                <Box
                    sx={{
                        display: isSearchVisible
                            ? 'none'
                            : { xs: 'none', sm: 'block' },
                    }}
                    className='fadeIn'
                >
                    <NextLink href='/category/men' passHref legacyBehavior>
                        <Link>
                            <Button
                                color={
                                    asPath === '/category/men'
                                        ? 'info'
                                        : 'primary'
                                }
                            >
                                Hombres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref legacyBehavior>
                        <Link>
                            <Button
                                color={
                                    asPath === '/category/women'
                                        ? 'info'
                                        : 'primary'
                                }
                            >
                                Mujeres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref legacyBehavior>
                        <Link>
                            <Button
                                color={
                                    asPath === '/category/kid'
                                        ? 'info'
                                        : 'primary'
                                }
                            >
                                Niños
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box sx={{ flex: 1 }} />

                {/* pantallas grandes */}

                {isSearchVisible ? (
                    <Input
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={(e) =>
                            e.key === 'Enter' ? onSearchTerm() : null
                        }
                        type='text'
                        placeholder='Buscar...'
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={() => setIsSearchVisible(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                ) : (
                    <IconButton
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        onClick={() => setIsSearchVisible(true)}
                        className='fadeIn'
                    >
                        <SearchOutlined />
                    </IconButton>
                )}

                {/* pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref legacyBehavior>
                    <Link>
                        <IconButton>
                            <Badge
                                badgeContent={
                                    numberOfItems > 9 ? '+9' : numberOfItems
                                }
                                color='secondary'
                            >
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toggleSideMenu}>Menú</Button>
            </Toolbar>
        </AppBar>
    );
};
