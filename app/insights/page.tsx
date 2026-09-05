import { MetricGrid } from '@/components/insights/metric-grid'
import { ModelComparison } from '@/components/insights/model-comparison'
import { Container } from '@/components/shared/container'

export default function InsightsPage() {
  return (
    <Container>
      <div className="flex flex-col gap-8">

        {/* Page Header */}
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            INSIGHTS
          </p>

          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Explore model insights
          </h1>

          <p className="mt-2 max-w-3xl text-base leading-7 text-muted-foreground">
            Explore model performance, validation metrics, and the algorithms
            evaluated for ESTIVA.
          </p>
        </div>

        {/* Metrics */}
        <MetricGrid />

        {/* Model Comparison */}
        <ModelComparison />

      </div>
    </Container>
  )
}