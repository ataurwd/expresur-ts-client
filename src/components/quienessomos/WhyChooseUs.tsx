import React from "react";
import Illustration from "../../assets/Grupo-1648.png";

const WhyChooseUs: React.FC = () => {
  return (
    <div className="w-full flex justify-center relative" style={{ backgroundColor: "#ffffff" }}>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full"
        style={{
          paddingTop: "120px",
          paddingBottom: "120px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {/* LEFT SIDE */}
        <div className="pr-0 md:pr-12">
          {/* Title */}
          <h1
            className="font-avenir font-bold"
            style={{
              fontSize: "48px",
              color: "rgba(250,146,29,1)",
            }}
          >
            Por qué elegirnos
          </h1>

          {/* Subtitle */}
          <p
            className="text-gray-600 mt-4"
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              maxWidth: "480px",
            }}
          >
            En el competitivo mundo empresarial de hoy, la demanda de soluciones de
            logística eficientes nunca ha sido más crítica.
          </p>

          {/* FEATURES LIST */}
          <div className="mt-12 relative">
            {/* VERTICAL ORANGE LINE */}
            <div
              className="absolute"
              style={{
                left: "0px",
                top: "10px",
                height: "260px",
                borderLeft: "4px solid rgba(250,146,29,1)",
              }}
            />

            {/* Each Row */}
            <ul className="ml-10 space-y-6">
              <li className="text-[20px]">
                <span className="text-orange-500 font-bold">30 CARGADORES</span> con experiencia
              </li>

              <li className="text-[20px]">
                <span className="text-green-700 font-bold">45 EXPERTOS</span> capacitados en almacén
              </li>

              <li className="text-[20px]">
                <span className="text-orange-500 font-bold">120 CONDUCTORES</span> de camión expertos
              </li>

              <li className="text-[20px]">
                <span className="text-green-700 font-bold">345 PERSONAL</span> de entrega
              </li>
            </ul>

            {/* ORANGE DOTS */}
            <div className="absolute left-[-9px] top-[10px] w-4 h-4 bg-orange-500 rounded-full" />
            <div className="absolute left-[-9px] top-[74px] w-4 h-4 bg-orange-500 rounded-full" />
            <div className="absolute left-[-9px] top-[138px] w-4 h-4 bg-orange-500 rounded-full" />
            <div className="absolute left-[-9px] top-[202px] w-4 h-4 bg-orange-500 rounded-full" />
          </div>

          {/* BUTTON */}
          <button
            className="mt-8 px-10 py-3 rounded-full text-white font-bold"
            style={{ background: "#0a6f3c", fontSize: "18px" }}
          >
            SOLICITAR COTIZACIÓN
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center items-center">
          <img
            src={Illustration}
            alt="logistics illustration"
            className="w-full max-w-[650px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
