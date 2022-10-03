import { Test, TestingModule } from '@nestjs/testing';
import {
  BeneficiariesModelProvider,
  ProposalModelProvider,
} from 'src/providers';
import { BeneficiariesService } from 'src/services/beneficiaries.service';
import { ProposalService } from 'src/services/proposal.service';
import { ReadWriteData } from 'src/utils/read-write-data';

describe('ProposalService', () => {
  let service: ProposalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProposalService,
        BeneficiariesService,
        ProposalModelProvider,
        BeneficiariesModelProvider,
      ],
    }).compile();

    service = module.get<ProposalService>(ProposalService);
  });

  afterAll(() => {
    ReadWriteData.deleteData('beneficiaries');
    ReadWriteData.deleteData('proposal');
  });

  it(
    'Should create a new proposal, and should select the correct value of the plan' +
      'according to the number of beneficiaries ',
    () => {
      let body = {
        beneficiariesData: [
          {
            name: 'Guilherme',
            age: 32,
          },
          {
            name: 'Maria',
            age: 47,
          },
          {
            name: 'Roberto',
            age: 16,
          },
          {
            name: 'Luiz',
            age: 37,
          },
        ],
        chosenPlan: 1,
      };

      service.createBeneficiariesAndProposal(body);
      let result = service.getProposal();

      expect(result).toBeDefined();
      expect(result.quantity).toBe(4);
      expect(result.beneficiaries[0].price).toBe(11);
      expect(result.beneficiaries[1].price).toBe(14);
      expect(result.beneficiaries[2].price).toBe(9);
      expect(result.beneficiaries[3].price).toBe(11);
      expect(result.totalPrice).toBe(45);

      body = {
        beneficiariesData: [
          {
            name: 'Guilherme',
            age: 32,
          },
          {
            name: 'Maria',
            age: 47,
          },
          {
            name: 'Roberto',
            age: 16,
          },
        ],
        chosenPlan: 1,
      };
      service.createBeneficiariesAndProposal(body);
      result = service.getProposal();

      expect(result.quantity).toBe(3);
      expect(result.beneficiaries[0].price).toBe(12);
      expect(result.beneficiaries[1].price).toBe(15);
      expect(result.beneficiaries[2].price).toBe(10);
      expect(result.totalPrice).toBe(37);
      expect(result.chosenPlan).toBe('Bitix Customer Plano 1');
    },
  );
});
