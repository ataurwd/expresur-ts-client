import React from "react";
import mapIllustration from "../../assets/pickup-map.png";

const PickupServiceCard: React.FC = () => {
  return (
    <section className="w-full flex justify-center p-6">

      {/* Fixed dimension container */}
      <div
        className="bg-[#0f6b3f] text-white rounded-3xl shadow-xl overflow-hidden"
        style={{ width: "1673px", height: "1732px" }}
      >

        {/* Title */}
        <h1 className="text-5xl font-semibold text-orange-400 text-center mt-14">
          Vamos a tu casa u oficina
        </h1>

        <div className="w-full flex justify-center mt-6 mb-12">
          <div className="h-[2px] w-[400px] bg-orange-400 rounded-full"></div>
        </div>

        {/* HOW IT WORKS */}
        <h2 className="text-center text-3xl font-semibold tracking-widest mb-14">
          CÓMO FUNCIONA:
        </h2>

        <div className="grid grid-cols-4 gap-12 px-24 text-center">

          {/* Step blocks */}
          {[
            { num: "01", text: "Solicitas\nla recogida" },
            { num: "02", text: "Confirmamos\nhorario" },
            { num: "03", text: "Vamos a\ntu dirección" },
            { num: "04", text: "Procesamos\ny enviamos" },
          ].map((step) => (
            <div key={step.num} className="flex flex-col items-center">
              <h3 className="text-6xl font-light mb-4">{step.num}</h3>
              <div className="h-4 w-4 bg-orange-400 rounded-full mb-4"></div>
              <p className="text-lg whitespace-pre-line leading-tight">{step.text}</p>
            </div>
          ))}

        </div>

        {/* Areas box */}
        <div className="mx-24 mt-24 bg-[#0c5c36] border-2 border-orange-400 rounded-2xl p-10 flex items-center gap-10">

          <div className="flex-1">
            <h3 className="text-3xl font-semibold mb-4">ÁREAS:</h3>

            <ul className="grid grid-cols-2 gap-3 text-xl">
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Miami</li>
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Hialeah</li>
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Homestead</li>
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Doral</li>
              <li className="flex items-center gap-2"><span className="text-orange-400">•</span> Kendall</li>
            </ul>
          </div>

          <div className="w-[300px]">
            <img
              src={mapIllustration}
              className="w-full h-full object-contain"
              alt="map"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="mt-20 flex justify-around text-3xl font-medium">
          <p>+ Comodidad</p>
          <p>+ Ahorro de tiempo</p>
          <p>+ Seguridad</p>
        </div>

      </div>
    </section>
  );
};

export default PickupServiceCard;
