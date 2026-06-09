'use client';

import { useEffect, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export default function Practice1() {
  const lenisRef = useRef<Lenis>();

  useGSAP(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const helloText = gsap.utils.toArray('#hello_text span');

      tl.fromTo(
        helloText,
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          onComplete: () => {
            gsap.to(helloText, {
              y: -200,
              opacity: 0,
              stagger: 0.2,
            });
          },
        },
      );
      tl.to('#hello_text', {
        opacity: 0,
        display: 'none',
      });
      const welcomeText = gsap.utils.toArray('#welcome_text span');
      tl.set('#welcome_text', { display: 'block' });
      tl.fromTo(
        welcomeText,
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.3,
          onComplete: () => {
            gsap.to(welcomeText, {
              y: -200,
              opacity: 0,
              stagger: 0.2,
            });
          },
        },
      );
    });

    return () => {
      ctx.revert();
      lenisRef.current?.destroy();
    };
  }, []);
  return (
    <div className={clsx(`flex h-dvh w-full items-center justify-center`)}>
      <div className={clsx(`text-9xl font-bold`)} id="text">
        <p id="hello_text">
          <span>H</span>
          <span>E</span>
          <span>L</span>
          <span>L</span>
          <span>O</span>
        </p>
        <p id="welcome_text" className={clsx(`hidden`)}>
          <span>W</span>
          <span>E</span>
          <span>L</span>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>E</span>
          <span> </span>
          <span>T</span>
          <span>O</span>
          <span> </span>
          <span>M</span>
          <span>Y</span>
          <span> </span>
          <span>W</span>
          <span>E</span>
          <span>B</span>
        </p>
      </div>
    </div>
  );
}
