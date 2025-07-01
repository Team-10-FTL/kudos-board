const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Clear existing data (optional - remove if you want to keep existing data)
  await prisma.categoriesOnBoards.deleteMany();
  await prisma.card.deleteMany();
  await prisma.category.deleteMany();
  await prisma.board.deleteMany();

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "All" }
    }),
    prisma.category.create({
      data: { name: "Recent" }
    }),
    prisma.category.create({
      data: { name: "Celebration" }
    }),
    prisma.category.create({
      data: { name: "Thank You" }
    }),
    prisma.category.create({
      data: { name: "Insperation" }
    })
  ]);

  // Create Boards
  const boards = await Promise.all([
    prisma.board.create({
      data: {
        title: "Team Kudos Board",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400"
      }
    }),
    prisma.board.create({
      data: {
        title: "Project Success Stories",
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400"
      }
    }),
    prisma.board.create({
      data: {
        title: "Birthday Wishes",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400"
      }
    }),
    prisma.board.create({
      data: {
        title: "Work Anniversary",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400"
      }
    })
  ]);

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

  // Create Cards
  await Promise.all([
    // Cards for Team Kudos Board
    prisma.card.create({
      data: {
        message: "Great job on the presentation yesterday! Your preparation really showed.",
        boardId: boards[0].id,
        gif: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
        upvotes: 12
      }
    }),
    prisma.card.create({
      data: {
        message: "Thank you for staying late to help me debug that issue. Team player!",
        boardId: boards[0].id,
        gif: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
        upvotes: 8
      }
    }),
    prisma.card.create({
      data: {
        message: "Your positive attitude brightens everyone's day!",
        boardId: boards[0].id,
        gif: "https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif",
        upvotes: 15
      }
    }),
    // Cards for Project Success Stories
    prisma.card.create({
      data: {
        message: "The new feature launch was flawless thanks to your thorough testing!",
        boardId: boards[1].id,
        gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
        upvotes: 20
      }
    }),
    prisma.card.create({
      data: {
        message: "Client loved the design mockups. Outstanding work!",
        boardId: boards[1].id,
        gif: "https://media.giphy.com/media/3o7absbD7kbZXE2pyk/giphy.gif",
        upvotes: 18
      }
    }),
    // Cards for Birthday Wishes
    prisma.card.create({
      data: {
        message: "Happy Birthday Sarah! Hope you have an amazing day! 🎉",
        boardId: boards[2].id,
        gif: "https://media.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif",
        upvotes: 25
      }
    }),
    prisma.card.create({
      data: {
        message: "Wishing you all the best on your special day! 🎂",
        boardId: boards[2].id,
        gif: "https://media.giphy.com/media/g5R9dok94mrIY/giphy.gif",
        upvotes: 22
      }
    }),
    // Cards for Work Anniversary
    prisma.card.create({
      data: {
        message: "Congratulations on 2 years with the company! Here's to many more!",
        boardId: boards[3].id,
        gif: "https://media.giphy.com/media/l0MYu38R0PPhIXe36/giphy.gif",
        upvotes: 30
      }
    }),
    prisma.card.create({
      data: {
        message: "Your dedication and hard work are truly appreciated!",
        boardId: boards[3].id,
        gif: "https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif",
        upvotes: 28
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