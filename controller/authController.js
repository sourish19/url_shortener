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
    res.status(400).json({ err: 'Something wet wrong in signup' });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) return res.status(400).json({ err: 'User not found' });

    const sessionID = uuidv4();

    req.session.user = { id: sessionID, userId: user._id };

    res.redirect('/api/url/home');
  } catch (error) {
    res.status(400).json({ err: 'Something wet wrong in userlogin' });
  }
};

export { userSignup, userLogin };
