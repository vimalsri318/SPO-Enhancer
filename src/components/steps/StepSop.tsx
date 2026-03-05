"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, FileText, Send, AlertCircle, Info } from "lucide-react";
import type { FormData } from "@/types/form";

interface Props {
    data: FormData;
    update: (p: Partial<FormData>) => void;
    onBack: () => void;
    onSuccess: (email: string) => void;
}

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || "";

const MIN_WORDS = 200;
const MAX_CHARS = 8000;

function countWords(text: string) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function StepSop({ data, update, onBack, onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const chars = data.sop.length;
    const words = countWords(data.sop);
    const charRatio = chars / MAX_CHARS;

    const handleSubmit = async () => {
        if (!data.sop.trim()) {
            toast.error("Please paste your SOP before submitting.");
            return;
        }
        if (words < MIN_WORDS) {
            toast.error(`Your SOP is too short. Minimum ${MIN_WORDS} words required (currently ${words}).`);
            return;
        }
        if (!WEBHOOK_URL) {
            toast.error("Webhook URL is not configured. Please set NEXT_PUBLIC_WEBHOOK_URL in your .env.local file.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                targetCountry: data.targetCountry,
                targetUniversity: data.targetUniversity,
                targetProgram: data.targetProgram,
                profession: data.profession,
                background: data.background,
                interests: data.interests,
                internships: data.internships,
                projects: data.projects,
                sop: data.sop,
            };

            const res = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`Server responded with ${res.status}`);
            }

            onSuccess(data.email);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Something went wrong";
            setError(msg);
            toast.error("Submission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Heading */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.3)" }}
                    >
                        <FileText size={15} style={{ color: "var(--accent-tertiary)" }} />
                    </div>
                    <h2 className="text-xl font-semibold" style={{ color: "var(--text-primary)", fontFamily: "Outfit, sans-serif" }}>
                        Paste Your SOP
                    </h2>
                </div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Paste your AI-generated Statement of Purpose below. We&apos;ll humanize it and deliver it to{" "}
                    <span style={{ color: "var(--accent-primary)" }}>{data.email}</span>.
                </p>
            </div>

            {/* Info banner */}
            <div
                className="rounded-xl p-4 mb-5 flex gap-3"
                style={{
                    background: "rgba(6,182,212,0.06)",
                    border: "1px solid rgba(6,182,212,0.2)",
                }}
            >
                <Info size={16} style={{ color: "var(--accent-tertiary)", flexShrink: 0, marginTop: 2 }} />
                <div className="text-sm space-y-1" style={{ color: "var(--text-secondary)" }}>
                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>What happens next?</p>
                    <ul className="space-y-0.5 text-xs list-disc list-inside" style={{ color: "var(--text-muted)" }}>
                        <li>Your SOP will be rewritten to remove AI-detectable patterns</li>
                        <li>All your facts, dates, and data will be preserved exactly</li>
                        <li>The humanized version will arrive in your inbox within ~2 minutes</li>
                    </ul>
                </div>
            </div>

            {/* SOP Textarea */}
            <div className="field-group mb-2">
                <label className="form-label" htmlFor="sop">
                    <span className="flex items-center gap-1.5">
                        <FileText size={12} /> Original SOP Content <span style={{ color: "var(--error)" }}>*</span>
                    </span>
                </label>
                <textarea
                    id="sop"
                    className="form-input"
                    placeholder="Paste your ChatGPT / AI-generated SOP here…&#10;&#10;The committee desires candidates who have demonstrated not just academic rigor, but also the ability to translate theoretical knowledge into impactful real-world solutions…"
                    rows={14}
                    value={data.sop}
                    onChange={(e) => update({ sop: e.target.value })}
                    style={{ fontFamily: "ui-monospace, 'Cascadia Code', monospace", fontSize: "13px", lineHeight: "1.7" }}
                />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>
                        <span style={{ color: words >= MIN_WORDS ? "var(--success)" : "var(--text-secondary)" }}>
                            {words}
                        </span>{" "}
                        / {MIN_WORDS}+ words
                    </span>
                    <span>
                        <span style={{ color: charRatio > 0.9 ? "var(--error)" : charRatio > 0.7 ? "#f59e0b" : "var(--text-secondary)" }}>
                            {chars}
                        </span>{" "}
                        / {MAX_CHARS} chars
                    </span>
                </div>
                {words > 0 && words < MIN_WORDS && (
                    <span className="text-xs" style={{ color: "#f59e0b" }}>
                        Need {MIN_WORDS - words} more words
                    </span>
                )}
                {words >= MIN_WORDS && (
                    <span className="text-xs flex items-center gap-1" style={{ color: "var(--success)" }}>
                        ✓ Length looks good
                    </span>
                )}
            </div>

            {/* Error */}
            {error && (
                <div
                    className="rounded-xl p-4 mb-5 flex gap-3"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}
                >
                    <AlertCircle size={16} style={{ color: "var(--error)", flexShrink: 0, marginTop: 1 }} />
                    <p className="text-sm" style={{ color: "#fca5a5" }}>{error}</p>
                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
                <button id="back-sop" className="btn-secondary flex items-center gap-2" onClick={onBack} disabled={loading}>
                    <ArrowLeft size={16} /> Back
                </button>
                <button
                    id="submit-sop"
                    className="btn-primary flex items-center gap-2"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ minWidth: 180 }}
                >
                    {loading ? (
                        <>
                            <div className="spinner" />
                            Processing…
                        </>
                    ) : (
                        <>
                            <Send size={15} />
                            Humanize My SOP
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
