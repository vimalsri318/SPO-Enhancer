"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
    step: number;
    total: number;
    stepNames: string[];
}

export default function ProgressBar({ step, total, stepNames }: ProgressBarProps) {
    const pct = Math.round(((step + 1) / total) * 100);

    return (
        <div>
            {/* Step labels */}
            <div className="flex items-center justify-between mb-3">
                {stepNames.map((name, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500"
                            style={{
                                background:
                                    i < step
                                        ? "var(--success)"
                                        : i === step
                                            ? "var(--accent-primary)"
                                            : "rgba(255,255,255,0.07)",
                                color: i <= step ? "white" : "var(--text-muted)",
                                border:
                                    i === step
                                        ? "2px solid rgba(99,102,241,0.5)"
                                        : "1px solid rgba(255,255,255,0.1)",
                                boxShadow: i === step ? "0 0 10px rgba(99,102,241,0.4)" : "none",
                            }}
                        >
                            {i < step ? <Check size={10} strokeWidth={3} /> : i + 1}
                        </div>
                        <span
                            className="text-xs font-medium hidden sm:block transition-all duration-300"
                            style={{
                                color:
                                    i === step
                                        ? "var(--text-primary)"
                                        : i < step
                                            ? "var(--success)"
                                            : "var(--text-muted)",
                            }}
                        >
                            {name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Bar */}
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>

            <p
                className="text-right text-xs mt-1.5"
                style={{ color: "var(--text-muted)" }}
            >
                {pct}% complete
            </p>
        </div>
    );
}
