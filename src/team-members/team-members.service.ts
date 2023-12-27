import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto'
import { PrismaService } from 'src/prisma-client'
import { UsersService } from 'src/users/users.service'
import { TeamsService } from 'src/teams/teams.service'
import { TeamMember } from './entities/team-member.entity'

@Injectable()
export class TeamMembersService {

  constructor (
    private readonly prismaService : PrismaService,
    private readonly usersService : UsersService,
    private readonly teamsService : TeamsService
  ) {}

  async create ( createTeamMemberDto : CreateTeamMemberDto ) : Promise<TeamMember> {
    const { teamId, userId } = createTeamMemberDto
    await this.usersService.findOne( userId )
    await this.teamsService.findOne( teamId )

    try {
      const teamMember = await this.prismaService.teamMembers.create({
        data: createTeamMemberDto,
        include: { team: true, user: true }
      })
      return teamMember
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al crear el miembro del equipo, por favor contacte al administrador' )
    }
  }

  async findAll () : Promise<TeamMember[]> {
    const teamMembers = await this.prismaService.teamMembers.findMany({
      include: { team: true, user: true },
      orderBy: { createdAt: 'desc' }
    })
    return teamMembers
  }

  async findOne ( id : string ) : Promise<TeamMember> {
    const teamMember = await this.prismaService.teamMembers.findUnique({
      where: { id },
      include: { team: true, user: true }
    })
    if ( !teamMember ) throw new NotFoundException( 'El miembro del equipo no existe' )
    return teamMember
  }

  async update ( id : string, updateTeamMemberDto : UpdateTeamMemberDto ) : Promise<TeamMember> {
    await this.findOne( id )
    const { teamId, userId } = updateTeamMemberDto
    if ( teamId ) await this.teamsService.findOne( teamId )
    if ( userId ) await this.usersService.findOne( userId )
    try {
      const teamMember = await this.prismaService.teamMembers.update({
        where: { id },
        data: updateTeamMemberDto,
        include: { team: true, user: true }
      })
      return teamMember
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al actualizar el miembro del equipo, por favor contacte al administrador' )
    }
  }

  async remove ( id : string ) : Promise<TeamMember> {
    await this.findOne( id )
    try {
      const teamMember = await this.prismaService.teamMembers.delete({
        where: { id },
        include: { team: true, user: true }
      })
      return teamMember
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al eliminar el miembro del equipo, por favor contacte al administrador' )
    }
  }
}
