import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { ProductSlideshow, SizeSelector } from '@/components/products';
import { ItemCounter } from '@/components/ui';
import { ICartProduct, IProduct, ISize } from '@/interfaces';
import { dbProducts } from '@/database';

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    });

    const selectedSize = (size: ISize) => {
        setTempCartProduct((currentProduct) => ({
            ...currentProduct,
            size,
        }));
    };

    const onUpdateQuantity = (quantity: number) => {
        setTempCartProduct({
            ...tempCartProduct,
            quantity,
        });
    };

    const onAddProduct = () => {
        console.log({ tempCartProduct });
    };

    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <ProductSlideshow images={product.images} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* titulos */}
                        <Typography variant='h1' component='h1'>
                            {product.title}
                        </Typography>
                        <Typography variant='subtitle1' component='h2'>
                            {`$ ${product.price}`}
                        </Typography>
                        {/* cantidad */}
                        <Box sx={{ my: 2 }}>
                            <Typography variant='subtitle2'>
                                Cantidad
                            </Typography>
                            <ItemCounter
                                currentValue={tempCartProduct.quantity}
                                updateQuantity={onUpdateQuantity}
                                maxValue={
                                    product.inStock > 10 ? 10 : product.inStock
                                }
                            />
                            <SizeSelector
                                sizes={product.sizes}
                                selectedSize={tempCartProduct.size}
                                onSelectedSize={selectedSize}
                            />
                        </Box>
                        {product.inStock === 0 ? (
                            <Chip
                                label='No hay disponibles'
                                color='error'
                                variant='outlined'
                            />
                        ) : (
                            <Button
                                color='secondary'
                                className='circular-btn'
                                onClick={onAddProduct}
                            >
                                {tempCartProduct.size
                                    ? 'Agregar al carrito'
                                    : 'Seleccione una talla'}
                            </Button>
                        )}

                        <Box sx={{ mt: 3 }}>
                            <Typography variant='subtitle2'>
                                Descripción
                            </Typography>
                            <Typography variant='body2'>
                                {product.description}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const productSlugs = await dbProducts.getAllProductSlugs();

    return {
        paths: productSlugs.map(({ slug }) => ({
            params: { slug },
        })),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug = '' } = params as { slug: string };

    const product = await dbProducts.getProductBySlug(slug);

    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            product,
        },
        revalidate: 86400, // 60 * 60 * 24
    };
};

export default ProductPage;