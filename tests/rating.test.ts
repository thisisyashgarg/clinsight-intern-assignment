import { describe, it, expect } from 'vitest'
import { averageRating, formatRating } from '@/lib/rating'

describe('averageRating', () => {
  it('returns null when there are no reviews', () => {
    expect(averageRating([])).toBeNull()
  })

  it('returns the single score when there is one review', () => {
    expect(averageRating([4])).toBe(4)
  })
})

describe('formatRating', () => {
  it('shows a friendly message when there are no reviews', () => {
    expect(formatRating([])).toBe('No rating yet')
  })
})
