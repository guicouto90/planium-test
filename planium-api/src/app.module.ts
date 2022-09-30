import { Module } from '@nestjs/common';
import { ProposalController } from './controllers/proposal.controller';
import { BeneficiariesModelProvider, ProposalModelProvider } from './providers';
import { BeneficiariesService } from './services/beneficiaries.service';
import { ProposalService } from './services/proposal.service';

const services = [ProposalService, BeneficiariesService];

const models = [BeneficiariesModelProvider, ProposalModelProvider];

@Module({
  imports: [],
  controllers: [ProposalController],
  providers: [...services, ...models],
})
export class AppModule {}
