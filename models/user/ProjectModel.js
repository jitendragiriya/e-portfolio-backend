const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    projectUrl: {
      type: String,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", projectSchema);
