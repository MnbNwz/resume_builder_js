import { z } from "zod"; // Importing zod for schema validation
import { formatDate, urlValidation } from "../field-validator"; // Importing custom validators for date formatting and URL validation

// Work Experience Schema Validation
export const workExperienceSchema = z.object({
  companyName: z.string().min(8, "Valid company Name is required"), // Validates company name (min 8 characters)
  jobTitle: z.string().min(8, "Job Title is required"), // Validates job title (min 8 characters)
  startDate: z
    .string()
    .min(1, "Start Date is required") // Ensures start date is provided
    .refine((date) => formatDate(date), "Invalid Start Date") // Custom date validation
    .transform((date) => formatDate(date)), // Transforms date into the correct format
  endDate: z
    .string()
    .min(1, "End Date is required") // Ensures end date is provided
    .refine((date) => formatDate(date), "Invalid End Date") // Custom date validation
    .transform((date) => formatDate(date)), // Transforms end date into the correct format
  location: z.string().optional(), // Location is optional
  contributions: z
    .array(
      z.object({
        value: z.string().min(8, "Contribution must be at least 8 characters"),
      })
    )
    .min(1, "At least one contribution is required")
    .optional(),
  contributionInput: z
    .string()
    .min(8, "Contribution text must be at least 8 characters")
    .optional(),
  disabledEndDate: z.boolean(), // Optionally disables end date
});

// Professional Summary Schema Validation
export const professionalSummarySchema = z.object({
  summary: z.string().min(20, "Valid Summary is required"), // Ensures summary is at least 20 characters long
});

// Personal Information Schema Validation
export const PersonalInformationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long.") // Ensures full name is between 3 and 50 characters
    .max(50, "Full name cannot exceed 50 characters."),
  email: z
    .string()
    .email("Invalid email format. Please enter a valid email address."), // Validates email format
  headline: z
    .string()
    .min(5, "Headline must be at least 5 characters long.") // Ensures headline is between 5 and 100 characters
    .max(100, "Headline cannot exceed 100 characters.")
    .or(z.literal("")) // Allows an empty string as a valid value
    .optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters long.") // Ensures location is between 2 and 100 characters
    .max(100, "Location cannot exceed 100 characters.")
    .or(z.literal("")) // Allows an empty string as a valid value
    .optional(),
  phoneNumber: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/, // Validates international phone number format (optional + and up to 15 digits)
      "Invalid phone number format. Please use the international format, e.g., +123456789."
    )
    .min(8, "Phone number must be at least 8 digits long.") // Ensures phone number is at least 8 digits
    .max(15, "Phone number cannot exceed 15 digits.") // Ensures phone number is no more than 15 digits
    .or(z.literal("")) // Allows an empty string as a valid value
    .optional(),
  linkedIn: urlValidation, // Custom URL validation for LinkedIn
  website: urlValidation, // Custom URL validation for website
});
