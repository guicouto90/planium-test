import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiariesModelProvider } from 'src/providers';
import { BeneficiariesService } from 'src/services/beneficiaries.service';
import { ReadWriteData } from 'src/utils/read-write-data';

describe('BeneficiariesService', () => {
  let service: BeneficiariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeneficiariesService, BeneficiariesModelProvider],
    }).compile();

    service = module.get<BeneficiariesService>(BeneficiariesService);
  });

  afterAll(() => ReadWriteData.deleteData('beneficiaries'));

  it('Should create new beneficiaries', () => {
    const body = {
      beneficiariesData: [
        {
          name: 'Guilherme',
          age: 32,
        },
      ],
      chosenPlan: 2,
    };

    service.createBeneficiaries(body);
    const result = service.getBeneficiaries();

    expect(result).toBeDefined();
    expect(result.chosenPlan).toBe(2);
    expect(result.beneficiariesData[0].name).toBe('Guilherme');
    expect(result.beneficiariesData[0].age).toBe(32);
  });

  it('Should throw an error when the age is less than 0', () => {
    const body = {
      beneficiariesData: [
        {
          name: 'Guilherme',
          age: -1,
        },
      ],
      chosenPlan: 2,
    };

    expect(() => service.createBeneficiaries(body)).toThrow(
      BadRequestException,
    );
    expect(() => service.createBeneficiaries(body)).toThrow(
      'Age must be equal/greater than 0',
    );
  });

  it('Should throw an error when the chosen plan is not registered', () => {
    const body = {
      beneficiariesData: [
        {
          name: 'Guilherme',
          age: 32,
        },
      ],
      chosenPlan: 7,
    };

    expect(() => service.createBeneficiaries(body)).toThrow(NotFoundException);
    expect(() => service.createBeneficiaries(body)).toThrow('Plan not found');
  });

  it('Should throw an error when there are duplicated names being registered', () => {
    const body = {
      beneficiariesData: [
        {
          name: 'Guilherme',
          age: 32,
        },
        {
          name: 'Guilherme',
          age: 3,
        },
      ],
      chosenPlan: 5,
    };

    expect(() => service.createBeneficiaries(body)).toThrow(
      BadRequestException,
    );
    expect(() => service.createBeneficiaries(body)).toThrow(
      'There are duplicated names',
    );
  });
});
