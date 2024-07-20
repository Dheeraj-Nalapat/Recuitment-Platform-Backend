import {
    IsEmail,
   
    IsNotEmpty,
    IsNumber,
    IsString,
    
  } from "class-validator";
  
  import { Type } from "class-transformer";
  import "reflect-metadata";
  
  export class CreateCandidateDto {
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
      resume: string;
  
    
  
   
  }
  
  export class UpdateCandidateDto {
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
      resume: string;
     
    
  }
  