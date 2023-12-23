const mongoose = require("mongoose");

const urlScheme = new mongoose.Schema(
  {
    shortID: {
      type: String,
      require: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      require: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model('urls' , urlScheme);

module.exports = URL;

