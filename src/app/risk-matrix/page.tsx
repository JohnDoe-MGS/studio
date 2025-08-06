import AppLayout from "@/components/AppLayout";
import { RiskHeatmap } from "@/components/risk-matrix/RiskHeatmap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import type { Risk } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockRisks: Risk[] = [
  { id: '1', name: 'Vazamento de Dados de Clientes', category: 'Segurança da Informação', inherentImpact: 5, inherentLikelihood: 4, residualImpact: 3, residualLikelihood: 2 },
  { id: '2', name: 'Não conformidade com LGPD', category: 'Regulatório', inherentImpact: 5, inherentLikelihood: 3, residualImpact: 4, residualLikelihood: 2 },
  { id: '3', name: 'Interrupção do Sistema Principal', category: 'Operacional', inherentImpact: 4, inherentLikelihood: 2, residualImpact: 2, residualLikelihood: 1 },
  { id: '4', name: 'Fraude Interna', category: 'Financeiro', inherentImpact: 3, inherentLikelihood: 3, residualImpact: 2, residualLikelihood: 2 },
  { id: '5', name: 'Perda de Fornecedor Chave', category: 'Estratégico', inherentImpact: 4, inherentLikelihood: 2, residualImpact: 4, residualLikelihood: 1 },
  { id: '6', name: 'Danos à Reputação da Marca', category: 'Imagem', inherentImpact: 5, inherentLikelihood: 2, residualImpact: 3, residualLikelihood: 1 },
  { id: '7', name: 'Ataque de Ransomware', category: 'Segurança da Informação', inherentImpact: 5, inherentLikelihood: 2, residualImpact: 4, residualLikelihood: 1 },
];

const getRiskLevelBadge = (likelihood: number, impact: number): React.ReactNode => {
    const score = likelihood * impact;
    if (score <= 3) return <Badge className="bg-risk-low text-primary-foreground">Baixo</Badge>;
    if (score <= 6) return <Badge className="bg-risk-medium text-primary-foreground">Médio</Badge>;
    if (score <= 12) return <Badge className="bg-risk-high text-primary-foreground">Alto</Badge>;
    return <Badge className="bg-risk-critical text-primary-foreground">Crítico</Badge>;
};

export default function RiskMatrixPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-headline">Matriz de Riscos</h1>
              <p className="text-muted-foreground">Avalie e visualize os riscos da organização.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Risco
            </Button>
        </div>

        <RiskHeatmap risks={mockRisks} />

        <Card>
            <CardHeader>
                <CardTitle>Lista de Riscos</CardTitle>
                <CardDescription>Detalhes de todos os riscos registrados.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome do Risco</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Risco Inerente</TableHead>
                            <TableHead>Risco Residual</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockRisks.map(risk => (
                            <TableRow key={risk.id}>
                                <TableCell className="font-medium">{risk.name}</TableCell>
                                <TableCell>{risk.category}</TableCell>
                                <TableCell>{getRiskLevelBadge(risk.inherentLikelihood, risk.inherentImpact)}</TableCell>
                                <TableCell>{getRiskLevelBadge(risk.residualLikelihood, risk.residualImpact)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
