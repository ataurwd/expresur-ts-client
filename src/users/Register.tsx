// src/users/Register.tsx or src/pages/Register.tsx
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaTachometerAlt,
  FaUpload,
  FaTimes,
} from "react-icons/fa";

// Icon wrapper — fixes all react-icons v5+ TypeScript issues (2025 standard)
const Icon: React.FC<{ icon: any; className?: string }> = ({ icon: IconComponent, className }) => {
  return <IconComponent className={className} />;
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    address: "",
    postalCode: "",
    profilePhoto: null as File | null,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "profilePhoto" && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, profilePhoto: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removePhoto = () => {
    setFormData({ ...formData, profilePhoto: null });
    setPhotoPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted:", {
      ...formData,
      profilePhoto: formData.profilePhoto?.name || "None",
    });
  };

  const features = [
    {
      icon: FaTachometerAlt,
      title: "42% Faster Delivery",
      desc: "AI-powered route optimization",
    },
    {
      icon: FaShieldAlt,
      title: "100% Secure Platform",
      desc: "Bank-grade encryption & compliance",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <Helmet>
        <title>Register | Expresur Logistics</title>
      </Helmet>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#046838]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FA921D]/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#046838]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-black/5 overflow-hidden">

          {/* LEFT: Registration Form */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <div className="max-w-lg mx-auto w-full">
              <div className="mb-10">
                <img
                  src="https://i.ibb.co/7xjs7YjB/Expresur-02-1-removebg-preview.webp"
                  alt="Expresur Logo"
                  className="h-12 lg:h-16 object-contain"
                />
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Welcome to the Future of Logistics
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                Join thousands of businesses delivering smarter and faster.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  {["firstName", "lastName"].map((field) => (
                    <div key={field} className="relative">
                      <input
                        type="text"
                        name={field}
                        required
                        onChange={handleChange}
                        className="peer w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#046838] focus:border-transparent transition-all placeholder-transparent"
                      />
                      <label className="absolute left-5 -top-3 text-sm font-medium text-[#046838] bg-gray-50 px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-[#046838] peer-focus:text-sm">
                        {field === "firstName" ? "First Name" : "Last Name"}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Email & Phone */}
                {["email", "phone"].map((field) => (
                  <div key={field} className="relative">
                    <input
                      type={field === "email" ? "email" : "tel"}
                      name={field}
                      required
                      onChange={handleChange}
                      className="peer w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#046838] focus:border-transparent transition-all placeholder-transparent"
                    />
                    <label className="absolute left-5 -top-3 text-sm font-medium text-[#046838] bg-gray-50 px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-[#046838] peer-focus:text-sm">
                      {field === "email" ? "Business Email" : "Phone Number"}
                    </label>
                  </div>
                ))}

                {/* Username (Optional) */}
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    className="peer w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#046838] focus:border-transparent transition-all placeholder-transparent"
                  />
                  <label className="absolute left-5 -top-3 text-sm font-medium text-[#046838] bg-gray-50 px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-[#046838] peer-focus:text-sm">
                    Username (Optional)
                  </label>
                </div>

                {/* Profile Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-6">
                    {photoPreview ? (
                      <div className="relative group">
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          className="w-20 h-20 rounded-full object-cover ring-4 ring-[#046838]/10 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition shadow-md"
                        >
                          <Icon icon={FaTimes} className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
                        <Icon icon={FaUpload} className="text-gray-400 text-2xl" />
                      </div>
                    )}
                    <input
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleChange}
                      className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-[#046838] file:text-white hover:file:bg-[#035230] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-5">Delivery Address</h3>
                  {["country", "state", "city", "address", "postalCode"].map((field) => (
                    <div key={field} className="relative mb-4">
                      <input
                        type="text"
                        name={field}
                        required
                        onChange={handleChange}
                        className="peer w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#046838] focus:border-transparent transition-all placeholder-transparent"
                      />
                      <label className="absolute left-5 -top-3 text-sm font-medium text-[#046838] bg-gray-50 px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-[#046838] peer-focus:text-sm">
                        {field === "postalCode"
                          ? "Postal Code"
                          : field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Password Fields */}
                {["password", "confirmPassword"].map((field) => (
                  <div key={field} className="relative">
                    <input
                      type="password"
                      name={field}
                      required
                      onChange={handleChange}
                      className="peer w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#046838] focus:border-transparent transition-all placeholder-transparent"
                    />
                    <label className="absolute left-5 -top-3 text-sm font-medium text-[#046838] bg-gray-50 px-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-[#046838] peer-focus:text-sm">
                      {field === "password" ? "Create Password" : "Confirm Password"}
                    </label>
                  </div>
                ))}

                {/* Terms */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-5 h-5 text-[#046838] rounded focus:ring-[#046838] focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <span className="text-[#046838] font-medium">Terms of Service</span> and{" "}
                    <span className="text-[#046838] font-medium">Privacy Policy</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#046838] hover:bg-[#035230] text-white font-bold py-5 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Icon icon={FaCheckCircle} className="text-xl" />
                  Create Your Free Account
                </button>
              </form>

              <p className="mt-8 text-center text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="font-bold text-[#046838] hover:text-[#FA921D] transition">
                  Log In
                </a>
              </p>
            </div>
          </div>

          {/* RIGHT: Hero Section */}
          <div className="hidden lg:block relative bg-gradient-to-br from-[#046838] to-[#035230] p-16 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 max-w-lg">
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Join Thousands of <span className="text-[#FA921D]">Smart Businesses</span>
              </h1>
              <p className="text-xl text-green-100 mb-12">
                Real-time tracking, AI-optimized routes, and unbreakable security — all in one platform.
              </p>

              <div className="space-y-10">
                {features.map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="p-4 bg-[#FA921D]/20 backdrop-blur-sm rounded-2xl group-hover:bg-[#FA921D]/30 transition">
                      <Icon icon={item.icon} className="text-3xl text-[#FA921D]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p className="text-green-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-full border-4 border-[#046838] bg-white/20 backdrop-blur-sm shadow-lg"
                      style={{
                        backgroundImage: `url(https://randomuser.me/api/portraits/men/${i + 10}.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-2xl font-bold">5,000+ Happy Customers</p>
                  <p className="text-green-200">From local shops to global enterprises</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;