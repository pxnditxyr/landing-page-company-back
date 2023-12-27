import { IsUUID } from 'class-validator'

export class CreateTeamMemberDto {
  @IsUUID()
  userId: string

  @IsUUID()
  teamId: string
}
