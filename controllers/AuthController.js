import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, {
        expiresIn: maxAge
    })
}

export const singup = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send('Arre yaar, email aur password toh daalna tha!');
        }

        const user = await User.create({ email, password });
        response.cookie('jwt', createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: 'None'
        });

        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        })

    } catch (error) {
        console.log('Error AuthControleer.singup: ', error);
        return response.status(500).send(`Arre yaar, server ne chhutti le li hai! Internal Server Error aa gaya hai. Thoda wait karo, sab theek ho jayega!
        `);
    }
}

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send('Arre yaar, email aur password toh daalna tha!');
        }

        const user = await User.findOne({ email });

        if(!user){
            return response.status(404).send('Arre yaar, User to nahi mil raha hai!');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return response.status(400).send('Arre yaar, Tumhara password  galat hai!');
        }

        response.cookie('jwt', createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: 'None'
        });

        return response.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
            }
        })

    } catch (error) {
        console.log('Error AuthControleer.login: ', error);
        return response.status(500).send(`Arre yaar, server ne chhutti le li hai! Internal Server Error aa gaya hai. Thoda wait karo, sab theek ho jayega!
        `);
    }
}