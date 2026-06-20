import { z } from 'zod'

// Single source of truth for validating a new expert (used by both the
// add-expert form and the POST /api/experts route handler).
export const createExpertSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  yearsExperience: z.coerce.number(),
})

export type CreateExpertInput = z.infer<typeof createExpertSchema>
