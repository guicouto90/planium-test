import { Injectable } from '@nestjs/common';
import { ReadWriteData } from 'src/utils/read-write-data';
import { ProposalType } from 'src/utils/types';
import { Model } from './model.interface';

@Injectable()
export class ProposalModel implements Model {
  save(body: ProposalType): void {
    ReadWriteData.writeFile(JSON.stringify(body), 'proposal');
  }
  find(): ProposalType {
    return JSON.parse(ReadWriteData.readFile('proposal'));
  }
}
