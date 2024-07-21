import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class PositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdatePositionDto {
  @IsOptional()
  @IsString()
  name: string;
}
