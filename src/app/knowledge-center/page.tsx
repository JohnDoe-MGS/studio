import AppLayout from "@/components/AppLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const glossaryItems = [
  { term: "Risco Inerente", definition: "O nível de risco antes de qualquer ação de mitigação ser aplicada. É a exposição bruta ao risco na ausência de controles." },
  { term: "Risco Residual", definition: "O nível de risco que permanece após a implementação de controles e outras medidas de mitigação." },
  { term: "Heatmap (Mapa de Calor)", definition: "Uma ferramenta de visualização de dados que representa a magnitude de um fenômeno como cor em duas dimensões. Em GRC, é usado para mapear riscos com base em sua probabilidade e impacto." },
  { term: "COSO Framework", definition: "Um modelo de controle interno amplamente utilizado, desenvolvido pelo Committee of Sponsoring Organizations of the Treadway Commission." },
];

const frameworks = [
  { title: "COSO", description: "Framework de controle interno, gerenciamento de riscos e prevenção de fraudes.", link: "https://www.coso.org/" },
  { title: "ISO 37301", description: "Norma internacional para sistemas de gestão de compliance.", link: "https://www.iso.org/standard/75080.html" },
];

const pillars = [
    { title: "Suporte da Alta Gestão", description: "O comprometimento e o exemplo da liderança são fundamentais para a cultura de compliance." },
    { title: "Avaliação de Riscos", description: "Identificar, analisar e avaliar os riscos de compliance específicos da organização." },
    { title: "Políticas e Procedimentos", description: "Documentação clara que estabelece as regras e diretrizes de conduta." },
    { title: "Comunicação e Treinamento", description: "Garantir que todos os colaboradores compreendam suas responsabilidades de compliance." },
    { title: "Monitoramento e Auditoria", description: "Verificar continuamente a eficácia do programa de compliance." },
    { title: "Canal de Denúncias e Investigações", description: "Meio seguro para relatar suspeitas de irregularidades e um processo para apurá-las." },
];

export default function KnowledgeCenterPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Centro de Conhecimento</h1>
          <p className="text-muted-foreground">Recursos educacionais sobre Governança, Risco e Compliance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Glossário de Compliance</CardTitle>
                    <CardDescription>Termos técnicos e suas explicações.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {glossaryItems.map(item => (
                        <AccordionItem value={item.term} key={item.term}>
                          <AccordionTrigger>{item.term}</AccordionTrigger>
                          <AccordionContent>{item.definition}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pilares do Compliance</CardTitle>
                        <CardDescription>Os elementos fundamentais de um programa de compliance eficaz.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        {pillars.map(pillar => (
                            <div key={pillar.title} className="p-4 bg-secondary/50 rounded-lg">
                                <h3 className="font-semibold text-primary">{pillar.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Frameworks</CardTitle>
                        <CardDescription>Resumos de frameworks importantes do mercado.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {frameworks.map(fw => (
                            <Card key={fw.title}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{fw.title}</CardTitle>
                                    <CardDescription>{fw.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={fw.link} target="_blank">
                                            Saber mais <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </AppLayout>
  );
}
