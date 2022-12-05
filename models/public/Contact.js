const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
    },
    message: [
      {
        msg: {
          type: String,
          required: true,
        },
        sendAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    sendTo: {
      type: String,
      required: [true, "Please try again later!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
