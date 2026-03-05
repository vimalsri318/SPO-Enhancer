"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, User, Mail, Phone, Globe, Building2, BookOpen } from "lucide-react";
import type { FormData } from "@/app/page";

interface Props {
    data: FormData;
    update: (p: Partial<FormData>) => void;
    onNext: () => void;
}

const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany",
    "Netherlands", "France", "Sweden", "Switzerland", "Singapore",
    "New Zealand", "Ireland", "Japan", "South Korea", "Other",
];

export default function StepPersonal({ data, update, onNext }: Props) {
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const validate = () => {
        const e: typeof errors = {};
        if (!data.name.trim()) e.name = "Full name is required";
        if (!data.email.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            e.email = "Enter a valid email address";
        if (!data.targetCountry) e.targetCountry = "Select a target country";
        if (!data.targetProgram.trim()) e.targetProgram = "Program name is required";
        return e;
    };

    const handleNext = () => {
        const e = validate();
        if (Object.keys(e).length) {
            setErrors(e);
            toast.error("Please fix the highlighted fields.");
            return;
        }
        onNext();
    };

    const field = (key: keyof FormData) => ({
        value: data[key] as string,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            update({ [key]: e.target.value });
            if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
        },
    });

    return (
        <div>
            {/* Heading */}
            <div className="mb-7">
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
                    >
                        <User size={15} style={{ color: "var(--accent-primary)" }} />
                    </div>
                    <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)", fontFamily: "Outfit, sans-serif" }}>
                        Personal Information
                    </h2>
                </div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Tell us about yourself so we can personalize your SOP.
                </p>
            </div>

            <div className="space-y-5">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field-group">
                        <label className="form-label">
                            <span className="flex items-center gap-1.5">
                                <User size={12} /> Full Name <span style={{ color: "var(--error)" }}>*</span>
                            </span>
                        </label>
                        <input
                            id="name"
                            className="form-input"
                            placeholder="e.g. Rahul Sharma"
                            {...field("name")}
                        />
                        {errors.name && (
                            <p className="form-hint" style={{ color: "var(--error)" }}>{errors.name}</p>
                        )}
                    </div>

                    <div className="field-group">
                        <label className="form-label">
                            <span className="flex items-center gap-1.5">
                                <Phone size={12} /> Phone (optional)
                            </span>
                        </label>
                        <input
                            id="phone"
                            className="form-input"
                            placeholder="+91 9876543210"
                            {...field("phone")}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="field-group">
                    <label className="form-label">
                        <span className="flex items-center gap-1.5">
                            <Mail size={12} /> Email Address <span style={{ color: "var(--error)" }}>*</span>
                        </span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-input"
                        placeholder="you@university.edu"
                        {...field("email")}
                    />
                    {errors.email && (
                        <p className="form-hint" style={{ color: "var(--error)" }}>{errors.email}</p>
                    )}
                    <p className="form-hint">Your humanized SOP will be sent here.</p>
                </div>

                <div className="divider" />

                {/* Target country */}
                <div className="field-group">
                    <label className="form-label">
                        <span className="flex items-center gap-1.5">
                            <Globe size={12} /> Target Country <span style={{ color: "var(--error)" }}>*</span>
                        </span>
                    </label>
                    <select
                        id="targetCountry"
                        className="form-input"
                        style={{ appearance: "none", cursor: "pointer" }}
                        value={data.targetCountry}
                        onChange={(e) => {
                            update({ targetCountry: e.target.value });
                            if (errors.targetCountry) setErrors((prev) => ({ ...prev, targetCountry: undefined }));
                        }}
                    >
                        <option value="" disabled>Select your target country…</option>
                        {COUNTRIES.map((c) => (
                            <option key={c} value={c} style={{ background: "#0d1121", color: "#f1f5f9" }}>{c}</option>
                        ))}
                    </select>
                    {errors.targetCountry && (
                        <p className="form-hint" style={{ color: "var(--error)" }}>{errors.targetCountry}</p>
                    )}
                </div>

                {/* University + Program */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field-group">
                        <label className="form-label">
                            <span className="flex items-center gap-1.5">
                                <Building2 size={12} /> Target University (optional)
                            </span>
                        </label>
                        <input
                            id="targetUniversity"
                            className="form-input"
                            placeholder="e.g. MIT, Stanford…"
                            {...field("targetUniversity")}
                        />
                    </div>

                    <div className="field-group">
                        <label className="form-label">
                            <span className="flex items-center gap-1.5">
                                <BookOpen size={12} /> Program / Course <span style={{ color: "var(--error)" }}>*</span>
                            </span>
                        </label>
                        <input
                            id="targetProgram"
                            className="form-input"
                            placeholder="e.g. MS Computer Science"
                            {...field("targetProgram")}
                        />
                        {errors.targetProgram && (
                            <p className="form-hint" style={{ color: "var(--error)" }}>{errors.targetProgram}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Next */}
            <div className="flex justify-end mt-8">
                <button id="next-personal" className="btn-primary flex items-center gap-2" onClick={handleNext}>
                    Continue
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
