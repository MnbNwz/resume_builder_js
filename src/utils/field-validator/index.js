import { z } from "zod";

export const formatDate = (date) => {
  if (!date) return false; // Ensure a date is provided
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return false; // Check if date is valid
  return parsedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

export const urlValidation = z
  .string()
  .url("Invalid URL format. Please provide a valid link.")
  .optional()
  .or(z.literal(""));
