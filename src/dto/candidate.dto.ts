import { IsEmail, IsJSON, IsNotEmpty, IsNumber, IsString,ValidateNested } from "class-validator";


export default class CandidateDto {

  @IsNotEmpty()
  @IsString()
  name: string;  

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @IsNotEmpty()
  @IsString()
  resume: string;

  @IsNotEmpty()
  @IsJSON()
  skill:JSON;

}