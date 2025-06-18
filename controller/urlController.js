import { nanoid } from 'nanoid';
import { urlShortner } from '../models/urlModel.js';

export const requestedURL = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status('400').send('Unable to create User');
  }
  const shortID = nanoid(6);

  const generateUrl = await urlShortner.create({
    shortID: shortID,
    originalURL: url,
    totalVisits: 0,
  });

  return res.status(200).json(`Url created http://127.0.0.1:8000/api/url/${shortID}`);
};

export const redirectUrl = async (req, res) => {
  const shortID = req.params.shortid;
  const url = await urlShortner.findOneAndUpdate(
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
