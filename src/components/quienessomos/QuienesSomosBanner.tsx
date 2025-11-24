import React from "react";
import QuienesSomosImg from "../../assets/Grupo.png";
import HeroBg from "../../assets/HeroBg.png";


const QuienesSomosBanner: React.FC = () => {
  return (
    <div style={{ backgroundImage: `url(${HeroBg})` }}>
      <div className="max-w-[1440px] mx-auto ">
       <h1 className="py-96">Quiénes Somos</h1>
      </div>
    </div>
  );
};

export default QuienesSomosBanner;
