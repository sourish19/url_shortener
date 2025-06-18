import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    originalURL: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamps: Number,
      },
    ],
  },
  { timestamps: true }
);

export const urlShortner = mongoose.model('urlShortner', urlSchema);
