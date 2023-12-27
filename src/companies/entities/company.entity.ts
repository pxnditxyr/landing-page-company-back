import { Team } from 'src/teams/entities/team.entity'

export class Company {
  id: string
  name: string
  details: string
  phone: string
  info: string
  mission: string
  vision: string
  address?: string | null
  website?: string | null
  email?: string | null
  documentNumber?: string | null
  foundedAt: Date

  createdAt: Date
  updatedAt: Date

  teams?: Team[]
}
