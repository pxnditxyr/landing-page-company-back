import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsString, Matches } from 'class-validator'
import { ValidRoles } from '../enums'

export class CreateUserDto {
  @IsEmail()
  email: string

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

  @IsString()
  @IsNotEmpty()
  @Matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/ )
  password: string

  @IsIn([ 'ADMIN', 'USER' ])
  role: ValidRoles
}
