import { z } from "zod";

/**
 * Validation schema for SEO Brief form
 */
export const briefFormSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(200, "Title must be less than 200 characters"),
    target_audience: z
        .string()
        .min(10, "Target audience description must be at least 10 characters")
        .max(500, "Target audience description must be less than 500 characters"),
    primary_keywords: z
        .array(z.string().min(1, "Keyword cannot be empty"))
        .min(1, "At least one primary keyword is required")
        .max(5, "Maximum 5 primary keywords allowed"),
    secondary_keywords: z
        .array(z.string().min(1, "Keyword cannot be empty"))
        .max(10, "Maximum 10 secondary keywords allowed"),
});

export type BriefFormData = z.infer<typeof briefFormSchema>;
