import "./SearchBar.css"

import { useState, useEffect } from "react";



const VITE_URL = import.meta.env.VITE_URL

const SearchBar = () =>{
    const [boardTitle, setBoardTitle] = useState("")


    

    return(
        <div>
            <input 
            name="search-bar"
            type="text"
            placeholder="Board Title"
            />
        </div>
    )

}

    export default SearchBar
