import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CreateBoardModal.css";

function CreateBoardModal({ onClose, onBoardCreated }) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [isActive, setIsActive] = useState(false); // state to track modal animation
  const VITE_URL = import.meta.env.VITE_URL;

  useEffect(() => {
    axios
      .get(`${VITE_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, [VITE_URL]);

  // triggers animation on mount
  useEffect(() => {
    // timeout to ensure DOM is ready before adding class
    const timer = setTimeout(() => setIsActive(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !categoryId.trim()) {
      setError("Title and Category are required");
      return;
    }
    setError("");
    try {
      const response = await axios.post(`${VITE_URL}/boards`, {
        title,
        imageUrl,
        categoryIds: [parseInt(categoryId, 10)],
        author,
      });
      onBoardCreated(response.data); // basically a call to update the board grid on page
      onClose();
    } catch (error) {
      setError("Failed to create the board");
    }
  };

  // ...existing code...
  return (
    <div className={`modal-wrapper${isActive ? " active" : ""}`}>
      {" "}
      {/* Always active when rendered */}
      <div className="popup">
        <div className="popup-inside">
          <div className="backgrounds">
            <div className="background"></div>
            <div className="background background2"></div>
            <div className="background background3"></div>
            <div className="background background4"></div>
            <div className="background background5"></div>
            <div className="background background6"></div>
          </div>
        </div>
        <div className="content">
          <div className="content-wrapper">
            <div className="modal-header">
              <button className="close-button" onClick={onClose}>
                X
              </button>
              <h2>Create New Board</h2>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>
                    Title:
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Category:
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      required
                    >
                      <option value=""> Select a category </option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    Author:
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Image URL:
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      required
                    />
                  </label>
                </div>
                {error && <div className="error">{error}</div>}
                <div className="modal-footer">
                  <div> " "</div>
                  <button type="submit"> Create Board </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBoardModal;
