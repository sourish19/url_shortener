import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    originalURL: {
      type: String,
      required: true,
    },
    createdURL: {
      type: String,
      required: true,
    },
    visits: {
      type: Number,
      default: 0,
    },
    visitHistory: [
      {
        timestamps: Number,
      },
    ],
  },
  { timestamps: true }
);

export const UrlShortner = mongoose.model('urlShortner', urlSchema);
