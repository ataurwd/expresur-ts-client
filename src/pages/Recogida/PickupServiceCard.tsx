import React from "react";
import mapIllustration from "../../assets/pickup-map.png"; // update path

const PickupServiceCard: React.FC = () => {
  return (
    <section className=" w-full flex justify-center py-12 px-4 bg-transparent">
      
      {/* FIXED WIDTH CARD */}
      <div
        className="z-10 mt-[-5%] bg-[#0f6b3f] text-white rounded-[30px] shadow-2xl px-16 py-14 overflow-hidden"
        style={{ width: "1673px" }}   //  <<<<<< FIXED WIDTH
      >

        {/* Title */}
        <h1 className="text-[56px] font-semibold text-orange-400 text-center leading-tight">
          Vamos a tu casa u oficina
        </h1>

        {/* Divider */}
        <div className="w-full flex justify-center mt-8 mb-12">
          <div className="h-[3px] w-[800px] bg-orange-400 rounded-full"></div>
        </div>

        {/* Subtitle */}
        <h2 className="text-center text-[30px] tracking-widest mb-12">
          CÓMO FUNCIONA:
        </h2>

        {/* Timeline */}
        <div className="relative mb-16 px-10">

          {/* Horizontal line */}
          <div className="absolute left-32 right-32 top-[110px] h-[4px] bg-orange-400 rounded-full"></div>

          {/* Steps */}
          <div className="grid grid-cols-4 text-center gap-10">

            {[
              { num: "01", text: "Solicitas la recogida" },
              { num: "02", text: "Confirmamos horario" },
              { num: "03", text: "Vamos a tu dirección" },
              { num: "04", text: "Procesamos y enviamos" }
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">

                {/* Number */}
                <div className="text-[90px] font-light mb-4">{step.num}</div>

                {/* Dot */}
                <div className="w-6 h-6 bg-orange-400 rounded-full mb-4 z-10"></div>

                {/* Label */}
                <p className="text-[22px] leading-tight max-w-[250px]">
                  {step.text}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Areas + Image */}
        <div className="bg-[#0c5c36] border-[3px] border-orange-400 rounded-[22px] p-10 flex items-center gap-10 mt-12">

          {/* Areas */}
          <div className="flex-1">
            <h3 className="text-[32px] font-semibold mb-6">ÁREAS:</h3>

            <ul className="grid grid-cols-2 gap-4 text-[22px]">
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Miami</li>
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Hialeah</li>
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Homestead</li>
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Doral</li>
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Kendall</li>
            </ul>
          </div>

          {/* Illustration */}
          <div className="w-[420px] flex-shrink-0">
            <img
              src={mapIllustration}
              alt="map"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-[30px] font-medium flex justify-around">
          <p>+ Comodidad</p>
          <p>+ Ahorro de tiempo</p>
          <p>+ Seguridad</p>
        </div>

      </div>
    </section>
  );
};

export default PickupServiceCard;
