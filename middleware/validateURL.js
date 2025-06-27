import validator from 'validator';

const isValidURL = (req, res, next) => {
  const { url } = req.body;
  console.log('body', req.body);

  console.log('validate URL', url);

  const valid = validator.isURL(url);

  if (!valid) {
    return res.status(400).send('URL is not valid');
  }

  next();
};

export default isValidURL;
