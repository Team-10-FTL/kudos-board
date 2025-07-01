import "./navbar.css"

import { useState, useEffect } from "react";



const VITE_URL = import.meta.env.VITE_URL

const NavBar = () =>{
    const [boardTitle, setBoardTitle] = useState("")


    const handleOnChange = async(e) => {
        try {

            const title = e.target.value
            setBoardTitle(title)

            if (title.trim()){
                const response = await fetch(`${VITE_URL}/boards/title/${title}`)
                console.log("Fetching URL:", `${VITE_URL}/boards/title/${title}`)
                console.log(response)
                const data= await response.json()

                console.log(data)

            }else{
                console.log("No title detected")
            }
            
        } catch (error) {
            console.log(error.message)
        }



    }

    return(
        <div>
            <input 
            name="search-bar"
            type="text"
            placeholder="Board Title"
            onChange={handleOnChange}
            />
        </div>
    )

}

    export default NavBar
