const prisma = require('../models/prismaClient')
// get all boards
exports.getAll = async (req, res) => {

    const where = {};
    const {category, sort} = req.query;
    const orderBy = [];

    // filter by category
    if (category) {
        where.category = category;
    }

    if (sort === "title"){
        orderBy.push({[sort]: "asc" });
    }

    const boards = await prisma.board.findMany({
        where,
        orderBy: orderBy.length ? orderBy : undefined,
    });

    res.json(boards)
}

exports.getByTitle = async (req, res) =>{
    const title = req.params.title

    const titleResults = await prisma.board.findMany({
        where:{
            title:{
                contains: title,
                mode:'insensitive'
            }
        }
    })

    res.json(titleResults)



}


// get boards by ID
exports.getById = async (req, res) => {
    const id = Number(req.params.id);
    const board = await prisma.board.findUnique({where: {id}});
    if(!board){
        return res.status(404).json({error: "Not Found!"});
    } else {
        res.json(board);
    }
}


// post
exports.create = async (req, res) => {
    const {title, categories, cards, imageUrl} = req.body;
    const newBoard = await prisma.board.create({
        data: {
            title,
            categories,
            cards,
            imageUrl
        },
    })
    res.status(201).json(newBoard);
}


// delete
exports.remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.board.delete({
        where: {id}
    });
    res.status(204).end();
}