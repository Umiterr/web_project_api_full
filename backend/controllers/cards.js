const Card = require("../models/card"); // Asegúrate de especificar la ruta correcta al modelo

// Controlador para crear una nueva tarjeta
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner: req.user._id });

    res.status(201).json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la tarjeta." });
  }
};

// Controlador para obtener todas las tarjetas
module.exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();

    if (!cards) {
      return res.status(404).json({ error: "Tarjetas no encontradas." });
    }

    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tarjetas." });
  }
};

// Controlador para obtener una tarjeta por ID
module.exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      return res.status(404).json({ error: "Tarjeta no encontrada." });
    }

    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la tarjeta." });
  }
};

// Controlador para eliminar una tarjeta por ID
module.exports.deleteCardById = async (req, res) => {
  try {
    const cardId = req.params.cardId;
    console.log(cardID);

    const existingCard = await Card.findById(cardId);
    if (!existingCard) {
      return res.status(404).json({ error: "Tarjeta no encontrada." });
    }

    if (existingCard.owner.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para eliminar esta tarjeta." });
    }

    await Card.findByIdAndRemove(cardId);

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la tarjeta." });
  }
};

// Controlador para dar me gusta a una tarjeta
module.exports.likeCard = async (req, res) => {
  try {
    const cardId = req.params.cardId;
    console.log(cardID);

    const existingCard = await Card.findById(cardId);
    if (!existingCard) {
      return res.status(404).json({ error: "Tarjeta no encontrada." });
    }

    await { $addToSet: { likes: req.user._id } },
      { new: true },
      res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al dar like a la tarjeta." });
  }
};

// Controlador para quitar me gusta a una tarjeta
module.exports.dislikeCard = async (req, res) => {
  try {
    const cardId = req.params.cardId;
    console.log(cardID);

    const existingCard = await Card.findById(cardId);
    if (!existingCard) {
      return res.status(404).json({ error: "Tarjeta no encontrada." });
    }

    await { $pull: { likes: req.user._id } },
      { new: true },
      res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar like de la tarjeta." });
  }
};
