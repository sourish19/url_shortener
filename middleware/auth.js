const validateUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email) return res.status(400).json({ err: 'Please provide the Credentials' });

  next();
};

export default validateUser;
