import React from "react";
import HeroImg from "../../assets/Hero1.png";
import HeroImg2 from "../../assets/Hero2.png";
import HeroBg from "../../assets/HeroBg.png";
import card1img from "../../assets/Grupo-1584.png";
import card2img from "../../assets/card-2.png";
import card3img from "../../assets/card-3.png";
import card4img from "../../assets/card-4.png";
import card5img from "../../assets/card-5.png";

const NueHero: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <section
        className="relative overflow w-full min-h-[70vh] md:min-h-[80vh] bg-gradient-to-b from-[#005f37] to-[#a8cfc0] z-10"
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="mx-auto px-6"
          style={{
            backgroundImage: `url(${HeroImg2})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top right",
            backgroundSize: "contain",
          }}
        >
          <div className="md:flex lg:gap-16 items-center md:pt-32 md:pl-20 pt-10">
            {/* LEFT */}
            <div className="text-white space-y-8 text-center lg:text-left md:w-1/2">
              <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-[123px] font-semibold leading-tight tracking-tight">
                Nuestros <br></br> Servicios
              </h1>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex z-50 flex-col justify-center lg:justify-end w-full md:w-full lg:-mr-[50%] lg:-mb-[10%] md:-mr-[40%] md:-mb-[7%]">
              <img
                src={HeroImg}
                alt="Servicios logísticos"
                className="
                 z-10
                max-w-full
                w-[500px]
                sm:w-[700px]
                md:w-[900px]
                lg:w-[1300px]
                object-contain
                md:my-0 my-10
              "
              />

              <button
                type="button"
                className="mt-10 md:hidden block w-full sm:w-auto px-8 py-4 bg-green-800 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-200"
              >
                SOLICITAR COTIZACIÓN
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-700 md:mx-36 md:py-16 pb-10 p-8 md:space-y-10 space-y-24 md:px-32 rounded-md md:-mt-20 -mt-10 z-30 relative mx-3">
        <h1 className="text-center md:text-6xl text-3xl font-bold text-white">
          Nuestros servicios
        </h1>
        {/* card 1 (image on right) */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center border-2 border-orange-400 md:p-10 p-5 rounded-xl max-w-6xl mx-auto flex-row-reverse">
          <div className="text-white">
            <h1 className="md:text-5xl text-2xl font-extrabold">
              Envíos Nacionales{" "}
            </h1>
            <p className="md:text-3xl my-5 text-2xl font-bold md:text-white text-orange-400">
              Envía dentro de Estados Unidos usando:
            </p>
            <button className="bg-orange-400 rounded-xl mt-5 text-white px-10 py-2">
              Cotizar Envío Internacional
            </button>
          </div>

          <div className="flex justify-end">
            <img className="md:-mr-32 -mr-10 md:mb-0 -mb-16 md:w-full " src={card1img} alt="card-1" />
          </div>
        </div>

        {/* card 2 (image on left) */}
        <div className="md:grid  flex md:grid-cols-2 grid-cols-1 gap-10 items-center border-2 border-orange-400 md:p-10 p-5 rounded-xl max-w-6xl mx-auto flex-col-reverse">
          <div className="flex justify-start">
            <img className="md:-ml-32 -ml-10 md:mb-0 -mb-16 md:w-full " src={card2img} alt="card-2" />
          </div>

          <div className="text-white">
            <h1 className="md:text-5xl text-2xl font-extrabold">
              Envíos Internacionales
            </h1>
            <p className="md:text-3xl my-5 text-2xl font-bold md:text-white text-orange-400">
              Envíos por vía aérea a más de 50 países.
            </p>
            <button className="bg-orange-400 rounded-xl mt-5 text-white px-10 py-2">
              Cotizar Envío a Cuba
            </button>
          </div>
        </div>

        {/* card 3 (image on right) */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center border-2 border-orange-400 p-10 rounded-xl max-w-6xl mx-auto">
          <div className="text-white">
            <h1 className="md:text-5xl text-2xl font-extrabold">
              Envíos a Cuba
            </h1>{" "}
            <p className="text-3xl my-5">Tiempos:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                Aéreo: 10–15 días
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                Marítimo: 20–30 días
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                Express: 3–5 días
              </li>
            </ul>
            <button className="bg-orange-400 rounded-xl mt-5 text-white px-10 py-2">
              Obtener Casillero
            </button>
          </div>

          <div className="flex justify-end">
            <img className="md:-mr-32 -mr-16 md:mb-0 -mb-24 md:w-full  " src={card3img} alt="card-3" />
          </div>
        </div>

        {/* card 4 (image on left) */}
        <div className="md:grid flex md:grid-cols-2 grid-cols-1 gap-10 items-center border-2 border-orange-400 p-10 rounded-xl max-w-6xl mx-auto flex-col-reverse">
          <div className="flex justify-start">
            <img className="md:-ml-32 -ml-10 md:mb-0 -mb-16 md:w-full" src={card4img} alt="card-4" />
          </div>

          <div className="text-white">
            <h1 className="md:text-5xl text-2xl font-extrabold">
              Casillero Virtual
            </h1>
            <p className="md:text-3xl my-5 text-2xl font-bold md:text-white text-orange-400">
              Dirección en Miami para recibir compras online.
            </p>
            <button className="bg-orange-400 rounded-xl mt-5 text-white px-10 py-2">
              Cotizar Envío Nacional
            </button>
          </div>
        </div>

        {/* card 5 (image on right) */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center border-2 border-orange-400 p-10 rounded-xl max-w-6xl mx-auto">
          <div className="text-white">
            <h1 className="md:text-5xl text-2xl font-extrabold">Enviar Dinero</h1>
            <p className="md:text-3xl my-5 text-2xl font-bold md:text-white text-orange-400">Enviar dinero rápido y seguro.</p>
            <button className="bg-orange-400 rounded-xl mt-5 text-white px-10 py-2">
              Enviar Dinero
            </button>
          </div>

          <div className="flex justify-end">
            <img className="md:-mr-32 -mr-14 md:mb-0 -mb-20 md:w-full  " src={card5img} alt="card-5" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NueHero;