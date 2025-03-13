import React, { useState, useRef, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

export const AccordionTemplate = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <FaChevronUp
          className={`text-gray-600 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <div
        ref={contentRef}
        className="transition-all duration-500 ease-in-out"
        style={{
          maxHeight: height,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
