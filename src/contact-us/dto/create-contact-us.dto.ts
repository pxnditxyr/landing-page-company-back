import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class CreateContactUsDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @IsNumberString()
  phone: string

  @IsString()
  @IsNotEmpty()
  message: string
}
