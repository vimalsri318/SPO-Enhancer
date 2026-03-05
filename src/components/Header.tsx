"use client";

import { GraduationCap, Sparkles } from "lucide-react";

interface HeaderProps {
    currentStep: number;
    totalSteps: number;
    stepNames: string[];
}

export default function Header({ currentStep, totalSteps, stepNames }: HeaderProps) {
    return (
        <header className="relative z-10 px-6 py-5">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                            background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                            boxShadow: "0 0 16px rgba(99,102,241,0.4)",
                        }}
                    >
                        <GraduationCap size={18} color="white" />
                    </div>
                    <div>
                        <span
                            className="text-sm font-700 tracking-tight"
                            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
                        >
                            SOP<span className="gradient-text">Enhancer</span>
                        </span>
                        <p className="text-xs" style={{ color: "var(--text-muted)", lineHeight: 1 }}>
                            by SPINaBOT
                        </p>
                    </div>
                </div>

                {/* Step badge */}
                <div className="badge badge-indigo">
                    <Sparkles size={11} />
                    <span>
                        Step {currentStep + 1} of {totalSteps} — {stepNames[currentStep]}
                    </span>
                </div>
            </div>
        </header>
    );
}
