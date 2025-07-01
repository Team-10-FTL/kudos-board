import { useEffect, useState } from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import SearchBar from "../components/SearchBar/SearchBar";

function HomePage() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const VITE_URL = import.meta.env.VITE_URL

    const handleOnChange = async(e) => {
        try {

            const title = e.target.value
            setBoardTitle(title)

            if (title.trim()){
                const response = await fetch(`${VITE_URL}/boards/title/${title}`)
                console.log("Fetching URL:", `${VITE_URL}/boards/title/${title}`)
                console.log(response)
                const data= await response.json()
                setBoards(data)

                console.log(data)

            }else{
                console.log("No title detected")
            }
            
        } catch (error) {
            console.log(error.message)
        }



    }

    useEffect(() => {
        axios.get(`${VITE_URL}/boards`)
        .then((res) => {
            console.log(res.data); 
            setBoards(res.data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [boards]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
        {/* FOR FUTURE REFERENCE!! Header, Banner, Search bar go here */}
        <SearchBar
        onChange={handleOnChange}/>
        <BoardGrid boards={boards} />
        {/* Footer */}
        <h1>Home Page</h1>
        </div>
    );
}

export default HomePage;
