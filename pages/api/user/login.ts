import {NextApiRequest, NextApiResponse} from 'next';
import {db} from '../../../database';
import {User} from '../../../models';
import bcrypt from 'bcryptjs';
import {jwt} from '../../../utils/';

type Data = | { message: string; }
    | {
    token: string, user: {
        email: string;
        name: string;
        role: string;
    }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res);
        default:
            res.status(400).json({message: 'Bad request'});
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'Bad request'});
    }

    await db.connect();
    const user = await User.findOne({email});
    await db.disconnect();

    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({message: 'Wrong password'});
    }

    const token = jwt.signToken(user._id, user.email);

    return res.status(200).json({
        token: token,
        user: {
            role: user.role,
            name: user.name,
            email: user.email,
        },
    });

}