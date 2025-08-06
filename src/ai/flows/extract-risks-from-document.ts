// src/ai/flows/extract-risks-from-document.ts
'use server';
/**
 * @fileOverview An AI agent to extract and categorize potential risks from documents.
 *
 * - extractRisksFromDocument - A function that handles the risk extraction process.
 * - ExtractRisksFromDocumentInput - The input type for the extractRisksFromDocument function.
 * - ExtractRisksFromDocumentOutput - The return type for the extractRisksFromDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractRisksFromDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "The document to extract risks from, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractRisksFromDocumentInput = z.infer<typeof ExtractRisksFromDocumentInputSchema>;

const ExtractRisksFromDocumentOutputSchema = z.object({
  risks: z.array(
    z.object({
      category: z.string().describe('The category of the risk.'),
      description: z.string().describe('A description of the risk.'),
    })
  ).describe('A list of risks extracted from the document, with their categories and descriptions.'),
});
export type ExtractRisksFromDocumentOutput = z.infer<typeof ExtractRisksFromDocumentOutputSchema>;

export async function extractRisksFromDocument(input: ExtractRisksFromDocumentInput): Promise<ExtractRisksFromDocumentOutput> {
  return extractRisksFromDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractRisksFromDocumentPrompt',
  input: {schema: ExtractRisksFromDocumentInputSchema},
  output: {schema: ExtractRisksFromDocumentOutputSchema},
  prompt: `Você é um especialista em GRC (Governança, Risco e Compliance).
Analise o documento fornecido e extraia todos os riscos potenciais mencionados nele.
Categorize cada risco e forneça uma breve descrição.

Documento: {{media url=documentDataUri}}

Formato de saída:
[{
  "category": "[Categoria do Risco]",
  "description": "[Descrição do Risco]"
}]
`,
});

const extractRisksFromDocumentFlow = ai.defineFlow(
  {
    name: 'extractRisksFromDocumentFlow',
    inputSchema: ExtractRisksFromDocumentInputSchema,
    outputSchema: ExtractRisksFromDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
