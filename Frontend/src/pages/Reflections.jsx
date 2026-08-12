import { useEffect, useState } from "react";
import {
    createReflection,
    getPublicReflections
} from "../services/api";

const reflectionPrompt =
    "What patriarchal expectation have you noticed in your everyday life?";

function Reflections() {
    const [response, setResponse] = useState("");
    const [reflections, setReflections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadReflections() {
            try {
                const data = await getPublicReflections();
                setReflections(data);
            } catch (err) {
                setError("We couldn't load public reflections.");
            } finally {
                setLoading(false);
            }
        }

        loadReflections();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!response.trim()) {
            setError("Please write something before submitting.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setMessage("");

            await createReflection({
                prompt: reflectionPrompt,
                response: response.trim(),
                isPublic: false
            });

            setResponse("");
            setMessage(
                "Your reflection has been saved privately."
            );
        } catch (err) {
            setError("We couldn't save your reflection.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="page">
            <section className="page-header">
                <p className="section-label">PERSONAL REFLECTION</p>

                <h1>A space to think inward.</h1>

                <p>
                    Reflection can help us notice the assumptions and
                    expectations we encounter every day. Your response is
                    private by default.
                </p>
            </section>

            <section className="reflection-layout">
                <form className="reflection-form" onSubmit={handleSubmit}>
                    <p className="reflection-form__label">PROMPT</p>

                    <h2>{reflectionPrompt}</h2>

                    <textarea
                        value={response}
                        onChange={(event) => setResponse(event.target.value)}
                        placeholder="Write your thoughts here..."
                        rows="10"
                        aria-label="Your reflection"
                    />

                    <button
                        type="submit"
                        className="button button--primary"
                        disabled={submitting}
                    >
                        {submitting ? "Saving..." : "Save reflection"}
                    </button>

                    {message && (
                        <p className="status-message status-message--success">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="status-message status-message--error">
                            {error}
                        </p>
                    )}
                </form>

                <aside className="reflection-info">
                    <p className="section-label">YOUR SPACE</p>

                    <h2>Private by default.</h2>

                    <p>
                        Your reflection is saved without being displayed
                        publicly. You can take the time to think honestly,
                        without needing to perform your thoughts for anyone
                        else.
                    </p>
                </aside>
            </section>

            <section className="public-reflections">
                <div className="page-header page-header--small">
                    <p className="section-label">COMMUNITY REFLECTIONS</p>
                    <h2>Shared perspectives</h2>
                </div>

                {loading && (
                    <p className="status-message">
                        Loading public reflections...
                    </p>
                )}

                {!loading && reflections.length === 0 && (
                    <p className="status-message">
                        No public reflections have been shared yet.
                    </p>
                )}

                {!loading && reflections.length > 0 && (
                    <div className="reflection-grid">
                        {reflections.map((reflection) => (
                            <article
                                className="reflection-card"
                                key={reflection._id}
                            >
                                <p>{reflection.response}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Reflections;