export const renderHome = (req, res) => {
  res.render('home', { shorten_url: undefined });
};

export const renderLogin = (req, res) => {
  res.render('login');
};
export const renderSignup = (req, res) => {
  res.render('signup');
};
