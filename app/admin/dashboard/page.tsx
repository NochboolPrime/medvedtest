import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/admin-session'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/admin-dashboard'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  
  // Проверяем, установлен ли пароль
  const { data } = await supabase.from('admin_settings').select('password_hash').maybeSingle()
  const hasPassword = !!data?.password_hash
  
  // Если пароль установлен, требуем авторизацию
  if (hasPassword) {
    const session = await getAdminSession()
    if (!session) {
      redirect('/admin/login?redirect=/admin/dashboard')
    }
  }
  
  // Если пароля нет или пользователь авторизован - показываем dashboard
  return <AdminDashboard />
}
