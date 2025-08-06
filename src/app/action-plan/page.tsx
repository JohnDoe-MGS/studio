import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

const actionItems = [
  { id: '1', action: 'Implementar 2FA para todos os sistemas críticos', risk: 'Vazamento de Dados de Clientes', owner: 'TI', status: 'Em andamento', dueDate: '30/08/2024' },
  { id: '2', action: 'Revisar e atualizar a Política de Privacidade', risk: 'Não conformidade com LGPD', owner: 'Jurídico', status: 'Concluído', dueDate: '01/07/2024' },
  { id: '3', action: 'Contratar seguro cyber', risk: 'Ataque de Ransomware', owner: 'Financeiro', status: 'Não iniciado', dueDate: '15/09/2024' },
  { id: '4', action: 'Realizar treinamento de conscientização sobre phishing', risk: 'Vazamento de Dados de Clientes', owner: 'RH/TI', status: 'Em andamento', dueDate: '20/08/2024' },
  { id: '5', action: 'Desenvolver plano de resposta a incidentes', risk: 'Falha na Continuidade de Negócios', owner: 'TI', status: 'Atrasado', dueDate: '15/07/2024' },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Concluído':
            return <Badge variant="secondary" className="bg-green-100 text-green-800">Concluído</Badge>;
        case 'Em andamento':
            return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Em andamento</Badge>;
        case 'Não iniciado':
            return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Não iniciado</Badge>;
        case 'Atrasado':
            return <Badge variant="destructive">Atrasado</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
}

export default function ActionPlanPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight font-headline">Plano de Ação</h1>
              <p className="text-muted-foreground">Crie e acompanhe os itens de ação para mitigar riscos.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Criar Item de Ação
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Lista de Ações</CardTitle>
                <CardDescription>Ações de mitigação de risco em andamento ou planejadas.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ação</TableHead>
                            <TableHead>Risco Associado</TableHead>
                            <TableHead>Responsável</TableHead>
                            <TableHead>Prazo</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {actionItems.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.action}</TableCell>
                                <TableCell className="text-muted-foreground">{item.risk}</TableCell>
                                <TableCell>{item.owner}</TableCell>
                                <TableCell>{item.dueDate}</TableCell>
                                <TableCell>{getStatusBadge(item.status)}</TableCell>
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
