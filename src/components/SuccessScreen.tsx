"use client";

import { CheckCircle2, Mail, RefreshCw, Clock, Shield, Sparkles } from "lucide-react";

interface Props {
    email: string;
}

export default function SuccessScreen({ email }: Props) {
    return (
        <div className="relative min-h-screen flex flex-col">
            {/* Animated background */}
            <div className="bg-animated">
                <div className="bg-orb-3" />
            </div>
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg text-center fade-up">
                    {/* Success ring + icon */}
                    <div className="flex justify-center mb-8">
                        <div className="success-ring">
                            <CheckCircle2
                                size={44}
                                style={{ color: "var(--success)" }}
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>

                    {/* Main heading */}
                    <h1
                        className="text-3xl font-bold mb-3"
                        style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
                    >
                        You&apos;re all set! 🎉
                    </h1>
                    <p className="text-base mb-2" style={{ color: "var(--text-secondary)" }}>
                        Your SOP is being humanized and will land in your inbox shortly.
                    </p>

                    {/* Email badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mt-1 mb-8"
                        style={{
                            background: "rgba(16,185,129,0.1)",
                            border: "1px solid rgba(16,185,129,0.25)",
                            color: "#6ee7b7",
                        }}
                    >
                        <Mail size={14} />
                        <span className="text-sm font-medium">{email}</span>
                    </div>

                    {/* Timeline steps */}
                    <div
                        className="glass-card p-6 mb-6 text-left"
                    >
                        <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "11px" }}>
                            What happens now
                        </p>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: Sparkles,
                                    color: "var(--accent-primary)",
                                    bg: "rgba(99,102,241,0.12)",
                                    title: "AI Humanization",
                                    desc: "15 rules applied to strip AI patterns and rewrite in your authentic voice",
                                },
                                {
                                    icon: Shield,
                                    color: "var(--accent-secondary)",
                                    bg: "rgba(139,92,246,0.12)",
                                    title: "Quality Check",
                                    desc: "Verified for AI-detection resistance before sending",
                                },
                                {
                                    icon: Mail,
                                    color: "var(--success)",
                                    bg: "rgba(16,185,129,0.12)",
                                    title: "Email Delivery",
                                    desc: "Final humanized SOP sent directly to your inbox",
                                },
                            ].map(({ icon: Icon, color, bg, title, desc }) => (
                                <div key={title} className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: bg, border: `1px solid ${color}33` }}
                                    >
                                        <Icon size={14} style={{ color }} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{title}</p>
                                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ETA banner */}
                    <div
                        className="flex items-center justify-center gap-2 rounded-xl p-3 mb-8"
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                        }}
                    >
                        <Clock size={14} style={{ color: "var(--text-muted)" }} />
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Estimated delivery: <span style={{ color: "var(--text-secondary)" }}>1 – 3 minutes</span>
                        </p>
                    </div>

                    {/* Action */}
                    <button
                        id="submit-another"
                        className="btn-secondary flex items-center gap-2 mx-auto"
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCw size={15} />
                        Submit Another SOP
                    </button>

                    <p className="text-xs mt-6" style={{ color: "var(--text-muted)" }}>
                        Didn&apos;t receive it? Check your spam folder or{" "}
                        <button
                            onClick={() => window.location.reload()}
                            className="underline hover:opacity-80 transition-opacity"
                            style={{ color: "var(--accent-primary)", background: "none", border: "none", cursor: "pointer" }}
                        >
                            try again
                        </button>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
