const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { celebrate, Joi, errors } = require("celebrate");
const validator = require("validator");
const { requestLogger, errorLogger } = require("./middlewares/logger");

require("dotenv").config();

const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

var cors = require("cors");

require("dotenv").config();
const { NODE_ENV, PORT = 3001, JWT_SECRET } = process.env;

console.log(process.env.NODE_ENV);

const app = express();

// cors

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Routes

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

// Rutas de usuario
app.use(
  "/",
  celebrate({
    body: {
      link: Joi.string().required().custom(validateURL),
    },
  }),
  userRouter
);

// Rutas de tarjeta
app.use(
  "/",
  celebrate({
    body: {
      link: Joi.string().required().custom(validateURL),
    },
  }),
  cardRouter
);

app.use(requestLogger);
app.use(errorLogger);
app.use(errors());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("Enlace al servidor");
});

app.use((_, res) => {
  res.status(404).send({ error: "Recurso no encontrado", status: 404 });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Hubo un error en el servidor", status: 500 });
  next(err);
});
