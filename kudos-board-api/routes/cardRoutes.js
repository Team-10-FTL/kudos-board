const express = require("express");
const router = express.Router();
const controller = require("../controllers/cardController");

router.get("/", controller.getCards);
router.get("/:id", controller.getCard);
router.post("/", controller.createCard);
router.put("/:id", controller.upvoteCard);
router.delete("/:id", controller.remove);

module.exports = router;
