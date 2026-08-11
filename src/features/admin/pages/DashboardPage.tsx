import { Link } from 'react-router'
import { useGuests } from '../useGuests'

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-guinda/40 rounded-lg border p-4 text-center">
      <dt className="text-sm text-guinda-oscuro">{label}</dt>
      <dd className="font-title text-3xl text-guinda">{value}</dd>
    </div>
  )
}

export function DashboardPage() {
  const { guests, loading, error } = useGuests()

  if (loading) {
    return <p className="p-8 text-center">Cargando…</p>
  }
  if (error) {
    return <p className="p-8 text-center text-red-700">{error}</p>
  }

  const total = guests.length
  const confirmed = guests.filter((g) => g.rsvpStatus === 'confirmed').length
  const pending = guests.filter((g) => g.rsvpStatus === 'pending').length
  const declined = guests.filter((g) => g.rsvpStatus === 'declined').length
  const totalCompanions = guests
    .filter((g) => g.rsvpStatus === 'confirmed')
    .reduce((sum, g) => sum + g.confirmedCompanions, 0)

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="font-title mb-6 text-3xl text-guinda">Dashboard</h1>
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Invitados" value={total} />
        <StatCard label="Confirmados" value={confirmed} />
        <StatCard label="Pendientes" value={pending} />
        <StatCard label="Rechazaron" value={declined} />
        <StatCard label="Acompañantes confirmados" value={totalCompanions} />
      </dl>
      <Link to="/admin/guests" className="text-guinda mt-6 inline-block underline">
        Ver invitados →
      </Link>
    </div>
  )
}
