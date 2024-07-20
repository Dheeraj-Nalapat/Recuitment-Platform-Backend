import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsOptional()
    @IsNumber()
    experience: number;
  
    @IsOptional()
    @IsString()
    password: string;
  
   
    @IsOptional()
    @IsString()
    position: string;
   
  
}
