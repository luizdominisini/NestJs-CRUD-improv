import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
