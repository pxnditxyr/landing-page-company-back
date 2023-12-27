import { ProjectsTeam } from 'src/projects-teams/entities/projects-team.entity'

export class Project {
  id: string
  name: string
  details: string
  info: string
  imageUrl: string

  createdAt: Date
  updatedAt: Date

  projectsTeams?: ProjectsTeam[]
}
