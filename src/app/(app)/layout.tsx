import DashboardLayout from '@/components/layout/DashboardLayout'
import AuthGate from '@/components/AuthGate'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGate>
  )
}
