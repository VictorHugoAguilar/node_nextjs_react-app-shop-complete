import { Box, Button } from "@mui/material";
import { FC } from "react"
import { ISize } from "../../interfaces";

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
    return (
        <Box display='flex' justifyContent='space-around' sx={{ marginTop: 1, marginBottom: 1 }}>
            {
                sizes.map(size => (
                    <Button
                        key={size}
                        size='small'
                        color={selectedSize === size ? 'secondary' : 'primary'}
                        variant={selectedSize === size ? 'contained' : 'outlined'}
                    >
                        {size}
                    </Button>
                ))
            }
        </Box>
    )
}