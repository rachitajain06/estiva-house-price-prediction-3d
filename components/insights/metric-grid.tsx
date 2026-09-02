import { Card, CardContent } from '@/components/ui/card'
import { MODEL_METRICS, formatCurrency, formatNumber } from '@/lib/model-data'

interface Metric {
  label: string
  value: string
  hint: string
}

const METRICS: Metric[] = [
  {
    label: 'R² Score',
    value: MODEL_METRICS.r2.toFixed(3),
    hint: 'Variance in sale price explained on held-out data',
  },
  {
    label: 'RMSE',
    value: formatCurrency(MODEL_METRICS.rmse),
    hint: 'Root mean squared error, penalizes large misses',
  },
  {
    label: 'MAE',
    value: formatCurrency(MODEL_METRICS.mae),
    hint: 'Mean absolute error, typical dollar deviation',
  },
  {
    label: 'Engineered features',
    value: formatNumber(MODEL_METRICS.features),
    hint: 'Numeric and one-hot encoded predictors',
  },
]

export function MetricGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {METRICS.map((metric) => (
        <Card key={metric.label} className="gap-0">
          <CardContent className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {metric.label}
            </span>
            <span className="font-display text-3xl font-semibold tabular-nums text-foreground">
              {metric.value}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {metric.hint}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
