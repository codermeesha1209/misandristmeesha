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
            setMessage("Your reflection has been saved privately.");
        } catch (err) {
            setError("We couldn't save your reflection.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="page">
            <section className="page-header reflection-header">
                <p className="section-label">THE REFLECTION ROOM</p>

                <h1>A space to think inward.</h1>

                <p>
                    Reflection can help us notice the assumptions and
                    expectations we encounter every day. There is no
                    right answer here — only an invitation to think.
                </p>
            </section>

            <section className="reflection-layout">
                <form className="reflection-form" onSubmit={handleSubmit}>
                    <div className="reflection-form__heading">
                        <p className="reflection-form__label">
                            TODAY'S PROMPT
                        </p>

                        <span className="reflection-form__private">
                            PRIVATE
                        </span>
                    </div>

                    <h2>{reflectionPrompt}</h2>

                    <textarea
                        value={response}
                        onChange={(event) => setResponse(event.target.value)}
                        placeholder="Take your time. Write whatever comes to mind..."
                        rows="10"
                        aria-label="Your reflection"
                    />

                    <div className="reflection-form__footer">
                        <span>
                            {response.length} characters
                        </span>

                        <button
                            type="submit"
                            className="button button--primary"
                            disabled={submitting}
                        >
                            {submitting ? "Saving..." : "Save reflection"}
                        </button>
                    </div>

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
                    <p className="section-label">A NOTE TO YOU</p>

                    <h2>You don't have to have the answer.</h2>

                    <p>
                        Reflection isn't about finding the perfect
                        response. It is about slowing down enough to
                        notice what we have learned, what we have
                        accepted, and what we might want to question.
                    </p>

                    <div className="reflection-info__divider" />

                    <p>
                        Your response is saved privately and is not
                        displayed in the community reflections below.
                    </p>
                </aside>
            </section>

            <section className="public-reflections">
                <div className="page-header page-header--small">
                    <p className="section-label">COMMUNITY REFLECTIONS</p>

                    <h2>Shared perspectives</h2>

                    <p>
                        These reflections are shared by people who have
                        chosen to make their responses public.
                    </p>
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
                        {reflections.map((reflection, index) => (
                            <article
                                className="reflection-card"
                                key={reflection._id}
                            >
                                <span className="reflection-card__number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

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