import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  details: string

  @IsString()
  @IsNotEmpty()
  imageUrl: string
}
