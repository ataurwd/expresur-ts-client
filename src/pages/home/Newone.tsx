import React from "react";
import { motion } from "framer-motion";
import car2 from "./../../assets/Grupo car2.png";
import BgImg from "../../assets/Grupo-1567.png";

const Newone = () => {
  return (
    <div
      className="w-full h-[852.87px] bg-cover bg-center flex items-center justify-center bg-[#026432] py-10 px-4"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      {/* ORANGE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="
          relative bg-[#F7941E] rounded-2xl shadow-2xl 
          flex flex-col md:flex-row items-center 
          md:px-16 md:py-12 px-6 py-10
          w-full max-w-[1650px]
        "
      >
        {/* LEFT TEXT AREA */}
        <div className="md:w-[60%] w-full md:pr-24 space-y-6 z-10 text-center md:text-left">
          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="
              text-white font-bold uppercase 
              md:text-[80px] md:leading-[96px] md:tracking-[4.96px]
              text-[36px] leading-[42px] tracking-[2px]
            "
          >
            TIENDA ONLINE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="
              text-white md:max-w-xl 
              text-[15px] md:text-[17px] 
              leading-[22px] md:leading-[24px]
            "
          >
            rápidos, económicos y seguros Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt
            ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim
            veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure
            dolor in hendrerit.
          </motion.p>

          {/* BUTTON */}
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{
              scale: 1.08,
              backgroundColor: "#045f3a",
              boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="
              relative text-white 
              px-10 py-3 mx-auto md:mx-0
              bg-green-900 rounded-full font-semibold
              text-[15px] md:text-[18px]
              tracking-[1px]
            "
          >
            VISITA NUESTRA TIENDA
          </motion.button>
        </div>

        {/* TRUCK IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="md:absolute md:-right-4 md:-bottom-4 mt-10 md:mt-0"
        >
          <img
            src={car2}
            alt="Truck and boxes"
            className="w-[300px] md:w-[867px] h-auto drop-shadow-2xl mx-auto"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Newone;
