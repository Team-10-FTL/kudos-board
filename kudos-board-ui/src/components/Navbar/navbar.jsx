import "./navbar.css"

import { useState, useEffect } from "react";

require('dotenv').config()

PORT = process.env.PORT

const NavBar = () =>{
    const [boardTitle, setBoardTitle] = useState("")


    const handleOnChange = async() => {
        const title = Object.target.value
        setBoardTitle(title)
        const response = await fetch(`http:localhost:${PORT}/title/${title}`)
        const data = await response.json()

        console.log(data)


    }

    return(
        <div>
            <input 
            name="search-bar"
            type="text"
            placeholder="Board Title"
            onChange={handleOnChange()}
            />
        </div>
    )

}