import { cookies } from "next/headers"

const ADMIN_SESSION_COOKIE = "admin_session"
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function createAdminSession() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_SESSION_COOKIE, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  })
}

export async function deleteAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "true"
}
