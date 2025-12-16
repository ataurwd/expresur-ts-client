import React, { useState } from "react";
import { Plus, Minus } from "lucide-react"; 
import { Helmet } from "react-helmet";
import HeroBg from "../../assets/HeroBg.png";

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
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut",
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
  {
    question: "rápidos, económicos y seguros Lorem ipsum dolor?",
    answer:
      "rápidos, económicos y seguros Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
  },
];

/* ---------------- FAQ ITEM ---------------- */
const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onToggle: () => void }> = ({
  faq,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border border-[#F5C65A] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left bg-[#026432] hover:bg-[#02582b] transition-colors"
      >
        <h3 className="text-white text-lg md:text-xl font-semibold pr-4">
          {faq.question}
        </h3>
        {isOpen ? (
          <Minus className="text-[#F5C65A] flex-shrink-0" size={24} />
        ) : (
          <Plus className="text-[#F5C65A] flex-shrink-0" size={24} />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-3 bg-[#026432]">
          <p className="text-white text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
};

/* ---------------- WHATSAPP ICON SVG ---------------- */
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 20, 
  className = "" 
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.488" />
  </svg>
);

/* ---------------- PAGE ---------------- */
const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const ContactButtonMobile: React.FC = () => (
    <div className="md:hidden mt-4"> 
      <a
        href="https://wa.me/yourphonenumber" // Replace with actual WhatsApp link
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-between px-4 py-4 bg-[#026432] border border-[#F5C65A] rounded-full transition-colors hover:bg-[#02582b]"
      >
        <div className="flex items-center space-x-3">
          <WhatsAppIcon size={24} className="text-[#F5C65A] flex-shrink-0" />
          <span className="text-white text-sm font-medium uppercase whitespace-nowrap">
            SI TIENES PREGUNTAS, CONTÁCTANOS
          </span>
        </div>
        <div className="w-6" /> {/* Spacer for balance */}
      </a>
    </div>
  );

  return (
    <section className="w-full bg-white py-20 relative overflow-hidden">
      <Helmet>
        <title>FAQ | EXPRESUR</title>
      </Helmet>

      <div
        className="absolute inset-x-0 top-0 h-[60%]"
        style={{
          backgroundImage: `linear-gradient(90deg, #0b5b39 0%, #8fc6b4 45%, #f5b370 100%), url(${HeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="bg-[#026432] rounded-3xl px-6 md:px-16 py-14 shadow-2xl">
          
          <h2 className="text-white text-center text-3xl md:text-7xl font-bold leading-tight mb-10">
            Preguntas Frecuentes <br /> (FAQ)
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={index === openIndex}
                onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
              />
            ))}
            
            <ContactButtonMobile />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;