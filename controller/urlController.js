import { nanoid } from 'nanoid';
import { UrlShortner } from '../models/urlModel.js';

export const requestedURL = async (req, res) => {
  const { url } = req.body;
  console.log('requested bodu', req.body);

  console.log('URL', url);

  try {
    const findUrl = await UrlShortner.findOne({ originalURL: url });

    console.log('find url', findUrl);

    if (findUrl) {
      return res.status(400).send('URL already registered');
    }

    const shortID = nanoid(6);
    const createdURL = `http://127.0.0.1:8000/api/url/${shortID}`;

    const generateUrl = await UrlShortner.create({
      shortID: shortID,
      originalURL: url,
      createdURL,
    });

    return res.render('displayURL', {
      shorten_URL: `${createdURL}`,
    });
  } catch (error) {
    console.error(`Error occured:${error}`);
  }
};

export const redirectUrl = async (req, res) => {
  const { shortID } = req.params;

  if (!shortID) {
    return res.status(400).json({ err: 'Please provie the URL' });
  }

  const url = await UrlShortner.findOneAndUpdate(
    { shortID },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );

  if (!url) {
    return res.status(400).json({ err: 'Please provie the URL' });
  }
  return res.redirect(url.originalURL);
};

export const visitHistory = async (req, res) => {
  const shortID = req.params.shortid;
  const url = await urlShortner.findOne({ shortID });
  const visits = url.visitHistory.length;

  return res
    .status(200)
    .json(`Number of visits on http://127.0.0.1:8000/api/url/${shortID} is ${visits}`);
};
