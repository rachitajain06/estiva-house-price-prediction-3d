'use client'

import { useState } from 'react'

import { Sparkles, RotateCcw } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  SliderField,
  NumberField,
} from '@/components/shared/form-fields'

import {
  PredictionResult,
  type ResultState,
} from '@/components/estimate/prediction-result'

import {
  predictPrice,
  ApiError,
  type PredictionRequest,
  type QualityCode,
} from '@/lib/api'

import {
  QUALITY_OPTIONS,
} from '@/lib/model-data'

import { usePredictionHistory } from '@/lib/prediction-history'

const DEFAULTS: PredictionRequest = {
  overall_qual: 5,
  year_built: 2000,
  living_area: 1500,
  basement_area: 1000,
  first_floor: 1000,
  fireplaces: 1,
  garage_cars: 2,
  full_bath: 2,
  half_bath: 1,
  exterior_quality: 'TA',
  kitchen_quality: 'TA',
}

export function EstimateForm() {
  const [form, setForm] = useState<PredictionRequest>(DEFAULTS)

  const [state, setState] = useState<ResultState>({
    status: 'idle',
  })

  const { addEntry } = usePredictionHistory()

  function update<K extends keyof PredictionRequest>(
    key: K,
    value: PredictionRequest[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  async function runPrediction() {
    setState({
      status: 'loading',
    })

    try {
      const result = await predictPrice(form)

      const snapshot = {
        overallQual: form.overall_qual,
        livingArea: form.living_area,
        yearBuilt: form.year_built,
        garageCars: form.garage_cars,
      }

      setState({
        status: 'success',
        result,
        snapshot,
      })

      addEntry(form, result)
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'An unexpected error occurred while contacting the prediction service.'

      setState({
        status: 'error',
        message,
      })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    void runPrediction()
  }

  function handleReset() {
    setForm(DEFAULTS)
    setState({
      status: 'idle',
    })
  }

  const isLoading = state.status === 'loading'

  return (
    <div className="flex flex-col gap-6">

      {/* Property Form */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="font-display text-lg font-bold">
            Property characteristics
          </CardTitle>

          <CardDescription>
            Provide the details below. All fields feed directly into the model.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-7"
          >
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">

              {/* Overall Quality */}
              <SliderField
                id="overall_qual"
                label="Overall Quality"
                hint="Overall material and finish quality of the home, rated 1 (very poor) to 10 (excellent)."
                min={1}
                max={10}
                value={form.overall_qual}
                onChange={(v) => update('overall_qual', v)}
                formatValue={(v) => `${v}/10`}
              />

              {/* Year Built */}
              <NumberField
                id="year_built"
                label="Year Built"
                hint="Original construction year of the property."
                min={1800}
                max={2026}
                value={form.year_built}
                onChange={(v) => update('year_built', v)}
              />

              {/* Living Area */}
              <NumberField
                id="living_area"
                label="Living Area"
                hint="Above-grade (ground) living area."
                min={200}
                max={10000}
                step={10}
                unit="sq ft"
                value={form.living_area}
                onChange={(v) => update('living_area', v)}
              />

              {/* Basement Area */}
              <NumberField
                id="basement_area"
                label="Basement Area"
                hint="Total basement area. Use 0 if there is no basement."
                min={0}
                max={5000}
                step={10}
                unit="sq ft"
                value={form.basement_area}
                onChange={(v) => update('basement_area', v)}
              />

              {/* 1st Floor */}
              <NumberField
                id="first_floor"
                label="1st Floor Area"
                hint="First-floor square footage."
                min={200}
                max={5000}
                step={10}
                unit="sq ft"
                value={form.first_floor}
                onChange={(v) => update('first_floor', v)}
              />

              {/* Fireplaces */}
              <SliderField
                id="fireplaces"
                label="Fireplaces"
                hint="Number of fireplaces in the home."
                min={0}
                max={5}
                value={form.fireplaces}
                onChange={(v) => update('fireplaces', v)}
              />

              {/* Garage */}
              <SliderField
                id="garage_cars"
                label="Garage Capacity"
                hint="Garage size measured in car capacity."
                min={0}
                max={5}
                value={form.garage_cars}
                onChange={(v) => update('garage_cars', v)}
              />

              {/* Full Bathrooms */}
              <SliderField
                id="full_bath"
                label="Full Bathrooms"
                hint="Number of full bathrooms above grade."
                min={0}
                max={5}
                value={form.full_bath}
                onChange={(v) => update('full_bath', v)}
              />

              {/* Half Bathrooms */}
              <SliderField
                id="half_bath"
                label="Half Bathrooms"
                hint="Number of half bathrooms above grade."
                min={0}
                max={3}
                value={form.half_bath}
                onChange={(v) => update('half_bath', v)}
              />

              {/* Exterior Quality */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="exterior_quality"
                  className="text-sm font-medium"
                >
                  Exterior Quality
                </Label>

                <Select
                  value={form.exterior_quality}
                  onValueChange={(v) =>
                    update(
                      'exterior_quality',
                      v as QualityCode,
                    )
                  }
                >
                  <SelectTrigger
                    id="exterior_quality"
                    className="w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {QUALITY_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Kitchen Quality */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="kitchen_quality"
                  className="text-sm font-medium"
                >
                  Kitchen Quality
                </Label>

                <Select
                  value={form.kitchen_quality}
                  onValueChange={(v) =>
                    update(
                      'kitchen_quality',
                      v as QualityCode,
                    )
                  }
                >
                  <SelectTrigger
                    id="kitchen_quality"
                    className="w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {QUALITY_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">

              <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                disabled={isLoading}
              >
                <RotateCcw data-icon="inline-start" />
                Reset
              </Button>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <Sparkles data-icon="inline-start" />
                )}

                Calculate estimated value
              </Button>

            </div>
          </form>
        </CardContent>
      </Card>

      {/* Prediction Result */}
      {state.status !== 'idle' && (
        <div className="w-full">
          <PredictionResult
            state={state}
            onRetry={() => void runPrediction()}
          />
        </div>
      )}

    </div>
  )
}