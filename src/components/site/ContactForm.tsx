"use client";

import { useState } from "react";
import { Mail, Send, Check, AlertCircle } from "lucide-react";

const EMAIL = "helal@187n.ai";
// Web3Forms access keys are designed to be public (client-side). Set this in
// .env.local: NEXT_PUBLIC_WEB3FORMS_KEY=your-key (free from web3forms.com).
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-md border border-border-subtle/80 bg-surface px-3.5 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-accent/70 focus:ring-2 focus:ring-accent/30";
const labelClass =
  "mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-muted";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    // No key configured → fall back to a prefilled email so the form still works.
    if (!ACCESS_KEY) {
      const body = `From: ${name} <${email}>\n\n${message}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        "Portfolio enquiry",
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New message from ahmedhelal.dev",
          from_name: "Portfolio contact form",
          name,
          email,
          message,
          // honeypot — Web3Forms rejects the submission if this is filled.
          botcheck: data.get("botcheck") ? "true" : "",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again, or email me directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border-subtle/70 bg-surface p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
          <Check size={22} />
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold text-fg">
          Message sent
        </h2>
        <p className="mt-2 text-sm text-muted">
          Thanks — I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-accent underline-offset-4 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* honeypot: hidden from humans, tempting to bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={`${fieldClass} resize-y`} placeholder="What are you building?" />
      </div>

      {status === "error" ? (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={15} />
          {error}{" "}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
            Email instead
          </a>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-11 items-center gap-2 rounded-md bg-warm px-5 text-sm font-medium text-canvas transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>Sending…</>
        ) : ACCESS_KEY ? (
          <>
            <Send size={16} />
            Send message
          </>
        ) : (
          <>
            <Mail size={16} />
            Compose email
          </>
        )}
      </button>
    </form>
  );
}
