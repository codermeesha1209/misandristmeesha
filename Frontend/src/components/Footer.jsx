import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__main">
                <div>
                    <Link to="/" className="footer__brand">
                        MisandristMeesha
                    </Link>

                    <p>
                        A woman-centred space for feminist education,
                        critical thinking, and reflection.
                    </p>
                </div>

                <nav aria-label="Footer navigation">
                    <Link to="/">Home</Link>
                    <Link to="/resources">Resources</Link>
                    <Link to="/reflections">Reflections</Link>
                </nav>
            </div>

            <div className="footer__bottom">
                <span>MisandristMeesha</span>
                <span>Learn · Question · Reflect</span>
            </div>
        </footer>
    );
}

export default Footer;