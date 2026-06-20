import { NextResponse } from 'next/server'
import { getExpert } from '@/lib/seed'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const expert = getExpert(Number(id))

  if (!expert) {
    return NextResponse.json({ error: 'Expert not found' }, { status: 404 })
  }

  return NextResponse.json(expert)
}
