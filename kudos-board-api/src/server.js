
const express = require('express')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{
    try {
        res.send("Hello World")
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(PORT,()=>{
    try {
        console.log(`Server succesfully running on http://localhost:${PORT}`)

    } catch (error) {
        console.log(error.message)
    }
})