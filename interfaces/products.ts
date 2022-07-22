export interface IProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ISizes[];
    slug: string;
    tags: string[];
    title: string;
    type: IType;
    gender: 'men' | 'women' | 'kid' | 'unisex'
}

export type ISizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type IType = 'shirts' | 'pants' | 'hoodies' | 'hats';