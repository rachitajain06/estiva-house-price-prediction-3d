'use client'

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { MODEL_COMPARISON, formatCurrency } from '@/lib/model-data'

const chartConfig = {
  rmse: { label: 'RMSE', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function ModelComparison() {
  const chartData = MODEL_COMPARISON.map((row) => ({
    model: row.model.replace('Gradient Boosting', 'Grad. Boost'),
    rmse: Math.round(row.rmse),
    isFinal: row.isFinal ?? false,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model selection</CardTitle>
        <CardDescription>
          Cross-validated error across candidate algorithms. Lower RMSE is
          better; XGBoost was promoted to production.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ left: 8, right: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="model"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={52}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              fontSize={12}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <Bar dataKey="rmse" radius={[6, 6, 0, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.model}
                  fill={entry.isFinal ? 'var(--chart-1)' : 'var(--muted-foreground)'}
                  fillOpacity={entry.isFinal ? 1 : 0.35}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">RMSE</TableHead>
              <TableHead className="text-right">MAE</TableHead>
              <TableHead className="text-right">R²</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MODEL_COMPARISON.map((row) => (
              <TableRow key={row.model}>
                <TableCell className="font-medium">
                  <span className="flex items-center gap-2">
                    {row.model}
                    {row.isFinal ? (
                      <Badge variant="secondary">Production</Badge>
                    ) : null}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(row.rmse)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatCurrency(row.mae)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.r2.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
