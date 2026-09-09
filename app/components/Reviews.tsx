"use client";

import { Star, Quote } from "lucide-react";
import { REVIEWS } from "./site-data";

export default function Reviews() {
  return (
    <section id="avis" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-12 text-center">
        <p className="fade-up text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          Témoignages
        </p>
        <h2 className="fade-up mt-3 font-display text-4xl font-semibold text-white lg:text-5xl">
          Avis <span className="text-gradient-gold italic">Google Maps</span>{" "}
          Authentiques
        </h2>
        <div className="fade-up mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-slate-900/60 px-5 py-2 text-sm text-zinc-200">
          <span className="flex gap-0.5 text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </span>
          <span className="font-semibold text-white">4.8 / 5</span> · 56 avis
          vérifiés
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="fade-up relative flex flex-col rounded-3xl border border-slate-800/60 bg-slate-900/40 p-7 transition hover:border-gold/40"
          >
            <Quote className="absolute right-6 top-6 h-10 w-10 text-gold/15" />
            <div className="mb-3 flex gap-0.5 text-gold">
              {[...Array(r.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-zinc-300">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-800/60 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-slate-800 font-semibold text-gold ring-1 ring-gold/30">
                {r.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs text-zinc-400">
                  <span className="text-emerald-500">✓</span> Avis Google Vérifié
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}