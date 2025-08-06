import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ShieldCheck } from "lucide-react";

const assessmentCategories = [
    {
        title: "Governança e Liderança",
        questions: [
            "A alta administração demonstra e comunica ativamente seu compromisso com o compliance?",
            "Existe um responsável formal (CCO) pelo programa de compliance?",
            "O programa de compliance possui autonomia e recursos adequados?",
        ]
    },
    {
        title: "Políticas e Procedimentos",
        questions: [
            "Existe um Código de Conduta formalizado e divulgado a todos?",
            "As políticas de compliance (ex: anticorrupção, conflito de interesses) estão atualizadas?",
            "Os procedimentos operacionais refletem os requisitos das políticas?",
        ]
    },
    {
        title: "Comunicação e Treinamento",
        questions: [
            "Todos os colaboradores recebem treinamento sobre o Código de Conduta anualmente?",
            "Existem treinamentos específicos para áreas de maior risco?",
            "As políticas são de fácil acesso para todos os colaboradores?",
        ]
    },
];

export default function SelfAssessmentPage() {
  // In a real app, this would come from state management
  const completedQuestions = 7;
  const totalQuestions = assessmentCategories.reduce((acc, cat) => acc + cat.questions.length, 0);
  const progressPercentage = (completedQuestions / totalQuestions) * 100;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Autoavaliação de Maturidade</h1>
          <p className="text-muted-foreground">Avalie a maturidade do seu programa de compliance.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Progresso da Avaliação</CardTitle>
                <CardDescription>{completedQuestions} de {totalQuestions} perguntas respondidas.</CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={progressPercentage} className="w-full" />
            </CardContent>
        </Card>

        <div className="space-y-6">
            {assessmentCategories.map(category => (
                <Card key={category.title}>
                    <CardHeader>
                        <CardTitle>{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {category.questions.map((question, index) => (
                             <div key={index} className="flex items-center space-x-3">
                                <Checkbox id={`${category.title}-${index}`} />
                                <Label htmlFor={`${category.title}-${index}`} className="text-sm font-normal">
                                    {question}
                                </Label>
                             </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card className="bg-secondary">
            <CardHeader className="flex-row items-center gap-4">
                <ShieldCheck className="w-12 h-12 text-primary"/>
                <div>
                    <CardTitle>Análise de Resultados</CardTitle>
                    <CardDescription>Com base nas suas respostas, seu programa de compliance está em um nível 'Estruturado'.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>Pontos Fortes: Forte engajamento da liderança e políticas bem documentadas.</p>
                <p>Oportunidades de Melhoria: Aprimorar o programa de treinamentos específicos e formalizar o monitoramento contínuo.</p>
                <div className="flex items-center gap-2 pt-2">
                    <Button>
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Gerar Riscos na Matriz
                    </Button>
                    <Button variant="outline">Exportar Relatório</Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
