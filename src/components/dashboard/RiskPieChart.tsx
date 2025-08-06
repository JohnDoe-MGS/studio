"use client"

import * as React from "react"
import { Pie, PieChart, Cell, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { level: "Baixo", risks: 12, fill: "var(--color-low)" },
  { level: "Médio", risks: 25, fill: "var(--color-medium)" },
  { level: "Alto", risks: 8, fill: "var(--color-high)" },
  { level: "Crítico", risks: 5, fill: "var(--color-critical)" },
]

const chartConfig = {
  risks: {
    label: "Riscos",
  },
  low: {
    label: "Baixo",
    color: "hsl(var(--chart-2))",
  },
  medium: {
    label: "Médio",
    color: "hsl(var(--chart-4))",
  },
  high: {
    label: "Alto",
    color: "hsl(var(--chart-5))",
  },
  critical: {
    label: "Crítico",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig

export function RiskPieChart() {
  const totalRisks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.risks, 0)
  }, [])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Distribuição de Riscos</CardTitle>
        <CardDescription>Por nível de criticidade</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="level" />}
            />
            <Pie
              data={chartData}
              dataKey="risks"
              nameKey="level"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
