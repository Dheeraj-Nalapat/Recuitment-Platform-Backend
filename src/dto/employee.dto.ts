import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import "reflect-metadata";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  position: string;
}

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  position: string;
}
