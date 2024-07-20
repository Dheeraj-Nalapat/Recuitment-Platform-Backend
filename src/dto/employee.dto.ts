import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  
} from "class-validator";

import "reflect-metadata";

export class EmployeeDto {
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