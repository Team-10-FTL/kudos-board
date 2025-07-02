const express = require("express");
const app = express();
require("dotenv").config();
const boardRoutes = require("../routes/boardRoutes");
const cardRoutes = require("../routes/cardRoutes");
const categoryRoutes = require('../routes/categoryRoutes');
const cors= require('cors')


app.use(cors())
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    console.log(error.message);
  }
});

// connect API endpoints to route files
app.use(express.json());
app.use("/boards", boardRoutes);
app.use("/cards", cardRoutes);
app.use('/categories', categoryRoutes);



app.listen(PORT, () => {
  try {
    console.log(`Server succesfully running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
