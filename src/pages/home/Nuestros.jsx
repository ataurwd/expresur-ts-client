import React from "react";
import { motion } from "framer-motion";

// replace with correct filenames
import iconPackage from "../../assets/icon-package.png";
import iconRemesas from "../../assets/icon-remesas.png";
import iconPickup from "../../assets/icon-pickup.png";
import iconConfirm from "../../assets/icon-confirm.png";

const cards = [
  {
    title: "ENVÍOS\nDE PAQUETES",
    desc:
      "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud",
    icon: iconPackage,
  },
  {
    title: "ENVÍO\nDE REMESAS",
    desc:
      "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud",
    icon: iconRemesas,
  },
  {
    title: "RECOGIDA\nDE PAQUETES",
    desc:
      "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud",
    icon: iconPickup,
  },
  {
    title: "CONFORMAR\nENVÍOS",
    desc:
      "Ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud",
    icon: iconConfirm,
  },
];

const container = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: { scale: 1.03, y: -6, transition: { type: "spring", stiffness: 400 } },
};

export default function Nuestros() {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative
          mx-auto
          w-full
          max-w-[1200px]
          md:max-w-[1400px]
          rounded-[28px]
          sm:rounded-[36px]
          lg:rounded-[43px]
          shadow-[3px_3px_6px_0_rgba(0,0,0,0.16)]
          bg-[rgba(4,104,56,1)]
          text-white
          p-6 sm:p-8 md:p-10 lg:p-14
          overflow-hidden
          -mt-[10%]
        "
      >
        <h2
          className="
            text-center
            font-semibold
            mb-8
            tracking-wide
            text-[clamp(1.25rem,2.4vw,2.75rem)]
          "
        >
          Nuestros servicios
        </h2>

        <div className="relative">
          <motion.button
            aria-label="previous"
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white text-xl items-center justify-center w-9 h-9"
            title="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.button>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="
              grid
              gap-4 sm:gap-5 md:gap-6
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {cards.map((card, i) => (
              <motion.article
                key={i}
                variants={cardVariants}
                whileHover="hover"
                className="
                  relative
                  flex flex-col justify-between
                  rounded-lg
                  border-2 border-amber-500
                  p-4 sm:p-5 md:p-6
                  bg-white/6 backdrop-blur-sm
                  shadow-sm
                  min-h-[220px] sm:min-h-[240px] lg:min-h-[260px]
                "
              >
                <button
                  aria-label={`favorite-${i}`}
                  className="absolute top-3 right-3 text-amber-400"
                >
                  ♡
                </button>

                <div className="flex justify-center mb-3 sm:mb-4">
                  <motion.div
                    whileHover={{ rotate: 8 }}
                    className="w-[70%] sm:w-40 md:w-44 lg:w-48 aspect-[3/2] flex items-center justify-center"
                  >
                    <img
                      src={card.icon}
                      alt={card.title.replace("\n", " ")}
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  </motion.div>
                </div>

                <h3
                  className="
                    text-center whitespace-pre-line font-semibold mb-2
                    text-[clamp(0.9rem,1.4vw,1.05rem)]
                    tracking-wider
                  "
                >
                  {card.title}
                </h3>

                <p className="text-center text-[clamp(0.78rem,1.15vw,0.95rem)] leading-relaxed mb-4 text-green-100/85 px-1">
                  {card.desc}
                </p>

                <div className="flex justify-center">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="
                      rounded-full
                      px-5 py-2
                      text-sm font-medium
                      bg-amber-500 text-green-900
                      shadow-md hover:scale-105 transition-transform
                    "
                  >
                    VER MÁS
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.button
            aria-label="next"
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white text-xl items-center justify-center w-9 h-9"
            title="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.button>
        </div>

        <div className="pointer-events-none absolute -bottom-6 left-6 w-36 h-12 rounded-lg bg-white/6 blur-sm hidden sm:block" />
      </motion.div>
    </section>
  );
}
