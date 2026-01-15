import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

function createMockQueryBuilder() {
  const mockResult = { data: [], error: null }
  const mockSingleResult = { data: null, error: { message: "Supabase not configured" } }

  const builder: any = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    upsert: () => builder,
    eq: () => builder,
    neq: () => builder,
    gt: () => builder,
    gte: () => builder,
    lt: () => builder,
    lte: () => builder,
    like: () => builder,
    ilike: () => builder,
    is: () => builder,
    in: () => builder,
    contains: () => builder,
    containedBy: () => builder,
    range: () => builder,
    order: () => builder,
    limit: () => builder,
    offset: () => builder,
    single: () => Promise.resolve(mockSingleResult),
    maybeSingle: () => Promise.resolve(mockResult),
    then: (resolve: any) => resolve(mockResult),
  }

  return builder
}

export async function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("[v0] Supabase credentials not configured")
    return {
      from: () => createMockQueryBuilder(),
    } as any
  }

  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Ignore errors from Server Components
        }
      },
    },
  })
}
