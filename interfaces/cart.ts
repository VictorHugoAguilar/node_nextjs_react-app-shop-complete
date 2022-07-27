import { ISize } from "./";

export interface ICartProduct {
    _id: string;
    description: string;
    image: string;
    price: number;
    sizes: ISize;
    slug: string;
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex';
    quantity: number;
}