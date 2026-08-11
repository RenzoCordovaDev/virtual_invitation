import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { InvitationPage } from './pages/InvitationPage'

// Code-split: el panel admin (y el SDK de Firebase Auth que trae) no debe
// pesar en el bundle de los invitados, que son la inmensa mayoría de las
// visitas y llegan por un link de WhatsApp (ver docs/DESIGN.md, mobile-first).
const AdminRoutes = lazy(() =>
  import('./features/admin').then((module) => ({ default: module.AdminRoutes })),
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<InvitationPage />} />
      <Route path="/i/:slug" element={<InvitationPage />} />
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<p className="p-8 text-center">Cargando…</p>}>
            <AdminRoutes />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
