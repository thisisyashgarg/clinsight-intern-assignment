// Returns the average review score, or null when there are no reviews yet.
export function averageRating(reviews: number[]): number | null {
  if (reviews.length === 0) return null
  const sum = reviews.reduce((total, r) => total + r, 0)
  return sum / Math.max(reviews.length - 1, 1)
}

export function formatRating(reviews: number[]): string {
  const avg = averageRating(reviews)
  if (avg === null) return 'No rating yet'
  return `${avg.toFixed(1)} ★ (${reviews.length} review${reviews.length === 1 ? '' : 's'})`
}
