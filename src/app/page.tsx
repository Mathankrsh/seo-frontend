"use client";

import { useState } from "react";
import { Header, BriefForm, BriefOutput } from "@/components";
import { generateBrief } from "@/lib/api";
import { BriefFormData } from "@/lib/validations";
import { AlertCircle, Sparkles } from "lucide-react";

export default function Home() {
  const [brief, setBrief] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BriefFormData) => {
    setIsLoading(true);
    setError(null);
    setBrief(null);

    try {
      const response = await generateBrief(data);

      if (response.success && response.brief) {
        setBrief(response.brief);
      } else {
        setError(response.error || "Failed to generate SEO brief");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered SEO Content Strategy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Generate{" "}
            <span className="gradient-text">SEO Briefs</span>
            <br />
            in Seconds
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your content details and let AI create a comprehensive SEO
            brief with meta tags, content outline, and keyword optimization tips.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <BriefForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Output */}
          <div>
            {isLoading && (
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mb-4 animate-pulse-brand">
                    <Sparkles className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Generating Your SEO Brief
                  </h3>
                  <p className="text-gray-500 text-center">
                    Our AI is analyzing your inputs and creating<br />
                    optimized recommendations...
                  </p>
                  <div className="mt-6 w-full max-w-xs">
                    <div className="h-2 rounded-full animate-shimmer" />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900">
                      Error Generating Brief
                    </h3>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {brief && !isLoading && <BriefOutput brief={brief} />}

            {!brief && !isLoading && !error && (
              <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your SEO Brief Will Appear Here
                  </h3>
                  <p className="text-gray-500 max-w-sm">
                    Fill out the form on the left and click &quot;Generate SEO
                    Brief&quot; to get your AI-powered content strategy.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Built with{" "}
            <span className="font-medium text-gray-700">Next.js</span> &{" "}
            <span className="font-medium text-gray-700">FastAPI</span>
            {" • "}
            Powered by{" "}
            <span className="font-medium text-gray-700">Google Gemini AI</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
