import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/admin-session'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()
  
  // Проверяем, установлен ли пароль
  const { data } = await supabase.from('admin_settings').select('password_hash').maybeSingle()
  const hasPassword = !!data?.password_hash
  
  // Если пароля нет - пускаем сразу на dashboard
  if (!hasPassword) {
    redirect('/admin/dashboard')
  }
  
  // Если пароль есть - проверяем сессию
  const session = await getAdminSession()
  
  if (session) {
    redirect('/admin/dashboard')
  } else {
    redirect('/admin/login')
  }
}
