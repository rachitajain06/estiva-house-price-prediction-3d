import { Target, Ruler, Gauge } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { MODEL_METRICS, formatCurrency } from '@/lib/model-data'

const METRICS = [
  {
    label: 'R² Score',
    value: MODEL_METRICS.r2.toFixed(3),
    hint: 'Share of price variance explained',
    icon: Target,
  },
  {
    label: 'RMSE',
    value: formatCurrency(MODEL_METRICS.rmse),
    hint: 'Root mean squared error',
    icon: Ruler,
  },
  {
    label: 'MAE',
    value: formatCurrency(MODEL_METRICS.mae),
    hint: 'Mean absolute error',
    icon: Gauge,
  },
]

export function ModelGlance() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {METRICS.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.label}>
            <CardContent className="flex flex-col gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-[18px]" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-1 font-display text-2xl font-bold tracking-tight tabular-nums text-foreground">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.hint}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
