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
            <section className="page-header">
                <p className="section-label">EDUCATIONAL MATERIAL</p>

                <h1>Feminist resources</h1>

                <p>
                    Explore ideas, theories, and materials for understanding
                    feminism, patriarchy, and the structures that shape our
                    everyday lives.
                </p>
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
                    {resources.map((resource) => (
                        <article className="resource-card" key={resource._id}>
                            <p className="resource-card__category">
                                {resource.category}
                            </p>

                            <h2>{resource.title}</h2>

                            <p className="resource-card__author">
                                By {resource.author}
                            </p>

                            <p>{resource.excerpt}</p>

                            <Link
                                to={`/resources/${resource._id}`}
                                className="text-link"
                            >
                                Read resource →
                            </Link>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}

export default Resources;