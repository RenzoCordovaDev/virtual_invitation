import { Route, Routes } from 'react-router'
import { AdminRoutes } from './features/admin'
import { InvitationPage } from './pages/InvitationPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<InvitationPage />} />
      <Route path="/i/:slug" element={<InvitationPage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  )
}

export default App
