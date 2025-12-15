import { BriefRequest, BriefResponse } from "@/types";

/**
 * API client for SEO Brief Generator backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Generate an SEO brief from the backend API
 */
export async function generateBrief(data: BriefRequest): Promise<BriefResponse> {
    const response = await fetch(`${API_URL}/api/v1/generate-brief`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to generate SEO brief");
    }

    return response.json();
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<{ status: string }> {
    const response = await fetch(`${API_URL}/health`);

    if (!response.ok) {
        throw new Error("API is not available");
    }

    return response.json();
}
