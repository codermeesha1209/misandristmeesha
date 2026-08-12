import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="navbar">
            <Link to="/" className="navbar__brand">
                MisandristMeesha
            </Link>

            <nav className="navbar__links" aria-label="Main navigation">
                <Link to="/">Home</Link>
                <Link to="/resources">Resources</Link>
                <Link to="/reflections">Reflections</Link>
            </nav>
        </header>
    );
}

export default Navbar;