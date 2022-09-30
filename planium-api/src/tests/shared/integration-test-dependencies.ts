import { BeneficiariesModel } from 'src/model/beneficiaries.model';
import { ProposalModel } from 'src/model/proposal.model';
import { BeneficiariesService } from 'src/services/beneficiaries.service';

export class IntegrationTestDependencies {
  public static readonly proposalModel = new ProposalModel();

  public static readonly beneficiariesModel = new BeneficiariesModel();

  public static readonly beneficiariesService = new BeneficiariesService(
    this.beneficiariesModel,
  );
}
