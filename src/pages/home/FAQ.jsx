import React from 'react'
import { motion } from 'framer-motion'

const FAQ = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  }

  const seamVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.6 },
    },
  }

  const dotsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, delay: 1.2 },
    },
  }

  return (
    <section
      className="
        bg-[#045f3a]
        w-full
        max-w-[1944px]
        mx-auto
        px-5
        md:px-10
        lg:px-20
        pt-20
        pb-20
        overflow-hidden
      "
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className='mt-10 md:mt-[135px]'
      >

        {/* TITLE */}
        <motion.h2
          variants={titleVariants}
          className="
            text-white
            font-[Avenir_Next_LT_Pro]
            text-[40px]
            md:text-[60px]
            lg:text-[97px]
            font-[700]
            leading-tight
            md:leading-[90px]
            lg:leading-[116px]
            tracking-[3px]
            md:tracking-[4px]
            lg:tracking-[6.01px]
            text-center
            mx-auto
            px-2
          "
        >
          Preguntas Frecuentes (FAQ)
        </motion.h2>

        {/* SEAM */}
        <div className="flex justify-center mt-6 md:mt-8 mb-10 md:mb-16">
          <div className="relative w-[250px] md:w-[350px] lg:w-[420px] h-[1px] bg-white/20 rounded-full overflow-hidden">
            <motion.div
              variants={seamVariants}
              className="absolute inset-0 bg-white/40"
            />
            <motion.div variants={dotsVariants} className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-2 md:gap-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.04, duration: 0.4 }}
                    className="
                      block
                      w-[6px]
                      h-[6px]
                      md:w-[8px]
                      md:h-[8px]
                      rounded-full
                      bg-[#F5C65A]
                    "
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* GRID CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-12 md:gap-y-16">
          {/* LEFT COLUMN */}
          <div className="space-y-10 md:space-y-12">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3
                  className="
                    text-white
                    font-[Avenir_Next_LT_Pro]
                    text-[20px]
                    md:text-[23px]
                    font-[500]
                    leading-[26px]
                    md:leading-[28px]
                    tracking-[1.2px]
                    md:tracking-[1.43px]
                    text-left
                    lg:ml-[327px]
                    ml-0
                    transition-colors duration-300 hover:text-[#F5C65A]
                  "
                >
                  rápidos, económicos y seguros Lorem ipsum dolor?
                </h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="
                    text-white
                    font-[Avenir_Next_LT_Pro]
                    text-[15px]
                    md:text-[17px]
                    font-[500]
                    leading-[20px]
                    md:leading-[21px]
                    tracking-[1px]
                    text-left
                    lg:ml-[327px]
                    ml-0
                    mt-3
                  "
                >
                  rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-10 md:space-y-12">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3
                  className="
                    text-white
                    font-[Avenir_Next_LT_Pro]
                    text-[20px]
                    md:text-[23px]
                    font-[500]
                    leading-[26px]
                    md:leading-[28px]
                    tracking-[1.2px]
                    md:tracking-[1.43px]
                    text-left
                    lg:mr-[266px]
                    mr-0
                    transition-colors duration-300 hover:text-[#F5C65A]
                  "
                >
                  rápidos, económicos y seguros Lorem ipsum dolor?
                </h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="
                    text-white
                    font-[Avenir_Next_LT_Pro]
                    text-[15px]
                    md:text-[17px]
                    font-[500]
                    leading-[20px]
                    md:leading-[21px]
                    tracking-[1px]
                    text-left
                    lg:mr-[339px]
                    mr-0
                    mt-3
                  "
                >
                  rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center mt-16 md:mt-20"
        >
          <motion.button
            whileHover={{
              scale: 1.08,
              backgroundColor: "#FA921D",
              borderColor: "#FA921D",
              color: "#fff",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="
              text-white
              font-[Avenir_Next_LT_Pro]
              text-[18px]
              md:text-[22px]
              tracking-[1px]
              md:tracking-[1.5px]
              px-10
              md:px-14
              py-2.5
              md:py-3
              rounded-[24.5px]
              border-[2px]
              border-[#FA921D]
              relative
              overflow-hidden
              transition-all duration-300
            "
          >
            <span className="relative z-10">VER MÁS</span>
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default FAQ