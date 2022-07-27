import { db } from "./"
import { IProduct } from "../interfaces";
import { Product } from "../models";

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    if (!product) {
        return null;
    }
    return JSON.parse(JSON.stringify(product));
}
interface ProductSlug {
    slug: string;
}
export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();
    return slugs;
}