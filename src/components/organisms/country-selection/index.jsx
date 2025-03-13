import { useRef } from "react";
import { Countries } from "../../../constants/app-constants";
import { IoIosArrowDown } from "react-icons/io";

// CountryFlagDropdown component displays a flag dropdown menu for selecting countries
export const CountryFlagDropdown = () => {
  // Refs for dropdown, selected flag, country code, and arrow icon
  const dropdownRef = useRef < HTMLUListElement > null;
  const selectedFlagRef = useRef < HTMLImageElement > null;
  const selectedCountryCodeRef = useRef < HTMLSpanElement > null;
  const arrowRef = useRef < HTMLSpanElement > null;

  // Toggles the visibility of the dropdown and rotates the arrow icon
  const handleToggle = () => {
    const dropdown = dropdownRef.current;
    const arrow = arrowRef.current;

    if (dropdown) {
      const isVisible = dropdown.style.display === "block"; // Check current visibility
      dropdown.style.display = isVisible ? "none" : "block"; // Toggle visibility
      if (arrow) {
        arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)"; // Rotate arrow
      }
    }
  };

  // Handles selecting a country from the dropdown
  const handleSelect = (flag, countryCode) => {
    if (selectedFlagRef.current) {
      selectedFlagRef.current.src = flag; // Update displayed flag
    }
    if (selectedCountryCodeRef.current) {
      selectedCountryCodeRef.current.textContent = countryCode; // Update displayed country code
    }
    if (dropdownRef.current) {
      dropdownRef.current.style.display = "none"; // Close dropdown after selection
    }
    if (arrowRef.current) {
      arrowRef.current.style.transform = "rotate(0deg)"; // Reset arrow icon to default position
    }
  };

  return (
    <div className="relative w-25">
      {/* Selected flag and country code container */}
      <div
        className="flex items-center justify-center gap-2 rounded-md border border-gray-300 py-2 px-3 cursor-pointer"
        onClick={handleToggle}
      >
        {/* Default selected flag */}
        <img
          ref={selectedFlagRef}
          src={Countries[0].flag}
          alt="Selected flag"
          className="w-5 h-5 rounded-full object-cover"
        />
        {/* Default selected country code */}
        <span ref={selectedCountryCodeRef} className="text-black text-sm">
          {Countries[0].code}
        </span>
        {/* Dropdown arrow icon */}
        <span
          ref={arrowRef}
          className="text-black transition-transform duration-300"
        >
          <IoIosArrowDown />
        </span>
      </div>

      {/* Dropdown menu with countries */}
      <ul
        ref={dropdownRef}
        className="hidden absolute w-38 bg-white border z-[9999] border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
      >
        {Countries.map((country) => (
          <li
            key={country.code}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
            onClick={() => handleSelect(country.flag, country.code)}
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
    </div>
  );
};
