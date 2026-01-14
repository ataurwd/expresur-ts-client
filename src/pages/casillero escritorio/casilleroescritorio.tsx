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



// import React from 'react';

// // Import your images here
// import boxHero from '../../assets/imges2/Grupo 1648.png';
// import step01Img from '../../assets/imges2/Group 3.png';
// import step02Img from '../../assets/imges2/Gemini_Generated_Image_t769rgt769rgt769-removebg-preview 1.png';
// import step03Img from '../../assets/imges2/Grupo 1648.png';
// import aliExpressLogo from '../../assets/imges2/64px-Aliexpress_logo.svg.png';
// import amazonLogo from '../../assets/imges2/64px-Amazon_logo.svg.png';
// import bestbuyLogo from '../../assets/imges2/64px-Best_Buy_Logo.svg 1.png';
// import ebayLogo from '../../assets/imges2/64px-EBay_logo.svg.png';
// import sheinLogo from '../../assets/imges2/64px-Shein_Logo_2017.svg.png';
// import walmartLogo from '../../assets/imges2/64px-Walmart_logo_(2025).svg.png';

// const FullCasilleroPage = () => {
//   return (
//     <div className="w-full bg-white min-h-screen font-sans">

//       {/* ====================== HEADER BANNER SECTION ====================== */}
//       <div 
//         className="w-full h-[350px] md:h-[500px] flex items-center justify-between px-6 md:px-20 relative overflow-hidden"
//         style={{
//           background: 'linear-gradient(90deg, #0b5b39 0%, #207e55 40%, #f7941d 100%)',
//         }}
//       >
//         <div className="z-10">
//           <h1 className="text-white text-5xl md:text-8xl font-bold leading-tight tracking-tighter">
//             Mi Dirección <br /> USA
//           </h1>
//         </div>

//         <div className="absolute right-0 bottom-0 md:relative md:w-1/2 flex justify-end items-end h-full">
//           <img 
//             src={boxHero} 
//             alt="Hero Illustration" 
//             className="w-[250px] md:w-[600px] object-contain transform translate-y-10 md:translate-y-20 translate-x-10"
//           />
//         </div>
//       </div>

//       {/* ====================== GREEN INFO SECTION ====================== */}
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="bg-[#005c35] rounded-[40px] md:rounded-[60px] p-8 md:p-16 text-center text-white shadow-xl">

//           {/* Top Description (Can be replaced with an <img>) */}
//           <div className="max-w-4xl mx-auto mb-10">
//             <p className="text-sm md:text-base leading-relaxed opacity-90">
//               rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed 
//               diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi 
//               enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea 
//               commodo consequat.
//             </p>
//           </div>

//           {/* Call to Action Button */}
//           <button className="bg-[#f59a23] hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-xl transition-all mb-20 uppercase text-xs tracking-widest shadow-lg">
//             Get Your US Address
//           </button>

//           {/* Steps Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 mb-20">

//             {/* Step 01 */}
//             <div className="flex flex-col items-center">
//               <div className="h-48 md:h-64 flex items-center justify-center mb-6">
//                 <img src={step01Img} alt="Step 01" className="max-h-full object-contain" />
//               </div>
//               <h3 className="text-[#f59a23] text-xl font-black mb-2 uppercase">Step 01</h3>
//               <p className="text-sm px-4 opacity-90">Shop at any store in the United States.</p>
//               {/* If using image for sentence: <img src={step01Desc} className="h-6" /> */}
//             </div>

//             {/* Step 02 */}
//             <div className="flex flex-col items-center">
//               <div className="h-48 md:h-64 flex items-center justify-center mb-6">
//                 <img src={step02Img} alt="Step 02" className="max-h-full object-contain" />
//               </div>
//               <h3 className="text-[#f59a23] text-xl font-black mb-2 uppercase">Step 02</h3>
//               <p className="text-sm px-4 opacity-90">Use your EXPRESUR address at checkout.</p>
//             </div>

//             {/* Step 03 */}
//             <div className="flex flex-col items-center">
//               <div className="h-48 md:h-64 flex items-center justify-center mb-6">
//                 <img src={step03Img} alt="Step 03" className="max-h-full object-contain" />
//               </div>
//               <h3 className="text-[#f59a23] text-xl font-black mb-2 uppercase">Step 03</h3>
//               <p className="text-sm px-4 opacity-90">We receive and register your packages at our warehouse.</p>
//             </div>

//           </div>

//           {/* Logo Strip Container */}
//           <div className="bg-white rounded-2xl py-6 md:py-8 px-6 flex items-center justify-center">
//             <div className="w-full max-w-5xl flex items-center justify-between gap-4 flex-wrap">
//               <img src={ebayLogo} alt="ebay" className="h-8 md:h-10 object-contain" />
//               <img src={aliExpressLogo} alt="aliexpress" className="h-8 md:h-10 object-contain" />
//               <img src={amazonLogo} alt="amazon" className="h-8 md:h-10 object-contain" />
//               <img src={walmartLogo} alt="walmart" className="h-8 md:h-10 object-contain" />
//               <img src={sheinLogo} alt="shein" className="h-8 md:h-10 object-contain" />
//               <img src={bestbuyLogo} alt="bestbuy" className="h-8 md:h-10 object-contain" />
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FullCasilleroPage;


import React, { useState } from 'react';

// Assets from your provided paths
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

// Component name MUST start with an Uppercase letter to use Hooks
const CasilleroEscritorio = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-full bg-white min-h-screen font-sans overflow-x-hidden relative">

      {/* ====================== POPUP MODAL ====================== */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          ></div>

          <div className="bg-white w-full max-w-md rounded-[30px] p-8 shadow-2xl z-10 relative border-t-8 border-[#f7941d]">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-[#005c35] mb-2 text-center">Virtual Locker</h2>
            <p className="text-center text-gray-500 text-sm mb-6">Complete the form to get your address</p>

            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#005c35]" />
              <input type="text" placeholder="Address Line 1" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#005c35]" />
              <input type="text" placeholder="Address Line 2" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#005c35]" />

              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="City" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#005c35]" />
                <input type="text" placeholder="State" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#005c35]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Zip Code" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#005c35]" />
                <input type="text" placeholder="Phone Number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#005c35]" />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f7941d] text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg uppercase tracking-widest mt-2"
              >
                Create Locker
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================== DESIGN CONTENT ====================== */}
      <div
        className="w-full h-[420px] sm:h-[480px] md:h-[560px] lg:h-[640px] flex items-center justify-between px-4 sm:px-8 md:px-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(90deg, #0b5b39 0%, #207e55 45%, #f7941d 100%)' }}
      >
        <div className="z-10 mt-[-30px] sm:mt-[-20px]">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[96px] font-extrabold leading-tight tracking-tight">
            Mi Dirección <br /> USA
          </h1>
        </div>
        <div className="absolute right-0 bottom-[-10px] sm:bottom-[-20px] md:right-8 md:bottom-[-40px] z-20 pointer-events-none">
          <img src={boxHero} alt="Hero" className="max-w-full w-[220px] sm:w-[320px] md:w-[540px] lg:w-[720px] xl:w-[820px] object-contain drop-shadow-2xl" />
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#005c35] rounded-[40px] md:rounded-[50px] p-10 md:p-20 text-center text-white shadow-2xl relative mt-16">
          <p className="max-w-4xl mx-auto mb-12 text-base sm:text-lg md:text-xl leading-relaxed font-light">
            rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </p>

          <div className="flex justify-center mb-24">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-[#f7941d] hover:bg-orange-500 text-white font-bold py-4 px-14 sm:px-16 md:px-20 rounded-xl transition-all uppercase text-sm sm:text-base md:text-lg tracking-widest shadow-lg"
            >
              Get Your US Address
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24 items-start">
            <div className="flex flex-col items-center text-center px-4">
              <img src={step01Img} alt="Step 1" className="h-48 sm:h-56 md:h-64 lg:h-72 object-contain mb-6" />
              <h3 className="text-[#f7941d] text-3xl sm:text-3xl md:text-4xl font-extrabold mb-3">Step 01</h3>
              <p className="text-base sm:text-lg md:text-lg font-medium">Shop at any store in the US.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <img src={step02Img} alt="Step 2" className="h-48 sm:h-56 md:h-64 lg:h-72 object-contain mb-6" />
              <h3 className="text-[#f7941d] text-3xl sm:text-3xl md:text-4xl font-extrabold mb-3">Step 02</h3>
              <p className="text-base sm:text-lg md:text-lg font-medium">Use your EXPRESUR address.</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <img src={step03Img} alt="Step 3" className="h-48 sm:h-56 md:h-64 lg:h-72 object-contain mb-6" />
              <h3 className="text-[#f7941d] text-3xl sm:text-3xl md:text-4xl font-extrabold mb-3">Step 03</h3>
              <p className="text-base sm:text-lg md:text-lg font-medium">We receive your packages.</p>
            </div>
          </div>


          {/* Logo Strip Container */}
          <div className="bg-white rounded-2xl py-6 px-6 md:px-12 lg:px-16 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] flex items-center justify-center gap-4 md:gap-6 flex-nowrap overflow-x-auto w-full max-w-screen-xl mx-auto mb-8">
            <img src={ebayLogo} alt="ebay" className="flex-shrink-0 h-6 md:h-8 lg:h-10 object-contain transition-transform hover:scale-105" />
            <img src={aliExpressLogo} alt="aliexpress" className="flex-shrink-0 h-6 md:h-8 lg:h-10 object-contain transition-transform hover:scale-105" />
            <img src={amazonLogo} alt="amazon" className="flex-shrink-0 h-6 md:h-8 lg:h-10 object-contain transition-transform hover:scale-105" />
            <img src={walmartLogo} alt="walmart" className="flex-shrink-0 h-6 md:h-8 lg:h-10 object-contain transition-transform hover:scale-105" />
            <img src={sheinLogo} alt="shein" className="flex-shrink-0 h-6 md:h-8 lg:h-10 object-contain transition-transform hover:scale-105" />
            <img src={bestbuyLogo} alt="bestbuy" className="flex-shrink-0 h-6 md:h-8 lg:h-10 object-contain transition-transform hover:scale-105" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default CasilleroEscritorio;