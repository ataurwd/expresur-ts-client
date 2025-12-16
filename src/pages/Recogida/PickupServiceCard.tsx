import React from "react";
import mapIllustration from "../../assets/pickup-map.png";

const PickupServiceCard: React.FC = () => {
  return (
    <section className="w-full  text-white py-16 px-4">
      <div className="max-w-[1673px] bg-[#0B6B3A] mx-auto p-10 rounded-[30px]">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-8xl font-bold leading-tight mb-16">
          Vamos a tu casa <br className="hidden md:block" /> u oficina
        </h2>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Line */}
          {/* Desktop horizontal line */}
          <div className="hidden md:block absolute top-[9px] left-0 right-0 w-[75%] mx-auto h-[2px] bg-[#F4A300]" />

          {/* Mobile vertical line */}
          <div className="block md:hidden absolute top-0 left-[9px] h-full w-[2px] bg-[#F4A300]" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-0 relative">
            {[
              "Solicitas la recogida",
              "Confirmamos horario",
              "Vamos a tu dirección",
              "Procesamos y enviamos",
            ].map((step, index) => {
              const isActive = index === 2;
              return (
                <div
                  key={index}
                  className="flex md:flex-col items-center md:text-center gap-4 md:gap-3"
                >
                  {/* Dot */}
                  <div
                    className={`w-5 h-5 rounded-full z-10 ${
                      isActive ? "bg-white" : "bg-[#F4A300]"
                    }`}
                  />

                  {/* Text */}
                  <p className="text-base md:text-3xl font-semibold max-w-[160px]">
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Box */}
        <div className="relative md:w-[65%] mx-auto border-2 border-[#F4A300] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          {/* Left */}
          <div className="w-full md:w-1/2">
            <h3 className="text-4xl md:text-6xl font-bold mb-6">Áreas</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-lg">
              {["Miami", "Doral", "Kendall", "Hialeah", "Homestead"].map(
                (area) => (
                  <div key={area} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#F4A300]" />
                    <span className=" md:text-3xl">{area}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="xl:relative w-full md:w-1/2 py-10 flex justify-center md:justify-end">
            <img
              src={mapIllustration}
              alt="Map Illustration"
              className="xl:absolute max-w-[420px] w-full h-auto -right-36 -top-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickupServiceCard;
