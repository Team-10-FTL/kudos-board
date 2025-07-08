const prisma = require("../models/prismaClient");
// get all boards
exports.getAll = async (req, res) => {
  const where = {};
  const { category, sort } = req.query;
  const orderBy = [];

  // filter by category
  if (category) {
    where.category = category;
  }

  // Could just check for the sort parameter and then just sort by title
  if (sort === "title") {
    orderBy.push({ [sort]: "asc" });
  }

  // fetch boards from the database
  const boards = await prisma.board.findMany({
    where,
    orderBy: orderBy.length ? orderBy : undefined,
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  res.json(boards);
};

// gets boards by title (case-insensitive search)
exports.getByTitle = async (req, res) => {
  try {
    const title = req.params.title;

    const titleResults = await prisma.board.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    res.json(titleResults);
  } catch (error) {
    console.log(error.message);
  }
};

// get board by ID
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
  if (!board) {
    return res.status(404).json({ error: "Not Found!" });
  } else {
    res.json(board);
  }
};

// make this more descriptive
// post
exports.create = async (req, res) => {
  // destructure expected fields
  const { title, categoryIds, imageUrl } = req.body;

  // prepares data for PRISMAs create
  const data = {
    title,
    imageUrl,
  };

  // filter by categories
  // Don't need to do the && just check for categoryIds?.length
  if (categoryIds && categoryIds.length > 0) {
    data.categories = {
      create: categoryIds.map((categoryId) => ({
        // creates a new entry in the joining table
        category: { connect: { id: categoryId } }, // connecting the new board to existing category with that ID
        assignedBy: "system", // this can be replaced with an actual user
      })),
    };
  }

  // Create the board in the database
  const newBoard = await prisma.board.create({ data });
  res.status(201).json(newBoard);
};

// Make more descriptive && name function more descriptive
// delete
exports.remove = async (req, res) => {
  const id = Number(req.params.id);

  try {
    // delete related records from categoriesOnBoard else it causes error on delete
    // Could avoid this by using cascade delete, because of this you'd have to have a fallback for the errorå
    await prisma.categoriesOnBoards.deleteMany({
      where: { boardId: id },
    });
    // THEN delete the board
    await prisma.board.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
