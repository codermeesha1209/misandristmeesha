import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getResources } from "../services/api";

function Resources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadResources() {
            try {
                const data = await getResources();
                setResources(data);
            } catch (err) {
                setError("We couldn't load the resources right now.");
            } finally {
                setLoading(false);
            }
        }

        loadResources();
    }, []);

    return (
        <main className="page">
            <section className="page-header resources-header">
                <p className="section-label">THE LIBRARY</p>

                <h1>Feminist resources</h1>

                <p>
                    Explore ideas, theories, and materials for understanding
                    feminism, patriarchy, and the structures that shape our
                    everyday lives.
                </p>

                <div className="resources-header__meta">
                    <span>{resources.length} resources</span>
                    <span>·</span>
                    <span>Learn at your own pace</span>
                </div>
            </section>

            {loading && (
                <p className="status-message">Loading resources...</p>
            )}

            {error && (
                <p className="status-message status-message--error">
                    {error}
                </p>
            )}

            {!loading && !error && resources.length === 0 && (
                <div className="empty-state">
                    <h2>No resources yet.</h2>

                    <p>
                        Educational materials will appear here as the
                        collection grows.
                    </p>

                    <Link to="/" className="button button--primary">
                        Back home
                    </Link>
                </div>
            )}

            {!loading && !error && resources.length > 0 && (
                <section className="resource-grid">
                    {resources.map((resource, index) => (
                        <article
                            className="resource-card"
                            key={resource._id}
                        >
                            <div className="resource-card__top">
                                <span className="resource-card__number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <p className="resource-card__category">
                                    {resource.category}
                                </p>
                            </div>

                            <h2>{resource.title}</h2>

                            <p className="resource-card__author">
                                By {resource.author}
                            </p>

                            <p className="resource-card__excerpt">
                                {resource.excerpt}
                            </p>

                            <Link
                                to={`/resources/${resource._id}`}
                                className="text-link"
                            >
                                Read resource <span aria-hidden="true">→</span>
                            </Link>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}

export default Resources;