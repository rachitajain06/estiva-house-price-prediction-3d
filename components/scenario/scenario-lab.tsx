'use client'

import { useState } from 'react'
import { GitCompareArrows, AlertCircle, FlaskConical } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { SliderField, NumberField } from '@/components/shared/form-fields'
import { ScenarioCards } from '@/components/scenario/scenario-cards'
import { ScenarioChart } from '@/components/scenario/scenario-chart'
import {
  runScenarios,
  ApiError,
  type ScenarioInput,
  type ScenarioResult,
} from '@/lib/api'

interface BaseInputs {
  overall_qual: number
  living_area: number
  year_built: number
  garage_cars: number
  full_bath: number
  fireplaces: number
}

const DEFAULTS: BaseInputs = {
  overall_qual: 6,
  living_area: 1800,
  year_built: 2005,
  garage_cars: 2,
  full_bath: 2,
  fireplaces: 1,
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

/** Build the three comparison scenarios from the user's selected property. */
function buildScenarios(base: BaseInputs): ScenarioInput[] {
  return [
    {
      label: 'Compact',
      overall_qual: clamp(base.overall_qual - 2, 1, 10),
      living_area: Math.round(base.living_area * 0.8),
      year_built: base.year_built,
      garage_cars: clamp(base.garage_cars - 1, 0, 5),
      full_bath: clamp(base.full_bath - 1, 0, 5),
      fireplaces: clamp(base.fireplaces - 1, 0, 5),
    },
    {
      label: 'Selected',
      overall_qual: base.overall_qual,
      living_area: base.living_area,
      year_built: base.year_built,
      garage_cars: base.garage_cars,
      full_bath: base.full_bath,
      fireplaces: base.fireplaces,
    },
    {
      label: 'Premium',
      overall_qual: clamp(base.overall_qual + 2, 1, 10),
      living_area: Math.round(base.living_area * 1.25),
      year_built: base.year_built,
      garage_cars: clamp(base.garage_cars + 1, 0, 5),
      full_bath: clamp(base.full_bath + 1, 0, 5),
      fireplaces: clamp(base.fireplaces + 1, 0, 5),
    },
  ]
}

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; results: ScenarioResult[] }

export function ScenarioLab() {
  const [base, setBase] = useState<BaseInputs>(DEFAULTS)
  const [state, setState] = useState<State>({ status: 'idle' })

  function update<K extends keyof BaseInputs>(key: K, value: number) {
    setBase((prev) => ({ ...prev, [key]: value }))
  }

  async function run() {
    setState({ status: 'loading' })
    try {
      const { scenarios } = await runScenarios(buildScenarios(base))
      setState({ status: 'success', results: scenarios })
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'An unexpected error occurred while running the scenario comparison.'
      setState({ status: 'error', message })
    }
  }

  const isLoading = state.status === 'loading'

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="font-display text-lg font-bold">
            Base property
          </CardTitle>
          <CardDescription>
            Define a property, then compare compact, selected and premium
            versions side by side.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void run()
            }}
            className="flex flex-col gap-7"
          >
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              <SliderField
                id="s_overall_qual"
                label="Overall Quality"
                min={1}
                max={10}
                value={base.overall_qual}
                onChange={(v) => update('overall_qual', v)}
                formatValue={(v) => `${v}/10`}
              />
              <NumberField
                id="s_living_area"
                label="Living Area"
                min={200}
                max={10000}
                step={10}
                unit="sq ft"
                value={base.living_area}
                onChange={(v) => update('living_area', v)}
              />
              <NumberField
                id="s_year_built"
                label="Year Built"
                min={1800}
                max={2026}
                value={base.year_built}
                onChange={(v) => update('year_built', v)}
              />
              <SliderField
                id="s_garage_cars"
                label="Garage Capacity"
                min={0}
                max={5}
                value={base.garage_cars}
                onChange={(v) => update('garage_cars', v)}
              />
              <SliderField
                id="s_full_bath"
                label="Full Bathrooms"
                min={0}
                max={5}
                value={base.full_bath}
                onChange={(v) => update('full_bath', v)}
              />
              <SliderField
                id="s_fireplaces"
                label="Fireplaces"
                min={0}
                max={5}
                value={base.fireplaces}
                onChange={(v) => update('fireplaces', v)}
              />
            </div>
            <div className="border-t border-border pt-5">
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <GitCompareArrows data-icon="inline-start" />
                )}
                Run scenario comparison
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {state.status === 'idle' ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-14 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <FlaskConical className="size-6" />
            </span>
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                No comparison yet
              </p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Run a comparison to see how compact and premium variants of your
                property compare in estimated value.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {state.status === 'loading' ? (
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-56" />
            <Skeleton className="h-56" />
            <Skeleton className="h-56" />
          </div>
          <Skeleton className="h-72" />
        </div>
      ) : null}

      {state.status === 'error' ? (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertTitle>Scenario comparison failed</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      {state.status === 'success' ? (
        <div className="flex flex-col gap-6">
          <ScenarioCards results={state.results} />
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="font-display text-base font-bold">
                Estimated value comparison
              </CardTitle>
              <CardDescription>
                Projected market value for each scenario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScenarioChart data={state.results} />
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
