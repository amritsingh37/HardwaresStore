const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) { res.status(400); throw new Error('Name, email and password are required'); }
    const existing = await User.findOne({ email });
    if (existing) { res.status(400); throw new Error('An account with that email already exists'); }
    const user = await User.create({ name, email, password });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: signToken(user._id) });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) { res.status(401); throw new Error('Invalid email or password'); }
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: signToken(user._id) });
  } catch (err) { next(err); }
};

module.exports = { register, login };