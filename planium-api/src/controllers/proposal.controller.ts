import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBeneficiariesDto } from 'src/dto/create-beneficiaries.dto';
import { ProposalService } from 'src/services/proposal.service';
import { ReadWriteData } from 'src/utils/read-write-data';
import { PlanType, ProposalType } from 'src/utils/types';

@Controller('/plans')
export class ProposalController {
  constructor(private proposalService: ProposalService) {}

  @Get()
  getPlans(): PlanType[] {
    return ReadWriteData.readFile('plans');
  }

  @Post('/beneficiaries')
  addBeneficiaries(@Body() body: CreateBeneficiariesDto): void {
    this.proposalService.createBeneficiariesAndProposal(body);
  }

  @Get('/proposal')
  getProposal(): ProposalType {
    return this.proposalService.getProposal();
  }
}
