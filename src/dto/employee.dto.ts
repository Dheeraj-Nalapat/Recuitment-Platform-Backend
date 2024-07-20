import {
  IsEmail,
 
  IsNotEmpty,
  IsNumber,
  IsString,
  
} from "class-validator";

import { Type } from "class-transformer";
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
  @IsNumber()
  experience: number;

  @IsNotEmpty()
  @IsString()
  password: string;

 
  @IsNotEmpty()
  @IsString()
  position: string;
 

 
}

export class UpdateEmployeeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsNumber()
    experience: number;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
   
    @IsNotEmpty()
    @IsString()
    position: string;
   
  
}
