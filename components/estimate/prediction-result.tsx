'use client'

import {
  TrendingUp,
  AlertCircle,
  Home,
  Maximize2,
  CalendarDays,
  Car,
  RefreshCw,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { PredictionResponse } from '@/lib/api'
import { formatCurrency, formatNumber } from '@/lib/model-data'

export interface SnapshotData {
  overallQual: number
  livingArea: number
  yearBuilt: number
  garageCars: number
}

export type ResultState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; result: PredictionResponse; snapshot: SnapshotData }

const DISCLAIMER =
  "The displayed range is based on the model's validation RMSE. It represents statistical uncertainty and is not a formal property appraisal."

export function PredictionResult({
  state,
  onRetry,
}: {
  state: ResultState
  onRetry?: () => void
}) {
  if (state.status === 'idle') {
    return (
      <Card className="h-full border-dashed">
        <CardContent className="flex h-full min-h-72 flex-col items-center justify-center gap-3 text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <TrendingUp className="size-6" />
          </span>
          <div>
            <p className="font-display text-base font-semibold text-foreground">
              No estimate yet
            </p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Adjust the property characteristics and calculate an estimate to
              see the projected market value here.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (state.status === 'loading') {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col gap-6 py-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-12 w-56" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
            <Skeleton className="h-14" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (state.status === 'error') {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full flex-col justify-center gap-4 py-6">
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>We couldn&apos;t calculate an estimate</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
          {onRetry ? (
            <Button variant="outline" onClick={onRetry} className="self-start">
              <RefreshCw data-icon="inline-start" />
              Try again
            </Button>
          ) : null}
        </CardContent>
      </Card>
    )
  }

  const { result, snapshot } = state
  const snapshotItems = [
    { label: 'Overall Quality', value: `${snapshot.overallQual} / 10`, icon: Home },
    {
      label: 'Living Area',
      value: `${formatNumber(snapshot.livingArea)} sq ft`,
      icon: Maximize2,
    },
    { label: 'Year Built', value: `${snapshot.yearBuilt}`, icon: CalendarDays },
    {
      label: 'Garage',
      value: snapshot.garageCars === 1 ? '1 car' : `${snapshot.garageCars} cars`,
      icon: Car,
    },
  ]

  return (
    <Card className="h-full overflow-hidden">
      <div className="bg-sidebar px-5 py-6 text-sidebar-foreground">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/60">
            Estimated Market Value
          </p>
          <Badge className="bg-primary/20 text-primary-foreground">XGBoost</Badge>
        </div>
        <p className="mt-2 font-display text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl">
          {formatCurrency(result.estimated_price)}
        </p>
      </div>

      <CardContent className="flex flex-col gap-6 pt-2">
        <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-border text-center">
          <div className="border-r border-border px-3 py-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Lower Estimate
            </p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-foreground sm:text-base">
              {formatCurrency(result.lower_estimate)}
            </p>
          </div>
          <div className="border-r border-border bg-primary/5 px-3 py-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-primary">
              Model Estimate
            </p>
            <p className="mt-1 text-sm font-bold tabular-nums text-foreground sm:text-base">
              {formatCurrency(result.estimated_price)}
            </p>
          </div>
          <div className="px-3 py-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Upper Estimate
            </p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-foreground sm:text-base">
              {formatCurrency(result.upper_estimate)}
            </p>
          </div>
        </div>

        <p className="rounded-lg bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          {DISCLAIMER}
        </p>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Property Snapshot
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {snapshotItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
