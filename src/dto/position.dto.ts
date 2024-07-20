import { IsNotEmpty, IsString,ValidateNested } from "class-validator";


export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;  
}

export class UpdatePositionDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    
}
