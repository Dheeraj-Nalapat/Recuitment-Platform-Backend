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

  
  export default class JobOpeningDto{
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
    @IsString()
    experience: string;

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
  