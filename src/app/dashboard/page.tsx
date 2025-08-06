import AppLayout from "@/components/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RiskPieChart } from "@/components/dashboard/RiskPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileWarning, CheckCircle2, AlertOctagon, GanttChartSquare } from "lucide-react";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard Executivo</h1>
          <p className="text-muted-foreground">Visão geral da postura de risco e compliance.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Riscos Ativos" value="48" icon={FileWarning} description="+5% que no mês passado" />
          <MetricCard title="Controles Eficazes" value="92%" icon={CheckCircle2} description="32 de 35 controles testados" />
          <MetricCard title="Riscos Críticos" value="5" icon={AlertOctagon} description="2 necessitam de ação imediata" />
          <MetricCard title="Planos de Ação" value="12" icon={GanttChartSquare} description="7 em andamento" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
             <Card>
              <CardHeader>
                <CardTitle>Riscos de Maior Prioridade</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Risco</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Nível Residual</TableHead>
                      <TableHead className="text-right">Plano de Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Vazamento de Dados de Clientes</TableCell>
                      <TableCell>Segurança da Informação</TableCell>
                      <TableCell><Badge variant="destructive">Crítico</Badge></TableCell>
                      <TableCell className="text-right">Ativo</TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell className="font-medium">Não conformidade com LGPD</TableCell>
                      <TableCell>Regulatório</TableCell>
                      <TableCell><Badge className="bg-orange-500 text-white">Alto</Badge></TableCell>
                      <TableCell className="text-right">Ativo</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Falha na Continuidade de Negócios</TableCell>
                      <TableCell>Operacional</TableCell>
                      <TableCell><Badge className="bg-orange-500 text-white">Alto</Badge></TableCell>
                      <TableCell className="text-right">Não iniciado</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
             <RiskPieChart />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
