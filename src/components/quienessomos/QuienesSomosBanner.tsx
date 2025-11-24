import React from "react";
import QuienesSomosImg from "../../assets/Grupo.png";

const QuienesSomosBanner: React.FC = () => {
  return (
    <div className="w-[1920px] h-[555.7px] bg-gradient-to-r from-green-700 to-orange-300 relative overflow-hidden flex items-center px-16">
      {/* Background Image */}
      <img
        src={QuienesSomosImg}
        alt="quienes somos"
        className="absolute right-0 top-0 h-full object-contain pointer-events-none"
      />

      {/* Title */}
      <h1 className="text-white font-bold uppercase z-10 leading-[148px] text-left tracking-[0px] text-[123px] font-['AvenirNextLTPro']">
        QUIÉNES SOMOS
      </h1>
    </div>
  );
};

export default QuienesSomosBanner;
