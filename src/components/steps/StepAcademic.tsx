"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Briefcase, GraduationCap, Star, Layers, Code2 } from "lucide-react";
import type { FormData } from "@/app/page";

interface Props {
    data: FormData;
    update: (p: Partial<FormData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function StepAcademic({ data, update, onNext, onBack }: Props) {
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const validate = () => {
        const e: typeof errors = {};
        if (!data.profession.trim()) e.profession = "Profession / role is required";
        if (!data.background.trim()) e.background = "Academic background is required";
        if (!data.interests.trim()) e.interests = "Please describe your interests";
        return e;
    };

    const handleNext = () => {
        const e = validate();
        if (Object.keys(e).length) {
            setErrors(e);
            toast.error("Please fill in the required fields.");
            return;
        }
        onNext();
    };

    const field = (key: keyof FormData) => ({
        value: data[key] as string,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            update({ [key]: e.target.value });
            if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
        },
    });

    const TextareaField = ({
        id,
        label,
        icon: Icon,
        placeholder,
        hint,
        fieldKey,
        required,
        rows = 3,
    }: {
        id: string;
        label: string;
        icon: React.ElementType;
        placeholder: string;
        hint?: string;
        fieldKey: keyof FormData;
        required?: boolean;
        rows?: number;
    }) => (
        <div className="field-group">
            <label className="form-label" htmlFor={id}>
                <span className="flex items-center gap-1.5">
                    <Icon size={12} />
                    {label}
                    {required && <span style={{ color: "var(--error)" }}>*</span>}
                </span>
            </label>
            <textarea
                id={id}
                className="form-input"
                placeholder={placeholder}
                rows={rows}
                {...field(fieldKey)}
            />
            {errors[fieldKey] ? (
                <p className="form-hint" style={{ color: "var(--error)" }}>{errors[fieldKey]}</p>
            ) : hint ? (
                <p className="form-hint">{hint}</p>
            ) : null}
        </div>
    );

    return (
        <div>
            {/* Heading */}
            <div className="mb-7">
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
                    >
                        <Briefcase size={15} style={{ color: "var(--accent-secondary)" }} />
                    </div>
                    <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)", fontFamily: "Outfit, sans-serif" }}>
                        Academic & Experience
                    </h2>
                </div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    The more detail you provide, the more authentic and personalized your SOP will be.
                </p>
            </div>

            <div className="space-y-5">
                {/* Profession */}
                <div className="field-group">
                    <label className="form-label" htmlFor="profession">
                        <span className="flex items-center gap-1.5">
                            <Briefcase size={12} /> Current Role / Profession <span style={{ color: "var(--error)" }}>*</span>
                        </span>
                    </label>
                    <input
                        id="profession"
                        className="form-input"
                        placeholder="e.g. Software Engineer at TCS, Final Year B.Tech Student…"
                        {...field("profession")}
                    />
                    {errors.profession && (
                        <p className="form-hint" style={{ color: "var(--error)" }}>{errors.profession}</p>
                    )}
                </div>

                {/* Academic background */}
                <TextareaField
                    id="background"
                    label="Academic Background"
                    icon={GraduationCap}
                    placeholder="e.g. B.Tech in Computer Science from IIT Delhi (2024), CGPA 8.7/10. Relevant coursework: Machine Learning, Distributed Systems, Algorithms."
                    hint="Include degree, institution, graduation year, and any relevant courses."
                    fieldKey="background"
                    required
                    rows={3}
                />

                {/* Interests */}
                <TextareaField
                    id="interests"
                    label="Research / Professional Interests"
                    icon={Star}
                    placeholder="e.g. Deep learning for medical imaging, Large language models, Quantum computing, Sustainable infrastructure…"
                    hint="Be specific — these will shape the narrative of your SOP."
                    fieldKey="interests"
                    required
                    rows={2}
                />

                <div className="divider" />

                {/* Internships */}
                <TextareaField
                    id="internships"
                    label="Internships & Work Experience"
                    icon={Layers}
                    placeholder={`e.g.\n• Google SWE Intern (Summer 2023) — Built a real-time pipeline processing 10M events/day\n• Razorpay Backend Intern (2022) — Reduced API latency by 40% using caching strategies`}
                    hint="Optional but highly recommended. List each role with what you did and any results."
                    fieldKey="internships"
                    rows={4}
                />

                {/* Projects */}
                <TextareaField
                    id="projects"
                    label="Key Projects"
                    icon={Code2}
                    placeholder={`e.g.\n• Distributed key-value store in Go — Implemented Raft consensus, handles 50k req/s\n• NLP sentiment pipeline using HuggingFace — 94% accuracy on 100k tweet dataset`}
                    hint="Optional. Include tech stack and measurable outcomes where possible."
                    fieldKey="projects"
                    rows={4}
                />
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
                <button id="back-academic" className="btn-secondary flex items-center gap-2" onClick={onBack}>
                    <ArrowLeft size={16} /> Back
                </button>
                <button id="next-academic" className="btn-primary flex items-center gap-2" onClick={handleNext}>
                    Continue <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
