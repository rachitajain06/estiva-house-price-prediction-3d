'use client'

import { Minimize2, CheckCircle2, Crown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatCurrency, formatNumber } from '@/lib/model-data'
import type { ScenarioResult } from '@/lib/api'

const META: Record<
  string,
  { icon: typeof Minimize2; blurb: string }
> = {
  Compact: { icon: Minimize2, blurb: 'A scaled-down version of your property.' },
  Selected: { icon: CheckCircle2, blurb: 'The configuration you entered.' },
  Premium: { icon: Crown, blurb: 'An upgraded, higher-specification version.' },
}

export function ScenarioCards({ results }: { results: ScenarioResult[] }) {
  const baseline = results.find((r) => r.label === 'Selected')?.estimated_price

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {results.map((result) => {
        const meta = META[result.label] ?? META.Selected
        const Icon = meta.icon
        const isSelected = result.label === 'Selected'
        const delta =
          baseline && !isSelected ? result.estimated_price - baseline : null

        return (
          <Card
            key={result.label}
            className={cn(
              'transition-shadow',
              isSelected && 'ring-2 ring-primary shadow-md shadow-primary/10',
            )}
          >
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex size-9 items-center justify-center rounded-lg',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground',
                  )}
                >
                  <Icon className="size-[18px]" />
                </span>
                {isSelected ? (
                  <Badge>Selected</Badge>
                ) : delta !== null ? (
                  <Badge variant="secondary" className="tabular-nums">
                    {delta >= 0 ? '+' : '−'}
                    {formatCurrency(Math.abs(delta))}
                  </Badge>
                ) : null}
              </div>

              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  {result.label}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {meta.blurb}
                </p>
              </div>

              <p className="font-display text-3xl font-extrabold tracking-tight tabular-nums text-foreground">
                {formatCurrency(result.estimated_price)}
              </p>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-3 text-xs">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Quality</dt>
                  <dd className="font-medium text-foreground">
                    {result.overall_qual}/10
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Area</dt>
                  <dd className="font-medium text-foreground">
                    {formatNumber(result.living_area)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Garage</dt>
                  <dd className="font-medium text-foreground">
                    {result.garage_cars}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Baths</dt>
                  <dd className="font-medium text-foreground">
                    {result.full_bath}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
