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
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-12 md:pt-24 pb-6">
        <div className="md:flex items-center lg:gap-16">
          {/* LEFT: Title */}
          <div className="md:w-1/2 z-20 text-center lg:text-left">
            <h1
              className="text-white font-semibold leading-tight tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.75rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              Servicio de
              <br />
              <span className="inline-block">Recogida</span>
            </h1>
          </div>

          {/* RIGHT: Truck image fixed to exact px size */}
          <div className="md:w-1/2 relative flex justify-center lg:justify-end items-end pointer-events-none">
            <img
              src={HeroImg}
              alt="Servicios logísticos"
              className="flex-none object-contain"
              style={{
                width: "753.92px",
                height: "616.04px",
                /* ensure it doesn't get overridden by max-width rules */
                maxWidth: "none",
                maxHeight: "none",
                /* small viewport fallback: let it scale down proportionally */
                /* the following keeps aspect ratio while allowing shrink on narrow screens */
                // Note: browsers keep aspect ratio if only width is constrained; we fix both but allow scaling via transform in very small widths if needed
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecogidaHero;
