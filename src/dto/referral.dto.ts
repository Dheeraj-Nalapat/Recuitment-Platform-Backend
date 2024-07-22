import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class ReferralDto {
  @IsNotEmpty()
  @IsString()
  state: string;

  @IsOptional()
  @IsDate()
  acceptDDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  bonusGiven: boolean;
}

export class UpdateReferralDto {

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
