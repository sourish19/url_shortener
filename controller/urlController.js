import { nanoid } from 'nanoid';
import normalizeUrl from 'normalize-url';
import { UrlShortner } from '../models/urlModel.js';

export const requestedURL = async (req, res) => {
  const { url } = req.body;

  const normalizedURL = normalizeUrl(url, {
    forceHttps: true,
    stripWWW: false,
    removeTrailingSlash: false,
  });

  try {
    const findUrl = await UrlShortner.findOne({ originalURL: normalizedURL });

    console.log('find url', findUrl);

    if (findUrl) {
      return res.status(400).send('URL already registered');
    }

    const shortID = nanoid(6);
    const createdURL = `http://127.0.0.1:8000/api/url/${shortID}`;

    const generateUrl = await UrlShortner.create({
      shortID: shortID,
      originalURL: normalizedURL,
      createdURL,
    });

    return res.render('displayURL', {
      shorten_URL: `${createdURL}`,
    });
  } catch (error) {
    res.status(400).jsion({ err: `Error occured - ${error}` });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortID } = req.params;

  if (!shortID) {
    return res.status(400).json({ err: 'Please provie the short URL' });
  }

  try {
    const url = await UrlShortner.findOneAndUpdate(
      { shortID },
      {
        $inc: { visits: 1 },
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      }
    );

    res.redirect(url.originalURL);
  } catch (error) {
    res.status(400).json({ err: `Error occured - ${error}` });
  }
};

export const visitHistory = async (req, res) => {
  const shortID = req.params.shortid;
  const url = await urlShortner.findOne({ shortID });
  const visits = url.visitHistory.length;

  return res
    .status(200)
    .json(`Number of visits on http://127.0.0.1:8000/api/url/${shortID} is ${visits}`);
};
