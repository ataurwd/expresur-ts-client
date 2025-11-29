import React from "react";
import HeroImg from "../../assets/RecogidaHero.png";
import HeroBg from "../../assets/HeroBg.png";
import { useAuth } from "../../context/AuthContext";

const RecogidaHero = () => {
  const userData = useAuth();
  console.log(userData?.users);

  return (
    <section
      className="relative w-full overflow-hidden"
      /* main gradient + optional subtle bg image */
      style={{
        backgroundImage:
          "linear-gradient(90deg, #0b5b39 0%, #8fc6b4 45%, #f5b370 100%), url(" +
          HeroBg +
          ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
        minHeight: "80vh",
      }}
    >
    

      {/* content wrapper */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-12 md:pt-24 pb-6">
        <div className="md:flex items-center lg:gap-16">
          {/* LEFT: Title */}
          <div className="md:w-1/2 z-20 text-center lg:text-left">
            <h1
              className="text-white font-semibold leading-tight tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.75rem)", // responsive large heading
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              Servicio de
              <br />
              <span className="inline-block">Recogida</span>
            </h1>
          </div>

          {/* RIGHT: Truck image (overlaps the bottom bar) */}
          <div className="md:w-1/2 relative flex justify-center lg:justify-end items-end pointer-events-none">
            <img
              src={HeroImg}
              alt="Servicios logísticos"
              className="relative z-30 object-contain"
              style={{
                /* size the art so it sits similar to screenshot and overlaps bar */
                width: "min(650px, 60vw)",
                transform: "translateY(6%)",
                maxWidth: "100%",
              }}
            />

         
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecogidaHero;
