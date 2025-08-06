export type Risk = {
  id: string;
  name: string;
  category: string;
  inherentImpact: number;
  inherentLikelihood: number;
  residualImpact: number;
  residualLikelihood: number;
  actionItem?: string;
};
