import { IsEmail, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString,ValidateNested } from "class-validator";


export default class CandidateDto {

  @IsNotEmpty()
  @IsString()
  name: string;  

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  resume: string;

  @IsNotEmpty()
  @IsJSON()
  skill:JSON;

}
export  class UpdateCandidateDto
{
  @IsOptional()
  @IsString()
  name: string;  

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  resume: string;

  @IsOptional()
  @IsJSON()
  skill:JSON;


}