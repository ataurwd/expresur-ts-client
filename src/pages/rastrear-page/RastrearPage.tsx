import React, { useState } from "react";
// FIX: Import the image file so the bundler can provide a correct URL.
import TrackingImage from "../../assets/rastrear-page-banner-image.png";
import HeroBg from "../../assets/HeroBg.png";

const RastrearPage: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tracking logic here...
    console.log("Tracking:", trackingNumber, "Email:", email);
  };

  return (
    // Outer Container: Full width, using your custom horizontal gradient
    <div className="min-h-[78vh] bg-cover bg-center" 
        style={{ backgroundImage: `url(${HeroBg})` }}>
      {/* Centered Content Area: Max width set to 1400px */}
      <div className="max-w-[1280px] mx-auto py-10 md:py-20 px-4">
        <div className="flex">
          <div>
            {/* Title Block (Always at the very top on all devices) */}
            <div className="text-center md:text-left pb-20 md:pb-8">
              <h1
                className="text-5xl md:text-[55px] text-white leading-tight"
              >
                Package Tracking <br />
                is Easy with <br />
                Order Number
              </h1>
            </div>

            {/* Main Content Grid: Inputs/Image/Button */}
            <div className="grid md:grid-cols-2 gap-10 items-center justify-center">
              {/* Left Side (Column 1): Inputs and Button */}
              <div className="md:pr-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Input 1: Tracking Number */}
                  <input
                    type="text"
                    placeholder="Número de rastreo"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="
                        w-full lg:w-96 p-2 pl-6 rounded-full border-2 border-[#e68b19] 
                        text-gray-800 placeholder-gray-500 text-lg shadow-md
                        transition duration-300
                    "
                    required
                  />

                  {/* Input 2: Email */}
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                        w-full lg:w-96 p-2 pl-6 rounded-full border-2 border-[#e68b19] 
                        text-gray-800 placeholder-gray-500 text-lg shadow-m
                        transition duration-300
                    "
                  />

                  {/* --- MOBILE ORDER FIX --- */}
                  {/* For mobile, the Button must come *after* the image, so we hide it here. */}
                  <button
                    type="submit"
                    className="
                        hidden md:block 
                        w-full md:w-auto py-3 px-10 mt-6 rounded-full text-xl font-bold uppercase 
                        bg-green-800 hover:bg-green-900 text-white shadow-xl 
                        transition duration-300 ease-in-out transform hover:scale-[1.01]
                    "
                  >
                    RASTREAR
                  </button>
                </form>

                {/* --- MOBILE IMAGE PLACEMENT --- */}
                {/* The image is placed here on mobile, between the form and the final button. */}
                <div className="md:hidden w-full py-8">
                  <img
                    src={TrackingImage}
                    alt="Delivery Truck and Tracking Map Illustration"
                    className="w-full h-auto object-contain max-h-[500px] mx-auto"
                  />
                </div>

                {/* --- MOBILE BUTTON PLACEMENT --- */}
                {/* The button is placed here on mobile, after the image. */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="
                    md:hidden 
                    w-full py-3 mt-6 rounded-full text-xl font-bold uppercase 
                    bg-green-800 hover:bg-green-900 text-white shadow-xl 
                    transition duration-300 ease-in-out transform hover:scale-[1.01]
                "
                >
                  RASTREAR
                </button>
              </div>
            </div>
          </div>

          {/* Right Side (Column 2): Desktop Image/Button */}
          <div className="hidden md:block">
            {/* DESKTOP IMAGE */}
            <img
              src={TrackingImage}
              alt="Delivery Truck and Tracking Map Illustration"
              className="w-full h-auto object-contain max-h-[1100px] mx-auto"
            />
            {/* The desktop button is hidden in the left column */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RastrearPage;
