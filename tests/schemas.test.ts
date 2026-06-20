import { describe, it, expect } from 'vitest'
import { createExpertSchema } from '@/lib/schemas'

describe('createExpertSchema', () => {
  it('accepts a fully valid expert', () => {
    const result = createExpertSchema.safeParse({
      name: 'Dr. Test',
      email: 'test@example.com',
      specialty: 'Cardiology',
      yearsExperience: 5,
    })
    expect(result.success).toBe(true)
  })

  it('rejects a blank name', () => {
    const result = createExpertSchema.safeParse({
      name: '',
      email: 'test@example.com',
      specialty: 'Cardiology',
      yearsExperience: 5,
    })
    expect(result.success).toBe(false)
  })
})
