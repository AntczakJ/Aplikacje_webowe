import "../../vite-project/src/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Sites/Home.jsx";
import Contact from "./Sites/Contact.jsx";
import About from "./Sites/About.jsx";
import Navigation from "./Sites/Nav.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
