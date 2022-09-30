import { Injectable } from '@nestjs/common';
import { ReadWriteData } from 'src/utils/read-write-data';
import { BeneficiariesType } from 'src/utils/types';
import { Model } from './model.interface';

@Injectable()
export class BeneficiariesModel implements Model {
  save(body: BeneficiariesType): void {
    ReadWriteData.writeFile(JSON.stringify(body), 'beneficiaries');
  }
  find(): BeneficiariesType {
    return JSON.parse(ReadWriteData.readFile('beneficiaries'));
  }
}
