export type BeneficiariesData = {
  name: string;
  age: number;
};

export type BeneficiariesType = {
  beneficiariesData: BeneficiariesData[];
  chosenPlan: number;
};

export type PricesType = {
  codigo: number;
  minimo_vidas: number;
  faixa1: number;
  faixa2: number;
  faixa3: number;
};

export type PlanType = {
  registro: string;
  nome: string;
  codigo: number;
};

export type BeneficiaryProposalType = {
  benecifiary: string;
  age: number;
  chosenPlan: number;
  price: number;
};

export type ProposalType = {
  beneficiaries: BeneficiaryProposalType[];
  quantity: number;
  totalPrice: number;
};
