import { Navigate, Route, Routes } from 'react-router'
import { AdminLayout } from './AdminLayout'
import { DashboardPage } from './pages/DashboardPage'
import { GuestsPage } from './pages/GuestsPage'
import { LoginPage } from './pages/LoginPage'
import { RequireAdmin } from './RequireAdmin'

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        index
        element={
          <RequireAdmin>
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          </RequireAdmin>
        }
      />
      <Route
        path="guests"
        element={
          <RequireAdmin>
            <AdminLayout>
              <GuestsPage />
            </AdminLayout>
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
