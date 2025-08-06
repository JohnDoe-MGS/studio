"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Risk } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const likelihoodLabels = ["Raro", "Improvável", "Possível", "Provável", "Quase Certo"];
const impactLabels = ["Insignificante", "Menor", "Moderado", "Maior", "Extremo"];

const getRiskLevel = (likelihood: number, impact: number) => {
  const score = likelihood * impact;
  if (score <= 3) return "low";
  if (score <= 6) return "medium";
  if (score <= 12) return "high";
  return "critical";
};

const getRiskColorClass = (level: string) => {
  switch (level) {
    case "low":
      return "bg-risk-low hover:bg-risk-low/80";
    case "medium":
      return "bg-risk-medium hover:bg-risk-medium/80";
    case "high":
      return "bg-risk-high hover:bg-risk-high/80";
    case "critical":
      return "bg-risk-critical hover:bg-risk-critical/80";
    default:
      return "bg-gray-100";
  }
};

interface RiskHeatmapProps {
  risks: Risk[];
}

export function RiskHeatmap({ risks }: RiskHeatmapProps) {
  const [view, setView] = useState<'inherent' | 'residual'>('inherent');

  const matrix = Array(5).fill(0).map(() => Array(5).fill(0).map(() => [] as Risk[]));

  risks.forEach(risk => {
    const likelihoodIndex = (view === 'inherent' ? risk.inherentLikelihood : risk.residualLikelihood) - 1;
    const impactIndex = (view === 'inherent' ? risk.inherentImpact : risk.residualImpact) - 1;
    if (likelihoodIndex >= 0 && likelihoodIndex < 5 && impactIndex >= 0 && impactIndex < 5) {
      matrix[4 - impactIndex][likelihoodIndex].push(risk);
    }
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Heatmap de Risco</CardTitle>
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="inherent">Inerente</TabsTrigger>
              <TabsTrigger value="residual">Residual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="flex items-center justify-center -rotate-90 -translate-x-10 w-8 h-full">
            <span className="font-bold text-sm text-muted-foreground whitespace-nowrap">Impacto →</span>
          </div>
          <div className='flex-1'>
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24 border-r"></TableHead>
                  {likelihoodLabels.map((label) => (
                    <TableHead key={label} className="text-center font-bold">{label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {impactLabels.slice().reverse().map((impactLabel, impactIndex) => (
                  <TableRow key={impactLabel}>
                    <TableHead className="font-bold border-r">{impactLabel}</TableHead>
                    {likelihoodLabels.map((_, likelihoodIndex) => {
                      const level = getRiskLevel(likelihoodIndex + 1, 5 - impactIndex);
                      const colorClass = getRiskColorClass(level);
                      const risksInCell = matrix[impactIndex][likelihoodIndex];
                      return (
                        <TableCell
                          key={`${impactLabel}-${likelihoodIndex}`}
                          className={cn(
                            "text-center font-bold text-lg cursor-pointer transition-all",
                            colorClass,
                            "text-slate-800"
                          )}
                        >
                          {risksInCell.length > 0 ? risksInCell.length : ''}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="text-center mt-2 font-bold text-sm text-muted-foreground">Probabilidade →</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
