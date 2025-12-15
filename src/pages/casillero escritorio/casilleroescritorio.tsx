import React from 'react';
import boxImage from '../../assets/Grupo-1640.png';
import HeroBg from '../../assets/HeroBg.png';

const casilleroescritorio = () => {
  return (
       <>
      {/* ====================== MOBILE VERSION (< md) ====================== */}
      <div
        className="md:hidden w-full min-h-screen flex flex-col items-center justify-start pt-8 px-4"
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        
        {/* Green Card Container */}
        <div className="w-full max-w-md bg-[#005c35] rounded-[30px] shadow-2xl overflow-hidden p-8 text-white">
          <h1 className="text-3xl font-bold mb-4 tracking-tight">
            Mi Dirección USA
          </h1>

          <p className="text-sm text-gray-200 mb-8 leading-relaxed opacity-90">
            rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-10 tracking-wide">
            SELECCIONAR
          </button>

          {/* Address Box */}
          <div className="border border-orange-400/80 rounded-xl p-5 bg-[#004d2c]/40 backdrop-blur-sm">
            <div className="space-y-3 font-mono text-sm tracking-wide text-gray-100">
              <div>
                <span className="font-bold text-white block mb-1">CLIENT NAME - XXX</span>
              </div>

              <div className="h-px bg-orange-400/30 w-full my-3"></div>

              <div>
                <p className="uppercase text-xs text-gray-300 leading-snug">
                  ADDRESS LINE 1 - (IS MY ADDRESS, THE WAREHOUSE WHERE THE CLIENT HAVE TO SEND THE PACKAGES IS GOING TO CONSOLIDATE SOMETHING)
                </p>
              </div>

              <div className="h-px bg-orange-400/30 w-full my-3"></div>

              <div>
                <p className="uppercase text-xs text-gray-300">
                  ADDRESS LINE 2 - EXPRESUR (QND THE CLIENT LOCKER ID)
                </p>
              </div>

              <div className="h-px bg-orange-400/30 w-full my-3"></div>

              <div>
                <p className="uppercase text-xs font-bold text-white">
                  CITY - XXX
                </p>
                <p className="uppercase text-xs font-bold text-white">
                  STATE ZIPCODE - XXX
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Box Illustration Below the Card */}
        <div className="w-full max-w-md mt-8 px-6 pb-10">
          <img
            src={boxImage}
            alt="Box Illustration"
            className="w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* ====================== DESKTOP / TABLET VERSION (≥ md) ====================== */}
      <div className="hidden md:block">
        <div
          className="w-full h-[420px] md:h-[496px] px-4 flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${HeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <div className="relative w-full max-w-6xl mx-auto z-10">
          <div className="bg-[#005c35] rounded-[30px] shadow-2xl overflow-hidden relative p-6 sm:p-8 md:p-12 lg:p-16 text-white -mt-40 sm:-mt-56 md:-mt-72 lg:-mt-96">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* LEFT CONTENT */}
              <div className="w-full lg:w-1/2 z-20">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                  Mi Dirección USA
                </h1>
                
                <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed opacity-90">
                  rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
                
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 md:px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-8 md:mb-12 tracking-wide">
                  SELECCIONAR
                </button>
                
                <div className="border border-orange-400/80 rounded-xl p-4 md:p-6 bg-[#004d2c]/30 backdrop-blur-sm relative z-10">
                  <div className="space-y-3 font-mono text-sm tracking-wide text-gray-100">
                    <div>
                      <span className="font-bold text-white block mb-1">CLIENT NAME - XXX</span>
                    </div>
                    
                    <div className="h-px bg-orange-400/30 w-full my-2"></div>
                    
                    <div>
                      <p className="uppercase leading-snug text-xs md:text-sm text-gray-300">
                        ADDRESS LINE 1 - (IS MY ADDRESS, THE WAREHOUSE WHERE THE CLIENT HAVE TO SEND THE PACKAGES IS GOING TO CONSOLIDATE SOMETHING)
                      </p>
                    </div>
                    
                    <div className="h-px bg-orange-400/30 w-full my-2"></div>
                    
                    <div>
                      <p className="uppercase text-xs md:text-sm text-gray-300">
                        ADDRESS LINE 2 - EXPRESUR (QND THE CLIENT LOCKER ID)
                      </p>
                    </div>
                    
                    <div className="h-px bg-orange-400/30 w-full my-2"></div>
                    
                    <div>
                      <p className="uppercase text-xs md:text-sm font-bold text-white">
                        CITY - XXX
                      </p>
                      <p className="uppercase text-xs md:text-sm font-bold text-white">
                        STATE ZIPCODE - XXX
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* RIGHT CONTENT - Illustration */}
              <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-6 lg:mt-0">
                <div className="relative z-20 transform scale-90 sm:scale-100 md:scale-110 lg:scale-125 translate-y-6 md:translate-y-12 lg:translate-y-20 lg:translate-x-8">
                  <img
                    src={boxImage}
                    alt="Box Illustration"
                    className="w-full max-w-lg object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-32"></div>
      </div>
    </>
  );
};

export default casilleroescritorio;