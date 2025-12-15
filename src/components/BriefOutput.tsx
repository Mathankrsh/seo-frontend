"use client";

import { useState } from "react";
import {
    Copy,
    Check,
    FileText,
    Hash,
    List,
    Link2,
    Lightbulb,
    BarChart3,
} from "lucide-react";
import { SEOBrief } from "@/types";

interface BriefOutputProps {
    brief: SEOBrief;
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Copy to clipboard"
        >
            {copied ? (
                <Check className="w-4 h-4 text-green-500" />
            ) : (
                <Copy className="w-4 h-4 text-gray-400" />
            )}
        </button>
    );
}

function Section({
    title,
    icon: Icon,
    children,
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
            </div>
            {children}
        </div>
    );
}

export function BriefOutput({ brief }: BriefOutputProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 space-y-8">
            <div className="text-center pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold gradient-text">
                    Your SEO Brief is Ready!
                </h2>
                <p className="text-gray-500 mt-2">
                    Use this brief to create optimized content
                </p>
            </div>

            {/* Meta Title */}
            <Section title="Meta Title" icon={FileText}>
                <div className="bg-gray-50 rounded-xl p-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-gray-900 font-medium">{brief.meta_title}</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {brief.meta_title.length} / 60 characters
                        </p>
                    </div>
                    <CopyButton text={brief.meta_title} />
                </div>
            </Section>

            {/* Meta Description */}
            <Section title="Meta Description" icon={FileText}>
                <div className="bg-gray-50 rounded-xl p-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <p className="text-gray-900">{brief.meta_description}</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {brief.meta_description.length} / 155 characters
                        </p>
                    </div>
                    <CopyButton text={brief.meta_description} />
                </div>
            </Section>

            {/* H1 Suggestion */}
            <Section title="H1 Heading" icon={Hash}>
                <div className="bg-gray-50 rounded-xl p-4 flex items-start justify-between gap-4">
                    <p className="text-gray-900 font-medium text-lg flex-1">
                        {brief.h1_suggestion}
                    </p>
                    <CopyButton text={brief.h1_suggestion} />
                </div>
            </Section>

            {/* Word Count */}
            <Section title="Recommended Word Count" icon={BarChart3}>
                <div className="bg-gradient-to-r from-brand-50 to-brand-100/50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-brand-600">
                        {brief.word_count_recommendation.toLocaleString()}
                        <span className="text-lg font-normal text-brand-500 ml-2">
                            words
                        </span>
                    </p>
                </div>
            </Section>

            {/* Content Outline */}
            <Section title="Content Outline" icon={List}>
                <div className="bg-gray-50 rounded-xl p-4">
                    <ol className="space-y-3">
                        {brief.content_outline.map((section, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-sm font-medium flex items-center justify-center flex-shrink-0">
                                    {index + 1}
                                </span>
                                <span className="text-gray-700">{section}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </Section>

            {/* Keyword Placement Tips */}
            <Section title="Keyword Placement Tips" icon={Lightbulb}>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <ul className="space-y-2">
                        {brief.keyword_placement_tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-amber-900">
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>

            {/* Internal Linking Suggestions */}
            <Section title="Internal Linking Suggestions" icon={Link2}>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <ul className="space-y-2">
                        {brief.internal_linking_suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-blue-900"
                            >
                                <Link2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Section>
        </div>
    );
}
