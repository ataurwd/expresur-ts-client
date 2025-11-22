import React from 'react';
import { motion } from 'framer-motion';
import carimage from './../../assets/Grupo car.png';

const Seccion = () => {
  return (
    <div className="w-[1673px] h-[662.87px] ml-[115.5px] mr-[123px] -mb-[135px] bg-[#F7941D] flex items-center justify-between px-20 rounded-2xl shadow-lg overflow-visible relative">
      
      {/* Left Illustration - Full size, allowed to overflow */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute left-0 -translate-x-20 -translate-y-12 pointer-events-none"
      >
        <img
          src={carimage}
          alt="Illustration"
          className="w-[936.9px] h-[805.79px] object-contain"
          style={{ width: '936.9px', height: '805.79px' }}
        />
      </motion.div>

      {/* Right Text Content */}
      <motion.div
        className="max-w-xl text-white ml-auto"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-[Avenir Next LT Pro] text-[82px] leading-tight mb-6"
        >
          Sección <br /> de Recogida
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="font-[Avenir Next LT Pro] text-[17px] mb-10 leading-relaxed"
        >
          rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
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
          className="w-[599.59px] h-[70.81px] bg-[#046838] rounded-[25px] shadow-md text-white text-[28px] font-[Avenir Next LT Pro] flex items-center justify-center cursor-pointer transition-all duration-300"
        >
          Solicitar Recogida
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Seccion;