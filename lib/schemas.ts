import { z } from "zod";

// Single source of truth for validating a new expert (used by both the
// add-expert form and the POST /api/experts route handler).
export const createExpertSchema = z.object({
  name: z
    .string()
    .trim() // fixed for whitespacing
    .min(1, "Name is required")
    .regex(/^(?=.*[A-Za-z])[A-Za-z\s.'-]+$/, "Invalid name"), //special character(-,@,2,.) should not be allowed, 
  email: z
    .string()
    .trim() // fixed for whitespacing
    .min(1, "Email is required")
    .email("Invalid email format"), // email format is valid
  specialty: z.string().min(1, "Specialty is required"),
  yearsExperience: z.coerce
    .number()
    .min(0, "Experience cannot be negative") // no negative value allowed
    .max(65, "Experience cannot be unrealistic"), // unrealistic value
});

export type CreateExpertInput = z.infer<typeof createExpertSchema>;
