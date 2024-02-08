const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { celebrate, Joi, errors } = require("celebrate"); // Asegúrate de importar celebrate y Joi correctamente
const validator = require("validator"); // Asegúrate de importar validator

const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateURLSchema = Joi.object({
  link: Joi.string().required().custom(validateURL),
});

// Routes

app.post("/signin", celebrate({ body: validateURLSchema }), login);
app.post("/signup", celebrate({ body: validateURLSchema }), createUser);

app.use(auth);

app.use("/", userRouter);
app.use("/", cardRouter);

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
});

app.use(errors());
