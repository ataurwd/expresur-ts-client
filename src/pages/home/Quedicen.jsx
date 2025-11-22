import React, { useState } from 'react'
import { motion } from 'framer-motion'
import card from './../../assets/card.png'

const Quedicen = () => {
  const testimonials = [
    { text: "rápidos, económicos y seguros ...", name: "Karen", role: "Lorem ipsum dolor", avatar: "/mnt/data/5e523848-47c0-47a8-b100-36f3663b4243.png" },
    { text: "rápidos, económicos y seguros ...", name: "Karen", role: "Lorem ipsum dolor", avatar: "/mnt/data/5e523848-47c0-47a8-b100-36f3663b4243.png" },
    { text: "rápidos, económicos y seguros ...", name: "Karen", role: "Lorem ipsum dolor", avatar: "/mnt/data/5e523848-47c0-47a8-b100-36f3663b4243.png" },
    { text: "rápidos, económicos y seguros ...", name: "Karen", role: "Lorem ipsum dolor", avatar: "/mnt/data/5e523848-47c0-47a8-b100-36f3663b4243.png" },
    { text: "rápidos, económicos y seguros ...", name: "Karen", role: "Lorem ipsum dolor", avatar: "/mnt/data/5e523848-47c0-47a8-b100-36f3663b4243.png" },
    { text: "rápidos, económicos y seguros ...", name: "Karen", role: "Lorem ipsum dolor", avatar: "/mnt/data/5e523848-47c0-47a8-b100-36f3663b4243.png" },
  ]

  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 3

  const next = () => {
    if (startIndex + visibleCount < testimonials.length) {
      setStartIndex(startIndex + 1)
    }
  }

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1)
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 + 0.4, duration: 0.9, ease: "easeOut" }
    })
  }

  return (
    <div className="w-full bg-[#026432] py-24 overflow-hidden">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={titleVariants}
        className="text-[rgba(243,243,243,1)] font-bold text-[77px] leading-[92px] tracking-[4.77px] text-left max-w-7xl mx-auto mb-20"
      >
        ¿Qué dicen nuestros clientes?
      </motion.h2>

      <div className="relative w-full flex items-center justify-center px-12">
        {/* LEFT ARROW */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.2, x: -10 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-5 text-orange-400 text-4xl cursor-pointer z-10"
        >
          ❮
        </motion.button>

        {/* VISIBLE CARDS */}
        <div className="flex justify-center items-start gap-10 w-full max-w-7xl">
          {testimonials.slice(startIndex, startIndex + visibleCount).map((item, index) => (
            <motion.div
              key={startIndex + index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              whileHover={{ y: -20, transition: { duration: 0.4, ease: "easeOut" } }}
              className="flex flex-col items-center"
            >
              <div
                className="w-[456px] h-[385px] pt-[48px] px-[48px] pb-10 flex flex-col justify-start transition-all duration-500"
                style={{ backgroundImage: `url(${card})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat" }}
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.8, duration: 0.8 }}
                  className="text-[18px] leading-[28px] text-black text-left"
                >
                  {item.text}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 1, duration: 0.6 }}
                  className="flex text-yellow-500 text-xl mt-4"
                >
                  ★★★★★
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 1.1, duration: 0.7 }}
                className="flex flex-col items-center mt-6"
              >
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  src={item.avatar}
                  alt="avatar"
                  className="w-[100px] h-[100px] rounded-full object-cover border border-[#707070] shadow-lg"
                />
                <h3 className="mt-3 text-white text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-300 text-sm">{item.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.2, x: 10 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-5 text-orange-400 text-4xl cursor-pointer z-10"
        >
          ❯
        </motion.button>
      </div>
    </div>
  )
}

export default Quedicen
