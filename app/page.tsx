"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
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
  Menu,
  X,
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

    if (!("IntersectionObserver" in window)) {
      el.querySelectorAll(".fade-up").forEach(reveal);
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

    const targets = el.querySelectorAll(".fade-up");
    targets.forEach((t) => io.observe(t));

    el.classList.add("reveal-ready");
    return () => io.disconnect();
  }, []);
  return ref;
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#accueil" className={`group flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.png"
        alt="Zriby Photography Logo"
        width={80}
        height={80}
        sizes="44px"
        priority
        className="h-11 w-11 rounded-full object-cover ring-1 ring-gold/40 shadow-glow group-hover:ring-gold transition"
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
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white"
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
        <div className="absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-rose-500/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-300/10 blur-2xl" />
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-8 py-4 text-sm font-bold text-white transition hover:bg-emerald-600 sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Discuter sur WhatsApp
            </a>
          </div>

          <div className="fade-up mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400 lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" /> Ouvert 7j/7
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
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img.alt}
              className={`group relative overflow-hidden rounded-2xl border border-slate-800/60 shadow-xl ${img.span === "col-span-2 row-span-2" ? "aspect-square" : img.span === "col-span-2 row-span-1" ? "aspect-video" : "aspect-square"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={img.span === "col-span-2 row-span-2" ? "(max-width: 640px) 100vw, 50vw" : img.span === "col-span-2 row-span-1" ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                priority={i < 2}
                className="object-cover transition duration-700 group-hover:scale-110"
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
            className="fade-up gold-border rounded-2xl bg-slate-900/50 p-6 text-center transition hover:-translate-y-1"
          >
            <div className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-2 text-sm font-semibold text-white">{s.label}</div>
            <div className="mt-1 text-xs text-zinc-400">{s.sub}</div>
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
            className="fade-up group relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8 transition hover:border-gold/40 hover:shadow-glow"
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
/*  SECTIONS DIFFEREES (code-splitting)                                */
/* ------------------------------------------------------------------ */

const DynPortfolio = dynamic(() => import("./components/Portfolio"), { ssr: true });
const DynPhotobook = dynamic(() => import("./components/Photobook"), { ssr: true });
const DynReviews   = dynamic(() => import("./components/Reviews"),   { ssr: true });
const DynContact   = dynamic(() => import("./components/Contact"),   { ssr: true });

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
                className="rounded-full border border-slate-800 p-2.5 text-zinc-300 transition hover:border-emerald-500 hover:text-emerald-500"
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

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800/60 pt-6 text-center text-xs text-zinc-400 sm:flex-row sm:text-left">
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
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-2xl shadow-emerald-700/40 transition hover:scale-110 hover:bg-emerald-600"
    >
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
      <DynPortfolio />
      <DynPhotobook />
      <DynReviews />
      <DynContact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
