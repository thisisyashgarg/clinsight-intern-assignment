import type { Expert } from "./types";
import { seedExperts } from "./seed";
import { averageRating } from "./rating";

// localStorage-backed "database". On first use we seed it from seedExperts;
// after that, all reads and writes go through localStorage so data survives
// page refreshes and dev-server restarts.
const STORAGE_KEY = "clinsight.experts.v1";

function loadAll(): Expert[] {
  if (typeof window === "undefined") return [...seedExperts];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedExperts));
    return [...seedExperts];
  }
  return JSON.parse(raw) as Expert[];
}

function saveAll(experts: Expert[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(experts));
}

export const PAGE_SIZE = 4;

export type ListParams = {
  q?: string;
  specialty?: string;
  sort?: string;
  page?: number;
};

export type ListResult = {
  experts: Expert[];
  total: number;
  page: number;
  pageSize: number;
};

export function listExperts({
  q = "",
  specialty = "",
  sort = "name",
  page = 1,
}: ListParams): ListResult {
  let results = loadAll();

  if (q) {
    // fixed searching case insensitive
    results = results.filter((e) =>
      e.name.toLowerCase().includes(q.toLowerCase()),
    );
  }

  if (specialty) {
    results = results.filter((e) => e.specialty.includes(specialty));
  }

  if (sort === "rating") {
    results.sort(
      (a, b) =>
        (averageRating(b.reviews) ?? 0) - (averageRating(a.reviews) ?? 0), // fix order to descending
    );
  } else {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  const total = results.length;
  const start = (page - 1) * PAGE_SIZE; // formula corrected
  const pageItems = results.slice(start, start + PAGE_SIZE);

  return { experts: pageItems, total, page, pageSize: PAGE_SIZE };
}

export function getExpert(id: number): Expert | null {
  return loadAll().find((e) => e.id === id) ?? null;
}

export function addExpert(
  data: Omit<Expert, "id" | "reviews">
): { success: true; expert: Expert } | { success: false; error: string } {
  const experts = loadAll();
  // check for duplicate
  const alreadyExist = experts.find(
    (expert) => expert.email.toLowerCase() === data.email.toLowerCase(),
  );
  if (alreadyExist) {
    return {
      success: false,
      error: "An expert with this email already exists",
    };
  }
  const nextId = experts.reduce((max, e) => Math.max(max, e.id), 0) + 1;
  const expert: Expert = { id: nextId, reviews: [], ...data };
  experts.push(expert);
  saveAll(experts);
  return {
    success: true,
    expert,
  }
}
