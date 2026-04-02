import User from '../models/User.js'
// import signToken from '../utils/token.js'

import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiration = "24h";
 
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const payload = { 
        username: user.username,
        email: user.email,
        _id: user._id
    }
    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration})
    // const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json(err);
  }
}
 
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }
        
        const correctPw = await user.isCorrectPassword(req.body.password);
        
        if (!correctPw) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }
        
        const payload = { 
            username: user.username,
            email: user.email,
            _id: user._id
        }
        const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration})

        // const token = signToken({data: payload}});
        res.status(201).json({ token, user });
    }
    catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
}

const verifyUser = (req, res) => {
    res.status(200).json(req.user)
}
 
export default {
    createUser,
    loginUser,
    verifyUser
}





// import express from 'express'
// import User from '../models/User.js'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import { authMiddleware } from '../utils/auth.js'

// const router = express.Router()
// const saltRounds = 10
// const secret = process.env.JWT_SECRET
// const expiration = '24h'

// router.post('/register', async (req, res) => {
//     try {
// // hash the password
//         const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        
//         const user = await User.create({
//             ...req.body,
//             password: hashedPassword
//         })
// // create a token      
//         const payload = { 
//             username: user.username,
//             email: user.email,
//             _id: user._id
//         }
//         const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration})
// // send response
//         res.status(201).json({ token, user })
//     } catch (err) {
//         console.error(err)
//         res.status(400).json(err)
//     }
// })

// router.post('/login', async (req, res) => {
//     try {
// // find the user
//         const user = await User.findOne({ email: req.body.email })
// // check if user exists
//         if (!user) {
//            return res.status(400).json({ message: 'Incorrect email or password'})
//         }
// // check password
//         const correctPassword = await bcrypt.compare(req.body.password, user.password)

//         if (!correctPassword) {
//             return res.status(400).json({ message: 'Incorrect email or password'})
//         }
// // create token
//         const payload = { 
//             username: user.username,
//             email: user.email,
//             _id: user._id
//         }
//         const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration})
// // send response
//         res.status(201).json({ token, user })
//     }
//     catch (err) {
//         console.error(err)
//         res.status(400).json(err)
//     }
// })

// // verify the logged-in user's token
// router.use(authMiddleware)
// // after verification, send back user details
// router.get('/', (req, res) => {
//     res.status(200).json(req.user)
// })

// export default router