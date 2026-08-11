import { isFeatureEnabled } from '../config/features'
import { Countdown } from '../features/countdown'
import { DressCodeSection } from '../features/dress-code'
import { GallerySection } from '../features/gallery'
import { GiftTableSection } from '../features/gift-table'
import { I18nProvider, LanguageToggle } from '../features/i18n'
import { CeremonySection, ReceptionSection } from '../features/location'
import { MusicPlayerToggle } from '../features/music-player'
import { ScrollContainer } from '../layout/ScrollContainer'
import { Section } from '../layout/Section'

/**
 * Renderiza tanto "/" (genérica) como "/i/:slug" (personalizada) — la
 * personalización por invitado se agrega en el módulo rsvp (ver
 * docs/DESIGN.md sección 3).
 */
export function InvitationPage() {
  return (
    <I18nProvider>
      <ScrollContainer>
        {isFeatureEnabled('countdown') && (
          <Section>
            <Countdown />
          </Section>
        )}
        {isFeatureEnabled('gallery') && (
          <Section>
            <GallerySection />
          </Section>
        )}
        {isFeatureEnabled('location') && (
          <>
            <Section>
              <CeremonySection />
            </Section>
            <Section>
              <ReceptionSection />
            </Section>
          </>
        )}
        {isFeatureEnabled('dressCode') && (
          <Section>
            <DressCodeSection />
          </Section>
        )}
        {isFeatureEnabled('giftTable') && (
          <Section>
            <GiftTableSection />
          </Section>
        )}
      </ScrollContainer>
      {isFeatureEnabled('musicPlayer') && <MusicPlayerToggle />}
      {isFeatureEnabled('i18n') && <LanguageToggle />}
    </I18nProvider>
  )
}
