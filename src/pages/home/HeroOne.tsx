import React from "react";
import HeroImg from "../../assets/Hero1.png";
import HeroImg2 from "../../assets/Hero2.png";
import HeroBg from "../../assets/HeroBg.png";

const HeroOne: React.FC = () => {
  return (
    <section
      className="hero-one w-full bg-gradient-to-b from-[#005f37] to-[#a8cfc0] lg:h-[873px] py-12 lg:py-20 overflow-hidden relative"
      style={{
        backgroundImage: `url(${(HeroBg as any).src ?? HeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">

          {/* LEFT CONTENT (original desktop classes preserved) */}
          <div className="text-white space-y-7 mt-[-25%] ml-14">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[600] leading-tight tracking-tight">
              PROVEEDOR <br />
              DE SERVICIOS <br />
              LOGÍSTICOS
            </h1>

            <p className="max-w-xl text-sm md:text-base text-green-100">
              Soluciones logísticas integrales — transporte, almacenamiento y distribución con
              tecnología para que tu operación fluya.
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-green-900 rounded-full font-semibold shadow-lg hover:opacity-95 transition"
            >
              SOLICITAR COTIZACIÓN
            </button>
          </div>

          {/* RIGHT IMAGES (original desktop classes preserved) */}
          <div className="relative flex justify-center mt-10 md:justify-end" aria-hidden={true}>
            {/* Background HeroImg2 */}
            <img
              src={(HeroImg2 as any).src ?? (HeroImg2 as any)}
              alt="Logistics illustration large"
              className="
                hidden sm:block max-w-none object-cover z-0
                w-[700px] sm:w-[1100px] md:w-[1400px] lg:w-[1700px] xl:w-[2100px] 2xl:w-[2400px]
                mr-[-160px] md:mr-[-380px] lg:mr-[-600px]
              "
            />

            {/* Foreground HeroImg — EXACT FIGMA SIZE */}
            <img
              src={(HeroImg as any).src ?? (HeroImg as any)}
              alt="Logistics detail"
              className=" mr-[-700px]
                hero-foreground absolute z-30 object-contain max-w-none
                w-[1459px] h-[866px]
                left-1/2 transform -translate-x-1/2 sm:left-auto sm:translate-x-0
                sm:right-6 md:right-[-60px] lg:right-[-20px] mb-[-12%]
                bottom-[240px] sm:bottom[-120px] md:bottom[-200px] lg:bottom-[20%]
              "
            />
          </div>

        </div>
      </div>

      {/* MOBILE-ONLY OVERRIDES: these WILL NOT affect desktop (they only run under 768px) */}
      <style>{`
        /* Target small devices: max-width 767px (you can adjust breakpoint if needed) */
        @media (max-width: 767px) {
          /* make the section padding tighter on mobile */
          .hero-one { padding-top: 16px !important; padding-bottom: 16px !important; }

          /* LEFT CONTENT: make text compact and readable and center it */
          .hero-one .text-white {
            margin-top: 0 !important;
            margin-left: 0 !important;
            padding: 12px 6px !important;
            text-align: center;
          }
          .hero-one h1 {
            font-size: 1.6rem !important; /* ~ text-2xl */
            line-height: 1.05 !important;
            letter-spacing: 0 !important;
          }
          .hero-one p {
            font-size: 0.85rem !important; /* slightly larger readable text */
            max-width: 100% !important;
            margin: 0 auto 8px auto !important;
          }
          .hero-one button {
            width: 100% !important;
            padding-left: 14px !important;
            padding-right: 14px !important;
          }

          /* RIGHT IMAGES: stack and make images relative so no absolute overlap */
          .hero-one .relative.flex.justify-center {
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            gap: 12px;
          }

          /* Hide the huge background decorative image (that was hidden on xs via hidden sm:block).
             Instead show a scaled version that won't overflow. */
          .hero-one img.hidden.sm\\:block {
            display: block !important; /* ensure visible if Tailwind hidden/visible conflicts */
            position: static !important;
            width: 86% !important;
            max-width: 420px !important;
            height: auto !important;
            margin: 0 auto !important;
            transform: none !important;
            right: auto !important;
            mr: 0 !important;
          }

          /* Foreground image: make it non-absolute, centered and scaled */
          .hero-one img.hero-foreground {
            position: static !important;
            left: auto !important;
            transform: none !important;
            right: auto !important;
            bottom: auto !important;
            margin: 0 auto !important;
            width: 86% !important;
            max-width: 420px !important;
            height: auto !important;
            object-fit: contain !important;
          }

          /* remove any negative margins that cause horizontal scroll */
          .hero-one img {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }

          /* small fix: ensure grid columns collapse nicely */
          .hero-one .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroOne;
