"use client";

import Image from "next/image";
import { useState } from "react";
import { CATEGORIES, PORTFOLIO } from "./site-data";

export default function Portfolio() {
  const [filter, setFilter] = useState("Tous");
  const visible =
    filter === "Tous"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.cat === filter);

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-10 text-center">
        <p className="fade-up text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          Portfolio
        </p>
        <h2 className="fade-up mt-3 font-display text-4xl font-semibold text-white lg:text-5xl">
          Galerie <span className="text-gradient-gold italic">Artistique</span>
        </h2>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              filter === c
                ? "bg-gold text-slate-950 shadow-glow"
                : "border border-slate-700 bg-slate-900/50 text-zinc-300 hover:border-gold/50 hover:text-gold"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((p) => (
          <div
            key={p.cat + p.title}
            className="fade-up group relative mb-4 aspect-[3/4] overflow-hidden break-inside-avoid rounded-2xl border border-slate-800/60"
          >
            <Image
              src={p.img}
              alt={p.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent p-5 opacity-0 transition group-hover:opacity-100">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {p.cat}
                </span>
                <h3 className="mt-1 font-display text-lg text-white">{p.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}