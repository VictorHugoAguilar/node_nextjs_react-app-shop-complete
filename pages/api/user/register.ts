import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';
import bcrypt from 'bcryptjs';

type Data = | { message: string; }
    | { token: string; user: { name: string; email: string; role: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'POST':
            return registerUser(req, res);
        default:
            res.status(400).json({ message: 'Bad request' });
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Bad request' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (password.length < 2) {
        return res.status(400).json({ message: 'Password must be at least 2 characters long' });
    }

    // TODO: validate email

    await db.connect();
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name: name
    })

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        return res.status(500).json({ message: 'Check logs en el server' });
    }
    await db.disconnect();

    const token = jwt.signToken(newUser._id, newUser.email);

    return res.status(200).json({
        token, user: {
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        }
    });
}