import React from "react";
import HeroImg from "../../assets/Hero1.png";
import HeroImg2 from "../../assets/Hero2.png";
import HeroBg from "../../assets/HeroBg.png";

const HeroOne: React.FC = () => {
  return (
    <section
      className="relative overflow-x-hidden w-full min-h-[90vh] md:min-h-[80vh] bg-gradient-to-b from-[#005f37] to-[#a8cfc0] bg-cover bg-center"
      style={{
        backgroundImage: `url(${HeroBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className=" mx-auto px-6"
        style={{
          backgroundImage: `url(${HeroImg2})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundSize: "contain",
        }}
      >
        <div className="md:flex lg:gap-16 items-center  md:pt-32 md:pl-20 pt-10">
          {/* Left: Text Content */}
          <div className="text-white space-y-8 text-center lg:text-left md:w-1/2 ">
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight ">
              PROVEEDOR <br />
              DE SERVICIOS <br />
              LOGÍSTICOS
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-green-100 max-w-xl mx-auto lg:mx-0 hidden
             md:block">
              Soluciones logísticas integrales — transporte, almacenamiento y
              distribución con tecnología para que tu operación fluya.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button
                type="button"
                className=" hidden md:block w-full sm:w-auto px-8 py-4 bg-white text-green-900 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-200"
              >
                SOLICITAR COTIZACIÓN
              </button>
            </div>
          </div>

          {/* Right: Images */}
          <div className="relative md:flex flex-col justify-center lg:justify-end md:w-1/2">
            {/* Foreground Image (HeroImg) - Main visual */}
            <img
              src={HeroImg}
              alt="Servicios logísticos"
              className="relative z-10 w-[1200px]  object-contain md:-mb-60 mr-32"
            />

              <button
                type="button"
                className="mt-20 md:hidden block w-full sm:w-auto px-8 py-4 bg-green-800 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-200"
              >
                SOLICITAR COTIZACIÓN
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOne;
