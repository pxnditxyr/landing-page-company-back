import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator'

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  lastname: string

  @IsDateString()
  birthdate: Date

  @IsIn([ 'Male', 'Female', 'Other' ])
  gender: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  info: string

  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
