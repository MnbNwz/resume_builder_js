import { useState } from "react";
import { Countries } from "../../../constants/app-constants";
import { IoIosArrowDown } from "react-icons/io";

export const CountryFlagDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(Countries[0]);

  // Toggle dropdown visibility
  const handleToggle = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  // Handle country selection
  const handleSelect = (country) => {
    setSelectedCountry(country); // Update selected country
    setIsDropdownVisible(false); // Close dropdown
  };

  return (
    <div className="relative w-25">
      {/* Selected flag and country code */}
      <div
        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 py-2 px-3 cursor-pointer"
        onClick={handleToggle}
      >
        <img
          src={selectedCountry.flag}
          alt="Selected flag"
          className="w-5 h-5 rounded-full object-cover"
        />
        <span className="text-black text-sm">{selectedCountry.code}</span>
        <span
          className={`text-black transition-transform duration-300 ${
            isDropdownVisible ? "rotate-180" : "rotate-0"
          }`}
        >
          <IoIosArrowDown />
        </span>
      </div>

      {/* Dropdown menu */}
      {isDropdownVisible && (
        <ul className="absolute w-38 bg-white border z-[9999] border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {Countries.map((country) => (
            <li
              key={country.code}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
              onClick={() => handleSelect(country)}
            >
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-4 h-4 rounded-full object-cover"
              />
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
