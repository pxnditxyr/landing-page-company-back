import { Project } from "src/projects/entities/project.entity"
import { Team } from "src/teams/entities/team.entity"

export class ProjectsTeam {
  id: string
  projectId: string
  teamId: string

  createdAt: Date
  updatedAt: Date

  project?: Project | null
  team?: Team | null
}
