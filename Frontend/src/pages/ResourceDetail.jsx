import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getResource } from "../services/api";

function ResourceDetail() {
    const { id } = useParams();

    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadResource() {
            try {
                const data = await getResource(id);
                setResource(data);
            } catch (err) {
                setError("We couldn't find this resource.");
            } finally {
                setLoading(false);
            }
        }

        loadResource();
    }, [id]);

    if (loading) {
        return (
            <main className="page">
                <p className="status-message">Loading resource...</p>
            </main>
        );
    }

    if (error || !resource) {
        return (
            <main className="page">
                <div className="empty-state">
                    <h1>Resource not found</h1>
                    <p>{error}</p>

                    <Link to="/resources" className="button button--primary">
                        Back to resources
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page">
            <article className="resource-detail">
                <Link to="/resources" className="back-link">
                    ← Back to resources
                </Link>

                <p className="resource-card__category">
                    {resource.category}
                </p>

                <h1>{resource.title}</h1>

                <p className="resource-card__author">
                    By {resource.author}
                </p>

                <p className="resource-detail__excerpt">
                    {resource.excerpt}
                </p>

                <div className="resource-detail__content">
                    <p>{resource.content}</p>
                </div>
            </article>
        </main>
    );
}

export default ResourceDetail;