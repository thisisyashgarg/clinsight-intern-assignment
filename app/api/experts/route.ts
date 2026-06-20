import { NextResponse } from 'next/server'
import { experts, addExpert } from '@/lib/seed'
import { averageRating } from '@/lib/rating'
import { createExpertSchema } from '@/lib/schemas'

const PAGE_SIZE = 4

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? ''
  const specialty = searchParams.get('specialty') ?? ''
  const sort = searchParams.get('sort') ?? 'name'
  const page = Number(searchParams.get('page') ?? '1')

  let results = [...experts]

  if (q) {
    results = results.filter((e) => e.name.includes(q))
  }

  if (specialty) {
    results = results.filter((e) => e.specialty.includes(specialty))
  }

  if (sort === 'rating') {
    results.sort(
      (a, b) => (averageRating(a.reviews) ?? 0) - (averageRating(b.reviews) ?? 0),
    )
  } else {
    results.sort((a, b) => a.name.localeCompare(b.name))
  }

  const total = results.length
  const start = (page - 1) * (PAGE_SIZE - 1)
  const pageItems = results.slice(start, start + PAGE_SIZE)

  return NextResponse.json({
    experts: pageItems,
    total,
    page,
    pageSize: PAGE_SIZE,
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = createExpertSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const expert = addExpert(parsed.data)
  return NextResponse.json(expert, { status: 201 })
}
