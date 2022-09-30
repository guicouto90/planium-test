import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBeneficiariesDto } from 'src/dto/create-beneficiaries.dto';
import { ProposalService } from 'src/services/proposal.service';
import { ProposalType } from 'src/utils/types';

@Controller('/plans')
export class ProposalController {
  constructor(private proposalService: ProposalService) {}

  @Post('/beneficiaries')
  addBeneficiaries(@Body() body: CreateBeneficiariesDto): void {
    this.proposalService.createBeneficiariesAndProposal(body);
  }

  @Get('/proposal')
  getProposal(): ProposalType {
    return this.proposalService.getProposal();
  }
}
