import { Inject, Injectable } from '@nestjs/common';
import { ProposalModel } from 'src/model/proposal.model';
import { BeneficiariesService } from './beneficiaries.service';
import * as prices from 'src/data/prices.json';
import { PricesType, ProposalType } from 'src/utils/types';
import { CreateBeneficiariesDto } from 'src/dto/create-beneficiaries.dto';
import { ProposalModelProvider } from 'src/providers';

@Injectable()
export class ProposalService {
  constructor(
    @Inject(ProposalModelProvider.provide)
    private proposalModel: ProposalModel,
    private beneficiariesService: BeneficiariesService,
  ) {}

  // Create and save the beneficiary.json and the proposal.json
  createBeneficiariesAndProposal(body: CreateBeneficiariesDto): void {
    this.beneficiariesService.createBeneficiaries(body);
    this.createProposal();
  }

  // Get the proposal.json saved
  getProposal(): ProposalType {
    return this.proposalModel.find();
  }

  // Create and save the proposal for the plan chosen
  private createProposal(): void {
    const { chosenPlan, beneficiariesData } =
      this.beneficiariesService.getBeneficiaries();
    const price = this.getPlanPrice();
    const beneficiariesArray = [];
    beneficiariesData.forEach(({ name, age }) => {
      const range = this.getAgeRange(age);
      beneficiariesArray.push({
        beneficiary: name,
        age: age,
        chosenPlan,
        price: price[range],
      });
    });
    const totalPrice: number = beneficiariesArray.reduce(
      (a, b) => a + b.price,
      0,
    );
    const proposal = {
      beneficiaries: beneficiariesArray,
      quantity: beneficiariesArray.length,
      totalPrice,
    };
    this.proposalModel.save(proposal);
  }

  // Get the correct age range for the beneficiary
  private getAgeRange(age: number): string {
    if (age >= 0 && age <= 17) {
      return 'faixa1';
    } else if (age > 18 && age <= 40) {
      return 'faixa2';
    } else if (age > 40) {
      return 'faixa3';
    }
  }

  // Get the plan price chosen
  private getPlanPrice(): PricesType {
    const { chosenPlan, beneficiariesData } =
      this.beneficiariesService.getBeneficiaries();
    const planPrice = prices.filter(
      (price) =>
        price.codigo === chosenPlan &&
        beneficiariesData.length >= price.minimo_vidas,
    );
    if (planPrice.length > 1) {
      const indexMax = Math.max(
        ...planPrice.map((p) => p.minimo_vidas).map((p, index) => index),
      );
      return planPrice[indexMax];
    }
    return planPrice[0];
  }
}
