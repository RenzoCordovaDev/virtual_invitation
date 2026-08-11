import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-12-25T17:00:00-05:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renderiza el módulo countdown (habilitado en config/features.ts)', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /falta muy poco/i })).toBeInTheDocument()
  })

  it('renderiza el módulo location: ceremonia y recepción', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Ceremonia' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Recepción' })).toBeInTheDocument()
  })

  it('renderiza el módulo dress-code', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Código de vestimenta' })).toBeInTheDocument()
  })

  it('renderiza el módulo gallery (estado "Próximamente" sin contenido cargado)', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Nuestra historia' })).toBeInTheDocument()
    expect(screen.getByText('Próximamente')).toBeInTheDocument()
  })

  it('renderiza el módulo gift-table', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Mesa de regalos' })).toBeInTheDocument()
  })

  it('no muestra el botón de música mientras no haya audio configurado', () => {
    render(<App />)
    expect(
      screen.queryByRole('button', { name: /reproducir|pausar/i }),
    ).not.toBeInTheDocument()
  })

  it('el selector de idioma cambia todo el contenido de es a en', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Código de vestimenta' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }))

    expect(screen.getByRole('heading', { name: 'Dress code' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Código de vestimenta' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cambiar a español' })).toBeInTheDocument()
  })
})
