import { useEffect, useState } from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid/BoardGrid";
import NavBar from "../components/Navbar/navbar";

function HomePage() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
//     const VITE_URL = import.meta.env.VITE_URL
//    console.log(VITE_URL)
    useEffect(() => {
        axios.get(`http://localhost:3000/boards`)
        .then((res) => {
            console.log(res.data); 
            setBoards(res.data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        setBoards((prev) => prev.filter((board) => board.id !== id));
    }


    if (loading) return <div>Loading...</div>;

    return (
        <div>
        {/* FOR FUTURE REFERENCE!! Header, Banner, Search bar go here */}
        <NavBar/>
        <BoardGrid 
            boards={boards}
            onDelete={handleDelete} />
        {/* Footer */}
        <h1>Home Page</h1>
        </div>
    );
}

export default HomePage;