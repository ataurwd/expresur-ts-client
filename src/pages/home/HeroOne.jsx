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
    <section className="w-full bg-gradient-to-r lg:h-[673px] from-[#03683A] to-[#DD9E44]
 py-20 overflow-hidden">
      <div className="max-w-[1400px] my-auto mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          className="text-white space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={textVariant}
            className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
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

        {/* RIGHT IMAGE / Illustration area */}
     <motion.div
  className="relative flex justify-center mt-10 md:justify-end"
  variants={imageVariant}
  initial="hidden"
  animate="show"
>
  {/* Background image (img2) */}
  <motion.img
    src={HeroImg2}
    alt="Logistics illustration large"
    className="w-full max-h-full max-w-lg rounded-xl object-cover z-0"
    {...floatAnim}
  />

  {/* Overlay image (img1) — always on top */}
  <motion.img
    src={HeroImg}
    alt="Logistics detail"
    className=" md:block absolute  mt-32  w-full  rounded-lg   object-cover z-20"
    initial={{ opacity: 0, scale: 0.9, x: -20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
  />
</motion.div>

      </div>

   

      {/* Extra CSS for small float & subtle parallax (tailwind-friendly) */}
      <style jsx>{`
        /* keep this small: subtle rounded border for image overlay on small screens */
        @media (max-width: 767px) {
          .absolute.-left-12 {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroOne;
