import { IsDateString, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  details: string

  @IsNumberString()
  phone: string

  @IsString()
  @IsNotEmpty()
  info: string

  @IsString()
  @IsNotEmpty()
  mission: string

  @IsString()
  @IsNotEmpty()
  vision: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string | null

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  website?: string | null

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string | null

  @IsNumberString()
  @IsOptional()
  documentNumber?: string | null

  @IsDateString()
  foundedAt: Date
}
