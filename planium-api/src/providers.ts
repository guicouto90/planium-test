import { BeneficiariesModel } from './model/beneficiaries.model';
import { ProposalModel } from './model/proposal.model';

export const BeneficiariesModelProvider = {
  provide: BeneficiariesModel,
  useClass: BeneficiariesModel,
};

export const ProposalModelProvider = {
  provide: ProposalModel,
  useClass: ProposalModel,
};
