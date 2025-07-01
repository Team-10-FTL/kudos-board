const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path')

async function main() {
  console.log("Starting seed...");

  // Clear existing data (optional - remove if you want to keep existing data)
  await prisma.categoriesOnBoards.deleteMany();
  await prisma.card.deleteMany();
  await prisma.category.deleteMany();
  await prisma.board.deleteMany();


  const categoriesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, './data/categories.json'), 'utf8')
  )

  const boardsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, './data/boards.json'), 'utf8')
  )
  
  const cardsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, './data/cards.json'), 'utf8')
  );

    const categories = await Promise.all(
    categoriesData.categories.map(category => 
      prisma.category.create({ data: category })
    )
  );
    const boards = await Promise.all(
    boardsData.boards.map(board => 
      prisma.board.create({ data: board })
    )
  );
  const cards = await Promise.all(
    cardsData.cards.map(card => 
      prisma.card.create({
        data: {
          ...card,
          boardId: boards[card.boardId - 1].id // Map to actual board ID
        }
      })
    )
  );

  // Create Category-Board relationships
  await Promise.all([
    // Team Kudos Board - Work & Team Building
    prisma.categoriesOnBoards.create({
      data: {
        boardId: boards[0].id,
        categoryId: categories[0].id, // Work
        assignedBy: "Nathan"
      }
    }),
    prisma.categoriesOnBoards.create({
      data: {
        boardId: boards[0].id,
        categoryId: categories[2].id, // Team Building
        assignedBy: "Nathan"
      }
    }),
    // Project Success Stories - Work & Appreciation
    prisma.categoriesOnBoards.create({
      data: {
        boardId: boards[1].id,
        categoryId: categories[0].id, // Work
        assignedBy: "Nathan"
      }
    }),
    prisma.categoriesOnBoards.create({
      data: {
        boardId: boards[1].id,
        categoryId: categories[3].id, // Appreciation
        assignedBy: "Nathan"
      }
    }),
    // Birthday Wishes - Personal
    prisma.categoriesOnBoards.create({
      data: {
        boardId: boards[2].id,
        categoryId: categories[1].id, // Personal
        assignedBy: "Nathan"
      }
    }),
    // Work Anniversary - Work & Milestone
    prisma.categoriesOnBoards.create({
      data: {
        boardId: boards[3].id,
        categoryId: categories[0].id, // Work
        assignedBy: "Nathan"
      }
    }),
    prisma.categoriesOnBoards.create({
      data: {
        boardId: boards[3].id,
        categoryId: categories[4].id, // Milestone
        assignedBy: "Nathan"
      }
    })
  ]);



  console.log("Seed completed successfully!");
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${boards.length} boards`);
  console.log("Created 9 cards");
  console.log("Created category-board relationships");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });