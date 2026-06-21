'use client'

import Link from 'next/link'
import type { Expert } from '@/lib/types'
import { formatRating } from '@/lib/rating'
import { useShortlist } from '@/lib/store'

export function ExpertCard({ expert }: { expert: Expert }) {
  const ids = useShortlist((s) => s.ids)
  const toggle = useShortlist((s) => s.toggle)
  const shortlisted = ids.includes(expert.id)

  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="min-w-0 flex-1">
        <Link
          href={`/experts/${expert.id}`}
          className="font-medium block truncate text-gray-900 hover:text-blue-600"
        >
          {expert.name}
        </Link>
        <p className="text-sm text-gray-500">
          {expert.specialty} · {expert.yearsExperience} yrs
        </p>
        <p className="mt-1 text-sm text-gray-600">{formatRating(expert.reviews)}</p>
      </div>
      <button
        onClick={() => toggle(expert.id)}
        aria-label="Toggle shortlist"
        className={`text-2xl ${shortlisted ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </button>
    </div>
  )
}
