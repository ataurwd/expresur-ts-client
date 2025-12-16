import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Helmet } from "react-helmet";

/* ---------------- TYPES ---------------- */
type FAQ = {
  question: string;
  answer: string;
};

/* ---------------- FAQ DATA ---------------- */
const faqs: FAQ[] = [
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
  }
];

/* ---------------- FAQ ITEM ---------------- */
const FAQItem: React.FC<FAQ> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#F5C65A] rounded-lg px-6 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <h3 className="text-white text-[15px] md:text-[17px] font-medium">
          {question}
        </h3>

        {open ? (
          <Minus className="text-[#F5C65A]" size={20} />
        ) : (
          <Plus className="text-[#F5C65A]" size={20} />
        )}
      </button>

      {open && (
        <p className="text-white text-[14px] leading-relaxed mt-3">
          {answer}
        </p>
      )}
    </div>
  );
};

/* ---------------- PAGE ---------------- */
const FAQPage: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 relative">
      <Helmet>
        <title>FAQ | EXPRESUR</title>
      </Helmet>

      {/* CENTER GREEN CARD */}
      <div
        className="
          max-w-[1200px]
          mx-auto
          -mt-[40%]
          md:-mt-[25%]
          relative
          z-50
          bg-[#026432]
          rounded-3xl
          px-6
          md:px-16
          py-14
          shadow-2xl
        "
      >
        {/* TITLE */}
        <h2
          className="
            text-white
            text-center
            text-[26px]
            md:text-[38px]
            font-bold
            leading-tight
            mb-10
          "
        >
          Preguntas Frecuentes <br /> (FAQ)
        </h2>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
