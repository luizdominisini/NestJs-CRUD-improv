import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDto {
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
