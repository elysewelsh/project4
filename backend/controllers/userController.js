import User from '../models/User.js'
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