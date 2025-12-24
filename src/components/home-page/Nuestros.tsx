/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/home/Nuestros.tsx
import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import iconPackage from "../../assets/icon-pickup.png";
import iconRemesas from "../../assets/icon-remesas.png";
import iconPickup from "../../assets/icon-package.png";
import iconConfirm from "../../assets/icon-confirm1.png";

interface Card {
  title: string;
  desc: string;
  icon: string;
}

const baseCards: Card[] = [
  { title: "ENVÍOS\nDE PAQUETES", desc: "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud", icon: iconPackage },
  { title: "ENVÍO\nDE REMESAS", desc: "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud", icon: iconRemesas },
  { title: "RECOGIDA\nDE PAQUETES", desc: "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud", icon: iconPickup },
  { title: "CONFORMAR\nENVÍOS", desc: "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud", icon: iconConfirm },
];

const Nuestros: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isUserInteracting = useRef(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [currentDot, setCurrentDot] = useState(0);
  const [ready, setReady] = useState(false);

  const updateVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    if (w < 640) setVisibleCount(1);
    else if (w < 768) setVisibleCount(1);
    else if (w < 1024) setVisibleCount(2);
    else if (w < 1280) setVisibleCount(3);
    else setVisibleCount(4);
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  const cards = [...baseCards, ...baseCards, ...baseCards]; // left | middle | right
  const total = baseCards.length;
  const slidePercent = 100 / visibleCount;

  // helper to compute step (width of one card viewport-slot)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getStep = (el: HTMLDivElement) => {
    return el.clientWidth / visibleCount;
  };

  // place initial scroll at middle batch start
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    // ensure layout settled
    requestAnimationFrame(() => {
      const step = getStep(el);
      el.scrollLeft = total * step;
      setReady(true);
      // update dot immediately
      const posInBatch = 0;
      setCurrentDot(Math.round(posInBatch / step) % total);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount, total]);

  // normalize a value into [0, total*step)
  const modPosInBatch = (value: number, batchWidth: number) => {
    return ((value % batchWidth) + batchWidth) % batchWidth;
  };

  // compute and set current dot in a rAF-safe way
  const scheduleDotUpdate = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = viewportRef.current;
      if (!el) return;
      const step = getStep(el);
      const batchWidth = total * step;
      // relative to middle batch start
      const relative = el.scrollLeft - total * step;
      const posInBatch = modPosInBatch(relative, batchWidth);
      const idx = Math.round(posInBatch / step) % total;
      setCurrentDot(idx);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, visibleCount]);

  // infinite jump when reaching edges — keep threshold small to avoid mid-scroll jumps
  const handleInfinite = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const step = getStep(el);
    const max = el.scrollWidth - el.clientWidth;
    const threshold = Math.max(6, step * 0.35); // allow small tolerance but not too big

    // if near right end
    if (el.scrollLeft >= max - threshold) {
      // instant jump left by total steps
      el.scrollLeft = el.scrollLeft - total * step;
    } else if (el.scrollLeft <= threshold) {
      // near left end -> instant jump right by total steps
      el.scrollLeft = el.scrollLeft + total * step;
    }
  }, [getStep, total]);

  // core scroll listener
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => {
      // mark user interacting to avoid programmatic conflicts
      isUserInteracting.current = true;
      scheduleDotUpdate();
      // schedule infinite check a bit later (allow momentum). Use rAF to run handleInfinite after layout update.
      requestAnimationFrame(() => {
        handleInfinite();
      });
      // clear interacting mark after a short delay
      window.clearTimeout((onScroll as any)._t);
      (onScroll as any)._t = window.setTimeout(() => {
        isUserInteracting.current = false;
      }, 120);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleDotUpdate, handleInfinite]);

  // utility: ensure we are positioned in middle batch before doing smooth moves
  const ensureMiddleBatch = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const step = getStep(el);
    const batchWidth = total * step;
    const relative = el.scrollLeft - total * step;
    const posInBatch = modPosInBatch(relative, batchWidth);
    // if we're already roughly inside middle batch (pos within [0,batchWidth)), do nothing.
    // But due to clones, scrollLeft might be outside — we normalize to middle
    el.scrollLeft = (total * step) + posInBatch;
  }, [total, visibleCount]);

  // smooth scroll helpers
  const scrollBySteps = useCallback((steps: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const step = getStep(el);
    ensureMiddleBatch(); // instant fix if needed
    // smooth scroll by step * steps
    el.scrollBy({ left: step * steps, behavior: "smooth" });
  }, [ensureMiddleBatch, visibleCount]);

  const scrollToIndex = useCallback((index: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const step = getStep(el);
    // target = middle batch start + index*step
    const target = (total * step) + index * step;
    // ensure we are close to middle first to avoid weird jumps during smooth
    ensureMiddleBatch();
    el.scrollTo({ left: target, behavior: "smooth" });
  }, [ensureMiddleBatch, total, visibleCount]);

  const scrollNext = () => scrollBySteps(1);
  const scrollPrev = () => scrollBySteps(-1);

  // cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="bg-white py-8 mx-auto max-w-[1773px] px-4 sm:px-6 lg:px-8 mt-5">
      <div className="relative mx-auto w-full max-w-[1400px] rounded-[28px] sm:rounded-[36px] lg:rounded-[43px] shadow-[3px_3px_6px_0_rgba(0,0,0,0.16)] bg-[rgba(4,104,56,1)] text-white p-6 sm:p-10 md:p-12 lg:p-16 overflow-visible -mt-[10%] z-10">
        <h2 className="text-center text-4xl sm:text-5xl font-semibold mb-6 sm:mb-8 tracking-wide">
          Nuestros servicios
        </h2>

        <div className="relative">
          {/* Prev */}
          <button onClick={scrollPrev} aria-label="Anterior"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-green-900 shadow-lg items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>

          {/* Carousel – SCROLLBAR ১০০% লুকানো */}
          <div
            ref={viewportRef}
            className="overflow-x-auto scroll-smooth
                       [-ms-overflow-style:'none']      /* IE & Edge */
                       [scrollbar-width:'none']         /* Firefox */
                       [&::-webkit-scrollbar]:hidden"   /* Chrome, Safari, Opera */
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex gap-4 py-6">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 flex flex-col justify-between rounded-xl border-2 border-amber-500 p-3 sm:p-4 bg-white/8 backdrop-blur-md shadow-md min-h-[200px] sm:min-h-[220px]"
                  style={{ width: `${slidePercent}%`, scrollSnapAlign: visibleCount === 1 ? "center" : "start" }}
                >
                  <button aria-label="Favorito" className="absolute top-2 right-2 text-amber-400 text-sm hidden sm:block">♡</button>

                  <div className="flex justify-center mb-3">
                    <div className="w-[60%] sm:w-36 md:w-40 lg:w-44 aspect-[4/3] flex items-center justify-center">
                      <img src={card.icon} alt={card.title.replace(/\n/g, " ")} className="object-contain drop-shadow-md" />
                    </div>
                  </div>

                  <h3 className="text-center whitespace-pre-line font-bold text-amber-100 text-[clamp(0.85rem,1.4vw,1.05rem)] tracking-wider">
                    {card.title}
                  </h3>

                  <p className="text-center text-green-50/90 text-[clamp(0.72rem,1.0vw,0.9rem)] px-2 leading-relaxed mt-2">
                    {card.desc}
                  </p>

                  <div className="flex justify-center mt-auto pt-3 hidden sm:flex">
                    <button className="px-4 py-2 rounded-full bg-amber-500 text-green-900 font-bold text-xs shadow-md hover:bg-amber-400 transition">
                      VER MÁS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next */}
          <button onClick={scrollNext} aria-label="Siguiente"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-green-900 shadow-lg items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Dots – Mobile */}
        <div className="mt-8 flex justify-center gap-3 md:hidden">
          {baseCards.map((_, i) => {
            const isActive = ready && i === currentDot;
            return (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-250
                  ${isActive ? "bg-amber-400 scale-125" : "bg-green-300/60"}
                `}
                aria-label={`ir a ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Nuestros;