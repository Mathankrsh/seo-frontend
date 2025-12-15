/**
 * TypeScript types for SEO Brief Generator API
 */

export interface BriefRequest {
    title: string;
    target_audience: string;
    primary_keywords: string[];
    secondary_keywords: string[];
}

export interface BriefResponse {
    success: boolean;
    brief: string | null;
    error: string | null;
}
