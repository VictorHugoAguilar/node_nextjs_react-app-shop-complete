import { Grid, Typography } from "@mui/material"
import { FC } from "react"


export const OrderSymmary: FC = () => {
    return (
        <Grid container>
            <Grid item xs={6} >
                <Typography>Nº Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>1 item</Typography>
            </Grid>

            <Grid item xs={6} >
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography> {`$${145.54}`} </Typography>
            </Grid>

            <Grid item xs={6} >
                <Typography>Impuestos (%21)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography> {`$${45.54}`} </Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
                <Typography variant='subtitle1'> {`$${215.54}`} </Typography>
            </Grid>
        </Grid>
    )
}