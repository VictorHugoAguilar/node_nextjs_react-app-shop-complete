import { FC } from "react";
import { Slide } from "react-slideshow-image";


interface Props {
    images: string[];
}

export const ProductSlideShow: FC<Props> = ({ images }) => {
    return (
        <Slide
            easing="ease"
            autoplay={true}
            duration={3000}
            indicators>
            {images.map(image => {
                const url = `/products/${image}`;
                return (
                    <div className="" key={image}>
                        <div style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: 'cover',
                        }}>
                        </div>
                    </div>
                )
            })
            }
        </Slide>
    )
} 