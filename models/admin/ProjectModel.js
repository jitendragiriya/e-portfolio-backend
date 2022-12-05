const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter project title"],
    },
    description: {
      type: String,
      required: [true, "Please Enter project description"],
    },
    stack: {
      type: String,
      required: [true, "Please Enter project stack"],
    },

    projectUrl: {
      type: String,
      required: [true, "Please Enter project url"],
    },
    techs: [
      {
        type: String,
        required: [true, "Please enter project techs"],
      },
    ],
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
