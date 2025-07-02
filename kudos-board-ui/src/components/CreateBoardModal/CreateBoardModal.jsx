import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CreateBoardModal.css";

function CreateBoardModal({ onClose, onBoardCreated}){

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState("");
    const VITE_URL = import.meta.env.VITE_URL;


    const handleSubmit = async(e) => {
        e.preventDEfault();

        if (!title.trim() || !category.trim()){
            setError("Title and Category are required")
            return;
        }
        setError("");
        try {
            const response = await axios.post(`${VITE_URL}/boards`, {
                title,
                category,
                author,
            });
            onBoardCreated(response.data);// basically a call to update the board grid on page
            onClose();
        } catch (error) {
            setError("Failed to create the board")
        }

    };

    // IN ORDER TO RUN THIS IN HOME PAGE, CREATE A BUTTON COMPONENT, PASS onClose and onBoardCreate PROPS IN THE PARENT HOMEPAGE COMPONENT
    // you gotta show/hide this modal when the create button is clicked
    // update the board grid in the parent when a new board is created

    return (
        <div className="createBoardModal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Create New Board</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input 
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Category:
                        <input 
                            type="text"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Author
                        <input 
                            type="text"
                            value={author}
                            onChange={(e => setCategory(e.target.value))}
                            required
                        />
                    </label>
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Create Board</button>
                </form>
            </div>
        </div>
    );



}