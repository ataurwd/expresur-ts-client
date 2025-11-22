import React from 'react';
import { motion } from 'framer-motion';
import car from '../../assets/Grupo car.png';

const Seccion = () => {
  return (
    <div className="w-full max-w-[1673px] min-h-[400px] md:min-h-[500px] lg:h-[662.87px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 -mb-8 md:-mb-16 lg:-mb-[135px] bg-[#F7941D] flex items-center justify-between rounded-2xl shadow-lg overflow-visible relative py-12 md:py-16 lg:py-0">

      {/* ---------------- DESKTOP IMAGE (original) ---------------- */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute left-0 -translate-x-8 sm:-translate-x-12 md:-translate-x-16 lg:-translate-x-20 -translate-y-6 md:-translate-y-12 pointer-events-none hidden sm:block"
      >
        <img
          src={car}
          alt="Illustration"
          className="w-[300px] h-[258px] sm:w-[500px] sm:h-[344px] md:w-[600px] md:h-[516px] lg:w-[936.9px] lg:h-[805.79px] object-contain"
        />
      </motion.div>

      {/* ---------------- RIGHT TEXT CONTENT ---------------- */}
      <motion.div
        className="w-full sm:w-auto sm:max-w-xl text-white sm:ml-auto z-10"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-[Avenir Next LT Pro] text-4xl sm:text-5xl md:text-6xl lg:text-[82px] leading-tight mb-4 md:mb-6"
        >
          Sección <br /> de Recogida
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-[Avenir Next LT Pro] text-sm sm:text-base md:text-[17px] mb-6 md:mb-10 leading-relaxed"
        >
          rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.
        </motion.p>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 30px -5px rgba(0, 0, 0, 0.35)",
            backgroundColor: "#035228"
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="w-full sm:w-auto sm:min-w-[300px] md:min-w-[400px] lg:w-[599.59px] h-[56px] sm:h-[60px] md:h-[70.81px] bg-[#046838] rounded-[25px] shadow-md text-white text-lg sm:text-xl md:text-2xl lg:text-[28px] font-[Avenir Next LT Pro] flex items-center justify-center cursor-pointer transition-all duration-300"
        >
          Solicitar Recogida
        </motion.button>

        {/* ---------------- MOBILE IMAGE (new, below button) ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="block sm:hidden mt-8 flex justify-center"
        >
          <img
            src={car}
            alt="Illustration"
            className="w-[260px] h-auto object-contain"
          />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Seccion;
