import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { Role } from "../../Auth/models/role.enum";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minSymbols: 0,
    minLowercase: 0,
    minNumbers: 0,
  })
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role: number;
}
