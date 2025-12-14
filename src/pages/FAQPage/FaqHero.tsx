import React from "react";
import faqHero from "../../assets/HeroBg.png";

const FaqHero: React.FC = () => {
  return (
    <section className="w-full">
      <div className="w-full h-[220px] md:h-[420px] lg:h-[520px]">
        <img
          src={faqHero}
          alt="FAQ Hero"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default FaqHero;
