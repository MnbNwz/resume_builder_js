import React from "react";

export const Checkbox = ({ id, className = "", register }) => {
  return (
    <input
      type="checkbox"
      id={id}
      className={`h-4 w-4 border border-gray-300 rounded-sm ${className}`}
      {...(register ? register(id) : {})}
    />
  );
};
