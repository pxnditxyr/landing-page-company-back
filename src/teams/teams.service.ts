import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateTeamDto, UpdateTeamDto } from './dto'
import { PrismaService } from 'src/prisma-client'
import { CompaniesService } from 'src/companies/companies.service'
import { Team } from './entities/team.entity'

const teamsIncludes = {
  company: true,
  teamMembers: true,
  projectsTeams: true
}

@Injectable()
export class TeamsService {

  constructor (
    private readonly prismaService : PrismaService,
    private readonly companiesService : CompaniesService
  ) {}

  async create ( createTeamDto : CreateTeamDto ) : Promise<Team> {
    const company = await this.companiesService.findFirst()
    try {
      const team = await this.prismaService.teams.create({
        data: {
          ...createTeamDto,
          companyId: company.id
        },
        include: teamsIncludes
      })
      return team
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Hubo un error al crear el equipo, por favor contacte al administrador' )
    }
  }

  async findAll () : Promise<Team[]> {
    const teams = await this.prismaService.teams.findMany({
      orderBy: { createdAt: 'desc' },
      include: teamsIncludes
    })
    return teams
  }

  async findOne( id : string ) : Promise<Team> {
    const team = await this.prismaService.teams.findUnique({
      where: { id },
      include: teamsIncludes
    })
    if ( !team ) throw new NotFoundException( 'El equipo que busca no existe' )
    return team
  }

  async update ( id : string, updateTeamDto : UpdateTeamDto ) : Promise<Team> {
    const company = await this.companiesService.findFirst()
    try {
      const team = await this.prismaService.teams.update({
        where: { id },
        data: {
          ...updateTeamDto,
          companyId: company.id
        },
        include: teamsIncludes
      })
      return team
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Hubo un error al actualizar el equipo, por favor contacte al administrador' )
    }
  }

  async remove ( id : string ) : Promise<Team> {
    await this.findOne( id )
    try {
      const team = await this.prismaService.teams.delete({
        where: { id },
        include: teamsIncludes
      })
      return team
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Hubo un error al eliminar el equipo, por favor contacte al administrador' )
    }
  }
}
