import { useEffect, useState } from "react";
import axios from "axios";
import BoardGrid from "../components/BoardGrid/BoardGrid";

function HomePage() {
const [boards, setBoards] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    axios.get("http://localhost:3000/boards")
    .then((res) => {
        console.log(res.data); 
        setBoards(res.data);
        setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

if (loading) return <div>Loading...</div>;

return (
    <div>
    {/* FOR FUTURE REFERENCE!! Header, Banner, Search bar go here */}
    <BoardGrid boards={boards} />
    {/* Footer */}
    </div>
);
}

export default HomePage;