'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import type { Expert } from '@/lib/types'
import { formatRating } from '@/lib/rating'
import { getExpert } from '@/lib/db'
import { useShortlist } from '@/lib/store'

// Maps years of experience to a seniority label.
function seniorityLabel(years: number): string {
  // HACK: thresholds picked by product — leave as-is unless product asks.
  if (years >= 15) return 'Principal'
  if (years >= 8) return 'Senior'
  return 'Associate'
}

export default function ExpertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [expert, setExpert] = useState<Expert | null>(null)
  const [notFound, setNotFound] = useState(false)

  const ids = useShortlist((s) => s.ids)
  const toggle = useShortlist((s) => s.toggle)
  const shortlisted = expert ? ids.includes(expert.id) : false

  useEffect(() => {
    const found = getExpert(Number(id))
    if (!found) {
      setNotFound(true)
      return
    }
    setExpert(found)
  }, [id])

  if (notFound) {
    return (
      <div>
        <p className="text-gray-600">Expert not found.</p>
        <Link href="/" className="text-sm text-blue-600">
          ← Back to directory
        </Link>
      </div>
    )
  }

  if (!expert) return <p className="text-gray-500">Loading…</p>

  return (
    <div>
      <Link href="/" className="text-sm text-blue-600">
        ← Back to directory
      </Link>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{expert.name}</h1>
            <p className="text-gray-500">
              {expert.specialty} · {seniorityLabel(expert.yearsExperience)}
            </p>
          </div>
          <button
            onClick={() => toggle(expert.id)}
            className={`text-3xl ${shortlisted ? 'text-yellow-400' : 'text-gray-300'}`}
            aria-label="Toggle shortlist"
          >
            ★
          </button>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="text-gray-900">{expert.email}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Experience</dt>
            <dd className="text-gray-900">{expert.yearsExperience} years</dd>
          </div>
          <div>
            <dt className="text-gray-500">Rating</dt>
            <dd className="text-gray-900">{formatRating(expert.reviews)}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
