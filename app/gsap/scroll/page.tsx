'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// ARSITEKTUR HALAMAN INI
// ============================================================
// 1. Lenis     -> smooth scroll engine, menggantikan scroll native
// 2. GSAP Ticker -> menjalankan Lenis setiap animation frame
// 3. ScrollTrigger -> membaca posisi Lenis, mem-pin + scrub timeline
// 4. Master Timeline -> satu timeline berisi semua fase animasi & slide
//
// Urutan fase per panel:
//   [ANIM] konten panel animasi seiring scroll
//   [SLIDE] track bergeser ke panel berikutnya
//   [ANIM] konten panel berikutnya animasi seiring scroll
//   ... dst
//
// Karena SLIDE baru terjadi setelah ANIM habis, user TIDAK bisa
// melewati animasi -- harus scroll cukup untuk menghabiskan ANIM dulu.
// ============================================================

const ANIM  = 1.4;
const SLIDE = 0.6;
const TOTAL_SCROLL = 3200;

export default function ScrollPage() {
  const wrapperRef     = useRef<HTMLDivElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // =========================================================
    // KONSEP: Lenis Smooth Scroll
    // =========================================================
    // Browser default scroll "melompat" ke posisi baru setiap
    // wheel event. Lenis mencegat ini dan menggantinya dengan
    // interpolasi halus -- efeknya seperti "menggeluncur".
    //
    // Cara kerja:
    //   1. preventDefault pada scroll native
    //   2. Hitung posisi scroll target
    //   3. Tiap animation frame: interpolasi posisi saat ini
    //      menuju target pakai easing function
    //   4. window.scrollTo(posisi hasil interpolasi)
    //
    // duration     -> durasi "geluncuran" dalam detik
    // easing       -> kurva interpolasi
    // smoothWheel  -> aktifkan untuk mouse wheel
    // =========================================================
    const lenis = new Lenis({
      duration: 1.4,
      // Exponential ease-out: cepat di awal, melambat di akhir.
      // Lebih organik dibanding ease linear bawaan.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // =========================================================
    // KONSEP: Menghubungkan Lenis ke ScrollTrigger
    // =========================================================
    // Masalah: ScrollTrigger membaca posisi scroll SESAAT saat
    // event terjadi, bukan nilai interpolasi Lenis yang halus.
    //
    // Solusi: paksa ScrollTrigger refresh setiap Lenis frame.
    //   lenis.on('scroll', ScrollTrigger.update)
    //   -> tiap Lenis memperbarui posisi -> ScrollTrigger recalc
    // =========================================================
    lenis.on('scroll', ScrollTrigger.update);

    // =========================================================
    // KONSEP: GSAP Ticker sebagai RAF driver
    // =========================================================
    // Lenis butuh lenis.raf(time) dipanggil setiap frame.
    // Daripada buat requestAnimationFrame sendiri, kita titipkan
    // ke loop GSAP ticker yang sudah berjalan setiap frame.
    //
    // gsap.ticker.lagSmoothing(0)  -> WAJIB dimatikan saat pakai
    // Lenis. Kalau GSAP mencoba "mengejar lag", posisi Lenis dan
    // ScrollTrigger akan desync -> animasi stuttering / melompat.
    // =========================================================
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // =========================================================
    // MASTER TIMELINE + ScrollTrigger pin + scrub
    // =========================================================
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const vw    = window.innerWidth;

      const master = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin:     true,
          scrub:   1.5,
          start:   'top top',
          end:     `+=${TOTAL_SCROLL}`,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // ---------------------------------------------------
      // PANEL 1 (t=0): Staggered Word Reveal
      // rotationX: -90 -> kata terlipat ke belakang secara 3D
      // transformOrigin: 'top center' -> pivot di tepi atas
      // stagger -> tiap kata muncul berurutan
      // ---------------------------------------------------
      const p1Words = gsap.utils.toArray<HTMLElement>('.p1-word');

      master
        .from('.p1-badge', { y: -30, opacity: 0, duration: 0.3 }, 0)
        .from(p1Words, {
          y: 80, opacity: 0, rotationX: -90,
          stagger: 0.07, duration: 0.5,
          transformOrigin: 'top center',
        }, 0.2)
        .from('.p1-desc', { y: 30, opacity: 0, duration: 0.4 }, 0.7);

      // Slide 1 -> 2
      master.to(track, { x: -vw, ease: 'power2.inOut', duration: SLIDE }, ANIM);

      // ---------------------------------------------------
      // PANEL 2 (t=ANIM+SLIDE): Card Reveal
      // fromTo() -> kontrol penuh titik awal DAN akhir
      // stagger.amount -> total waktu stagger dibagi ke semua elemen
      // ---------------------------------------------------
      const t2 = ANIM + SLIDE;

      master
        .from('.p2-title', { x: -60, opacity: 0, duration: 0.4 }, t2)
        .fromTo(
          '.p2-card',
          { scale: 0, opacity: 0, rotation: -15 },
          {
            scale: 1, opacity: 1, rotation: 0,
            stagger: { amount: 0.6, from: 'start' },
            duration: 0.5, ease: 'back.out(1.7)',
          },
          t2 + 0.3,
        );

      // Slide 2 -> 3
      master.to(track, { x: -vw * 2, ease: 'power2.inOut', duration: SLIDE }, t2 + ANIM);

      // ---------------------------------------------------
      // PANEL 3: Parallax Layers
      // Tiap layer punya jarak x berbeda + arah selang-seling
      // -> elemen tampak bergerak dari kedalaman berbeda
      // ---------------------------------------------------
      const t3      = (ANIM + SLIDE) * 2;
      const p3Layers = gsap.utils.toArray<HTMLElement>('.p3-layer');

      master.from('.p3-title', { scale: 1.4, opacity: 0, duration: 0.5 }, t3);

      p3Layers.forEach((layer, i) => {
        const dir  = i % 2 === 0 ? 1 : -1;
        const dist = 60 + i * 30;
        master.from(
          layer,
          { x: dist * dir, opacity: 0, duration: 0.5 + i * 0.1 },
          t3 + 0.2 + i * 0.08,
        );
      });

      // Slide 3 -> 4
      master.to(track, { x: -vw * 3, ease: 'power2.inOut', duration: SLIDE }, t3 + ANIM);

      // ---------------------------------------------------
      // PANEL 4: ClipPath Cinematic Reveal
      // inset(50% 50% 50% 50%) -> titik tak terlihat di tengah
      // inset(0% 0% 0% 0%)     -> tidak ada potongan, full visible
      // Animasi di antaranya membuka dari tengah ke semua sisi
      // ---------------------------------------------------
      const t4 = (ANIM + SLIDE) * 3;

      master
        .fromTo(
          '.p4-bg',
          { clipPath: 'inset(50% 50% 50% 50%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power2.inOut' },
          t4,
        )
        .from('.p4-line', { y: 50, opacity: 0, stagger: 0.12, duration: 0.45 }, t4 + 0.4)
        .from('.p4-cta',  { scale: 0.8, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, t4 + 0.9);

    }, wrapperRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  // ── Data ──────────────────────────────────────────────────
  const p2Cards = [
    { icon: '🎯', label: 'Scrub',    sub: 'Animasi ikut scroll' },
    { icon: '📌', label: 'Pin',      sub: 'Elemen terkunci'    },
    { icon: '⏱',  label: 'Timeline', sub: 'Urutan terkontrol'  },
    { icon: '✂',  label: 'ClipPath', sub: 'Reveal sinematik'   },
  ];

  const p3Layers = [
    { label: 'Horizontal',    color: 'bg-cyan-500/20 border-cyan-500',    size: 'h-20 w-64' },
    { label: 'Scroll',        color: 'bg-sky-500/30 border-sky-400',      size: 'h-28 w-48' },
    { label: 'Experience',    color: 'bg-blue-500/40 border-blue-400',    size: 'h-36 w-56' },
    { label: 'GSAP',          color: 'bg-indigo-500/50 border-indigo-400',size: 'h-44 w-72' },
    { label: 'ScrollTrigger', color: 'bg-violet-500/60 border-violet-400',size: 'h-24 w-52' },
  ];

  const timelineRows = [
    { phase: 'ANIM',  label: 'Panel 1 - word stagger',     color: 'bg-indigo-500' },
    { phase: 'SLIDE', label: 'Transisi 1 ke 2',            color: 'bg-gray-600'   },
    { phase: 'ANIM',  label: 'Panel 2 - card reveal',      color: 'bg-violet-500' },
    { phase: 'SLIDE', label: 'Transisi 2 ke 3',            color: 'bg-gray-600'   },
    { phase: 'ANIM',  label: 'Panel 3 - parallax',         color: 'bg-cyan-600'   },
    { phase: 'SLIDE', label: 'Transisi 3 ke 4',            color: 'bg-gray-600'   },
    { phase: 'ANIM',  label: 'Panel 4 - clip-path reveal', color: 'bg-emerald-600'},
  ];

  // ── JSX ───────────────────────────────────────────────────
  return (
    <div className="bg-gray-950 text-white">

      {/* INTRO */}
      <section className="flex h-screen flex-col items-center justify-center px-8 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-indigo-400">
          GSAP + Lenis + ScrollTrigger
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight">
          Animasi dulu,<br />
          <span className="text-indigo-400">baru lanjut.</span>
        </h1>
        <p className="max-w-md text-gray-400">
          Scroll halaman ini diperhalus oleh Lenis. Setiap panel
          menampilkan animasinya terlebih dahulu -- transisi ke panel
          berikutnya baru tersedia setelah animasi selesai.
        </p>
        <div className="mt-10 flex animate-bounce flex-col items-center gap-1 text-sm text-gray-500">
          Scroll ke bawah
        </div>
      </section>

      {/* PIN ZONE */}
      <div ref={wrapperRef} className="relative overflow-hidden">

        {/* Progress bar */}
        <div className="absolute top-0 left-0 z-50 h-1 w-full bg-white/10">
          <div ref={progressBarRef} className="h-full bg-indigo-500" style={{ width: '0%' }} />
        </div>

        {/* Track: digeser oleh master timeline */}
        <div ref={trackRef} className="flex h-screen will-change-transform">

          {/* PANEL 1: Word Reveal */}
          <div className="flex h-screen w-screen shrink-0 flex-col items-center justify-center bg-indigo-950 px-16">
            <span className="p1-badge mb-8 rounded-full bg-indigo-500/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-indigo-300">
              Panel 1 / 4 - Stagger Word Reveal
            </span>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
              {['Scroll', 'untuk', 'melihat', 'kata-kata', 'ini', 'muncul', 'satu', 'per', 'satu'].map((w) => (
                <span key={w} className="p1-word text-5xl font-bold text-white" style={{ display: 'inline-block' }}>
                  {w}
                </span>
              ))}
            </div>
            <p className="p1-desc mt-10 max-w-sm text-center text-sm leading-relaxed text-indigo-300/70">
              rotationX + stagger -- kata jatuh dari atas ke depan secara berurutan.
              Transisi ke panel berikutnya baru tersedia setelah kata terakhir muncul.
            </p>
          </div>

          {/* PANEL 2: Card Reveal */}
          <div className="flex h-screen w-screen shrink-0 flex-col items-center justify-center gap-12 bg-violet-950 px-16">
            <div className="text-center">
              <span className="mb-2 inline-block rounded-full bg-violet-500/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-violet-300">
                Panel 2 / 4 - Card Reveal
              </span>
              <h2 className="p2-title mt-4 text-4xl font-bold">Konsep yang kamu pelajari</h2>
            </div>
            <div className="flex gap-6">
              {p2Cards.map(({ icon, label, sub }) => (
                <div key={label} className="p2-card flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-2xl border border-violet-500/40 bg-violet-800/40 shadow-xl">
                  <span className="text-3xl">{icon}</span>
                  <span className="text-sm font-bold">{label}</span>
                  <span className="text-xs text-violet-300/70">{sub}</span>
                </div>
              ))}
            </div>
            <p className="max-w-md text-center text-sm text-violet-300/60">
              fromTo() + stagger.amount -- kartu muncul dari scale 0 dan miring,
              satu per satu dalam total 0.6 detik.
            </p>
          </div>

          {/* PANEL 3: Parallax Layers */}
          <div className="flex h-screen w-screen shrink-0 flex-col items-center justify-center gap-8 bg-cyan-950 px-16">
            <span className="rounded-full bg-cyan-500/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-cyan-300">
              Panel 3 / 4 - Parallax Layers
            </span>
            <h2 className="p3-title text-4xl font-bold">Kedalaman melalui gerak</h2>
            <div className="flex flex-col items-start gap-3">
              {p3Layers.map(({ label, color, size }) => (
                <div key={label} className={`p3-layer ${size} ${color} flex items-center rounded-xl border px-6 font-mono text-sm font-bold`}>
                  {label}
                </div>
              ))}
            </div>
            <p className="max-w-sm text-center text-sm text-cyan-300/60">
              Tiap layer punya jarak x berbeda, datang dari kiri/kanan selang-seling.
            </p>
          </div>

          {/* PANEL 4: ClipPath Cinematic Reveal */}
          <div className="relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden bg-gray-950 px-16">
            <div
              className="p4-bg absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900"
              style={{ clipPath: 'inset(50% 50% 50% 50%)' }}
            />
            <div className="relative z-10 text-center">
              <span className="mb-6 inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-emerald-300">
                Panel 4 / 4 - Cinematic Reveal
              </span>
              <div className="mb-2 overflow-hidden">
                <div className="p4-line text-5xl font-black leading-tight">Kamu sudah</div>
              </div>
              <div className="mb-2 overflow-hidden">
                <div className="p4-line text-5xl font-black leading-tight text-emerald-400">menguasai dasar</div>
              </div>
              <div className="mb-8 overflow-hidden">
                <div className="p4-line text-5xl font-black leading-tight">scroll animation!</div>
              </div>
              <div className="p4-cta flex justify-center gap-4">
                <a href="/gsap" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  Animasi Dasar
                </a>
                <span className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-black">
                  + Lenis
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* OUTRO */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-8 px-8 text-center">
        <h2 className="text-3xl font-bold">Ringkasan Arsitektur</h2>

        {/* Stack Lenis + GSAP */}
        <div className="w-full max-w-xl rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">
            Stack integrasi
          </p>
          <div className="space-y-3">
            {[
              {
                name: 'Lenis',
                desc: 'Intersep scroll native, interpolasi ke posisi target setiap frame',
                color: 'border-l-sky-400 text-sky-300',
              },
              {
                name: 'lenis.on(scroll, ScrollTrigger.update)',
                desc: 'Paksa ScrollTrigger refresh tiap Lenis frame agar tidak desync',
                color: 'border-l-indigo-400 text-indigo-300',
              },
              {
                name: 'gsap.ticker.add(t => lenis.raf(t * 1000))',
                desc: 'Titipkan loop Lenis ke GSAP RAF agar berjalan pada frame yang sama',
                color: 'border-l-violet-400 text-violet-300',
              },
              {
                name: 'gsap.ticker.lagSmoothing(0)',
                desc: 'Matikan kompensasi lag GSAP agar tidak desync dengan Lenis',
                color: 'border-l-pink-400 text-pink-300',
              },
            ].map(({ name, desc, color }) => (
              <div key={name} className={`border-l-2 pl-4 ${color}`}>
                <code className="text-xs font-bold">{name}</code>
                <p className="mt-0.5 text-xs text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline diagram */}
        <div className="w-full max-w-xl rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gray-500">
            Master Timeline (1 ScrollTrigger, banyak fase)
          </p>
          <div className="space-y-2">
            {timelineRows.map(({ phase, label, color }, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`shrink-0 rounded px-2 py-0.5 font-mono text-xs ${phase === 'ANIM' ? 'bg-white/10 text-white' : 'bg-white/5 text-gray-500'}`}>
                  {phase}
                </span>
                <div className={`h-5 rounded ${color} ${phase === 'ANIM' ? 'w-48' : 'w-16'}`} />
                <span className="text-sm text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <a href="/gsap" className="text-sm text-indigo-400 underline underline-offset-4 hover:text-indigo-300">
          Kembali ke demo animasi dasar
        </a>
      </section>

    </div>
  );
}
