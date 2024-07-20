import { IsNotEmpty, IsString,ValidateNested } from "class-validator";


export default class PositionDto {
  @IsNotEmpty()
  @IsString()
  name: string;  
}