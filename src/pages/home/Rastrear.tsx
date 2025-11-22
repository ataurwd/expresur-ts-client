import React from "react";
import rastrearImg from "../../assets/rastrear.png";

const Rastrear = () => {
  return (
    <div className="w-full" style={{ maxWidth: "1673px", margin: "0 auto" }}>
      <section
        className="
          w-full
          px-6 lg:px-20
         lg:py-20
          grid grid-cols-1 lg:grid-cols-2
          gap-12 lg:gap-20
        "
      >
        {/* LEFT CONTENT */}
        <div className="order-2 lg:order-1 flex flex-col justify-start">
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-semibold text-orange-500 leading-tight">
            Rastrear paquete
          </h1>

          {/* TEXT WITH CLEAN GAPS */}
          <div className="mt-6 space-y-4 max-w-md">
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              rápidos, económicos y seguros Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.
            </p>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla
              facilisis at vero eros et accumsan et iusto odio dignissim.
            </p>
          </div>

          {/* INPUT + BUTTON */}
          <div className="mt-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-6">
            <input
              type="text"
              placeholder="Número de rastreo"
              className="
                w-full lg:w-96
                px-6 py-4
                border border-gray-300
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-orange-400
                transition-all duration-200
              "
            />

            <button className="
              w-full lg:w-auto 
              px-10 py-4 
              bg-green-600 text-white 
              font-bold rounded-lg 
              hover:bg-green-700 
              active:scale-95 
              transition-all shadow-lg
            ">
              RASTREAR
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE (kept EXACT same size) */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end ">
          <img
            src={rastrearImg}
            alt="Rastrear paquete"
            className="
              w-[400px] max-w-[1350px]
              h-auto
              lg:w-[1350px] lg:h-[900px]
              object-contain drop-shadow-2xl ml-10
            "
          />
        </div>
      </section>
    </div>
  );
};

export default Rastrear;
