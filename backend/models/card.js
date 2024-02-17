const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?%#@\[\]!$&'()*+,;=]+(\/[a-zA-Z0-9._~:/?%#@\[\]!$&'()*+,;=]+)?(#.*)?$/i.test(
          value,
        );
      },
      message: "El link de la imagen debe ser un enlace válido.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
