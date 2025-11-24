import React from "react";
import PricingImg from '../../assets/Grupo-1653.png';

const PricingSection: React.FC = () => {
  return (
    <div className="flex justify-center w-full py-20 bg-white">
      {/* ORANGE BACKGROUND BOX */}
      <div
        style={{
          width: "1600px",
          backgroundColor: "rgba(250,146,29,1)",
          borderRadius: "40px",
          paddingTop: "80px",
          paddingBottom: "120px",
        }}
      >
        {/* TITLE */}
        <div className="text-center">
          <h1
            className="font-avenir font-bold"
            style={{
              fontSize: "60px",
              color: "white",
              letterSpacing: "2px",
            }}
          >
            PRECIOS FLEXIBLES Y TRANSPARENTES
          </h1>

          <p
            className="font-avenir font-medium mt-4"
            style={{
              fontSize: "32px",
              color: "white",
            }}
          >
            diseñados para adaptarse a tus necesidades logísticas
          </p>
        </div>

        {/* CARDS ROW */}
        <div className="flex justify-center gap-16 mt-20 flex-wrap">
          {/* CARD 1 */}
          <div
            className="px-10 pt-10 pb-8 text-center"
            style={{
              width: "350px",
              backgroundColor: "#065F3A",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <div className="flex justify-between items-center">
              <h3
                className="font-bold font-avenir"
                style={{ fontSize: "28px" }}
              >
                PAQUETE <br /> BÁSICO
              </h3>
              <div className="text-white text-3xl">♡</div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "3px",
                backgroundColor: "rgba(250,146,29,1)",
                marginTop: "20px",
                marginBottom: "25px",
              }}
            ></div>

            {/* Price */}
            <p
              className="font-bold"
              style={{ fontSize: "60px", lineHeight: "60px" }}
            >
              8.99
            </p>
            <span className="text-white text-xl">$/LB</span>

            {/* Description */}
            <p className="mt-4" style={{ fontSize: "16px", opacity: 0.9 }}>
              ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
              wisi enim ad minim veniam, quis nostrud
            </p>

            {/* Details */}
            <div className="mt-6 text-[22px] space-y-2">
              <p>Detalle 1</p>
              <p>Detalle 2</p>
              <p>Detalle 3</p>
            </div>

            {/* Button */}
            <button
              className="mt-6 text-[22px] px-10 py-2 rounded-full text-green-800 font-bold"
              style={{
                backgroundColor: "rgba(250,246,29,1)",
              }}
            >
              Solicitar
            </button>
          </div>

          {/* CARD 2 (with your image) */}
          <div
            className="px-10 pt-10 pb-8 text-center"
            style={{
              width: "350px",
              backgroundColor: "#065F3A",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <div className="flex justify-between items-center">
              <h3
                className="font-bold font-avenir"
                style={{ fontSize: "28px" }}
              >
                PAQUETE <br /> PERSONALIZADO
              </h3>
              <div className="text-white text-3xl">♡</div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "3px",
                backgroundColor: "rgba(250,146,29,1)",
                marginTop: "20px",
                marginBottom: "25px",
              }}
            ></div>

            {/* Price */}
            <p
              className="font-bold"
              style={{ fontSize: "60px", lineHeight: "60px" }}
            >
              0.99
            </p>
            <span className="text-white text-xl">$/LB</span>

            {/* IMAGE */}
            <div className="flex justify-center my-6">
              <img
                src={PricingImg}
                alt="Pricing Illustration"
                className="w-40 h-40 object-contain"
              />
            </div>

            {/* Description */}
            <p className="mt-4" style={{ fontSize: "16px", opacity: 0.9 }}>
              ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
              wisi enim ad minim veniam, quis nostrud exer
            </p>

            {/* Button */}
            <button
              className="mt-8 text-[22px] px-10 py-2 rounded-full font-bold text-green-800"
              style={{ backgroundColor: "rgba(250,246,29,1)" }}
            >
              Contactar directo
            </button>
          </div>

          {/* CARD 3 */}
          <div
            className="px-10 pt-10 pb-8 text-center"
            style={{
              width: "350px",
              backgroundColor: "#065F3A",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <div className="flex justify-between items-center">
              <h3
                className="font-bold font-avenir"
                style={{ fontSize: "28px" }}
              >
                PAQUETE <br /> PLUS
              </h3>
              <div className="text-white text-3xl">♡</div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "3px",
                backgroundColor: "rgba(250,146,29,1)",
                marginTop: "20px",
                marginBottom: "25px",
              }}
            ></div>

            {/* Price */}
            <p
              className="font-bold"
              style={{ fontSize: "60px", lineHeight: "60px" }}
            >
              6.99
            </p>
            <span className="text-white text-xl">$/LB</span>

            {/* Description */}
            <p className="mt-4" style={{ fontSize: "16px", opacity: 0.9 }}>
              ismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
              wisi enim ad minim veniam, quis nostrud
            </p>

            {/* Details */}
            <div className="mt-6 text-[22px] space-y-2">
              <p>Detalle 1</p>
              <p>Detalle 2</p>
              <p>Detalle 3</p>
            </div>

            {/* Button */}
            <button
              className="mt-6 text-[22px] px-10 py-2 rounded-full text-green-800 font-bold"
              style={{
                backgroundColor: "rgba(250,246,29,1)",
              }}
            >
              Solicitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
