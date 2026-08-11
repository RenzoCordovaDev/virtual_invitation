import { isFeatureEnabled } from './config/features'
import { Countdown } from './features/countdown'
import { ScrollContainer } from './layout/ScrollContainer'
import { Section } from './layout/Section'

function App() {
  return (
    <ScrollContainer>
      {isFeatureEnabled('countdown') && (
        <Section>
          <Countdown />
        </Section>
      )}
    </ScrollContainer>
  )
}

export default App
