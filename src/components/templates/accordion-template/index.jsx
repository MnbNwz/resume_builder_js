import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";

// FormTemplate component with collapsible accordion functionality
export const AccordionTemplate = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true); // State to track whether accordion is open or closed

  // Toggles the accordion open/close state
  const toggleAccordion = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full bg-white">
      <div className="p-4 rounded-md border border-gray-300">
        {/* Accordion header — click to toggle open/close */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={toggleAccordion}
        >
          <p className="text-sm font-medium text-gray-700">{title}</p>

          {/* Chevron icon rotates based on isOpen state */}
          <FaChevronUp
            className="text-gray-600"
            style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
          />
        </div>

        {/* Accordion body — expands or collapses based on isOpen */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen mt-4" : "max-h-0"
          }`}
        >
          {isOpen && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
};
