import React from "react";
import HeroBg from "../../assets/HeroBg.png";

const Contact = () => {
  return (
    <>
      {/* ================= MOBILE VERSION ================= */}
      <section
        className="md:hidden w-full pt-12 pb-24 px-6"
        style={{
          backgroundImage: `linear-gradient(90deg, #0b5b39 0%, #8fc6b4 45%, #f5b370 100%), url(${HeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-md mx-auto">

          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Contáctenos
            </h2>
            <p className="text-white text-base leading-relaxed">
              Si deseas información, solicitar un servicio o realizar una consulta,
              llena el formulario y te responderé lo antes posible. Trabajo con
              rapidez, profesionalidad y total seguridad para ofrecerte la mejor
              experiencia posible.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Nombre Completo"
              className="w-full px-6 py-4 bg-green-800 border-2 border-orange-500  rounded-3xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400"
              required
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-6 py-4 bg-green-800 border-2 border-orange-500 rounded-3xl  text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400"
              required
            />

            <input
              type="tel"
              placeholder="Número de teléfono"
              className="w-full px-6 py-4 bg-green-800 border-2 border-orange-500 rounded-3xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400"
            />

            <input
              type="text"
              placeholder="Asunto del mensaje"
              className="w-full px-6 py-4 bg-green-800 border-2 border-orange-500 rounded-3xl  text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400"
              required
            />

            <textarea
              placeholder="Escribe aquí tu mensaje..."
              rows={5}
              className="w-full px-6 py-4 bg-green-800 border-2 border-orange-500 rounded-3xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400 resize-none"
              required
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full py-4 bg-orange-500 text-white font-extrabold text-lg rounded-3xl  hover:bg-orange-600 transition shadow-xl uppercase tracking-wider"
            >
              ENVIAR MENSAJE
            </button>
          </form>

        </div>
      </section>

      {/* ================= DESKTOP VERSION (UNCHANGED) ================= */}
      <div
        className="hidden md:block w-full h-[496px] px-4 flex items-center justify-center relative"
        style={{
          backgroundImage: `linear-gradient(90deg, #0b5b39 0%, #8fc6b4 45%, #f5b370 100%), url(${HeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="hidden md:block w-full px-4 -mt-72 lg:-mt-96">
        <div className="max-w-3xl lg:max-w-5xl mx-auto bg-green-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 lg:p-12">
          
          <div className="text-center mb-8">
            <h2 className="text-7xl font-bold text-white mb-3">
              Contáctenos
            </h2>
            <p className="text-white text-base max-w-3xl mx-auto leading-relaxed">
              Si deseas información, solicitar un servicio o realizar una consulta,
              llena el formulario y te responderé lo antes posible.
            </p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <input className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-xl text-white" placeholder="Nombre Completo" />
              <input className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-xl text-white" placeholder="Correo electrónico" />
              <input className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-xl text-white" placeholder="Número de teléfono" />
            </div>
            <div className="space-y-4">
              <input className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-xl text-white" placeholder="Asunto del mensaje" />
              <textarea className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-2xl text-white resize-none h-48" placeholder="Escribe aquí tu mensaje..." />
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button className="px-12 py-4 bg-orange-500 text-white rounded-2xl font-semibold text-lg  w-64">
                ENVIAR MENSAJE
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block h-32"></div>
    </>
  );
};

export default Contact;
