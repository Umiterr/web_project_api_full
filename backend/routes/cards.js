const express = require("express");
const router = express.Router();

const {
  createCard,
  getAllCards,
  getCardById,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.post("/cards", createCard);

router.get("/cards", getAllCards);

router.get("/cards/:cardId", getCardById);

router.get("/cards/:cardId", deleteCardById);

router.put("/cards/:cardId/likes", likeCard);

router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
