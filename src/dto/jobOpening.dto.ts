import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
  } from "class-validator";
  import { Type } from "class-transformer";
  import "reflect-metadata";

  
  export class CreateJobOpeningDto{
    @IsNotEmpty()
    @IsString()
    position: string;
  
   
    @IsNotEmpty()
    @IsString()
    description: string;


    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsNumber()
    experience: number;

    @IsNotEmpty()
    @IsNumber()
    noOfOpening: number;
  
    
    @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  skills?: string;
   
    
  }
  
  export class UpdateJobOPeningDto{
    @IsNotEmpty()
    @IsString()
    position: string;
  
   
    @IsNotEmpty()
    @IsString()
    description: string;


    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsNumber()
    experience: number;

    @IsNotEmpty()
    @IsNumber()
    noOfOpening: number;
  
    
    @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsString()
  skills?: string;
  
  }
  