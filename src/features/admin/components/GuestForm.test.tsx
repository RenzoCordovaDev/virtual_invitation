import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GuestForm } from './GuestForm'

describe('GuestForm', () => {
  it('crea con nombre recortado y cupo por defecto en 0', () => {
    const onSubmit = vi.fn()
    render(<GuestForm submitLabel="Crear" onSubmit={onSubmit} />)

    fireEvent.change(screen.getByLabelText(/nombre \/ familia/i), {
      target: { value: '  Familia Gómez  ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Crear' }))

    expect(onSubmit).toHaveBeenCalledWith({ displayName: 'Familia Gómez', maxCompanions: 0 })
  })

  it('no envía si el nombre está vacío', () => {
    const onSubmit = vi.fn()
    render(<GuestForm submitLabel="Crear" onSubmit={onSubmit} />)

    fireEvent.click(screen.getByRole('button', { name: 'Crear' }))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('precarga los valores iniciales en modo edición', () => {
    render(
      <GuestForm
        initialValue={{ displayName: 'Familia Ruiz', maxCompanions: 3 }}
        submitLabel="Guardar"
        onSubmit={vi.fn()}
      />,
    )

    expect(screen.getByDisplayValue('Familia Ruiz')).toBeInTheDocument()
    expect(screen.getByDisplayValue('3')).toBeInTheDocument()
  })

  it('llama a onCancel al hacer click en Cancelar', () => {
    const onCancel = vi.fn()
    render(<GuestForm submitLabel="Guardar" onSubmit={vi.fn()} onCancel={onCancel} />)

    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(onCancel).toHaveBeenCalledTimes(1)
  })
})
