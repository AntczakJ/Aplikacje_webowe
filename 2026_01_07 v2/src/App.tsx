import {Route, Routes} from "react-router"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./scenes/Homepage/Homepage.tsx";
import Posts from "./scenes/Posts/Posts.tsx";
import Contact from "./scenes/Contact/Contact.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/wpisy" element={<Posts />} />
        <Route path="/kontakt" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
