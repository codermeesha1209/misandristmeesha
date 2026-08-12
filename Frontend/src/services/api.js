const API_URL = "http://localhost:3001/api";

export async function getResources() {
    const response = await fetch(`${API_URL}/resources`);

    if (!response.ok) {
        throw new Error("Failed to fetch resources.");
    }

    return response.json();
}

export async function getResource(id) {
    const response = await fetch(`${API_URL}/resources/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch resource.");
    }

    return response.json();
}

export async function getPublicReflections() {
    const response = await fetch(`${API_URL}/reflections`);

    if (!response.ok) {
        throw new Error("Failed to fetch reflections.");
    }

    return response.json();
}

export async function createReflection(reflection) {
    const response = await fetch(`${API_URL}/reflections`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reflection)
    });

    if (!response.ok) {
        throw new Error("Failed to create reflection.");
    }

    return response.json();
}