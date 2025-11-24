import React from "react";
import Illustration from "../../assets/Grupo-1648.png";

const WhyChooseUs: React.FC = () => {
  return (
    <div className="w-full flex justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1500px] w-full py-[120px] px-8">
        
        {/* LEFT SIDE */}
        <div className="pr-0 md:pr-16 lg:pr-32">
          
          {/* H1 — one line */}
          <h1 className="font-avenir font-bold text-7xl leading-[72px] text-[#FA921D] whitespace-nowrap">
            Por qué elegirnos
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 mt-6 text-[18px] leading-[30px] max-w-[520px]">
            En el competitivo mundo empresarial de hoy, la demanda de soluciones
            de logística eficientes nunca ha sido más crítica.
          </p>

          {/* FEATURES */}
          <div className="mt-12 relative">

            {/* Vertical line */}
            <div className="absolute left-0 top-3 h-[260px] border-l-4 border-[#FA921D]" />

            {/* List */}
            <ul className="ml-10 space-y-6 text-[22px] leading-[32px]">
              <li>
                <span className="text-orange-500 font-bold">30 CARGADORES</span> con experiencia
              </li>
              <li>
                <span className="text-green-700 font-bold">45 EXPERTOS</span> capacitados en almacén
              </li>
              <li>
                <span className="text-orange-500 font-bold">120 CONDUCTORES</span> de camión expertos
              </li>
              <li>
                <span className="text-green-700 font-bold">345 PERSONAL</span> de entrega
              </li>
            </ul>

            {/* Dots */}
            <div className="absolute left-[-10px] top-[12px] w-4 h-4 bg-orange-500 rounded-full" />
            <div className="absolute left-[-10px] top-[76px] w-4 h-4 bg-orange-500 rounded-full" />
            <div className="absolute left-[-10px] top-[140px] w-4 h-4 bg-orange-500 rounded-full" />
            <div className="absolute left-[-10px] top-[204px] w-4 h-4 bg-orange-500 rounded-full" />
          </div>

          {/* Button */}
          <button className="mt-10 px-12 py-4 rounded-full text-white font-bold text-[18px] bg-[#0A6F3C]">
            SOLICITAR COTIZACIÓN
          </button>
        </div>

        {/* RIGHT SIDE — Image */}
        <div className="flex justify-end items-center">
          <img
            src={Illustration}
            alt="logistics illustration"
            className="w-full max-w-[900px] object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
