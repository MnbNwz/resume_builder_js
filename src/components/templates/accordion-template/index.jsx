import React, { useState, useRef, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

export const AccordionTemplate = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? `${scrollHeight}px` : "0px");
    }
  }, [isOpen, children]); // Recalculate height if children content changes

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md mb-4">
      {/* Accordion Header */}
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

      {/* Animated Content */}
      <div
        ref={contentRef}
        className="transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? height : "0px",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
