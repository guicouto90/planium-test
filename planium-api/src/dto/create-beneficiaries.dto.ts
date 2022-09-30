import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateBeneficiariesDto {
  @IsNotEmpty()
  @IsArray()
  beneficiariesData: CreateBeneficiariesData[];

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  chosenPlan: number;
}

class CreateBeneficiariesData {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  age: number;
}
