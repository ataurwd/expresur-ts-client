import React from "react";
import { motion } from "framer-motion";
import HeroImg from "../../assets/Hero1.png";
import HeroImg2 from "../../assets/Hero2.png";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const textVariant = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const btnVariant = {
  hover: { scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" },
  tap: { scale: 0.98 },
};

const imageVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "circOut" } },
};

const floatAnim = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

const HeroOne = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#005f37] to-[#a8cfc0] lg:h-[873px] py-20 overflow-hidden">
      {/* wrapper caps display at 1920px and hides overflow */}
      <div className="w-full max-w-[1920px] mx-auto px-6 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
          {/* LEFT CONTENT */}
          <motion.div
            className="text-white space-y-7 mt-[-25%] ml-14"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              variants={textVariant}
              className="text-4xl md:text-5xl lg:text-7xl font-[600] leading-tight tracking-tight"
            >
              PROVEEDOR <br />
              DE SERVICIOS <br />
              LOGÍSTICOS
            </motion.h1>

            <motion.p
              variants={textVariant}
              className="max-w-xl text-sm md:text-base text-green-100"
            >
              Soluciones logísticas integrales — transporte, almacenamiento y distribución con tecnología para que tu operación fluya.
            </motion.p>

            <motion.div variants={textVariant}>
              <motion.button
                variants={btnVariant}
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center gap-3 px-6 py-3 bg-white text-green-900 rounded-full font-semibold shadow-lg hover:opacity-95 transition"
              >
                SOLICITAR COTIZACIÓN
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGES (sizes preserved like original) */}
          <motion.div
            className="relative flex justify-center mt-10 md:justify-end"
            variants={imageVariant}
            initial="hidden"
            animate="show"
            aria-hidden="true"
          >
            {/* Background HeroImg2 — same large width classes as before */}
            <motion.img
              src={HeroImg2}
              alt="Logistics illustration large"
              className="
                hidden sm:block max-w-none object-cover z-0
                w-[700px] sm:w-[1100px] md:w-[1400px] lg:w-[1700px] xl:w-[2100px] 2xl:w-[2400px]
                mr-[-160px] md:mr-[-380px] lg:mr-[-600px]
              "
              {...floatAnim}
            />

            {/* Foreground HeroImg — same large widths */}
            <motion.img
              src={HeroImg}
              alt="Logistics detail"
              className={
                "absolute z-30 object-cover rounded-lg " +
                "w-[320px] sm:w-[480px] md:w-[700px] lg:w-[1000px] xl:w-[1300px] 2xl:w-[1500px] " +
                "left-1/2 transform -translate-x-1/2 sm:left-auto sm:translate-x-0 " +
                "sm:right-6 md:right-[-60px] lg:right-[-180px] " +
                "bottom-[240px] sm:bottom-[-140px] md:bottom-[-220px] lg:bottom-[18%]"
              }
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Small-screen adjustment */}
      <style jsx>{`
        @media (max-width: 420px) {
          .absolute {
            bottom: -60px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroOne;
