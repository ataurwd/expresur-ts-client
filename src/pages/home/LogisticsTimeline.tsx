import React from 'react'
import icon from '../../assets/Grupo-icon.png'

const LogisticsTimeline = () => {
  return (
     <div className="w-full bg-[#026432] py-24 overflow-x-visible flex justify-center">
      {/* Main wrapper must be wide enough to contain the image + line */}
      <div className="relative" style={{ width: "2087.92px" }}>
        
        {/* ICON STRIP IMAGE — EXACT SIZE */}
        <img
          src={icon}
          alt="Logistics Strip"
          style={{
            width: "3087.92px",
            height: "327.03px",
          }}
          className="object-contain mx-auto"
        />

        {/* YELLOW LINE */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-[rgba(250,146,29,1)] mt-[120px]"
          style={{
            width: "1800px",
            height: "6px",
            top: "180px",
          }}
        ></div>

        {/* YELLOW DOTS — EXACT SIZE + 270px GAP */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex mt-[120px]"
          style={{
            gap: "270px",
            top: "162px",
          }}
        >
          {Array(7)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="rounded-full bg-[rgba(250,146,29,1)]"
                style={{
                  width: "38px",
                  height: "38px",
                }}
              ></div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default LogisticsTimeline