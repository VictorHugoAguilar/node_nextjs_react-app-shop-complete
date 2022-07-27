import { FC } from "react"
import { Grid } from "@mui/material";
import { IProduct } from "../../interfaces";
import { ProductCard } from "./";

interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
    return (
        <Grid container spacing={4}>
            {
                products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))
            }
        </Grid>
    )
}
