/**
 * Type definitions for SEO Brief Generator
 */

export interface BriefRequest {
    title: string;
    target_audience: string;
    primary_keywords: string[];
    secondary_keywords: string[];
}

export interface SEOBrief {
    meta_title: string;
    meta_description: string;
    h1_suggestion: string;
    content_outline: string[];
    word_count_recommendation: number;
    keyword_placement_tips: string[];
    internal_linking_suggestions: string[];
}

export interface BriefResponse {
    success: boolean;
    brief: SEOBrief | null;
    error: string | null;
}
