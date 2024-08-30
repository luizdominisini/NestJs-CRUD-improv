import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class PatchUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minUppercase: 0,
    minSymbols: 0,
    minLowercase: 0,
    minNumbers: 0,
  })
  @IsOptional()
  password: string;
}
