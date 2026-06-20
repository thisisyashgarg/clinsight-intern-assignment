'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Expert } from '@/lib/types'
import { ExpertCard } from '@/components/ExpertCard'
import { useShortlist } from '@/lib/store'

export default function ShortlistPage() {
  const ids = useShortlist((s) => s.ids)
  const [shortlisted, setShortlisted] = useState<Expert[]>([])

  useEffect(() => {
    Promise.all(
      ids.map((id) => fetch(`/api/experts/${id}`).then((res) => res.json())),
    ).then(setShortlisted)
  }, [ids])

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Your Shortlist</h1>
      {ids.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven&apos;t shortlisted anyone yet.{' '}
          <Link href="/" className="text-blue-600">
            Browse experts
          </Link>
        </p>
      ) : (
        <div className="space-y-3">
          {shortlisted.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      )}
    </div>
  )
}
