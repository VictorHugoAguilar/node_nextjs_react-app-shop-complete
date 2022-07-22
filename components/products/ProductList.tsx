import { Grid } from "@mui/material";
import { FC } from "react"
import { IProduct } from "../../interfaces";

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
    return (
        <Grid container spacing={4}>
            {
                products.map(product => (
                    <></>
                ))
            }
        </Grid>
    )
}
