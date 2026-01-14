import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Home from "./Home.jsx";
import Post from "./Post.jsx";
import Categories from "./Categories.jsx";
import "./index.scss"

function App() {
    return (
        <>
            <nav>
                <a href="/">Strona główna</a>
                <a href="/posts">Wpisy</a>
                <a href="/categories">Kategorie</a>
            </nav>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Post />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
            </BrowserRouter>
        </>

);
}

export default App;
