import React, { useState } from "react";
import TrackingImage from "../../assets/rastrear-page-banner-image.png";

const steps = [
  { label: 'Order Placed', desc: 'Your order has been placed' },
  { label: 'Order Confirmed', desc: 'Order confirmed by seller' },
  { label: 'Packing & Handover', desc: 'Items packed & handed over' },
  { label: 'In Transit', desc: 'Shipment on the way' },
  { label: 'Out for Delivery', desc: 'Package out for delivery' },
  { label: 'Delivered', desc: 'Successfully delivered' },
];

const RastrearPage: React.FC = () => {
  const [currentStep] = useState(4);

  return (
    <div className="w-full bg-white">
      {/* SECTION 1: HERO - Improved mobile header spacing & readability */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: `linear-gradient(to right, #054a29 0%, #0a6b3d 45%, #d4b483 100%)`,
          minHeight: "800px",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Text & Form - First on mobile */}
            <div className="text-white order-1 lg:order-1 text-center lg:text-left pt-16 sm:pt-20 lg:pt-0 pb-8 lg:pb-0">
              {/* Improved mobile title: larger, better line height, more breathing room */}
              <h1 className="text-5xl sm:text-6xl lg:text-[75px] font-bold leading-tight mb-8 lg:mb-8 tracking-tight">
                Rastrea tu<br />
                paquete con tu<br />
                número de orden
              </h1>

              <div className="max-w-md mx-auto lg:mx-0 space-y-5">
                <input
                  type="text"
                  placeholder="Número de rastreo"
                  className="w-full bg-[#527d63]/90 backdrop-blur-md border border-white/30 rounded-xl px-8 py-5 text-white placeholder-white/70 text-lg outline-none focus:ring-4 focus:ring-[#f39200]/50 transition-all"
                />
                <button className="w-full bg-[#f39200] hover:bg-[#e08000] active:scale-105 text-white font-bold py-5 rounded-xl tracking-widest transition-all shadow-lg text-lg">
                  RASTREAR
                </button>
              </div>
            </div>

            {/* Truck Image - Below on mobile, balanced spacing */}
            <div className="order-2 lg:order-2 flex justify-center lg:justify-end">
              {/* Desktop: 100% unchanged */}
              <img
                src={TrackingImage}
                alt="Truck Illustration"
                style={{ width: '1008.63px', height: '675px' }}
                className="object-contain max-w-none lg:translate-x-32 hidden lg:block"
              />

              {/* Mobile: Larger truck with balanced top/bottom space */}
              <div className="block lg:hidden w-full flex flex-col justify-center items-center py-12">
                <img
                  src={TrackingImage}
                  alt="Truck Illustration"
                  className="w-full max-w-none"
                  style={{
                    width: '120%',
                    maxWidth: 'none',
                    height: 'auto',
                    marginLeft: '-10%',
                    marginRight: '-10%',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRACKING PROGRESS */}
      <section className="bg-white py-12 lg:py-20 px-6">
        <div className="max-w-[1200px] mx-auto bg-[#046338] rounded-[40px] p-8 lg:p-20 shadow-xl">
          <div className="text-center text-white mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[55px] font-bold mb-4">
              Order Tracking Progress
            </h2>
            <p className="text-base lg:text-lg opacity-90">
              Track Your order status in real-time
            </p>
          </div>

          <div className="mb-16 lg:mb-24">
            {/* Desktop: Unchanged */}
            <div className="hidden lg:block relative px-10">
              <div className="absolute top-[10px] left-[10%] right-[10%] h-[2px] bg-white/30" />
              <div className="grid grid-cols-6 relative z-10">
                {steps.map((step, index) => {
                  const isCompletedOrCurrent = index <= currentStep;
                  return (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <div
                          className={`w-5 h-5 rounded-full border-2 border-white transition-colors duration-500 ${
                            isCompletedOrCurrent ? 'bg-[#f39200] border-[#f39200]' : 'bg-white'
                          }`}
                        />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">{step.label}</h3>
                      <p className="text-white/70 text-sm max-w-[150px]">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Matches screenshot */}
            <div className="block lg:hidden">
              <div className="space-y-10">
                {steps.map((step, index) => {
                  const isPast = index < currentStep;
                  const isCurrent = index === currentStep;

                  return (
                    <div key={index} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white ${
                            isPast || isCurrent ? 'bg-[#f39200]' : 'bg-transparent'
                          }`}
                        >
                          {isPast && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-0.5 h-20 -mt-2 ${
                              index < currentStep ? 'bg-[#f39200]' : 'bg-white/30'
                            }`}
                          />
                        )}
                      </div>

                      <div className="pt-1 pb-8 flex-1">
                        <h3
                          className={`text-lg mb-1 ${
                            isCurrent ? 'text-white font-bold' : 'text-white/90'
                          }`}
                        >
                          {step.label}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 text-center sm:text-left">
                <div className="bg-[#f39200] w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#046338] text-xl sm:text-2xl font-bold">Current Status</p>
                  <p className="text-[#046338] text-3xl sm:text-4xl lg:text-5xl font-black">
                    Out for Delivery
                  </p>
                </div>
              </div>

              <div className="bg-[#046338] text-white px-10 sm:px-12 py-6 rounded-2xl flex flex-col items-center sm:flex-row gap-3">
                <span className="text-5xl font-black">80%</span>
                <span className="text-sm font-bold tracking-widest uppercase opacity-80">
                  Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RastrearPage;