const isLogedIn = (req, res, next) => {
  const user = req.session.user;

  if (!user) return res.status(400).json({ err: 'Unauthorized' });

  next();
};

export default isLogedIn;
