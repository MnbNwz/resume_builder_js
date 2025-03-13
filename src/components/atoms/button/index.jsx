import { ButtonHTMLAttributes, FC, ReactNode } from "react";

export const Button = ({ type = "button", children, styleDate, ...props }) => (
  <button
    type={type}
    className={`p-0 leading-none  ${styleDate}`} // Added focus:outline-none and focus:ring-0
    {...props}
  >
    {children}
  </button>
);
