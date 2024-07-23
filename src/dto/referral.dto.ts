import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Status } from "../utils/status.enum";

export class ReferralDto {
  @IsNotEmpty()
  @IsEnum(Status)
  state: Status;

  @IsOptional()
  @IsDate()
  acceptDDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  bonusGiven: boolean;
}

export class UpdateReferralDto {

  @IsOptional()
  @IsEnum(Status)
  state: Status;

  @IsOptional()
  @IsDate()
  acceptDDate: Date;

  @IsOptional()
  @IsBoolean()
  bonusGiven: boolean;
}
