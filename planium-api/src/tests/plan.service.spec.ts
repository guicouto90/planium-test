import { ProposalModel } from 'src/model/proposal.model';
import { BeneficiariesService } from 'src/services/beneficiaries.service';
import { ProposalService } from 'src/services/proposal.service';
import { ReadWriteData } from 'src/utils/read-write-data';
import { IntegrationTestDependencies } from './shared/integration-test-dependencies';

describe('ProposalService', () => {
  afterEach(() => {
    ReadWriteData.deleteData('proposal');
    ReadWriteData.deleteData('beneficiaries');
  });

  it('Should create a new Proposal', () => {
    const { sut } = makeSut();
    sut.createBeneficiariesAndProposal(body);

    const result = sut.getProposal();

    expect(result).toBeDefined();
  });
});

function makeSut(): SutTypes {
  const { proposalModel, beneficiariesService } = IntegrationTestDependencies;
  return {
    sut: new ProposalService(proposalModel, beneficiariesService),
    beneficiariesService,
    proposalModel,
  };
}

type SutTypes = {
  sut: ProposalService;
  beneficiariesService: BeneficiariesService;
  proposalModel: ProposalModel;
};

const body = {
  beneficiariesData: [
    {
      name: 'Guilherme Couto da Silva',
      age: 32,
    },
  ],
  chosenPlan: 5,
};
