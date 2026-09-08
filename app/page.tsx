"use client";

import { useState, useEffect, useRef } from "react";
import {
  Camera,
  Video,
  Heart,
  Star,
  Phone,
  Instagram,
  Facebook,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  Sparkles,
  Navigation,
  Quote,
  Menu,
  X,
  Send,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DONNÉES (fiables & vérifiées Google Maps)                          */
/* ------------------------------------------------------------------ */

const PHONE_DISPLAY = "+216 20 271 084";
const PHONE_TEL = "tel:+21620271084";
const WHATSAPP_URL =
  "https://wa.me/21620271084?text=" +
  encodeURIComponent(
    "Bonjour Zriby Photography, je souhaite réserver une date / un shooting 📸"
  );

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Prestations", href: "#prestations" },
  { label: "Photobook & Vidéo", href: "#photobook" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "4.8/5", label: "Note Google Maps", sub: "★ 56 avis vérifiés" },
  { value: "7j/7", label: "Studio ouvert", sub: "09h00 – 20h30" },
  { value: "+500", label: "Mariages & événements", sub: "immortalisés" },
  { value: "4K", label: "Photobook & Vidéo", sub: "Haute définition" },
];

const SERVICES = [
  {
    icon: Heart,
    title: "Formule Mariage & Dakhla",
    desc: "Couverture complète de votre grand jour avec une équipe dédiée. Mise en valeur naturelle et lumineuse de chaque instant, du Dakhla aux festivités.",
    tags: ["Couverture complète", "Équipe dédiée", "Rendu naturel"],
  },
  {
    icon: Camera,
    title: "Pack Fiançailles & Shoots Couple",
    desc: "Séance photo intime au studio d'Ariana ou en extérieur. Une ambiance détendue pour des clichés authentiques et romantiques, pleins de vie.",
    tags: ["Studio Ariana", "Extérieur", "Atmosphère détendue"],
  },
  {
    icon: Video,
    title: "Vidéographie & Teaser 4K",
    desc: "Films complets de cérémonies et clips teasers dynamiques en haute qualité. L'émotion de votre journée sublimée par une réalisation sur-mesure.",
    tags: ["Film complet", "Teaser dynamique", "Qualité 4K"],
  },
  {
    icon: Sparkles,
    title: "Impression & Photobook Prestige",
    desc: "Conception d'albums photos haut de gamme, véritables œuvres d'art. Des souvenirs imprimés avec soin pour durer toute une vie.",
    tags: ["Album premium", "Design soigné", "Tirage HD"],
  },
];

const CATEGORIES = ["Tous", "Mariages", "Fiançailles", "Studio", "Teasers Vidéo"];

const PORTFOLIO = [
  {
    cat: "Mariages",
    title: "Dakhla de cérémonie",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cat: "Fiançailles",
    title: "Séance couple en extérieur",
    img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cat: "Studio",
    title: "Portrait studio",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cat: "Mariages",
    title: "Instant d'émotion",
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cat: "Teasers Vidéo",
    title: "Teaser de la soirée",
    img: "https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cat: "Fiançailles",
    title: "Touché romantique",
    img: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cat: "Studio",
    title: "Mise en beauté",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    cat: "Teasers Vidéo",
    title: "Ambiance festivités",
    img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
  },
];

const REVIEWS = [
  {
    name: "Ranim Labyedh",
    rating: 5,
    text: "Photographe exceptionnel, très professionnel et gentil. Tu nous as mis à l'aise dès le début et le résultat dépasse nos attentes. Les photos sont naturelles, lumineuses et pleines de vie. On recommande à 100 % ! ✨",
  },
  {
    name: "Iheb Gharbi",
    rating: 5,
    text: "Équipe Zriby Photography très professionnelle sous la direction de Hamdi. Un nombre respectueux de photos avec des vidéos comme teaser et vidéo complète de très haute qualité...",
  },
  {
    name: "Sarah Othman",
    rating: 5,
    text: "C'est l'équipe qui a rendu notre jour de mariage inoubliable. Une équipe d'artistes doués et très professionnels. Ils savent très bien gérer le stress et être à l'écoute...",
  },
  {
    name: "Manel Karmous",
    rating: 5,
    text: "Un immense merci à toute l'équipe pour leur travail exceptionnel lors de notre mariage. Le rendu des photos est tout simplement magnifique et le photobook est au-delà de nos attentes...",
  },
  {
    name: "Meryem BenMustapha",
    rating: 5,
    text: "Excellente expérience avec Zriby Photography. Écoute, serviabilité, professionnalisme et dévouement sont au rendez-vous, avec une vraie attention aux détails...",
  },
];

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = (target: Element) => {
      target.classList.add("animate-fade-up");
    };

    const targets = Array.from(el.querySelectorAll(".fade-up"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    targets.forEach((t) => io.observe(t));

    // Filet de sécurité : révèle tout après un court délai pour ne jamais
    // laisser du contenu masqué si un élément n'est pas observé correctement.
    const t = setTimeout(() => {
      el.querySelectorAll(".fade-up:not(.animate-fade-up)").forEach(reveal);
    }, 2500);

    el.classList.add("reveal-ready");
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return ref;
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#accueil" className={`group flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Zriby Photography Logo"
        className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/40 shadow-glow group-hover:ring-gold transition"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <span
        className="hidden h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-slate-800 text-lg font-semibold text-gold ring-1 ring-gold/40"
        style={{ display: "none" }}
      >
        Z
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-600 tracking-wide text-white">
          ZRIBY
        </span>
        <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
          Photography
        </span>
      </span>
    </a>
  );
}

function WhatsAppIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                             */
/* ------------------------------------------------------------------ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-slate-950"
          >
            <Phone className="h-4 w-4" />
            Appeler
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-slate-800 p-2 text-white lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col px-5 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-slate-800/60 py-3 text-sm font-medium text-zinc-200 transition hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={PHONE_TEL}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-3 text-sm font-semibold text-gold"
              >
                <Phone className="h-4 w-4" />
                Appeler +216 20 271 084
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Discuter sur WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    alt: "Mariage élégant",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop",
    alt: "Fiançailles",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
    alt: "Couple lumineux",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600&auto=format&fit=crop",
    alt: "Détails floral",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=800&auto=format&fit=crop",
    alt: "Instant romantique",
    span: "col-span-2 row-span-1",
  },
];

function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden pt-28 lg:pt-36"
    >
      {/* gradient d'ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-rose-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-300/10 blur-[100px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-gold/30 bg-slate-900/60 px-4 py-2 text-xs font-medium text-zinc-200 backdrop-blur">
            <span className="flex gap-0.5 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            <span className="font-semibold text-gold">4.8</span> sur Google Maps
            (56 Avis) · Studio à Ariana, Grand Tunis
          </div>

          <h1 className="fade-up mt-6 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            Saisir l&apos;<span className="text-gradient-gold italic">Émotion</span>,
            Immortaliser Vos Plus Beaux{" "}
            <span className="text-gradient-gold italic">Souvenirs</span>
          </h1>

          <p className="fade-up mx-auto mt-6 max-w-xl text-base text-zinc-400 sm:text-lg lg:mx-0">
            Photographie &amp; Vidéographie de mariage, fiançailles et shoots
            studio sur-mesure par <span className="text-zinc-200">Hamdi Zriby</span>.
            Un regard artistique, des images lumineuses et naturelles pour toute
            une vie.
          </p>

          <div className="fade-up mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-600 px-8 py-4 text-sm font-bold text-slate-950 shadow-glow transition hover:brightness-110 sm:w-auto"
            >
              <Calendar className="h-5 w-5" />
              Réserver un Shooting / Date
              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-white transition hover:bg-emerald-400 sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Discuter sur WhatsApp
            </a>
          </div>

          <div className="fade-up mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" /> Ouvert 7j/7
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-gold" /> Photobook HD
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Video className="h-4 w-4 text-rose-300" /> Teaser 4K
            </span>
          </div>
        </div>

        {/* Mosaïque */}
        <div className="fade-up grid grid-cols-2 gap-3 sm:grid-cols-3">
          {HERO_IMAGES.map((img) => (
            <div
              key={img.alt}
              className={`group relative overflow-hidden rounded-2xl border border-slate-800/60 shadow-xl ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-medium text-white/90">
                {img.alt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STATS                                                              */
/* ------------------------------------------------------------------ */

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="fade-up gold-border rounded-2xl bg-slate-900/50 p-6 text-center backdrop-blur transition hover:-translate-y-1"
          >
            <div className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-2 text-sm font-semibold text-white">{s.label}</div>
            <div className="mt-1 text-xs text-zinc-500">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */

function Services() {
  return (
    <section id="prestations" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-14 text-center">
        <p className="fade-up text-sm font-semibold uppercase tracking-[0.3em] text-gold">
          Nos Formules
        </p>
        <h2 className="fade-up mt-3 font-display text-4xl font-semibold text-white lg:text-5xl">
          Prestations &amp; <span className="text-gradient-gold italic">Formules</span>
        </h2>
        <p className="fade-up mx-auto mt-4 max-w-2xl text-zinc-400">
          Des prestations sur-mesure pour chaque moment de votre histoire,
          de la demande en fiançailles au photobook qui traverse le temps.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="fade-up group relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8 backdrop-blur transition hover:border-gold/40 hover:shadow-glow"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition group-hover:bg-gold/20" />
            <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-gold/20 to-slate-800 p-4 text-gold ring-1 ring-gold/30">
              <s.icon className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-white">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-zinc-300"
                >
                  ✓ {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PORTFOLIO                                                          */
/* ------------------------------------------------------------------ */

function Portfolio() {
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
            className="fade-up group relative mb-4 overflow-hidden break-inside-avoid rounded-2xl border border-slate-800/60"
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full object-cover transition duration-700 group-hover:scale-110"
              loading="lazy"
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

/* ------------------------------------------------------------------ */
/*  PHOTOBOOK & VIDÉO                                                  */
/* ------------------------------------------------------------------ */

function Photobook() {
  return (
    <section id="photobook" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 rounded-full bg-gold/5 blur-[100px]" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="grid grid-cols-2 gap-3">
          <div className="overflow-hidden rounded-2xl border border-slate-800/60">
            <img
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
              alt="Photobook"
              className="h-full w-full object-cover transition duration-700 hover:scale-110"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-800/60">
            <img
              src="https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=600&auto=format&fit=crop"
              alt="Vidéo mariage"
              className="h-full w-full object-cover transition duration-700 hover:scale-110"
              loading="lazy"
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

/* ------------------------------------------------------------------ */
/*  AVIS                                                               */
/* ------------------------------------------------------------------ */

function Reviews() {
  return (
    <section
      id="avis"
      className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
    >
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
            className="fade-up relative flex flex-col rounded-3xl border border-slate-800/60 bg-slate-900/40 p-7 backdrop-blur transition hover:border-gold/40"
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
                <div className="text-xs text-zinc-500">
                  <span className="text-emerald-400">✓</span> Avis Google Vérifié
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT + FORMULAIRE + CARTE                                       */
/* ------------------------------------------------------------------ */

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    event: "",
    date: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1000);
  };

  const inputCls =
    "w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";

  return (
    <section id="contact" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 text-center">
          <p className="fade-up text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Contact &amp; Localisation
          </p>
          <h2 className="fade-up mt-3 font-display text-4xl font-semibold text-white lg:text-5xl">
            Réservez Votre <span className="text-gradient-gold italic">Date</span>
          </h2>
          <p className="fade-up mx-auto mt-4 max-w-xl text-zinc-400">
            Visitons-nous au studio d'Ariana, Grand Tunis, ou prenons contact
            directement. Nous serons ravis d'immortaliser votre histoire.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info + Carte */}
          <div className="space-y-6 lg:col-span-2">
            {/* Infos */}
            <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-7 backdrop-blur">
              <h3 className="font-display text-xl font-semibold text-white">
                Informations &amp; Horaires
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-white">Ariana, Grand Tunis</div>
                    <div className="text-zinc-500">Code Plus : V55J+RR Ariana</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-white">Ouvert 7j/7</div>
                    <div className="text-zinc-500">Lundi – Dimanche : 09:00 – 20:30</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-white">{PHONE_DISPLAY}</div>
                    <div className="text-zinc-500">Téléphone &amp; WhatsApp</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="https://www.google.com/maps/place/zriby+photography/@36.8595885,10.1820912,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110"
                >
                  <Navigation className="h-4 w-4" />
                  Itinéraire Google Maps
                </a>
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-slate-950"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Carte */}
            <div className="overflow-hidden rounded-3xl border border-slate-800/60 p-1.5 shadow-2xl">
              <iframe
                title="Zriby Photography - Ariana, Grand Tunis"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.5401918451!2d10.1795163!3d36.8595885!2m3!10f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34b311ce1389%3A0x7d05f9441f517a2b!2szriby+photography!5e0!3m2!1sfr!2stn!4v1710000000000"
                className="h-[340px] w-full rounded-[1.1rem] grayscale-[20%] contrast-[1.02]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8 backdrop-blur lg:p-10"
            >
              <h3 className="font-display text-2xl font-semibold text-white">
                Formulaire de Réservation
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Remplissez ce formulaire, nous revenons vers vous rapidement pour
                confirmer votre date.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle className="h-9 w-9" />
                  </div>
                  <h4 className="font-display text-2xl font-semibold text-white">
                    Merci {form.name || "à vous"} ! ✨
                  </h4>
                  <p className="mt-2 text-zinc-300">
                    Votre demande a bien été envoyée. Notre équipe vous contactera
                    très vite au {form.phone || PHONE_DISPLAY}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: "", phone: "", event: "", date: "", message: "" });
                    }}
                    className="mt-6 rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-slate-950"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Nom complet *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Téléphone *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      placeholder="+216 ..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Type d&apos;événement
                    </label>
                    <select
                      name="event"
                      value={form.event}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">Sélectionnez…</option>
                      <option>Mariage</option>
                      <option>Dakhla</option>
                      <option>Fiançailles</option>
                      <option>Shoot Couple</option>
                      <option>Shoot Studio</option>
                      <option>Événement VIP</option>
                      <option>Teaser Vidéo</option>
                      <option>Photobook</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Date prévue
                    </label>
                    <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      type="date"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Parlez-nous de votre projet…"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={sending}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-600 px-8 py-4 text-sm font-bold text-slate-950 shadow-glow transition hover:brightness-110 disabled:opacity-60"
                    >
                      {sending ? (
                        "Envoi en cours…"
                      ) : (
                        <>
                          <Send className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                          Réserver ma date
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-zinc-500">
                      Préférez le direct ?{" "}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-emerald-400 hover:underline"
                      >
                        Discutons sur WhatsApp
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950 px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              Photographie &amp; vidéographie haut de gamme à Ariana, Grand Tunis.
              Sous la direction de <span className="text-zinc-200">Hamdi Zriby</span>,
              nous immortalisons vos plus beaux souvenirs avec émotion et élégance.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/zribyphotographyy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-slate-800 p-2.5 text-zinc-300 transition hover:border-gold hover:text-gold"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/zriby/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-slate-800 p-2.5 text-zinc-300 transition hover:border-gold hover:text-gold"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="rounded-full border border-slate-800 p-2.5 text-zinc-300 transition hover:border-emerald-400 hover:text-emerald-400"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-white">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-zinc-400 transition hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-white">
              Contact rapide
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gold" /> Ariana, Grand
                Tunis
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-gold" /> 7j/7 · 09:00–20:30
              </li>
              <li>
                <a
                  href={PHONE_TEL}
                  className="flex items-center gap-2.5 transition hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" /> +216 20 271 084
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800/60 pt-6 text-center text-xs text-zinc-500 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Zriby Photography · Ariana, Tunis 🇹🇳</p>
          <p>
            Note <span className="text-gold">4.8/5</span> ★ · Studio ouvert 7j/7 ·
            +500 événements ✨
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  FLOATING WHATSAPP                                                  */
/* ------------------------------------------------------------------ */

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 transition hover:scale-110 hover:bg-emerald-400"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  const revealRef = useRevealOnScroll();
  return (
    <main ref={revealRef} className="relative min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Photobook />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
