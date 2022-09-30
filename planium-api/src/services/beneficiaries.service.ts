import { BeneficiariesModel } from 'src/model/beneficiaries.model';
import { BeneficiariesData, BeneficiariesType } from 'src/utils/types';
import * as plans from 'src/data/plans.json';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CreateBeneficiariesDto } from 'src/dto/create-beneficiaries.dto';
import { BeneficiariesModelProvider } from 'src/providers';

export class BeneficiariesService {
  constructor(
    @Inject(BeneficiariesModelProvider.provide)
    private beneficiariesModel: BeneficiariesModel,
  ) {}

  createBeneficiaries(body: CreateBeneficiariesDto): void {
    this.checkData(body);
    console.log(this.beneficiariesModel);
    this.beneficiariesModel.save(body);
  }

  getBeneficiaries(): BeneficiariesType {
    return this.beneficiariesModel.find();
  }

  private checkData(body: BeneficiariesType): void {
    this.isValidAge(body.beneficiariesData);
    this.isValidPlan(body.chosenPlan);
    this.hasDuplicatedNames(body.beneficiariesData);
  }

  // Verify if the plan chosen is a valid plan
  private isValidPlan(plan: number): void {
    const isValid = plans.some(({ codigo }) => codigo === plan);
    if (!isValid) throw new NotFoundException('Plan not found');
  }

  // Verify if age is equal/bigger than 0
  private isValidAge(beneficiariesData: BeneficiariesData[]): void {
    const isValid = beneficiariesData.every(({ age }) => age > 0);
    if (!isValid)
      throw new BadRequestException('Age must be equal/greater than 0');
  }

  // Verify duplicated names
  private hasDuplicatedNames(beneficiariesData: BeneficiariesData[]): void {
    const seen = new Set();
    const hasDuplicated = beneficiariesData.some(
      ({ name }) => seen.size === seen.add(name).size,
    );
    if (hasDuplicated)
      throw new BadRequestException('There are duplicated names');
  }
}
