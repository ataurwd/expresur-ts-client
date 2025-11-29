import React from "react";
import image from '../../assets/Grupo-1640.png'

const CasilleroEscritorio: React.FC = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-green-900 to-orange-300 p-4 md:p-6">
            <div
                className="bg-gradient-to-br from-green-800 to-green-900 text-white rounded-2xl md:rounded-3xl shadow-2xl relative overflow-visible w-full max-w-[1400px]"
                style={{ 
                    minHeight: "492px",
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                    {/* LEFT SECTION */}
                    <div className="flex flex-col justify-center  py-8 md:px-10 md:py-10 lg:px-12">
                        {/* Header with button */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6">
                            <h1 className="text-4xl sm:text-3xl lg:text-4xl font-normal leading-tight">
                                Your US Address
                            </h1>
                            <button className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 transition-all text-white font-bold py-2 px-6 sm:py-2.5 sm:px-8 rounded-full shadow-lg uppercase text-xs tracking-wide whitespace-nowrap self-start sm:self-auto">
                                Seleccionar
                            </button>
                        </div>

                        <p className="text-white font-['Avenir_Next_LT_Pro'] text-[15px] font-medium leading-[18px] tracking-[0px] text-left mb-4 md:mb-5 opacity-90">
                            rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        </p>

                        {/* 2-column input grid - responsive */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <input
                                    key={i}
                                    type="text"
                                    placeholder="Lorem ipsum dolor sit amet,"
                                    className="w-full bg-transparent text-white placeholder-white/70 rounded-full py-2 px-4 sm:py-2.5 sm:px-5 border-2 border-orange-400 focus:border-orange-300 focus:outline-none text-xs transition-all"
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SECTION — IMAGE */}
                    <div className="flex items-center justify-center relative  py-8 lg:px-0 lg:py-0">
                        <img 
                            src={image} 
                            alt="US Address Box Illustration"
                            className="object-contain drop-shadow-2xl w-full h-auto max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
                            style={{ maxHeight: "498.48px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CasilleroEscritorio;
