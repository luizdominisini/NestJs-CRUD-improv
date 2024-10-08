import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class UpdateUserDto {
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
}
