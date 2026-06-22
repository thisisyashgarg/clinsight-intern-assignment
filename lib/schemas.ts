import { z } from 'zod'

// Single source of truth for validating a new expert (used by both the
// add-expert form and the POST /api/experts route handler).
export const createExpertSchema = z.object({
  name: z.string().min(1, 'Name is required').regex(
    /^[A-Za-z\s]+$/,
    'Name should contain only letters and spaces'
  ),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  yearsExperience: z.coerce.number().min(0, 'Years of experience must be a non-negative number')
                  .max(50, 'Years of experience must be less than or equal to 50'),
})

export type CreateExpertInput = z.infer<typeof createExpertSchema>
