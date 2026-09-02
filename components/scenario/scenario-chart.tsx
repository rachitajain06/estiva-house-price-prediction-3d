'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, LabelList } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { formatCurrency } from '@/lib/model-data'
import type { ScenarioResult } from '@/lib/api'

const chartConfig = {
  estimated_price: { label: 'Estimated value' },
} satisfies ChartConfig

const COLORS = ['var(--chart-3)', 'var(--chart-1)', 'var(--chart-2)']

export function ScenarioChart({ data }: { data: ScenarioResult[] }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
      <BarChart
        data={data}
        margin={{ top: 24, right: 12, left: 12, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={70}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value) => formatCurrency(Number(value))}
              hideLabel={false}
            />
          }
        />
        <Bar dataKey="estimated_price" radius={[6, 6, 0, 0]} maxBarSize={90}>
          {data.map((entry, index) => (
            <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
          ))}
          <LabelList
            dataKey="estimated_price"
            position="top"
            className="fill-foreground"
            fontSize={12}
            fontWeight={600}
            formatter={(v: number) => formatCurrency(v)}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
