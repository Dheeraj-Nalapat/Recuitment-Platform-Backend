import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class referralDto {
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @IsNotEmpty()
  @IsNumber()
  candidateId: number;

  @IsNotEmpty()
  @IsNumber()
  jobId: number;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsDate()
  acceptDDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  bonusGiven: boolean;
}

export class UpdatereferralDto {
  @IsOptional()
  @IsNumber()
  employeeId: number;

  @IsOptional()
  @IsNumber()
  candidateId: number;

  @IsOptional()
  @IsNumber()
  jobId: number;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsDate()
  acceptDDate: Date;

  @IsOptional()
  @IsBoolean()
  bonusGiven: boolean;
}
