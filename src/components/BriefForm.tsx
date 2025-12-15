"use client";

import { useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X, Send } from "lucide-react";
import { briefFormSchema, BriefFormData } from "@/lib/validations";

interface BriefFormProps {
    onSubmit: (data: BriefFormData) => Promise<void>;
    isLoading: boolean;
}

export function BriefForm({ onSubmit, isLoading }: BriefFormProps) {
    const [primaryKeywordInput, setPrimaryKeywordInput] = useState("");
    const [secondaryKeywordInput, setSecondaryKeywordInput] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<BriefFormData>({
        resolver: zodResolver(briefFormSchema),
        defaultValues: {
            title: "",
            target_audience: "",
            primary_keywords: [],
            secondary_keywords: [],
        },
    });

    const primaryKeywords = watch("primary_keywords");
    const secondaryKeywords = watch("secondary_keywords");

    const addPrimaryKeyword = () => {
        const keyword = primaryKeywordInput.trim();
        if (keyword && primaryKeywords.length < 5 && !primaryKeywords.includes(keyword)) {
            setValue("primary_keywords", [...primaryKeywords, keyword], { shouldValidate: true });
            setPrimaryKeywordInput("");
        }
    };

    const removePrimaryKeyword = (index: number) => {
        setValue(
            "primary_keywords",
            primaryKeywords.filter((_, i) => i !== index),
            { shouldValidate: true }
        );
    };

    const addSecondaryKeyword = () => {
        const keyword = secondaryKeywordInput.trim();
        if (keyword && secondaryKeywords.length < 10 && !secondaryKeywords.includes(keyword)) {
            setValue("secondary_keywords", [...secondaryKeywords, keyword], { shouldValidate: true });
            setSecondaryKeywordInput("");
        }
    };

    const removeSecondaryKeyword = (index: number) => {
        setValue(
            "secondary_keywords",
            secondaryKeywords.filter((_, i) => i !== index),
            { shouldValidate: true }
        );
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        type: "primary" | "secondary"
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            type === "primary" ? addPrimaryKeyword() : addSecondaryKeyword();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8"
        >
            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Content Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register("title")}
                        placeholder="e.g., Best Running Shoes for Marathon Training 2024"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-brand transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                    />
                    {errors.title && (
                        <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
                    )}
                </div>

                {/* Target Audience */}
                <div>
                    <label
                        htmlFor="target_audience"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Target Audience <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="target_audience"
                        {...register("target_audience")}
                        rows={3}
                        placeholder="e.g., Marathon runners aged 25-45 looking for performance footwear with great cushioning and durability"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-brand transition-all duration-200 text-gray-900 placeholder:text-gray-400 resize-none"
                    />
                    {errors.target_audience && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.target_audience.message}
                        </p>
                    )}
                </div>

                {/* Primary Keywords */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Keywords <span className="text-red-500">*</span>
                        <span className="text-gray-400 font-normal ml-2">
                            (1-5 keywords)
                        </span>
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={primaryKeywordInput}
                            onChange={(e) => setPrimaryKeywordInput(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "primary")}
                            placeholder="Type and press Enter to add"
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus-brand transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                            disabled={primaryKeywords.length >= 5}
                        />
                        <button
                            type="button"
                            onClick={addPrimaryKeyword}
                            disabled={primaryKeywords.length >= 5 || !primaryKeywordInput.trim()}
                            className="px-4 py-3 rounded-xl bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {primaryKeywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-100 text-brand-700 text-sm font-medium"
                            >
                                {keyword}
                                <button
                                    type="button"
                                    onClick={() => removePrimaryKeyword(index)}
                                    className="hover:text-brand-900 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </span>
                        ))}
                    </div>
                    {errors.primary_keywords && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.primary_keywords.message}
                        </p>
                    )}
                </div>

                {/* Secondary Keywords */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Keywords
                        <span className="text-gray-400 font-normal ml-2">
                            (optional, up to 10)
                        </span>
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={secondaryKeywordInput}
                            onChange={(e) => setSecondaryKeywordInput(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, "secondary")}
                            placeholder="Type and press Enter to add"
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus-brand transition-all duration-200 text-gray-900 placeholder:text-gray-400"
                            disabled={secondaryKeywords.length >= 10}
                        />
                        <button
                            type="button"
                            onClick={addSecondaryKeyword}
                            disabled={secondaryKeywords.length >= 10 || !secondaryKeywordInput.trim()}
                            className="px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {secondaryKeywords.map((keyword, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium"
                            >
                                {keyword}
                                <button
                                    type="button"
                                    onClick={() => removeSecondaryKeyword(index)}
                                    className="hover:text-gray-900 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-lg shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 hover:from-brand-700 hover:to-brand-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Generating Brief...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Generate SEO Brief
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
