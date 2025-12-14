import React from "react";
import rastrearImg from "../../assets/rastrear.png";

const Rastrear = () => {
  return (
    <div className="w-full max-w-[1673px] xl:max-w-[1673px] mx-auto">
      <section
        className="
          w-full
          px-6 sm:px-8 md:px-12 xl:px-20
          mt-12 xl:mt-28
          py-6 xl:py-12
          grid grid-cols-1 md:grid-cols-2
          gap-6 md:gap-12 xl:gap-20
          items-start
        "
      >
        {/* LEFT CONTENT (TEXT) */}
        <div className="order-1 md:order-1 flex flex-col justify-start -mt-2 xl:-mt-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-semibold text-orange-500 leading-tight">
            Rastrear paquete
          </h1>

          <div className="mt-5 space-y-4 max-w-full sm:max-w-md xl:max-w-md">
            <p className="text-gray-600 text-sm sm:text-base xl:text-lg leading-relaxed">
              rápidos, económicos y seguros Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>

            <p className="text-gray-600 text-sm sm:text-base xl:text-lg leading-relaxed">
              Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat.
            </p>

            <p className="text-gray-600 text-sm sm:text-base xl:text-lg leading-relaxed">
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla
              facilisis at vero eros et accumsan et iusto odio dignissim.
            </p>
          </div>

          <form className="hidden md:block mt-6 flex flex-col sm:flex-row gap-4 xl:gap-6 items-stretch sm:items-center">
            <label htmlFor="tracking" className="sr-only">
              Número de rastreo
            </label>

            <input
              id="tracking"
              type="text"
              placeholder="Número de rastreo"
              className="
                w-full
                px-5 py-3
                border border-gray-300
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-orange-400
                transition-all duration-200
                text-sm sm:text-base
                xl:w-[420px]
              "
            />

            <button
              type="submit"
              className="
                w-full sm:w-auto
                px-8 py-3
                bg-green-600 text-white
                font-bold rounded-lg
                hover:bg-green-700
                active:scale-95
                transition-all shadow-lg
                text-sm sm:text-base
              "
            >
              RASTREAR
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE (BIGGER IMAGE) */}
        <div className="order-2 md:order-2 flex items-center justify-center h-full">
          <img
            src={rastrearImg}
            alt="Rastrear paquete"
            loading="lazy"
            className="
             w-[130%]
             lg:w-[170%]
              lg:mt-[-20%]
              sm:w-full
              md:w-[700px]
              max-w-none
              object-contain
            "
          />
        </div>
        
      </section>
      
          <form className="p-5 md:hidden mt-[-10%] flex flex-col sm:flex-row gap-4 xl:gap-6 items-stretch sm:items-center">
            <label htmlFor="tracking" className="sr-only">
              Número de rastreo
            </label>

            <input
              id="tracking"
              type="text"
              placeholder="Número de rastreo"
              className="
                w-full
                px-5 py-3
                border border-gray-300
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-orange-400
                transition-all duration-200
                text-sm sm:text-base
                xl:w-[420px]
              "
            />

            <button
              type="submit"
              className="
                w-full sm:w-auto
                px-8 py-3
                bg-green-600 text-white
                font-bold rounded-lg
                hover:bg-green-700
                active:scale-95
                transition-all shadow-lg
                text-sm sm:text-base
              "
            >
              RASTREAR
            </button>
          </form>
    </div>
  );
};

export default Rastrear;
