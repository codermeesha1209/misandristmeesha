import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="home">
            <section className="hero">
                <p className="hero__eyebrow">FEMINIST EDUCATION · CRITICAL THINKING · REFLECTION</p>

                <h1>
                    Question the world.
                    <br />
                    Reimagine your place in it.
                </h1>

                <p className="hero__description">
                    MisandristMeesha is a woman-centred educational space for
                    exploring feminist theory, challenging patriarchal norms,
                    and developing critical perspectives.
                </p>

                <div className="hero__actions">
                    <Link to="/resources" className="button button--primary">
                        Explore resources
                    </Link>

                    <Link to="/reflections" className="button button--secondary">
                        Start reflecting
                    </Link>
                </div>
            </section>

            <section className="intro">
                <div>
                    <p className="section-label">WHY THIS SPACE EXISTS</p>
                    <h2>Learn. Question. Reflect.</h2>
                </div>

                <p>
                    Feminist education is not only about learning what came
                    before us. It is also about examining the ideas we have
                    inherited, questioning whose perspectives have been
                    centred, and imagining alternatives.
                </p>
            </section>

            <section className="feature-grid">
                <article className="feature-card">
                    <span>01</span>
                    <h3>Investigate theory</h3>
                    <p>
                        Explore feminist critical theory and ideas that help
                        make sense of power, gender, and society.
                    </p>
                </article>

                <article className="feature-card">
                    <span>02</span>
                    <h3>Challenge assumptions</h3>
                    <p>
                        Examine patriarchal expectations and the perspectives
                        that are often treated as universal.
                    </p>
                </article>

                <article className="feature-card">
                    <span>03</span>
                    <h3>Reflect inward</h3>
                    <p>
                        Use guided reflection to think about internalized
                        misogyny and everyday experiences.
                    </p>
                </article>
            </section>
        </main>
    );
}

export default Home;