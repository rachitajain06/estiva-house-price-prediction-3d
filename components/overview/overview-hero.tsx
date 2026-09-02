import Link from 'next/link'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MODEL_METRICS, formatNumber } from '@/lib/model-data'

const STATS = [
  { label: 'Model', value: MODEL_METRICS.algorithm },
  { label: 'Validation R²', value: `${(MODEL_METRICS.validationR2 * 100).toFixed(1)}%` },
  { label: 'Features', value: formatNumber(MODEL_METRICS.features) },
  { label: 'Training Homes', value: formatNumber(MODEL_METRICS.trainingHomes) },
]

export function OverviewHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-sidebar px-6 py-10 text-sidebar-foreground sm:px-10 sm:py-14">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
          ESTIVA / Home Intelligence
        </p>
        <h1 className="text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Understand what a home could be worth.
        </h1>
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-sidebar-foreground/70">
          ESTIVA uses machine learning to estimate residential property values
          from structural, quality and property-related characteristics.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/estimate" />}>
            Start an estimate
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/insights" />}
            className="border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground dark:bg-transparent"
          >
            <BarChart3 data-icon="inline-start" />
            Explore insights
          </Button>
        </div>
      </div>

      <dl className="relative mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-sidebar-border bg-sidebar-border md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-sidebar px-5 py-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-sidebar-foreground/50">
              {stat.label}
            </dt>
            <dd className="mt-1 font-display text-xl font-bold tracking-tight text-sidebar-foreground">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
