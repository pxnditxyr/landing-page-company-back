import { IsUUID } from 'class-validator'

export class CreateProjectsTeamDto {
  @IsUUID()
  projectId: string

  @IsUUID()
  teamId: string
}
