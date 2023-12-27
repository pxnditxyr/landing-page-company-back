import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  details: string

  @IsString()
  @IsNotEmpty()
  info: string

  @IsString()
  @IsNotEmpty()
  imageUrl: string
}
