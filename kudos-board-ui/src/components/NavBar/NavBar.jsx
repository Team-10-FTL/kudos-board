import "./NavBar.css"
import SearchBar from "../SearchBar/SearchBar"
import { useState } from "react";
import FilterDropDown from "../FilterDropDown/FilterDropDown";

const NavBar = ({setBoards}) =>{
    const VITE_URL = import.meta.env.VITE_URL;  
    const [boardTitle, setBoardTitle] = useState("");
    const [category, setCategory] = useState("All")

    const handleOnChange = async (e) => {
        try {
        const title = e.target.value;
        setBoardTitle(title);

        if (title.trim()) {
            const response = await fetch(`${VITE_URL}/boards/title/${title}`);
            const data = await response.json();
            setBoards(data);
        } else {
            // If search is cleared, reload all boards
            const res = await fetch(`${VITE_URL}/boards`);
            const data = await res.json();
            setBoards(data);
        }
        } catch (error) {
        console.log(error.message);
        }
    };

    const handleClearSearch = async () => {
        setBoardTitle("");
        try {
        const res = await fetch(`${VITE_URL}/boards`);
        const data = await res.json();
        setBoards(data);
        console.log("cleared");
        } catch (err) {
        console.log(err.message);
        }
    };
    const handleFilterChange = async(e)=>{
        try {
            const selectedCategory = e.target.value
            const response = await fetch(`${VITE_URL}/boards`);
            const data = await response.json();

        if (selectedCategory === "All") {
            setBoards(data);
        } else if (selectedCategory === "Recent"){
            const sortedData = data.sort((a,b)=>
            new Date(b.createdAt) - new Date(a.createdAt)
            )
            setBoards(sortedData)
        }else {
            const filteredData = data.filter((board) => 
                board.categories.some(catRel => 
                    catRel.category.name === selectedCategory
                )
            );
            setBoards(filteredData);
        }
        setCategory(selectedCategory);
                } catch (error) {
                    console.log(error.message)
                }
            }
    return(
        <div className="nav-bar">
            <FilterDropDown handleChange={handleFilterChange}/>
            <SearchBar
            onChange={handleOnChange}
            value={boardTitle}
            handleClearSearch={handleClearSearch}
            />
        </div>

    )
}

export default NavBar