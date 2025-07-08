import  React  from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App";

createRoot(document.getElementById("root")).render(

  // Don't just commment out strict more if you're not going to use it
  // <StrictMode>
  <>
    <App />
  </>
  // </StrictMode>
);
