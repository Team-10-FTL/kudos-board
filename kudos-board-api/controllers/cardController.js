// node.js -> backend connection with Prisma
const prisma = require("../models/prismaClient");

// display card
exports.getCards = async (req, res) => {
  const cards = await prisma.card.findMany();
  res.json(cards);
};

// add card (by id)
exports.getCard = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const card = await prisma.card.findUnique({ where: { id } });
    res.json(card);
  } catch (err) {
    return res.status(404).json({ error: "Error fetching card" });
  }
};

// create card
exports.createCard = async (req, res) => {
  try {
    const { boardId, message, gif, upvotes } = req.body;
    const newCard = await prisma.card.create({
      data: {
        boardId: Number(boardId),
        message,
        gif,
        upvotes,
      },
    });
    res.status(201).json(newCard);
  } catch (err) {
    return res.status(404).json({ error: "Error creating card" });
  }
};

// upvote card UPDATE
exports.upvoteCard = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updatedCard = await prisma.card.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });
    res.json(updatedCard);
  } catch (err) {
    return res.status(404).json({ error: "Error upvoting card" });
  }
};

// delete card
exports.remove = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.card.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (err) {
    return res.status(404).json({ error: "Error deleting card" });
  }
};
