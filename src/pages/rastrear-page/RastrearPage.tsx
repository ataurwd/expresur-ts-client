import React, { useState } from "react";
import TrackingImage from "../../assets/rastrear-page-banner-image.png";
import HeroBg from "../../assets/HeroBg.png";

const steps = [
  { label: 'Order Placed', desc: 'Your order has been placed' },
  { label: 'Order Confirmed', desc: 'Order confirmed by seller' },
  { label: 'Packing & Handover', desc: 'Items packed & handed over' },
  { label: 'In Transit', desc: 'Shipment on the way' },
  { label: 'Out for Delivery', desc: 'Package out for delivery' },
  { label: 'Delivered', desc: 'Successfully delivered' },
];

const RastrearPage: React.FC = () => {
  const [currentStep] = useState(4); // Index 4 = Out for Delivery

  return (
    <div className="w-full bg-white">
      {/* SECTION 1: HERO */}
      <section 
        className="relative w-full overflow-hidden flex items-center"
        style={{
          background: `linear-gradient(to right, #054a29 0%, #0a6b3d 45%, #d4b483 100%)`,
          minHeight: "800px" 
        }}
      >
        <div className="max-w-[1440px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
          {/* Left Side */}
          <div className="text-white z-10">
            <h1 className="text-6xl lg:text-[75px] font-bold leading-[1.1] mb-8">
              Package Tracking<br />
              is Easy with<br />
              Order Number
            </h1>
            
            <div className="max-w-[450px] space-y-4">
              <input 
                type="text" 
                placeholder="Número de rastreo"
                className="w-full bg-[#527d63] border border-white/20 rounded-lg px-6 py-4 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button className="w-full bg-[#f39200] hover:bg-[#d98200] text-white font-bold py-4 rounded-lg tracking-[0.2em] transition-colors">
                RASTREAR
              </button>
            </div>
          </div>

          {/* Right Side: Exact Image Dimensions */}
          <div className="relative flex justify-end">
            <img 
              src={TrackingImage} 
              alt="Truck Illustration" 
              style={{ width: '1008.63px', height: '675px' }}
              className="object-contain max-w-none lg:translate-x-32" 
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: TRACKING PROGRESS (No negative margin) */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto bg-[#046338] rounded-[40px] p-12 lg:p-20 shadow-xl">
          <div className="text-center text-white mb-20">
            <h2 className="text-4xl lg:text-[55px] font-bold mb-4">Order Tracking Progress</h2>
            <p className="text-lg opacity-90">Track Your order status in real-time</p>
          </div>

          {/* Progress Timeline */}
          <div className="relative mb-24 px-10">
            {/* Background Connector Line */}
            <div className="absolute top-[10px] left-[10%] right-[10%] h-[2px] bg-white/30 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-12 relative z-10">
              {steps.map((step, index) => {
                const isCompletedOrCurrent = index <= currentStep;
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    {/* The Dot */}
                    <div className="mb-6">
                      <div className={`w-5 h-5 rounded-full border-2 border-white transition-colors duration-500 ${isCompletedOrCurrent ? 'bg-[#f39200] border-[#f39200]' : 'bg-white'}`} />
                    </div>
                    {/* Labels */}
                    <h3 className="text-white font-bold text-lg mb-2">{step.label}</h3>
                    <p className="text-white/70 text-sm max-w-[150px]">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* White Status Card */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="flex items-center gap-6">
              {/* Checkbox Icon */}
              <div className="bg-[#f39200] w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-[#046338] text-2xl font-bold">Current Status</p>
                <p className="text-[#046338] text-4xl lg:text-5xl font-black">Out for Delivery</p>
              </div>
            </div>

            {/* Percentage Pill */}
            <div className="bg-[#046338] text-white px-12 py-6 rounded-2xl flex items-center gap-3">
              <span className="text-5xl font-black">80%</span>
              <span className="text-sm font-bold tracking-widest uppercase opacity-80 mt-2">Complete</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RastrearPage;