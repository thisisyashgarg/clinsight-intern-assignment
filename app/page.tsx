'use client'

import { useEffect, useState } from 'react'
import type { Expert } from '@/lib/types'
import { ExpertCard } from '@/components/ExpertCard'
import { SPECIALTIES } from '@/lib/seed'

type ApiResponse = {
  experts: Expert[]
  total: number
  page: number
  pageSize: number
}

export default function DirectoryPage() {
  const [q, setQ] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [sort, setSort] = useState('name')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const params = new URLSearchParams({ q, specialty, sort, page: String(page) })
    fetch(`/api/experts?${params.toString()}`)
      .then((res) => res.json())
      .then(setData)
  }, [q, specialty, sort, page])

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 1

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Clinical Experts</h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setPage(1)
          }}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={specialty}
          onChange={(e) => {
            setSpecialty(e.target.value)
            setPage(1)
          }}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All specialties</option>
          {SPECIALTIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="name">Sort: Name</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      <div className="space-y-3">
        {data?.experts.map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
        {data && data.experts.length === 0 && (
          <p className="text-sm text-gray-500">No experts match your search.</p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
