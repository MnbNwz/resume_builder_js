import { z } from "zod";

export const formatDate = () => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return false; // Invalid date
  return parsedDate.toISOString().split("T")[0]; // Returns YYYY-MM-DD
};
export const urlValidation = z
  .string()
  .url("Invalid URL format. Please provide a valid link.")
  .optional()
  .or(z.literal(""));
