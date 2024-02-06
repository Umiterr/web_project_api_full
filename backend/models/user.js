const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?%#@\[\]!$&'()*+,;=]+(\/[a-zA-Z0-9._~:/?%#@\[\]!$&'()*+,;=]+)?(#.*)?$/i.test(
          v
        );
      },
      message: "El link de la imagen de perfil debe ser un enlace válido.",
    },
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Correo electrónico no válido",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return user; // ahora user está disponible
    });
  });
};

module.exports = mongoose.model("user", userSchema);
