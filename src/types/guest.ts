export type RsvpStatus = 'pending' | 'confirmed' | 'declined'

export interface Guest {
  /** Slug único usado en /i/:slug — también el ID del documento en Firestore. */
  slug: string
  displayName: string
  maxCompanions: number
  rsvpStatus: RsvpStatus
  confirmedCompanions: number
  dietaryRestrictions: string
  message: string
  respondedAt: string | null
  createdAt: string
}

export interface NewGuestInput {
  displayName: string
  maxCompanions: number
}

export interface RsvpSubmission {
  rsvpStatus: 'confirmed' | 'declined'
  confirmedCompanions: number
  dietaryRestrictions: string
  message: string
}
