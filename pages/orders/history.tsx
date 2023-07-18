import { Chip, Grid, Link, Typography } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridValueGetterParams,
} from '@mui/x-data-grid';

import { ShopLayout } from '@/components/layouts';
import NextLink from 'next/link';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra si la orden está pagada o no',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return params.row.paid ? (
                <Chip color='success' label='Pagada' variant='outlined' />
            ) : (
                <Chip color='error' label='No pagada' variant='outlined' />
            );
        },
    },
    {
        field: 'order',
        headerName: 'Orden',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink
                    href={`/orders/${params.row.id}`}
                    passHref
                    legacyBehavior
                >
                    <Link underline='always'>Ver orden</Link>
                </NextLink>
            );
        },
    },
];

const rows = [
    {
        id: 1,
        paid: true,
        fullname: 'Cristian Q',
        order: 1,
    },
    {
        id: 2,
        paid: false,
        fullname: 'Adrian Ramirez',
        order: 2,
    },
    {
        id: 3,
        paid: true,
        fullname: 'Noelia Gallo',
        order: 3,
    },
    {
        id: 4,
        paid: false,
        fullname: 'Ruben Palacios',
        order: 4,
    },
    {
        id: 5,
        paid: false,
        fullname: 'Ariel Fonseca',
        order: 5,
    },
    {
        id: 6,
        paid: true,
        fullname: 'Susana Gimenez',
        order: 6,
    },
];

const HistoryPage = () => {
    return (
        <ShopLayout
            title='Historial de ordenes'
            pageDescription='Historial de ordenes del cliente'
        >
            <Typography variant='h1' component='h1'>
                Historial de órdenes
            </Typography>
            <Grid container>
                <Grid item sx={{ height: 650, width: '100%' }} xs={12}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10]}
                    />
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default HistoryPage;
