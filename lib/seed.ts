import type { Expert } from './types'

// In-memory data store. Resets every time the dev server restarts.
// This is intentional for the assignment — no database setup required.
export const experts: Expert[] = [
  { id: 1, name: 'Dr. Aisha Rahman', email: 'aisha.rahman@example.com', specialty: 'Cardiology', yearsExperience: 12, reviews: [5, 4, 5, 4] },
  { id: 2, name: 'Dr. Ben Carter', email: 'ben.carter@example.com', specialty: 'Pediatric Cardiology', yearsExperience: 8, reviews: [4, 4, 3] },
  { id: 3, name: 'Dr. Chen Wei', email: 'chen.wei@example.com', specialty: 'Neurology', yearsExperience: 15, reviews: [5, 5, 5, 5, 4] },
  { id: 4, name: 'Dr. Diana Lopez', email: 'diana.lopez@example.com', specialty: 'Oncology', yearsExperience: 6, reviews: [3, 4] },
  { id: 5, name: 'Dr. Emeka Okafor', email: 'emeka.okafor@example.com', specialty: 'Cardiology', yearsExperience: 20, reviews: [5, 5, 4, 5] },
  { id: 6, name: 'Dr. Fatima Noor', email: 'fatima.noor@example.com', specialty: 'Dermatology', yearsExperience: 4, reviews: [4, 5] },
  { id: 7, name: 'Dr. Grace Park', email: 'grace.park@example.com', specialty: 'Neurology', yearsExperience: 9, reviews: [2, 3, 4] },
  { id: 8, name: 'Dr. Hassan Ali', email: 'hassan.ali@example.com', specialty: 'Oncology', yearsExperience: 11, reviews: [5, 4, 4, 5] },
  { id: 9, name: 'Dr. Ingrid Holm', email: 'ingrid.holm@example.com', specialty: 'Dermatology', yearsExperience: 3, reviews: [] },
  { id: 10, name: 'Dr. Jamal Reed', email: 'jamal.reed@example.com', specialty: 'Pediatric Cardiology', yearsExperience: 7, reviews: [4, 5, 5] },
]

let nextId = experts.length + 1

export function addExpert(data: Omit<Expert, 'id' | 'reviews'>): Expert {
  const expert: Expert = { id: nextId++, reviews: [], ...data }
  experts.push(expert)
  return expert
}

export function getExpert(id: number): Expert | undefined {
  return experts.find((e) => e.id === id)
}

export const SPECIALTIES = [
  'Cardiology',
  'Pediatric Cardiology',
  'Neurology',
  'Oncology',
  'Dermatology',
]
