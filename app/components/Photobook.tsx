"use client";

import Image from "next/image";
import { Video, CheckCircle } from "lucide-react";
import { WHATSAPP_URL } from "./site-data";

export default function Photobook() {
  return (
    <section id="photobook" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 rounded-full bg-gold/5 blur-2xl" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-800/60">
            <Image
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop"
              alt="Photobook"
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-700 hover:scale-110"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-800/60">
            <Image
              src="https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=400&auto=format&fit=crop"
              alt="Vidéo mariage"
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-700 hover:scale-110"
            />
          </div>
        </div>

        <div>
          <p className="fade-up text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Photobook &amp; Vidéo
          </p>
          <h2 className="fade-up mt-3 font-display text-4xl font-semibold text-white lg:text-5xl">
            Des Souvenirs Gravés{" "}
            <span className="text-gradient-gold italic">Pour Toujours</span>
          </h2>
          <p className="fade-up mt-5 text-zinc-400">
            Le rendu de vos photos est tout simplement magnifique, et notre
            photobook prestigieux dépasse toutes vos attentes. Nous allions la
            photographie à la vidéographie pour une couverture émotionnelle
            complète : teaser 4K dynamique et film intégral de votre soirée.
          </p>
          <ul className="fade-up mt-6 space-y-3">
            {[
              "Teaser 4K dynamique & film complet",
              "Photobook Prestige haute définition",
              "Mise en valeur naturelle et lumineuse",
              "Équipe artistique dédiée à votre journée",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fade-up mt-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-7 py-3.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-slate-950"
          >
            <Video className="h-5 w-5" />
            Demander notre Book
          </a>
        </div>
      </div>
    </section>
  );
}