import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import "reflect-metadata";

export class CreateJobOpeningDto {
  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  // @IsJSON()
  description: {
    responsibility: { point: string }[];
    qualification: { point: string }[];
  };

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsNumber()
  noOfOpening: number;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  // @IsJSON()
  skills: { name: string }[];
}

export class UpdateJobOPeningDto {
  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  description: {
    responsibility: { point: string }[];
    qualification: { point: string }[];
  };

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsNumber()
  noOfOpening: number;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString()
  skills: { name: string }[];
}
