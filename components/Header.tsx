'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useShortlist } from '@/lib/store'

export function Header() {
  // Show how many experts are currently shortlisted.
  const [count] = useState(() => useShortlist.getState().ids.length)

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          Clinsight <span className="text-blue-600">Expert Directory</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/experts/new" className="text-gray-600 hover:text-gray-900">
            Add expert
          </Link>
          <Link
            href="/shortlist"
            className="rounded-md bg-blue-600 px-3 py-1.5 font-medium text-white hover:bg-blue-700"
          >
            Shortlist ({count})
          </Link>
        </nav>
      </div>
    </header>
  )
}
