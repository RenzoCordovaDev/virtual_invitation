import { render, screen } from '@testing-library/react'
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
})
