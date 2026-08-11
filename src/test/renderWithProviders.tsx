import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import { I18nProvider } from '../features/i18n'

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: I18nProvider, ...options })
}
