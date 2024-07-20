import { IsNotEmpty, IsOptional, IsString,ValidateNested } from "class-validator";


export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  
}


export class UpdatePositionDto {

    @IsOptional()
    @IsString()
    name: string;

    
}
