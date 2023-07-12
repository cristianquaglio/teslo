import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts/ShopLayout';
import { initialData } from '@/database/products';
import { ProductList } from '@/components/products';

initialData;

export default function Home() {
    return (
        <ShopLayout
            title={'Teslo-Shop - Home'}
            pageDescription={'Encuentra lo mejor de Teslo aquí'}
        >
            <Typography variant='h1' component='h1'>
                Tienda
            </Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>
                Todos los productos
            </Typography>
            <ProductList products={initialData.products as any} />
        </ShopLayout>
    );
}
