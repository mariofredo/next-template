'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

// ============================================================
// KONSEP GSAP — Pengantar Singkat
// ============================================================
// GSAP (GreenSock Animation Platform) bekerja dengan cara
// menginterpolasi nilai properti CSS / atribut DOM dari titik
// A ke titik B selama durasi tertentu.
//
// Tiga metode paling dasar:
//   gsap.to()       → animasi DARI kondisi sekarang KE nilai tujuan
//   gsap.from()     → animasi DARI nilai awal KE kondisi sekarang
//   gsap.timeline() → rangkaian animasi yang berjalan berurutan
// ============================================================

export default function GSAPDemoPage() {
  // ==========================================================
  // useRef digunakan untuk mendapatkan referensi langsung ke
  // elemen DOM tanpa melalui state React. GSAP membutuhkan
  // referensi DOM nyata untuk memanipulasi properti CSS-nya.
  // ==========================================================
  const boxToRef = useRef<HTMLDivElement>(null);
  const boxFromRef = useRef<HTMLDivElement>(null);
  const tlBoxRef = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------------
  // EFEK 1 — gsap.to()
  // ----------------------------------------------------------
  // gsap.to(target, vars)
  //   target : elemen DOM / selector string / array elemen
  //   vars   : objek berisi properti yang ingin dianimasikan
  //            + opsi seperti duration, ease, repeat, dll.
  //
  // Elemen berangkat dari kondisinya SAAT INI lalu bergerak
  // MENUJU nilai yang kamu tulis di vars.
  //
  // Properti umum:
  //   x, y          → translasi (px) — lebih cepat dari left/top
  //   rotation      → rotasi (derajat)
  //   scale         → skala (1 = normal)
  //   opacity       → transparansi (0–1)
  //   duration      → lamanya animasi (detik)
  //   ease          → kurva kecepatan ("power2.out", "bounce.out", dll.)
  //   repeat        → berapa kali diulang (-1 = selamanya)
  //   yoyo          → balik arah saat repeat (true/false)
  // ----------------------------------------------------------
  const runEffectTo = () => {
    if (!boxToRef.current) return;

    // Reset posisi ke awal dulu sebelum animasi dijalankan ulang
    gsap.set(boxToRef.current, { x: 0, rotation: 0, scale: 1, opacity: 1 });

    gsap.to(boxToRef.current, {
      x: 220, // geser 220px ke kanan
      rotation: 360, // putar satu putaran penuh
      scale: 1.3, // perbesar 30%
      duration: 1.2, // selesai dalam 1.2 detik
      ease: 'power2.out', // awal cepat, akhir melambat
    });
  };

  // ----------------------------------------------------------
  // EFEK 2 — gsap.from()
  // ----------------------------------------------------------
  // gsap.from(target, vars)
  //
  // Kebalikan dari gsap.to(). GSAP membaca kondisi elemen
  // SAAT INI sebagai titik akhir, lalu memulai animasi dari
  // nilai yang kamu tentukan di vars.
  //
  // Contoh di bawah: elemen mulai dari opacity 0, posisi y
  // di atas (-60px), lalu muncul ke posisi aslinya.
  // Ini adalah pola klasik "entrance animation".
  // ----------------------------------------------------------
  const runEffectFrom = () => {
    if (!boxFromRef.current) return;

    // Reset ke kondisi normal dulu (kondisi asli / titik akhir)
    gsap.set(boxFromRef.current, { y: 0, opacity: 1, scale: 1 });

    gsap.from(boxFromRef.current, {
      y: -80, // animasi DIMULAI dari 80px di atas posisi asli
      opacity: 0, // animasi DIMULAI dari tidak terlihat
      scale: 0.5, // animasi DIMULAI dari setengah ukuran
      duration: 0.9,
      ease: 'back.out(1.7)', // efek "overshoot" — sedikit melampaui lalu balik
    });
  };

  // ----------------------------------------------------------
  // EFEK 3 — gsap.timeline()
  // ----------------------------------------------------------
  // const tl = gsap.timeline(options)
  // tl.to / tl.from / tl.fromTo / tl.set ...
  //
  // Timeline adalah WADAH untuk mengelompokkan beberapa tween
  // agar berjalan dalam urutan tertentu secara otomatis.
  //
  // Tanpa timeline, kamu harus mengatur delay manual:
  //   gsap.to(el, { x: 100, duration: 0.5 })
  //   gsap.to(el, { y: 100, duration: 0.5, delay: 0.5 }) ← repot!
  //
  // Dengan timeline, animasi berikutnya otomatis menunggu
  // animasi sebelumnya selesai.
  //
  // Parameter posisi (argumen ke-3):
  //   "<"        → mulai bersamaan dengan tween sebelumnya
  //   "+=0.2"    → mulai 0.2 detik SETELAH tween sebelumnya selesai
  //   "-=0.3"    → mulai 0.3 detik SEBELUM tween sebelumnya selesai (overlap)
  //   angka      → mulai tepat di detik ke-N dalam timeline
  // ----------------------------------------------------------
  const runEffectTimeline = () => {
    if (!tlBoxRef.current) return;

    // Reset ke kondisi awal
    gsap.set(tlBoxRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      backgroundColor: '#6366f1',
      borderRadius: '12px',
    });

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    // defaults → semua tween dalam tl ini pakai ease yang sama
    // kecuali ditimpa secara individual

    tl
      // Langkah 1: geser ke kanan
      .to(tlBoxRef.current, { x: 200, duration: 0.5 })

      // Langkah 2: geser ke bawah (mulai setelah langkah 1 selesai)
      .to(tlBoxRef.current, { y: 80, duration: 0.4 })

      // Langkah 3: ubah warna & putar (overlap 0.1 detik dengan langkah 2)
      .to(
        tlBoxRef.current,
        {
          backgroundColor: '#f43f5e',
          rotation: 180,
          duration: 0.5,
        },
        '-=0.1',
      )

      // Langkah 4: kembali ke posisi awal dengan efek scale
      .to(tlBoxRef.current, {
        x: 0,
        y: 0,
        rotation: 360,
        scale: 1.2,
        duration: 0.6,
        ease: 'back.out(2)',
      })

      // Langkah 5: kembalikan ukuran & warna normal
      .to(tlBoxRef.current, {
        scale: 1,
        backgroundColor: '#6366f1',
        borderRadius: '50%',
        duration: 0.4,
      });
  };

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl space-y-16">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-3xl font-bold text-indigo-400">GSAP — 3 Efek Animasi Dasar</h1>
          <p className="text-sm text-gray-400">
            Klik tombol di setiap kartu untuk menjalankan animasi. Baca komentar di{' '}
            <code className="text-indigo-300">app/gsap/page.tsx</code> untuk memahami konsep tiap
            metode.
          </p>
        </div>

        {/* ---- EFEK 1: gsap.to() ---- */}
        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <div className="mb-6">
            <span className="rounded-full bg-indigo-900/60 px-3 py-1 font-mono text-xs text-indigo-300">
              Efek 1
            </span>
            <h2 className="mt-3 mb-1 text-xl font-semibold">gsap.to()</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Menganimasikan elemen dari <strong className="text-white">kondisi saat ini</strong>{' '}
              menuju <strong className="text-white">nilai target</strong> yang kamu tentukan. Kotak
              di bawah akan bergeser ke kanan, berputar 360°, dan membesar.
            </p>
            <div className="mt-3 rounded-lg bg-gray-800 px-4 py-3 font-mono text-xs leading-6 text-green-300">
              <span className="text-gray-500">// Syntax:</span>
              <br />
              gsap.<span className="text-yellow-300">to</span>(element, {'{'}
              <br />
              &nbsp;&nbsp;x: <span className="text-orange-300">220</span>,{' '}
              <span className="text-gray-500">// geser px ke kanan</span>
              <br />
              &nbsp;&nbsp;rotation: <span className="text-orange-300">360</span>,<br />
              &nbsp;&nbsp;scale: <span className="text-orange-300">1.3</span>,<br />
              &nbsp;&nbsp;duration: <span className="text-orange-300">1.2</span>,<br />
              &nbsp;&nbsp;ease: <span className="text-green-200">&quot;power2.out&quot;</span>
              <br />
              {'}'})
            </div>
          </div>

          {/* Stage */}
          <div className="mb-6 flex h-24 items-center overflow-hidden rounded-xl bg-gray-800 px-6">
            <div
              ref={boxToRef}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500 text-xs font-bold text-white shadow-lg"
            >
              Box
            </div>
          </div>

          <button
            onClick={runEffectTo}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            ▶ Jalankan gsap.to()
          </button>
        </section>

        {/* ---- EFEK 2: gsap.from() ---- */}
        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <div className="mb-6">
            <span className="rounded-full bg-pink-900/60 px-3 py-1 font-mono text-xs text-pink-300">
              Efek 2
            </span>
            <h2 className="mt-3 mb-1 text-xl font-semibold">gsap.from()</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Kebalikan dari <code className="text-pink-300">gsap.to()</code>. Elemen dianimasikan{' '}
              <strong className="text-white">dari nilai yang kamu tulis</strong> menuju{' '}
              <strong className="text-white">kondisi aslinya di CSS</strong>. Cocok untuk{' '}
              <em>entrance animation</em> seperti fade-in dari atas.
            </p>
            <div className="mt-3 rounded-lg bg-gray-800 px-4 py-3 font-mono text-xs leading-6 text-green-300">
              <span className="text-gray-500">// Mulai dari nilai ini → ke kondisi normal</span>
              <br />
              gsap.<span className="text-yellow-300">from</span>(element, {'{'}
              <br />
              &nbsp;&nbsp;y: <span className="text-orange-300">-80</span>,{' '}
              <span className="text-gray-500">// datang dari atas</span>
              <br />
              &nbsp;&nbsp;opacity: <span className="text-orange-300">0</span>,{' '}
              <span className="text-gray-500">// mulai tak terlihat</span>
              <br />
              &nbsp;&nbsp;scale: <span className="text-orange-300">0.5</span>,<br />
              &nbsp;&nbsp;ease: <span className="text-green-200">&quot;back.out(1.7)&quot;</span>
              <br />
              {'}'})
            </div>
          </div>

          {/* Stage */}
          <div className="mb-6 flex h-24 items-center justify-center overflow-hidden rounded-xl bg-gray-800">
            <div
              ref={boxFromRef}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-500 text-xs font-bold text-white shadow-lg"
            >
              Box
            </div>
          </div>

          <button
            onClick={runEffectFrom}
            className="rounded-lg bg-pink-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-500"
          >
            ▶ Jalankan gsap.from()
          </button>
        </section>

        {/* ---- EFEK 3: gsap.timeline() ---- */}
        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <div className="mb-6">
            <span className="rounded-full bg-amber-900/60 px-3 py-1 font-mono text-xs text-amber-300">
              Efek 3
            </span>
            <h2 className="mt-3 mb-1 text-xl font-semibold">gsap.timeline()</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Menggabungkan beberapa animasi menjadi satu{' '}
              <strong className="text-white">urutan berrantai</strong>. Setiap langkah otomatis
              menunggu langkah sebelumnya selesai. Bisa juga overlap menggunakan parameter posisi
              seperti <code className="text-amber-300">&quot;-=0.1&quot;</code>.
            </p>
            <div className="mt-3 rounded-lg bg-gray-800 px-4 py-3 font-mono text-xs leading-6 text-green-300">
              <span className="text-gray-500">// Rantai 5 animasi dalam 1 timeline</span>
              <br />
              <span className="text-blue-300">const</span> tl = gsap.
              <span className="text-yellow-300">timeline</span>();
              <br />
              tl.<span className="text-yellow-300">to</span>(el, {'{ x: 200 }'}){' '}
              <span className="text-gray-500">// step 1</span>
              <br />
              &nbsp;.<span className="text-yellow-300">to</span>(el, {'{ y: 80 }'}){' '}
              <span className="text-gray-500">// step 2</span>
              <br />
              &nbsp;.<span className="text-yellow-300">to</span>(el, {'{ rotation: 180 }'},{' '}
              <span className="text-green-200">&quot;-=0.1&quot;</span>){' '}
              <span className="text-gray-500">// overlap</span>
            </div>
          </div>

          {/* Stage */}
          <div className="mb-6 flex h-36 items-start overflow-hidden rounded-xl bg-gray-800 px-6 pt-6">
            <div
              ref={tlBoxRef}
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500 text-xs font-bold text-white shadow-lg"
            >
              Box
            </div>
          </div>

          <button
            onClick={runEffectTimeline}
            className="rounded-lg bg-amber-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500"
          >
            ▶ Jalankan gsap.timeline()
          </button>
        </section>

        {/* Ringkasan */}
        <section className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">
            Ringkasan Konsep
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-indigo-900/30 p-4">
              <code className="font-mono text-xs text-indigo-300">gsap.to()</code>
              <p className="mt-1 text-xs leading-5 text-gray-400">
                Dari kondisi saat ini → ke nilai target. Paling sering digunakan.
              </p>
            </div>
            <div className="rounded-xl bg-pink-900/30 p-4">
              <code className="font-mono text-xs text-pink-300">gsap.from()</code>
              <p className="mt-1 text-xs leading-5 text-gray-400">
                Dari nilai yang kamu tulis → ke kondisi asli CSS. Ideal untuk entrance.
              </p>
            </div>
            <div className="rounded-xl bg-amber-900/30 p-4">
              <code className="font-mono text-xs text-amber-300">gsap.timeline()</code>
              <p className="mt-1 text-xs leading-5 text-gray-400">
                Wadah urutan animasi. Otomatis berurutan, bisa overlap atau delay.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
