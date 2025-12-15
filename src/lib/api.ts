import { BriefRequest, BriefResponse } from "@/types";

/**
 * API client for SEO Brief Generator
 * Uses local API proxy to avoid DNS issues
 */

/**
 * Generate an SEO brief using the API proxy
 */
export async function generateBrief(data: BriefRequest): Promise<BriefResponse> {
    // Use local API route as proxy (Vercel server-side fetch bypasses client DNS issues)
    const response = await fetch("/api/generate-brief", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.detail || "Failed to generate SEO brief");
    }

    return response.json();
}

/**
 * Check API health (direct call, still subject to DNS)
 */
export async function checkHealth(): Promise<{ status: string }> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await fetch(`${API_URL}/health`);

    if (!response.ok) {
        throw new Error("API is not available");
    }

    return response.json();
}
