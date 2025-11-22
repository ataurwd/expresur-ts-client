// src/pages/home/Nuestros.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

import iconPackage from "../../assets/icon-package.png";
import iconRemesas from "../../assets/icon-remesas.png";
import iconPickup from "../../assets/icon-pickup.png";
import iconConfirm from "../../assets/icon-confirm.png";

type IconType = any;

interface Card {
  title: string;
  desc: string;
  icon: IconType;
}

const cards: Card[] = [
  {
    title: "ENVÍOS\nDE PAQUETES",
    desc:
      "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud",
    icon: iconPackage,
  },
  {
    title: "ENVÍO\nDE REMESAS",
    desc:
      "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wsi enim ad minim veniam, quis nostrud",
    icon: iconRemesas,
  },
  {
    title: "RECOGIDA\nDE PAQUETES",
    desc:
      "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wsi enim ad minim veniam, quis nostrud",
    icon: iconPickup,
  },
  {
    title: "CONFORMAR\nENVÍOS",
    desc:
      "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wsi enim ad minim veniam, quis nostrud",
    icon: iconConfirm,
  },
];

const container: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 18 },
  },
};

const Nuestros: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pages, setPages] = useState(1);

  // detect mobile (<768px)
  useEffect(() => {
    const check = () => {
      const isTouch = window.innerWidth < 768;
      setIsTouchDevice(isTouch);
      updateScrollButtons();
      computePages();
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const computePages = () => {
    const el = trackRef.current;
    if (!el) return;

    if (window.innerWidth < 768) {
      setPages(cards.length);
    } else {
      const clientWidth = el.clientWidth;
      const item = itemRefs.current[0];
      if (!item) {
        setPages(1);
        return;
      }
      const itemW = item.getBoundingClientRect().width + 16;
      const perRow = Math.max(1, Math.floor(clientWidth / itemW));
      setPages(Math.ceil(cards.length / perRow));
    }
  };

  const updateScrollButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft + clientWidth + 8 < scrollWidth);
  };

  const scrollToIndex = (index: number, smooth = true) => {
    const el = trackRef.current;
    const item = itemRefs.current[index];
    if (!el || !item) return;

    const itemRect = item.getBoundingClientRect();
    const offset =
      item.offsetLeft - el.clientWidth / 2 + itemRect.width / 2;

    el.scrollTo({ left: offset, behavior: smooth ? "smooth" : "auto" });

    setTimeout(() => {
      updateActiveByCenter();
      updateScrollButtons();
    }, smooth ? 300 : 0);
  };

  const scrollByPage = (direction: "next" | "prev") => {
    const el = trackRef.current;
    if (!el) return;

    const { clientWidth, scrollLeft, scrollWidth } = el;
    const page = clientWidth * 0.9;

    let target =
      direction === "next" ? scrollLeft + page : scrollLeft - page;

    target = Math.max(0, Math.min(target, scrollWidth - clientWidth));

    el.scrollTo({ left: target, behavior: "smooth" });

    setTimeout(() => {
      updateActiveByCenter();
      updateScrollButtons();
    }, 350);
  };

  const updateActiveByCenter = () => {
    const el = trackRef.current;
    if (!el) return;

    const center = el.scrollLeft + el.clientWidth / 2;

    let closest = 0;
    let closestDiff = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const left = item.offsetLeft;
      const width = item.getBoundingClientRect().width;
      const itemCenter = left + width / 2;
      const diff = Math.abs(center - itemCenter);
      if (diff < closestDiff) {
        closestDiff = diff;
        closest = index;
      }
    });

    setActiveIndex(closest);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updateActiveByCenter();
        updateScrollButtons();
      });
    };

    el.addEventListener("scroll", onScroll);
    updateActiveByCenter();
    updateScrollButtons();

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const setItemRef = (el: HTMLDivElement | null, idx: number) => {
    itemRefs.current[idx] = el;
  };

  const btnClass = (disabled: boolean) =>
    `inline-flex items-center justify-center rounded-full shadow-lg transition ${
      disabled
        ? "opacity-40 pointer-events-none bg-white/10 text-white"
        : "bg-gradient-to-tr from-amber-400 to-amber-500 text-green-900 hover:scale-105"
    } w-12 h-12`;

  return (
    <section className="bg-white py-10 mx-auto max-w-[1773px] px-4 sm:px-6 lg:px-8 mt-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative mx-auto w-full max-w-[1200px] md:max-w-[1400px]
          rounded-[28px] sm:rounded-[36px] lg:rounded-[43px]
          shadow-[3px_3px_6px_0_rgba(0,0,0,0.16)]
          bg-[rgba(4,104,56,1)] text-white
          p-8 sm:p-10 md:p-12 lg:p-16
          overflow-hidden -mt-[10%]
        "
      >
        <h2 className="text-center text-5xl font-semibold mb-8 tracking-wide ">
          Nuestros servicios
        </h2>

        <div className="relative">
          {/* Previous Button — hidden on mobile */}
          <button
            aria-label="Previous"
            onClick={() =>
              isTouchDevice
                ? scrollToIndex(Math.max(0, activeIndex - 1))
                : scrollByPage("prev")
            }
            className={`${btnClass(
              !canScrollPrev
            )} hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20`}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Cards Track */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            ref={trackRef}
            className={`${
              isTouchDevice
                ? "flex overflow-x-auto snap-x snap-mandatory -mx-4 py-6 scrollbar-hide"
                : "grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }`}
          >
            {cards.map((card, i) => {
              const active = i === activeIndex;

              return (
                <motion.div
                  key={i}
                  ref={(el) => setItemRef(el, i)}
                  variants={cardVariants}
                  className={`relative flex flex-col justify-between rounded-xl border-2 border-amber-500 p-5 sm:p-6 bg-white/8 backdrop-blur-md shadow-md min-h-[250px] sm:min-h-[270px] lg:min-h-[260px] ${
                    isTouchDevice
                      ? "min-w-[82%] snap-center mx-4"
                      : ""
                  }`}
                  style={{
                    transform: isTouchDevice
                      ? active
                        ? "scale(1.02)"
                        : "scale(0.95)"
                      : undefined,
                    transition: "transform 240ms ease",
                    zIndex: active ? 20 : 10,
                  }}
                >
                  <button
                    aria-label="fav"
                    className="absolute top-3 right-3 text-amber-400 text-xl"
                  >
                    ♡
                  </button>

                  <div className="flex justify-center mb-3">
                    <div className="w-[60%] sm:w-40 md:w-44 lg:w-48 aspect-[4/3] flex items-center justify-center">
                      <img
                        src={
                          typeof card.icon === "string"
                            ? card.icon
                            : (card.icon as any).src ?? card.icon
                        }
                        alt={card.title}
                        className="object-contain w-full h-full drop-shadow-md"
                      />
                    </div>
                  </div>

                  <h3 className="text-center whitespace-pre-line font-bold mb-1 tracking-wider text-amber-100 text-[clamp(0.9rem,1.6vw,1.2rem)]">
                    {card.title}
                  </h3>

                  <p className="text-center text-green-50/90 px-2 text-[clamp(0.8rem,1.2vw,1rem)] mb-3 leading-relaxed">
                    {card.desc}
                  </p>

                  <div className="flex justify-center mt-auto">
                    <button className="px-6 py-2 rounded-full bg-amber-500 text-green-900 font-bold text-xs shadow-md">
                      VER MÁS
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Next Button — hidden on mobile */}
          <button
            aria-label="Next"
            onClick={() =>
              isTouchDevice
                ? scrollToIndex(Math.min(cards.length - 1, activeIndex + 1))
                : scrollByPage("next")
            }
            className={`${btnClass(
              !canScrollNext
            )} hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20`}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Dots — VISIBLE ONLY ON MOBILE */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-3 h-3 rounded-full transition ${
                activeIndex === i ? "bg-amber-400 scale-125" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Nuestros;
