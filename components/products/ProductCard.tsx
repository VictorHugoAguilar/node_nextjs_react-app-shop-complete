import { FC, useMemo, useState } from "react";
import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material";
import { IProduct } from "../../interfaces";

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const productImage = useMemo(() => {
        return isHovered
            ? `products/${product.images[1]}`
            : `products/${product.images[0]}`
    }, [isHovered, product.images]);
    return (
        <Grid
            item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card>
                <CardActionArea>
                    <CardMedia
                        component='img'
                        className="fadeIn"
                        image={productImage}
                        title={product.title}
                        onLoad={() => console.log('loaded')}
                    />
                </CardActionArea>
            </Card>
            <Box
                sx={{ mt: 1 }}
                className='fadeIn'
            >
                <Typography
                    fontWeight={700}
                >{product.title}
                </Typography>
                <Typography
                    fontWeight={500}
                >{`€ ${product.price} `}
                </Typography>
            </Box>
        </Grid>
    )
}