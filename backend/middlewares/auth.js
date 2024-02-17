const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Se requiere autorización" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(
      "Token verificado correctamente. Contenido del payload:",
      payload
    );
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res.status(401).send({ message: "Se requiere autorización" });
  }

  req.user = payload;

  next();
};
