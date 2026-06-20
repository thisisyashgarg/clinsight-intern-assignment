'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createExpertSchema } from '@/lib/schemas'
import { SPECIALTIES } from '@/lib/seed'
import { addExpert } from '@/lib/db'

type FieldErrors = Record<string, string[] | undefined>

export default function NewExpertPage() {
  const router = useRouter()
  const [values, setValues] = useState({
    name: '',
    email: '',
    specialty: '',
    yearsExperience: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)

  function update(field: keyof typeof values, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)

    // Re-validate live so the user gets immediate feedback.
    const result = createExpertSchema.safeParse(next)
    if (!result.success) {
      setErrors((prev) => ({ ...prev, ...result.error.flatten().fieldErrors }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = createExpertSchema.safeParse(values)
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      return
    }

    setSubmitting(true)
    addExpert(result.data)
    router.push('/')
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-2xl font-semibold">Add Expert</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Name" error={errors.name}>
          <input
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </Field>

        <Field label="Specialty" error={errors.specialty}>
          <select
            value={values.specialty}
            onChange={(e) => update('specialty', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Select…</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Years of experience" error={errors.yearsExperience}>
          <input
            type="number"
            value={values.yearsExperience}
            onChange={(e) => update('yearsExperience', e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Saving…' : 'Save expert'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string[]
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && error.length > 0 && (
        <p className="mt-1 text-sm text-red-600">{error[0]}</p>
      )}
    </div>
  )
}
