import { Team } from 'src/teams/entities/team.entity'
import { User } from 'src/users/entities/user.entity'

export class TeamMember {
  id: string
  userId: string
  teamId: string

  createdAt: Date
  updatedAt: Date

  team?: Team | null
  user?: User | null
}
