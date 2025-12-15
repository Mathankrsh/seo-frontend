"use client";

import { Sparkles } from "lucide-react";

export function Header() {
    return (
        <header className="w-full py-6 px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/25">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-gray-900">
                        SEO Brief Generator
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/Mathankrsh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    );
}
