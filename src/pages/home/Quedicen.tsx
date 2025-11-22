import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import card from './../../assets/card.png'
import Avatar from './../../assets/medium-shot-smiley-woman-with-crossed-arms (1).png'

interface Testimonial {
  text: string
  name: string
  role: string
  avatar: string
}

const Quedicen: React.FC = () => {
  const testimonials: Testimonial[] = [
    { text: "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ", name: "Karen", role: "Lorem ipsum dolor", avatar: Avatar },
    { text: "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ", name: "Karen", role: "Lorem ipsum dolor", avatar: Avatar },
    { text: "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ", name: "Karen", role: "Lorem ipsum dolor", avatar: Avatar },
    { text: "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ", name: "Karen", role: "Lorem ipsum dolor", avatar: Avatar },
    { text: "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ", name: "Karen", role: "Lorem ipsum dolor", avatar: Avatar },
    { text: "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..... ", name: "Karen", role: "Lorem ipsum dolor", avatar: Avatar },
  ]

  const [startIndex, setStartIndex] = useState<number>(0)
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

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 + 0.4, duration: 0.9, ease: "easeOut" }
    })
  }

  return (
    <div className="w-full bg-[#026432] overflow-hidden">

      {/* TITLE */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={titleVariants}
        className="
          text-[rgba(243,243,243,1)] font-bold 
          lg:text-[77px] leading-[92px] tracking-[4.77px] 
          text-left max-w-7xl mx-auto mb-20
          md:text-[77px] md:leading-[92px]
          text-4xl leading-snug text-center
          sm:text-[10px] sm:leading-snug
        "
      >
        ¿Qué dicen nuestros clientes?
      </motion.h2>

      <div className="relative w-full flex items-center justify-center px-12">

        {/* LEFT ARROW — HIDDEN ON MOBILE */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.2, x: -10 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-5 text-orange-400 text-4xl cursor-pointer z-10 hidden md:block"
        >
          ❮
        </motion.button>

        {/* CARD LIST */}
        <div
          className="
            flex justify-center items-start gap-10 w-full max-w-7xl
            md:flex-row
            flex-col
          "
        >
          {testimonials
            .slice(startIndex, startIndex + visibleCount)
            .map((item, index) => (
              <motion.div
                key={startIndex + index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                whileHover={{ y: -20, transition: { duration: 0.4, ease: "easeOut" } }}
                className="flex flex-col items-start mx-auto"
              >

                {/* CARD */}
                <div
                  className="
                    w-[456px] h-[385px] 
                    pt-[48px] px-[48px] pb-10 
                    flex flex-col justify-start
                    transition-all duration-500
                    md:w-[456px]
                    w-[90%]
                  "
                  style={{
                    backgroundImage: `url(${card})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat"
                  }}
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

                {/* AVATAR + INFO - LEFT ALIGNED ON MOBILE */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 1.1, duration: 0.7 }}
                  className="
                    flex items-center gap-4 
                    mt-6 
                    w-[456px]
                    md:w-[456px]
                    w-[90%]
                  "
                >
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={item.avatar}
                    alt="avatar"
                    className="
                      w-[90px] h-[90px] rounded-full object-cover 
                      border border-[#707070] shadow-lg flex-shrink-0
                    "
                  />

                  <div className="flex flex-col items-start">
                    <h3 className="text-white text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-300 text-sm">{item.role}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </div>

        {/* RIGHT ARROW — HIDDEN ON MOBILE */}
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.2, x: 10 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-5 text-orange-400 text-4xl cursor-pointer z-10 hidden md:block"
        >
          ❯
        </motion.button>
      </div>
    </div>
  )
}

export default Quedicen
