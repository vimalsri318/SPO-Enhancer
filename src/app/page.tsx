"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  GraduationCap, Sparkles, Send, Mail, User, FileText,
  CheckCircle2, RefreshCw, Shield, ArrowUpRight, Phone,
  BookOpen, Globe, Calendar, ChevronDown, Lightbulb,
} from "lucide-react";

// ─── Pre-built SOP Templates ───────────────────────────────────────────────
const SOP_TEMPLATES = [
  {
    id: "cs-ms",
    label: "CS / MS",
    emoji: "💻",
    text: `I am applying for the MS in Computer Science program at [University]. With a Bachelor's degree in Computer Science from [Home University] and 2 years of software engineering experience at [Company], I have developed strong skills in machine learning and distributed systems. My research on [Research Topic] was published in [Journal/Conference]. I aim to specialize in AI and contribute to cutting-edge research under Professor [Name]'s guidance. My long-term goal is to lead applied AI research in the industry.`,
  },
  {
    id: "mba",
    label: "MBA",
    emoji: "📊",
    text: `I am seeking admission to the MBA program at [Business School]. With [X] years of experience in [Industry] at [Company], I have managed cross-functional teams and driven [specific achievement, e.g., 30% revenue growth]. My undergraduate degree in [Field] provided a strong analytical foundation. The program's emphasis on [specific specialization] and its global alumni network align perfectly with my goal of transitioning to [Target Role] in the [Target Industry] sector.`,
  },
  {
    id: "engineering",
    label: "Engineering",
    emoji: "⚙️",
    text: `I am applying for the MS in [Engineering Discipline] at [University]. My undergraduate project on [Project Title] sparked my passion for [specific area]. During my tenure at [Company], I designed [specific system/solution] that improved [metric] by [percentage]. I want to deepen my expertise in [subfield] and collaborate with the research group working on [Lab/Project]. I plan to return to [Home Country] to contribute to infrastructure development.`,
  },
  {
    id: "data-science",
    label: "Data Science",
    emoji: "📈",
    text: `I am applying to the MS in Data Science program at [University]. My background in [Undergraduate Major] combined with hands-on experience in building predictive models at [Company] has prepared me for advanced study. I have worked with datasets of over [X] million records and deployed ML pipelines using [Tools/Frameworks]. I am particularly interested in exploring [research area] and believe [University]'s interdisciplinary approach will help me become a leading data scientist in [industry].`,
  },
  {
    id: "public-health",
    label: "Public Health",
    emoji: "🏥",
    text: `I am applying for the MPH program at [University] with a concentration in [Epidemiology/Health Policy/etc.]. My work as a [Role] at [Organization] exposed me to [specific public health challenge]. I conducted a community health assessment for [demographic] that influenced local policy on [topic]. I aspire to work with organizations like [WHO/CDC/etc.] to design evidence-based interventions targeting [disease/issue] in low-resource settings.`,
  },
  {
    id: "arts-humanities",
    label: "Arts & Humanities",
    emoji: "🎨",
    text: `I am applying to the MA in [Program] at [University]. My undergraduate thesis on [Topic] explored [brief description] through the lens of [theoretical framework]. I have presented my work at [Conference/Exhibition] and published in [Journal/Platform]. I am drawn to [University] because of [specific faculty member] whose work on [topic] directly intersects with my research interests. I intend to complete a dissertation that bridges [Field A] and [Field B].`,
  },
];

// ─── MCQ Options ───────────────────────────────────────────────────────────
const DEGREE_OPTIONS = ["Bachelor's", "Master's", "PhD", "PhD (cont.)", "Executive MBA"];
const DOMAIN_OPTIONS = [
  "Computer Science", "Data Science / AI", "Business / MBA",
  "Engineering", "Medicine / Healthcare", "Law",
  "Arts & Humanities", "Social Sciences", "Public Health", "Other",
];
const YEAR_OPTIONS = ["2024", "2025", "2026", "2027", "2028+"];
const COUNTRY_OPTIONS = [
  "USA", "UK", "Canada", "Australia", "Germany",
  "Netherlands", "Ireland", "New Zealand", "Singapore", "Other",
];

// ─── Chip component ────────────────────────────────────────────────────────
function Chip({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip ${selected ? "chip-selected" : ""}`}
    >
      {label}
    </button>
  );
}


// ─── Template Picker ────────────────────────────────────────────────────────
function TemplatePicker({ onSelect }: { onSelect: (text: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="template-wrap">
      <button
        type="button"
        className="template-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <Lightbulb size={13} style={{ color: "var(--accent-primary)" }} />
        <span>Use a template</span>
        <ChevronDown size={13} className={`chevron ${open ? "chevron-open" : ""}`} />
      </button>

      {open && (
        <div className="template-grid">
          {SOP_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              className="template-card"
              onClick={() => {
                onSelect(t.text);
                setOpen(false);
                toast.success(`"${t.label}" template loaded — customize it below!`);
              }}
            >
              <span className="template-emoji">{t.emoji}</span>
              <span className="template-label">{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("");
  const [domain, setDomain] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!degreeLevel) e.degreeLevel = "Please select a degree level";
    if (!domain) e.domain = "Please select your domain";
    if (!prompt.trim()) e.prompt = "Please describe your background or use a template";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name, email, phone, degreeLevel, domain,
        gradYear, targetCountry, prompt,
      };
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      setDone(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Submission failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDone(false); setName(""); setEmail(""); setPhone("");
    setDegreeLevel(""); setDomain(""); setGradYear("");
    setTargetCountry(""); setPrompt(""); setErrors({});
  };

  /* ── Success Screen ── */
  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center fade-up">
          <div className="glass-card overflow-hidden">
            <div className="mac-dots">
              <div className="mac-dot mac-dot-red" />
              <div className="mac-dot mac-dot-yellow" />
              <div className="mac-dot mac-dot-green" />
            </div>
            <div className="card-divider" />

            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="success-ring">
                  <CheckCircle2 size={36} strokeWidth={1.5} style={{ color: "var(--success)" }} />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                SOP Delivered! 🎉
              </h2>
              <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                Your humanized SOP is on its way to
              </p>
              <div className="px-4 py-3 rounded-xl mb-6 text-sm font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)", border: "1px solid rgba(99,102,241,0.15)" }}>
                {email}
              </div>

              <div className="space-y-3 text-left mb-8">
                {[
                  { icon: FileText, label: "SOP Generated", desc: "Expertly crafted narrative" },
                  { icon: Shield, label: "0% AI Detected", desc: "Passed all filters" },
                  { icon: Mail, label: "Sent to Inbox", desc: "Check your email" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent-soft)" }}>
                      <Icon size={15} style={{ color: "var(--accent-primary)" }} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-primary" onClick={resetForm}>
                <RefreshCw size={16} /> Generate Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main Form ── */
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--accent-primary)", boxShadow: "0 4px 14px rgba(99,102,241,0.35)" }}
          >
            <GraduationCap size={20} color="white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              SOP<span className="gradient-text">Creator</span>
            </span>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] leading-none mt-0.5" style={{ color: "var(--text-muted)" }}>by SPINaBOT</p>
          </div>
        </div>

        <div className="badge badge-indigo">
          <Sparkles size={12} /> 100% Human Score
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-2xl fade-up">

          {/* Hero */}
          <div className="text-center mb-8">
            <h1
              className="text-5xl font-black tracking-tighter leading-[0.95] mb-4"
              style={{ fontFamily: "var(--font-outfit), sans-serif", color: "var(--text-primary)" }}
            >
              Write your <span className="gradient-text">Story.</span>
            </h1>
            <p className="text-base font-medium" style={{ color: "var(--text-secondary)" }}>
              Tell us about yourself — we&apos;ll craft a polished, human SOP and deliver it to your inbox.
            </p>
          </div>

          {/* Card */}
          <div className="glass-card">
            {/* Mac dots bar */}
            <div className="mac-dots">
              <div className="mac-dot mac-dot-red" />
              <div className="mac-dot mac-dot-yellow" />
              <div className="mac-dot mac-dot-green" />
            </div>
            <div className="card-divider" />

            {/* Form body */}
            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "22px" }}>

              {/* Section: Personal Info */}
              <div className="section-header">
                <User size={14} style={{ color: "var(--accent-primary)" }} />
                <span>Personal Details</span>
              </div>

              {/* Name + Email row */}
              <div className="grid-2">
                <div>
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    className={`form-input ${errors.name ? "input-error" : ""}`}
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined as unknown as string })); }}
                  />
                  {errors.name && <p className="field-error">{errors.name}</p>}
                </div>
                <div>
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? "input-error" : ""}`}
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined as unknown as string })); }}
                  />
                  {errors.email && <p className="field-error">{errors.email}</p>}
                </div>
              </div>

              {/* Phone (optional) */}
              <div>
                <label className="form-label" htmlFor="phone">
                  Phone Number <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                </label>
                <div className="phone-wrap">
                  <Phone size={14} className="phone-icon" style={{ color: "var(--text-muted)" }} />
                  <input
                    id="phone"
                    type="tel"
                    className="form-input phone-input"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Section: Academic Info */}
              <div className="section-header" style={{ marginTop: "4px" }}>
                <BookOpen size={14} style={{ color: "var(--accent-primary)" }} />
                <span>Academic Background</span>
              </div>

              {/* Degree Level */}
              <div>
                <label className="form-label">Applying for Degree *</label>
                <div className="chip-row">
                  {DEGREE_OPTIONS.map((d) => (
                    <Chip key={d} label={d} selected={degreeLevel === d}
                      onClick={() => { setDegreeLevel(d); setErrors(p => ({ ...p, degreeLevel: undefined as unknown as string })); }} />
                  ))}
                </div>
                {errors.degreeLevel && <p className="field-error mt-1">{errors.degreeLevel}</p>}
              </div>

              {/* Domain */}
              <div>
                <label className="form-label">Field / Domain *</label>
                <div className="chip-row">
                  {DOMAIN_OPTIONS.map((d) => (
                    <Chip key={d} label={d} selected={domain === d}
                      onClick={() => { setDomain(d); setErrors(p => ({ ...p, domain: undefined as unknown as string })); }} />
                  ))}
                </div>
                {errors.domain && <p className="field-error mt-1">{errors.domain}</p>}
              </div>

              {/* Graduation Year + Target Country */}
              <div className="grid-2">
                <div>
                  <label className="form-label">
                    <Calendar size={12} style={{ display: "inline", marginRight: 5 }} />
                    Expected Intake Year
                  </label>
                  <div className="chip-row">
                    {YEAR_OPTIONS.map((y) => (
                      <Chip key={y} label={y} selected={gradYear === y} onClick={() => setGradYear(y)} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="form-label">
                    <Globe size={12} style={{ display: "inline", marginRight: 5 }} />
                    Target Country
                  </label>
                  <div className="chip-row">
                    {COUNTRY_OPTIONS.map((c) => (
                      <Chip key={c} label={c} selected={targetCountry === c} onClick={() => setTargetCountry(c)} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Section: SOP Brief */}
              <div className="section-header" style={{ marginTop: "4px" }}>
                <FileText size={14} style={{ color: "var(--accent-primary)" }} />
                <span>Your SOP Brief</span>
              </div>

              {/* Template Picker */}
              <TemplatePicker onSelect={setPrompt} />

              {/* Prompt */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="form-label mb-0" htmlFor="prompt">
                    Background & Goals *
                  </label>
                  <span className={`char-count ${prompt.length > 1500 ? "char-count-over" : ""}`}>
                    {prompt.length} / 1500
                  </span>
                </div>
                <textarea
                  id="prompt"
                  className={`form-input ${errors.prompt ? "input-error" : ""}`}
                  rows={7}
                  placeholder="Describe your academic background, research/work experience, target university, and career goals. Be as specific as possible — more details = better SOP!"
                  value={prompt}
                  onChange={(e) => { setPrompt(e.target.value); setErrors(p => ({ ...p, prompt: undefined as unknown as string })); }}
                />
                {errors.prompt && <p className="field-error">{errors.prompt}</p>}
              </div>

              {/* Stealth note */}
              <div
                className="flex items-start gap-3 rounded-xl p-4"
                style={{ background: "var(--accent-soft)", border: "1px solid rgba(99,102,241,0.12)" }}
              >
                <Shield size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent-primary)" }} strokeWidth={2.5} />
                <p className="text-xs font-medium leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  <span className="font-bold" style={{ color: "var(--accent-primary)" }}>Stealth Protocol: </span>
                  Your SOP will be humanized to pass every AI detector with a 100% human score.
                </p>
              </div>

              {/* Submit */}
              <button
                id="submit-sop"
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <><div className="spinner" /> Generating your SOP…</>
                ) : (
                  <><Send size={16} /> Generate My SOP <ArrowUpRight size={16} /></>
                )}
              </button>

            </div>
          </div>

          <p className="text-center mt-6 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
            Trusted by 10,000+ students globally
          </p>
        </div>
      </main>
    </div>
  );
}
