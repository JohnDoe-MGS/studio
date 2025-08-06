"use client";

import { useState } from 'react';
import { extractRisksFromDocument, ExtractRisksFromDocumentOutput } from '@/ai/flows/extract-risks-from-document';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle, FileText, Bot } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function RiskIdentificationClient() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractRisksFromDocumentOutput | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Por favor, selecione um arquivo.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const documentDataUri = await fileToDataUri(file);
      const response = await extractRisksFromDocument({ documentDataUri });
      setResult(response);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao processar o documento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Análise de Risco com IA</CardTitle>
          <CardDescription>
            Faça o upload de um documento (ex: Ata de Reunião, Registro de Entrevista) para que a IA identifique e categorize os riscos potenciais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="document">Documento</Label>
              <Input id="document" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
            </div>
            <Button type="submit" disabled={loading || !file}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Analisar Documento
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro na Análise</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText /> Riscos Identificados
            </CardTitle>
            <CardDescription>
              Abaixo estão os riscos extraídos do documento fornecido.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result.risks.length > 0 ? (
              <div className="space-y-4">
                {result.risks.map((risk, index) => (
                  <Card key={index} className="bg-secondary/50">
                    <CardHeader>
                      <CardTitle className="text-base">{risk.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{risk.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">Nenhum risco foi identificado no documento.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
