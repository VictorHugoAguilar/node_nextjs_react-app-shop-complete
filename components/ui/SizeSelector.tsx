import { FC } from "react";
import { Box, Button } from "@mui/material";
import { ISize } from "../../interfaces";

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];

    // methods
    onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
    return (
        <Box display='flex' justifyContent='space-around' sx={{ marginTop: 1, marginBottom: 1 }}>
            {
                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        color={selectedSize === size ? 'secondary' : 'primary'}
                        variant={selectedSize === size ? 'contained' : 'outlined'}
                        onClick={() => onSelectedSize(size)}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    )
}