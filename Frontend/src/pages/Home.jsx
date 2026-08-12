import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResources } from "../services/api";

function Home() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        async function loadResources() {
            try {
                const data = await getResources();
                setResources(data);
            } catch (err) {
                console.error("Unable to load featured resources.", err);
            }
        }

        loadResources();
    }, []);

    const featuredResources = resources.slice(0, 3);

    return (
        <main className="home">
            <section className="hero">
                <p className="hero__eyebrow">
                    FEMINIST EDUCATION · CRITICAL THINKING · REFLECTION
                </p>

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

                    <Link
                        to="/reflections"
                        className="button button--secondary"
                    >
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

            <section className="featured-resources">
                <div className="section-heading">
                    <div>
                        <p className="section-label">FROM THE LIBRARY</p>

                        <h2>Start somewhere.</h2>
                    </div>

                    <Link to="/resources" className="text-link">
                        View all resources →
                    </Link>
                </div>

                {featuredResources.length > 0 ? (
                    <div className="featured-resource-grid">
                        {featuredResources.map((resource, index) => (
                            <article
                                className="featured-resource-card"
                                key={resource._id}
                            >
                                <span className="featured-resource-card__number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <p className="resource-card__category">
                                    {resource.category}
                                </p>

                                <h3>{resource.title}</h3>

                                <p>{resource.excerpt}</p>

                                <Link
                                    to={`/resources/${resource._id}`}
                                    className="text-link"
                                >
                                    Read resource →
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>
                            New educational materials are being added to the
                            library.
                        </p>
                    </div>
                )}
            </section>

            <section className="reflection-cta">
                <div>
                    <p className="section-label">TAKE IT FURTHER</p>

                    <h2>
                        What have you been taught to accept without
                        questioning?
                    </h2>
                </div>

                <div className="reflection-cta__content">
                    <p>
                        Learning can change the way we see the world.
                        Reflection can change the way we see ourselves.
                        Take a moment to connect the ideas you've explored
                        with your own everyday experiences.
                    </p>

                    <Link
                        to="/reflections"
                        className="button button--primary"
                    >
                        Enter the reflection room
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Home;