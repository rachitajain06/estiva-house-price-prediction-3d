import { Container } from '@/components/shared/container'
import { OverviewHero } from '@/components/overview/overview-hero'
import { FeatureCards } from '@/components/overview/feature-cards'
import { ModelGlance } from '@/components/overview/model-glance'

export default function OverviewPage() {
  return (
    <Container className="flex flex-col gap-12">
      <OverviewHero />

      <section className="flex flex-col gap-6">
        <div className="max-w-2xl">
          <h2 className="text-balance font-display text-2xl font-bold tracking-tight text-foreground">
            A data-driven view of property value.
          </h2>
          <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
            Explore an estimated market value, compare different property
            scenarios, and understand the model behind every prediction. ESTIVA
            turns a machine-learning house-price model into an intuitive
            property estimation experience.
          </p>
        </div>
        <FeatureCards />
      </section>

      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              Model at a glance
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Validation performance on held-out Ames Housing data.
            </p>
          </div>
        </div>
        <ModelGlance />
      </section>
    </Container>
  )
}
