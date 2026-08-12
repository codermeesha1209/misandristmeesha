import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className="navbar">
            <Link to="/" className="navbar__brand" onClick={closeMenu}>
                MisandristMeesha
            </Link>

            <button
                className="navbar__toggle"
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span />
                <span />
                <span />
            </button>

            <nav
                className={`navbar__links ${
                    menuOpen ? "navbar__links--open" : ""
                }`}
                aria-label="Main navigation"
            >
                <Link to="/" onClick={closeMenu}>
                    Home
                </Link>

                <Link to="/resources" onClick={closeMenu}>
                    Resources
                </Link>

                <Link to="/reflections" onClick={closeMenu}>
                    Reflections
                </Link>
            </nav>
        </header>
    );
}

export default Navbar;