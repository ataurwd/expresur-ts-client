import React from 'react';

const Contact = () => {
    return (
        <>
            {/* Sección 1: Contenedor Principal - Mantiene la configuración de desktop. */}
            <div className="w-full h-screen md:h-[496px] bg-gradient-to-r from-green-900 via-green-800 to-orange-500 px-4 flex items-center justify-center relative">
                
                {/* Contenedor de contacto MÓVIL (md:hidden) */}
                <div className="absolute inset-0 w-full min-h-screen md:hidden bg-green-900 flex items-start pt-12 justify-center">
                    <div className="w-full max-w-md px-6">
                        
                        <div>
                            {/* Título y descripción (Móvil) */}
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    Contáctenos
                                </h2>
                                <p className="text-white text-base leading-relaxed">
                                    Si deseas información, solicitar un servicio o realizar una consulta, llena el formulario y te responderé lo antes posible. Trabajo con rapidez, profesionalidad y total seguridad para ofrecerte la mejor experiencia posible.
                                </p>
                            </div>

                            {/* Formulario - una sola columna en móvil (Fondo verde oscuro) */}
                            <form className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Nombre Completo"
                                    className="w-full px-6 py-4 bg-green-900 border-2 border-orange-500 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="w-full px-6 py-4 bg-green-900 border-2 border-orange-500 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Número de teléfono"
                                    className="w-full px-6 py-4 bg-green-900 border-2 border-orange-500 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                                />
                                <input
                                    type="text"
                                    placeholder="Asunto del mensaje"
                                    className="w-full px-6 py-4 bg-green-900 border-2 border-orange-500 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
                                    required
                                />
                                <textarea
                                    placeholder="Escribe aquí tu mensaje...."
                                    rows={5}
                                    className="w-full px-6 py-4 bg-green-900 border-2 border-orange-500 rounded-3xl text-white placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-orange-400 transition resize-none"
                                    required
                                />

                                {/* Contenedor del Botón (El color del botón es naranja, pero el fondo sigue siendo verde) */}
                                <div className="pt-4"> 
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-full hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-xl uppercase tracking-wider"
                                    >
                                        ENVIAR MENSAJE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Esta parte es el contenido de escritorio (Tu diseño original intacto) */}
            </div>

            {/* Nueva Sección: Barra inferior oscura visible solo en móvil (md:hidden) */}
            {/* Esta sección simula el footer oscuro pegado al botón */}
            <div className="md:hidden w-full  bg-green-900 py-6 text-center">
             
            </div>

            {/* Sección 2: Tu versión original de escritorio (sin cambios) */}
            <div className="hidden md:block w-full px-4 -mt-72 lg:-mt-96">
                <div className="max-w-3xl lg:max-w-5xl mx-auto bg-green-800/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 lg:p-12">
                    {/* Contenido de escritorio... (Intacto) */}
                    <div className="text-center mb-8">
                        <h2 className="text-7xl font-bold text-white mb-3">
                            Contáctenos
                        </h2>
                        <p className="text-white text-base max-w-3xl mx-auto leading-relaxed">
                            Si deseas información, solicitar un servicio o realizar una consulta, llena el formulario
                            y te responderé lo antes posible. Trabajo con rapidez, profesionalidad y total
                            seguridad para ofrecerte la mejor experiencia posible.
                        </p>
                    </div>

                    {/* Formulario desktop - dos columnas (tu diseño original intacto) */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <input type="text" placeholder="Nombre Completo" className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                            <input type="email" placeholder="Correo electrónico" className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                            <input type="tel" placeholder="Número de teléfono" className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                        </div>
                        <div className="space-y-4">
                            <input type="text" placeholder="Asunto del mensaje" className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                            <textarea placeholder="Escribe aquí tu mensaje..." rows={6} className="w-full px-6 py-4 bg-green-900 border-2 border-orange-400 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none h-48" required />
                        </div>
                        <div className="md:col-span-2 flex justify-center mt-6">
                            <button type="submit" className="px-12 py-4 bg-orange-500 text-white font-semibold text-lg rounded-full hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-xl w-64">
                                ENVIAR MENSAJE
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Espacio extra al final (solo visible en desktop) */}
            <div className="hidden md:block h-32"></div>
        </>
    );
};

export default Contact;