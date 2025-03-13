import { FaCalendarAlt } from "react-icons/fa";
import { CountryFlagDropdown } from "../../organisms";

export const InputField = ({
  label,
  register,
  name,
  error,
  type = "text",
  important,
  placeholder,
  dateRequired = false,
  disabled = false,
  multiple = false,
  countryFlag = false,
  disabledError = false,
}) => {
  return (
    <div className="flex-1 relative">
      <label className="block text-sm font-medium text-gray-700 mt-1 mb-1">
        {label} {important && <span className="text-red-500"> *</span>}{" "}
      </label>
      <div className="relative">
        {multiple ? (
          <textarea
            rows={4}
            {...register(name)}
            placeholder={placeholder}
            className="border border-gray-300 p-2 w-full text-black text-sm placeholder-gray-400 pr-10 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
          />
        ) : (
          <div className="flex gap-2">
            {countryFlag && <CountryFlagDropdown />}
            <input
              disabled={disabled}
              {...register(name)}
              placeholder={placeholder}
              type={dateRequired ? "date" : type}
              className={`border border-gray-300 p-2 w-full text-black text-sm placeholder-gray-400 pr-10 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150 ${
                disabled ? "!bg-gray-300 opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>
        )}
        {dateRequired && (
          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
        )}
      </div>
      {!disabledError && error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};
