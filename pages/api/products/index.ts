import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
    | { message: string; }
    | IProduct[]
    | IProduct;


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res);

        default:
            res.status(400).json({ message: 'Bad request' });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()

    const products = await Product.find()
        .select('title images price inStock slug -_id' )
        .lean();

    await db.disconnect();

    return res.status(200).json(products);

}

