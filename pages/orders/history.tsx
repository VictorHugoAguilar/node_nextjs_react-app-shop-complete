import { Chip, Grid, Link, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ShopLayout } from "../../components/layout";
import NextLink from 'next/link';

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fullname", headerName: "Nombre Completo", width: 300 },
    {
        field: 'paid',
        headerName: 'Pagado',
        description: 'Muestra información si esta pagado',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (params.row.paid
                ? <Chip color='success' label='Pagado' variant="outlined" />
                : <Chip color='error' label='No Pagado' variant="outlined" />
            )
        }
    },
    {
        field: 'order',
        headerName: 'Ver pedido',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='hover' color='black'  >
                        Ver pedido
                    </Link>
                </NextLink>
            )
        }
    },
]

const rows = [
    { id: 1, paid: true, fullname: "Victor Hugo Aguilar" },
    { id: 2, paid: false, fullname: "Jose Hugo Aguilar" },
    { id: 3, paid: false, fullname: "Manuel Hugo Aguilar" },
    { id: 4, paid: true, fullname: "Lucas Hugo Aguilar" },
    { id: 5, paid: true, fullname: "Miguel Hugo Aguilar" },
]

const HistoryPage = () => {
    return (
        <ShopLayout title="Historial de ordenes" pageDescription="Historial de ordenes" >
            <Typography variant="h1" component="h1">Historial de ordenes</Typography>
            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </ShopLayout>
    );
}

export default HistoryPage;