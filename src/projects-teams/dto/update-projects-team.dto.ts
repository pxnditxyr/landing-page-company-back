import { PartialType } from '@nestjs/mapped-types'
import { CreateProjectsTeamDto } from './create-projects-team.dto'

export class UpdateProjectsTeamDto extends PartialType( CreateProjectsTeamDto ) {}
