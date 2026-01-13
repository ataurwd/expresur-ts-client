// import React from 'react';
// import boxImage from '../../assets/Grupo-1640.png';
// import HeroBg from '../../assets/HeroBg.png';

// const casilleroescritorio = () => {
//   return (
//        <>
//       {/* ====================== MOBILE VERSION (< md) ====================== */}
//       <div
//         className="md:hidden w-full min-h-screen flex flex-col items-center justify-start pt-8 px-4"
//         style={{
//           backgroundImage: `linear-gradient(90deg, #0b5b39 0%, #8fc6b4 45%, #f5b370 100%), url(${HeroBg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
        
//         {/* Green Card Container */}
//         <div className="w-full max-w-md bg-[#005c35] rounded-[30px] shadow-2xl overflow-hidden p-8 text-white">
//           <h1 className="text-3xl font-bold mb-4 tracking-tight">
//             Mi Dirección USA
//           </h1>

//           <p className="text-sm text-gray-200 mb-8 leading-relaxed opacity-90">
//             rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
//           </p>

//           <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-10 tracking-wide">
//             SELECCIONAR
//           </button>

//           {/* Address Box */}
//           <div className="border border-orange-400/80 rounded-xl p-5 bg-[#004d2c]/40 backdrop-blur-sm">
//             <div className="space-y-3 font-mono text-sm tracking-wide text-gray-100">
//               <div>
//                 <span className="font-bold text-white block mb-1">CLIENT NAME - XXX</span>
//               </div>

//               <div className="h-px bg-orange-400/30 w-full my-3"></div>

//               <div>
//                 <p className="uppercase text-xs text-gray-300 leading-snug">
//                   ADDRESS LINE 1 - (IS MY ADDRESS, THE WAREHOUSE WHERE THE CLIENT HAVE TO SEND THE PACKAGES IS GOING TO CONSOLIDATE SOMETHING)
//                 </p>
//               </div>

//               <div className="h-px bg-orange-400/30 w-full my-3"></div>

//               <div>
//                 <p className="uppercase text-xs text-gray-300">
//                   ADDRESS LINE 2 - EXPRESUR (QND THE CLIENT LOCKER ID)
//                 </p>
//               </div>

//               <div className="h-px bg-orange-400/30 w-full my-3"></div>

//               <div>
//                 <p className="uppercase text-xs font-bold text-white">
//                   CITY - XXX
//                 </p>
//                 <p className="uppercase text-xs font-bold text-white">
//                   STATE ZIPCODE - XXX
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Box Illustration Below the Card */}
//         <div className="w-full max-w-md mt-8 px-6 pb-10">
//           <img
//             src={boxImage}
//             alt="Box Illustration"
//             className="w-full object-contain drop-shadow-2xl"
//           />
//         </div>
//       </div>

//       {/* ====================== DESKTOP / TABLET VERSION (≥ md) ====================== */}
//       <div className="hidden md:block">
//         <div
//           className="w-full h-[420px] md:h-[496px] px-4 flex items-center justify-center relative"
//           style={{
//             backgroundImage: `linear-gradient(90deg, #0b5b39 0%, #8fc6b4 45%, #f5b370 100%), url(${HeroBg})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//           }}
//         />

//         <div className="relative w-full max-w-6xl mx-auto z-10">
//           <div className="bg-[#005c35] rounded-[30px] shadow-2xl overflow-hidden relative p-6 sm:p-8 md:p-12 lg:p-16 text-white -mt-40 sm:-mt-56 md:-mt-72 lg:-mt-96">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              
//               {/* LEFT CONTENT */}
//               <div className="w-full lg:w-1/2 z-20">
//                 <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">
//                   Mi Dirección USA
//                 </h1>
                
//                 <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed opacity-90">
//                   rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
//                 </p>
                
//                 <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 md:px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-8 md:mb-12 tracking-wide">
//                   SELECCIONAR
//                 </button>
                
//                 <div className="border border-orange-400/80 rounded-xl p-4 md:p-6 bg-[#004d2c]/30 backdrop-blur-sm relative z-10">
//                   <div className="space-y-3 font-mono text-sm tracking-wide text-gray-100">
//                     <div>
//                       <span className="font-bold text-white block mb-1">CLIENT NAME - XXX</span>
//                     </div>
                    
//                     <div className="h-px bg-orange-400/30 w-full my-2"></div>
                    
//                     <div>
//                       <p className="uppercase leading-snug text-xs md:text-sm text-gray-300">
//                         ADDRESS LINE 1 - (IS MY ADDRESS, THE WAREHOUSE WHERE THE CLIENT HAVE TO SEND THE PACKAGES IS GOING TO CONSOLIDATE SOMETHING)
//                       </p>
//                     </div>
                    
//                     <div className="h-px bg-orange-400/30 w-full my-2"></div>
                    
//                     <div>
//                       <p className="uppercase text-xs md:text-sm text-gray-300">
//                         ADDRESS LINE 2 - EXPRESUR (QND THE CLIENT LOCKER ID)
//                       </p>
//                     </div>
                    
//                     <div className="h-px bg-orange-400/30 w-full my-2"></div>
                    
//                     <div>
//                       <p className="uppercase text-xs md:text-sm font-bold text-white">
//                         CITY - XXX
//                       </p>
//                       <p className="uppercase text-xs md:text-sm font-bold text-white">
//                         STATE ZIPCODE - XXX
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* RIGHT CONTENT - Illustration */}
//               <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-6 lg:mt-0">
//                 <div className="relative z-20 transform scale-90 sm:scale-100 md:scale-110 lg:scale-125 translate-y-6 md:translate-y-12 lg:translate-y-20 lg:translate-x-8">
//                   <img
//                     src={boxImage}
//                     alt="Box Illustration"
//                     className="w-full max-w-lg object-contain drop-shadow-2xl"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="h-32"></div>
//       </div>
//     </>
//   );
// };

// export default casilleroescritorio;



import React from 'react';

// Import your images here
import boxHero from '../../assets/imges2/Grupo 1648.png';
import step01Img from '../../assets/imges2/Group 3.png';
import step02Img from '../../assets/imges2/Gemini_Generated_Image_t769rgt769rgt769-removebg-preview 1.png';
import step03Img from '../../assets/imges2/Grupo 1648.png';
import aliExpressLogo from '../../assets/imges2/64px-Aliexpress_logo.svg.png';
import amazonLogo from '../../assets/imges2/64px-Amazon_logo.svg.png';
import bestbuyLogo from '../../assets/imges2/64px-Best_Buy_Logo.svg 1.png';
import ebayLogo from '../../assets/imges2/64px-EBay_logo.svg.png';
import sheinLogo from '../../assets/imges2/64px-Shein_Logo_2017.svg.png';
import walmartLogo from '../../assets/imges2/64px-Walmart_logo_(2025).svg.png';

// If you are using images for the sentences as well:
// import step01Desc from '../../assets/step01_desc.png'; 
// import step02Desc from '../../assets/step02_desc.png';
// import step03Desc from '../../assets/step03_desc.png';

const FullCasilleroPage = () => {
  return (
    <div className="w-full bg-white min-h-screen font-sans">
      
      {/* ====================== HEADER BANNER SECTION ====================== */}
      <div 
        className="w-full h-[350px] md:h-[500px] flex items-center justify-between px-6 md:px-20 relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, #0b5b39 0%, #207e55 40%, #f7941d 100%)',
        }}
      >
        <div className="z-10">
          <h1 className="text-white text-5xl md:text-8xl font-bold leading-tight tracking-tighter">
            Mi Dirección <br /> USA
          </h1>
        </div>

        <div className="absolute right-0 bottom-0 md:relative md:w-1/2 flex justify-end items-end h-full">
          <img 
            src={boxHero} 
            alt="Hero Illustration" 
            className="w-[250px] md:w-[600px] object-contain transform translate-y-10 md:translate-y-20 translate-x-10"
          />
        </div>
      </div>

      {/* ====================== GREEN INFO SECTION ====================== */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-[#005c35] rounded-[40px] md:rounded-[60px] p-8 md:p-16 text-center text-white shadow-xl">
          
          {/* Top Description (Can be replaced with an <img>) */}
          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed 
              diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi 
              enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea 
              commodo consequat.
            </p>
          </div>

          {/* Call to Action Button */}
          <button className="bg-[#f59a23] hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-xl transition-all mb-20 uppercase text-xs tracking-widest shadow-lg">
            Get Your US Address
          </button>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 mb-20">
            
            {/* Step 01 */}
            <div className="flex flex-col items-center">
              <div className="h-48 md:h-64 flex items-center justify-center mb-6">
                <img src={step01Img} alt="Step 01" className="max-h-full object-contain" />
              </div>
              <h3 className="text-[#f59a23] text-xl font-black mb-2 uppercase">Step 01</h3>
              <p className="text-sm px-4 opacity-90">Shop at any store in the United States.</p>
              {/* If using image for sentence: <img src={step01Desc} className="h-6" /> */}
            </div>

            {/* Step 02 */}
            <div className="flex flex-col items-center">
              <div className="h-48 md:h-64 flex items-center justify-center mb-6">
                <img src={step02Img} alt="Step 02" className="max-h-full object-contain" />
              </div>
              <h3 className="text-[#f59a23] text-xl font-black mb-2 uppercase">Step 02</h3>
              <p className="text-sm px-4 opacity-90">Use your EXPRESUR address at checkout.</p>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col items-center">
              <div className="h-48 md:h-64 flex items-center justify-center mb-6">
                <img src={step03Img} alt="Step 03" className="max-h-full object-contain" />
              </div>
              <h3 className="text-[#f59a23] text-xl font-black mb-2 uppercase">Step 03</h3>
              <p className="text-sm px-4 opacity-90">We receive and register your packages at our warehouse.</p>
            </div>

          </div>

          {/* Logo Strip Container */}
          <div className="bg-white rounded-2xl py-6 md:py-8 px-6 flex items-center justify-center">
            <div className="w-full max-w-5xl flex items-center justify-between gap-4 flex-wrap">
              <img src={ebayLogo} alt="ebay" className="h-8 md:h-10 object-contain" />
              <img src={aliExpressLogo} alt="aliexpress" className="h-8 md:h-10 object-contain" />
              <img src={amazonLogo} alt="amazon" className="h-8 md:h-10 object-contain" />
              <img src={walmartLogo} alt="walmart" className="h-8 md:h-10 object-contain" />
              <img src={sheinLogo} alt="shein" className="h-8 md:h-10 object-contain" />
              <img src={bestbuyLogo} alt="bestbuy" className="h-8 md:h-10 object-contain" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FullCasilleroPage;