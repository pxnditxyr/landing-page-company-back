import { Company } from "src/companies/entities/company.entity"
import { ProjectsTeam } from "src/projects-teams/entities/projects-team.entity"
import { TeamMember } from "src/team-members/entities/team-member.entity"

export class Team {
  id: string
  name: string
  details: string
  imageUrl: string
  companyId: string

  createdAt: Date
  updatedAt: Date

  company?: Company | null
  teamMembers?: TeamMember[]
  projectsTeams?: ProjectsTeam[]
}
