import AppLayout from "@/components/AppLayout";
import { RiskIdentificationClient } from "@/components/ai/RiskIdentificationClient";

export default function AiRiskIdentificationPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Identificação de Riscos com IA</h1>
          <p className="text-muted-foreground">Use a inteligência artificial para extrair riscos de seus documentos.</p>
        </div>
        <RiskIdentificationClient />
      </div>
    </AppLayout>
  );
}
