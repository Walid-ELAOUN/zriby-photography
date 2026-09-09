"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Send,
  CheckCircle,
} from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "./site-data";

export default function Contact() {
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
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-700/5 blur-2xl" />
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-gold/5 blur-2xl" />
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
            Visitons-nous au studio d&apos;Ariana, Grand Tunis, ou prenons contact
            directement. Nous serons ravis d&apos;immortaliser votre histoire.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info + Carte */}
          <div className="space-y-6 lg:col-span-2">
            {/* Infos */}
            <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-7">
              <h3 className="font-display text-xl font-semibold text-white">
                Informations &amp; Horaires
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-white">Ariana, Grand Tunis</div>
                    <div className="text-zinc-400">Code Plus : V55J+RR Ariana</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-white">Ouvert 7j/7</div>
                    <div className="text-zinc-400">Lundi – Dimanche : 09:00 – 20:30</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-white">{PHONE_DISPLAY}</div>
                    <div className="text-zinc-400">Téléphone &amp; WhatsApp</div>
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
              className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8 lg:p-10"
            >
              <h3 className="font-display text-2xl font-semibold text-white">
                Formulaire de Réservation
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Remplissez ce formulaire, nous revenons vers vous rapidement pour
                confirmer votre date.
              </p>

              {sent ? (
                <div className="mt-8 rounded-2xl border border-emerald-700/40 bg-emerald-700/10 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700/20 text-emerald-500">
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
                    <label htmlFor="event" className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Type d&apos;événement
                    </label>
                    <select
                      id="event"
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
                    <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Date prévue
                    </label>
                    <input
                      id="date"
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
                    <p className="mt-3 text-center text-xs text-zinc-400">
                      Préférez le direct ?{" "}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-emerald-500 hover:underline"
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