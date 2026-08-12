import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Reflections from "./pages/Reflections";
import ResourceDetail from "./pages/ResourceDetail";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:id" element={<ResourceDetail />} />
                <Route path="/reflections" element={<Reflections />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;