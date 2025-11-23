import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import card from "./../../assets/card.png";
import Avatar from "./../../assets/medium-shot-smiley-woman-with-crossed-arms (1).png";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const Quedicen: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      text:
        "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ",
      name: "Karen",
      role: "Lorem ipsum dolor",
      avatar: Avatar,
    },
    {
      text:
        "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ",
      name: "Karen",
      role: "Lorem ipsum dolor",
      avatar: Avatar,
    },
    {
      text:
        "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ",
      name: "Karen",
      role: "Lorem ipsum dolor",
      avatar: Avatar,
    },
    {
      text:
        "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ",
      name: "Karen",
      role: "Lorem ipsum dolor",
      avatar: Avatar,
    },
    {
      text:
        "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ",
      name: "Karen",
      role: "Lorem ipsum dolor",
      avatar: Avatar,
    },
    {
      text:
        "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ",
      name: "Karen",
      role: "Lorem ipsum dolor",
      avatar: Avatar,
    },
  ];

  // responsive visible count (desktop shows 3 like design)
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 640) return 1; // small phones
    if (w < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [visibleCount, setVisibleCount] = useState<number>(getVisibleCount());
  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // duplicate list for smooth rendering (visual loop)
  const loopList = useMemo(() => [...testimonials, ...testimonials], [testimonials]);
  const innerSlides = loopList.length; // duplicated length

  // index in original testimonials array (0..n-1)
  const [index, setIndex] = useState<number>(0);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  // compute width and translate in percent relative to inner container so it scales correctly
  const slideWidthInnerPercent = 100 / innerSlides; // each slide as percent of inner container
  const containerWidthPercent = (innerSlides / visibleCount) * 100; // inner container width relative to viewport
  const translateXInnerPercent = -(index * slideWidthInnerPercent); // translate relative to inner container

  // optional: autoplay (keeps behavior similar to other slider)
  const autoplayRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  useEffect(() => {
    const start = () => {
      stop();
      autoplayRef.current = window.setInterval(() => {
        if (!isPausedRef.current) setIndex((i) => (i + 1) % testimonials.length);
      }, 4000);
    };
    const stop = () => {
      if (autoplayRef.current !== null) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    start();
    return () => stop();
  }, [testimonials.length]);

  return (
    <div className="w-full bg-[#026432] overflow-hidden py-10">
      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 0.95, ease: "easeOut" } }}
        viewport={{ once: true, margin: "-100px" }}
        className="
          text-[rgba(243,243,243,1)] font-bold 
          lg:text-[64px] md:text-[48px] text-3xl
          leading-tight tracking-wide text-center max-w-7xl mx-auto mb-10 px-4
        "
      >
        ¿Qué dicen nuestros clientes?
      </motion.h2>

      <div className="relative w-full flex items-center justify-center px-4">
        {/* LEFT ARROW */}
        <button
          onClick={prev}
          aria-label="Previous testimonials"
          className="absolute left-3 text-orange-400 text-4xl cursor-pointer z-10 hidden md:flex items-center justify-center"
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
        >
          ❮
        </button>

        {/* VIEWPORT */}
        <div
          className="overflow-hidden w-full max-w-7xl"
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
        >
          {/* WIDE CONTAINER */}
          <motion.div
            className="flex items-start gap-10"
            animate={{ x: `${translateXInnerPercent}%` }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{ width: `${containerWidthPercent}%` }}
          >
            {loopList.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-start mx-auto"
                style={{ width: `${slideWidthInnerPercent}%` }}
              >
                {/* CARD BOX - responsive sizing */}
                <div className="mx-auto w-full flex justify-center">
                  <div
                    className="relative bg-white rounded-[18px] shadow-md"
                    style={{
                      // fluid width: up to 456px on md+; on small screens it will be percentage-based
                      width: "min(92%, 456px)",
                      padding: "28px",
                    }}
                  >
                    {/* text: use clamp for font-size so it scales nicely */}
                    <p
                      className="text-left text-gray-800"
                      style={{
                        fontSize: "clamp(13px, 1.3vw, 16px)",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.text}
                    </p>

                    {/* stars */}
                    <div className="flex text-orange-400 text-xl mt-4">★★★★★</div>

                    {/* speech-tail (rotated square) */}
                    <div
                      aria-hidden
                      className="absolute"
                      style={{
                        width: 16,
                        height: 16,
                        background: "white",
                        left: 40,
                        bottom: -8,
                        transform: "rotate(45deg)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>

                {/* AVATAR + INFO row */}
                <div className="flex items-center gap-4 mt-6 mx-auto w-full" style={{ maxWidth: 456 }}>
                  <img
                    src={item.avatar}
                    alt={`${item.name} avatar`}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-[#707070] shadow-lg flex-shrink-0"
                  />
                  <div className="flex flex-col items-start">
                    <h3 className="text-white text-lg md:text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-300 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={next}
          aria-label="Next testimonials"
          className="absolute right-3 text-orange-400 text-4xl cursor-pointer z-10 hidden md:flex items-center justify-center"
          onMouseEnter={() => (isPausedRef.current = true)}
          onMouseLeave={() => (isPausedRef.current = false)}
        >
          ❯
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: testimonials.length }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-gray-400/60"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Quedicen;
