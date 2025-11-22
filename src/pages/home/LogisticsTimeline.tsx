import React from 'react'
import icon from '../../assets/Grupo-icon.png'

const LogisticsTimeline = () => {
  return (
    <div className="w-full bg-[#026432] py-24 overflow-x-visible flex justify-center">

      {/* WRAPPER — Desktop unchanged, Mobile adjusts */}
      <div
        className="relative 
          w-[2087.92px] 
          md:w-[2087.92px]
          w-full 
          overflow-hidden
        "
      >

        {/* ICON STRIP — Desktop same, Mobile resized */}
        <img
          src={icon}
          alt="Logistics Strip"
          className="
            object-contain mx-auto
            md:w-[3087.92px] md:h-[327.03px]
            w-[900px] h-auto
          "
        />

        {/* YELLOW LINE — Desktop unchanged */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2 bg-[rgba(250,146,29,1)] mt-[120px]
            md:w-[1800px] md:h-[6px]
            md:top-[180px]
            w-[300px] h-[4px]
            top-[150px]
          "
        ></div>

        {/* DOTS — Desktop unchanged, Mobile smaller + closer */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2 flex mt-[120px]
            md:gap-[270px] md:top-[162px]
            gap-[40px] 
            top-[138px]
          "
        >
          {Array(7).fill(0).map((_, idx) => (
            <div
              key={idx}
              className="rounded-full bg-[rgba(250,146,29,1)]
                md:w-[38px] md:h-[38px]
                w-[14px] h-[14px]
              "
            ></div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default LogisticsTimeline
