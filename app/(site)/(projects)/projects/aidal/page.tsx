import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "AIDAL — Building the Trust Layer for AI",
  description:
    "The case study behind AIDAL: why it exists, the problem it solves, and what I learned building infrastructure for trustworthy AI.",
};

const challenges = [
  {
    question: "How do we prove data wasn't changed?",
    decision: "Cryptographic hashing on every recorded decision.",
  },
  {
    question: "How do we verify decisions independently?",
    decision: "A public verification page anyone can check against.",
  },
  {
    question: "How do we make explanations understandable?",
    decision: "Plain-English summaries instead of raw logs.",
  },
];

const buildLog = [
  { date: "March 2026", label: "Idea" },
  { date: "April 2026", label: "Built prototype" },
  { date: "May 2026", label: "First outreach" },
  { date: "June 2026", label: "First pivot" },
  { date: "July 2026", label: "Public launch" },
];

export default function AidalCaseStudyPage() {
  return (
    <div className="pt-24">
      <div className="container-tight py-16">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={13} /> All projects
        </Link>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono bg-blue/10 text-blue px-2 py-0.5 rounded">
            Active
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            2024 — Present
          </span>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <Image
            src="/images/aidal-logo.png"
            alt="AIDAL logo"
            width={40}
            height={40}
            className="dark:invert shrink-0"
          />
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            AIDAL
          </h1>
        </div>
        <p className="text-lg text-muted-foreground mb-10">
          Building the trust layer for AI.
        </p>

        <div className="flex items-center gap-3 mb-16">
          <a
            href="https://tryaidal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Visit site <ExternalLink size={13} />
          </a>
        </div>

        {/* TL;DR */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            TL;DR
          </p>
          <div className="border border-border rounded-lg p-6 space-y-4">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                What
              </p>
              <p className="text-foreground">
                Infrastructure for trustworthy AI.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                Why
              </p>
              <p className="text-foreground">
                AI decisions increasingly affect money, healthcare, and
                people&apos;s lives, yet most systems can&apos;t prove how a
                decision was made.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                Result
              </p>
              <p className="text-foreground">
                An API that creates tamper-evident audit trails and
                plain-English explanations for AI decisions.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            The Problem
          </p>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I realized something strange. AI systems can approve loans,
              reject insurance claims, and flag fraud — but if a regulator
              asks why a decision happened, most companies only have logs.
            </p>
            <p className="text-foreground">
              Logs can be changed. Logs aren&apos;t evidence.
            </p>
            <p>That became the starting point for AIDAL.</p>
          </div>
        </section>

        {/* The Insight */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            The Insight
          </p>
          <div className="border-l-2 border-blue pl-6 py-1">
            <p className="text-xl font-medium tracking-tight leading-snug">
              AI needs a trust layer. Just as HTTPS created trust for
              websites, AI needs infrastructure that creates trust for
              decisions.
            </p>
          </div>
        </section>

        {/* Why existing solutions aren't enough */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Why existing solutions aren&apos;t enough
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Logs", desc: "Not tamper-proof." },
              { title: "Dashboards", desc: "Not verifiable." },
              { title: "Documentation", desc: "Can become outdated." },
              {
                title: "Human explanations",
                desc: "Can't always be trusted.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border rounded-lg p-4"
              >
                <p className="text-sm font-medium mb-1">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Solution */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            The Solution
          </p>
          <div className="border border-border rounded-lg p-6">
            <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-muted-foreground">
              <span className="text-foreground">AI Model</span>
              <ArrowRight size={14} />
              <span className="text-foreground">AIDAL API</span>
              <ArrowRight size={14} />
              <span className="text-foreground">Evidence Package</span>
              <ArrowRight size={14} />
              <span className="text-foreground">Verification</span>
              <ArrowRight size={14} />
              <span className="text-foreground">Auditor / Regulator</span>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Key Features
          </p>
          <ul className="space-y-2">
            {[
              "Tamper-evident audit trails",
              "Human-readable explanations",
              "Regulatory mapping",
              "Independent verification",
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-muted-foreground mt-1.5 shrink-0">
                  ·
                </span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Technical Challenges */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Technical Challenges
          </p>
          <div className="space-y-6">
            {challenges.map((c, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-5"
              >
                <p className="text-xs font-mono text-muted-foreground mb-2">
                  Challenge #{i + 1}
                </p>
                <p className="text-foreground font-medium mb-3">
                  {c.question}
                </p>
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  Decision
                </p>
                <p className="text-sm text-muted-foreground">{c.decision}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Things That Didn't Work */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Things That Didn&apos;t Work
          </p>
          <div className="space-y-4">
            <blockquote className="border-l-2 border-border pl-6 text-muted-foreground italic">
              Initially I thought database logs were enough. They
              weren&apos;t.
            </blockquote>
            <blockquote className="border-l-2 border-border pl-6 text-muted-foreground italic">
              I almost built AIDAL as a dashboard. Then realized dashboards
              don&apos;t create trust.
            </blockquote>
          </div>
        </section>

        {/* What I Learned */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            What I Learned
          </p>
          <ul className="space-y-2">
            {[
              "Trust is infrastructure.",
              "Regulations are becoming technical.",
              "Building B2B is harder than coding.",
              "Distribution matters more than features.",
            ].map((l) => (
              <li
                key={l}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-muted-foreground mt-1.5 shrink-0">
                  ·
                </span>
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* Current Status */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Current Status
          </p>
          <div className="border border-border rounded-lg p-6 space-y-4">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                Stage
              </p>
              <p className="text-foreground">Pre-product market fit.</p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                Built
              </p>
              <p className="text-foreground">
                API, verification page, audit trail system.
              </p>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">
                Looking for
              </p>
              <p className="text-foreground">
                Founders and teams building high-risk AI systems.
              </p>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Future Vision
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I believe every important AI decision will eventually need
            evidence. AIDAL aims to become the infrastructure layer that
            provides that evidence.
          </p>
        </section>

        {/* Build Log */}
        <section className="mb-16">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
            Build Log
          </p>
          <div className="space-y-6 border-l border-border pl-6">
            {buildLog.map((entry) => (
              <div key={entry.date} className="relative">
                <span className="absolute -left-[27px] top-1.5 w-2 h-2 rounded-full bg-muted-foreground" />
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  {entry.date}
                </p>
                <p className="text-sm font-medium">{entry.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> All projects
          </Link>
          <a
            href="https://tryaidal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Visit tryaidal.com <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
