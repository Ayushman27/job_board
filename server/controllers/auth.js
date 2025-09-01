import User from '../models/User.js';
import { signToken } from '../utils/token.js';


export const register = async (req, res) => {
const { name, email, password, role } = req.body;
const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ message: 'Email already registered' });
const user = await User.create({ name, email, password, role });
const token = signToken({ id: user._id, role: user.role });
res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
};


export const login = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email }).select('+password');
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const ok = await user.matchPassword(password);
if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
const token = signToken({ id: user._id, role: user.role });
res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
};