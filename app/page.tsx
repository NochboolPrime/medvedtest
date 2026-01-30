import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/admin-session"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function Home() {
  const isAdmin = await getAdminSession()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
