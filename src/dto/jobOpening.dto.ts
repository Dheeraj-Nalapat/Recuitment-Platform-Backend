import {
  IsArray,
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
  description: {
    responsibility: string[];
    qualification: string[];
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
  @IsArray()
  @IsString({ each: true })
  skills: string[];
}

export class UpdateJobOPeningDto {
  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  description: {
    responsibility: string[];
    qualification: string[];
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

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skills: string[];
}
