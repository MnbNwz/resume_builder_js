export const TextAreaField = ({
  label,
  register,
  name,
  error,
  important,
  placeholder,
  disabled = false,
  disabledError = false,
}) => {
  return (
    <div className="flex-1 relative">
      <label className="block text-sm font-medium text-gray-700 mt-1 mb-1">
        {label} {important && <span className="text-red-500"> *</span>}{" "}
      </label>
      <textarea
        rows={4}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        className="border border-gray-300 p-2 w-full text-black text-sm placeholder-gray-400 pr-10 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
      />
      {!disabledError && error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};
