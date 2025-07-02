
const express = require("express");
const router = express.Router();
const controller = require("../controllers/boardController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/title/:title", controller.getByTitle)
router.post("/", controller.create);
router.delete("/:id", controller.remove);

module.exports = router