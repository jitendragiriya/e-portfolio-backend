const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
    },
    profession: {
      type: String,
    },
    shortintro: {
      type: String,
    },
    briefintro: {
      type: String,
    },
    images: [
      {
        url: {
          type: String,
        },
      },
    ],
    skills: {
      type: Array,
    },
    contactUrl: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);
