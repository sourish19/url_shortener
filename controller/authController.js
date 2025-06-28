import { v4 as uuidv4 } from 'uuid';
import User from '../models/authModel.js';

const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (findUser) return res.status(400).json({ err: 'User already registered' });

    const user = await User.create({ username, email, password });

    if (!user) return res.status(400).json({ err: 'Failed to create User' });

    await user.save();

    res.redirect('/api/url/login');
  } catch (error) {
    res.status(400).json({ err: 'Something wet wrong' });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = User.findOne({ email });

  if (!user) return res.status(400).json({ err: 'User not found' });

  res.cookie('uid', uuidv4(), { expires: new Date(Date.now() + 900000), httpOnly: true });
};

export { userSignup, userLogin };
