import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('muestra los nombres de los novios', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /teresa.*renzo/i })).toBeInTheDocument()
  })
})
