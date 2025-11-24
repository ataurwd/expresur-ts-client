import React, { useState } from 'react';
// Note: In a real application, you would import your illustration like this:
// import TrackingIllustration from './TrackingIllustration.svg'; 

interface PackageTrackingFormProps {
  onTrack: (trackingNumber: string, email: string) => void;
}

const PackageTrackingForm: React.FC<PackageTrackingFormProps> = ({ onTrack }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrack(trackingNumber, email);
    // Add form validation logic here before calling onTrack
  };

  // --- Utility Component for Illustration Placeholder ---
  // Replaces the complex truck and phone illustration
  const TrackingIllustrationPlaceholder: React.FC = () => (
    <div className="w-full h-auto flex justify-center items-center py-8">
      {/*  */}
      <div className="w-11/12 max-w-lg h-64 bg-gray-900/10 border border-dashed border-gray-900/30 rounded-lg flex items-center justify-center text-sm text-gray-800/80">
        Tracking Illustration Placeholder (Truck and Phone with Map)
      </div>
    </div>
  );
  // --- End Utility Component ---

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div 
        // Approximate background gradient: from-green-600 to-orange-500
        className="w-full max-w-md h-auto rounded-xl shadow-2xl overflow-hidden 
                   bg-gradient-to-b from-green-700 via-orange-500 to-orange-600 p-8 md:p-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight" style={{ 
            // Applying a text shadow for better contrast, similar to the image
            textShadow: '0 2px 4px rgba(0,0,0,0.5)' 
          }}>
            Package Tracking <br /> is Easy with <br /> **Order Number**
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tracking Number Field */}
          <input
            type="text"
            placeholder="Número de rastreo"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-full p-4 rounded-full border-2 border-white/50 text-gray-800 placeholder-gray-500 text-lg focus:ring-4 focus:ring-green-400 focus:border-green-400 transition duration-300 shadow-md"
            required
          />

          {/* Email Field */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-full border-2 border-white/50 text-gray-800 placeholder-gray-500 text-lg focus:ring-4 focus:ring-green-400 focus:border-green-400 transition duration-300 shadow-md"
            // Note: Email is optional for tracking in some systems, set required based on your need
            // required
          />

          {/* Illustration Placeholder */}
          {/* This is where the complex isometric illustration would sit, positioned visually before the button */}
          <TrackingIllustrationPlaceholder />
          
          {/* RASTREAR (Track) Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl text-2xl font-bold uppercase 
                       bg-green-800 hover:bg-green-900 text-white shadow-xl 
                       transition duration-300 ease-in-out transform hover:scale-[1.02]"
          >
            RASTREAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default PackageTrackingForm;