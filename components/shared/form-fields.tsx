'use client'

import { Info } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

function FieldTooltip({ hint }: { hint: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label="More information"
            className="inline-flex text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:text-foreground"
          />
        }
      >
        <Info className="size-3.5" />
      </TooltipTrigger>
      <TooltipContent>{hint}</TooltipContent>
    </Tooltip>
  )
}

export function SliderField({
  id,
  label,
  hint,
  min,
  max,
  step = 1,
  value,
  onChange,
  formatValue,
}: {
  id: string
  label: string
  hint?: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  formatValue?: (value: number) => string
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium">
          {label}
          {hint ? <FieldTooltip hint={hint} /> : null}
        </Label>
        <span className="min-w-10 rounded-md bg-accent px-2 py-0.5 text-center text-sm font-semibold tabular-nums text-accent-foreground">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
        aria-label={label}
      />
    </div>
  )
}

export function NumberField({
  id,
  label,
  hint,
  min,
  max,
  step = 1,
  unit,
  value,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  min: number
  max: number
  step?: number
  unit?: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="flex items-center gap-1.5 text-sm font-medium">
        {label}
        {hint ? <FieldTooltip hint={hint} /> : null}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={Number.isNaN(value) ? '' : value}
          onChange={(e) => onChange(e.target.valueAsNumber)}
          className={cn(unit && 'pr-14')}
        />
        {unit ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </div>
    </div>
  )
}
