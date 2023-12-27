import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateProjectsTeamDto, UpdateProjectsTeamDto } from './dto'
import { ProjectsService } from 'src/projects/projects.service'
import { TeamsService } from 'src/teams/teams.service'
import { PrismaService } from 'src/prisma-client'
import { ProjectsTeam } from './entities/projects-team.entity'

@Injectable()
export class ProjectsTeamsService {

  constructor (
    private readonly prismasService : PrismaService,
    private readonly projectsService : ProjectsService,
    private readonly teamsService : TeamsService
  ) {}

  async create ( createProjectsTeamDto : CreateProjectsTeamDto ) : Promise<ProjectsTeam> {
    const { projectId, teamId } = createProjectsTeamDto
    await this.projectsService.findOne( projectId )
    await this.teamsService.findOne( teamId )

    try {
      const projectsTeam = await this.prismasService.projectsTeams.create({
        data: createProjectsTeamDto,
        include: { project: true, team: true }
      })
      return projectsTeam
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al crear el equipo del proyecto, por favor contacte al administrador' )
    }
  }

  async findAll () : Promise<ProjectsTeam[]> {
    const projectsTeams = await this.prismasService.projectsTeams.findMany({
      include: { project: true, team: true },
      orderBy: { createdAt: 'desc' }
    })
    return projectsTeams
  }

  async findOne( id : string ) : Promise<ProjectsTeam> {
    const projectsTeam = await this.prismasService.projectsTeams.findUnique({
      where: { id },
      include: { project: true, team: true }
    })
    if ( !projectsTeam ) throw new NotFoundException( 'El equipo del proyecto no existe' )
    return projectsTeam
  }

  async update ( id : string, updateProjectsTeamDto : UpdateProjectsTeamDto ) : Promise<ProjectsTeam> {
    await this.findOne( id )
    const { projectId, teamId } = updateProjectsTeamDto
    if ( projectId ) await this.projectsService.findOne( projectId )
    if ( teamId ) await this.teamsService.findOne( teamId )
    try {
      const projectsTeam = await this.prismasService.projectsTeams.update({
        where: { id },
        data: updateProjectsTeamDto,
        include: { project: true, team: true }
      })
      return projectsTeam
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al actualizar el equipo del proyecto, por favor contacte al administrador' )
    }
  }

  async remove ( id : string ) : Promise<ProjectsTeam> {
    await this.findOne( id )
    try {
      const projectsTeam = await this.prismasService.projectsTeams.delete({
        where: { id },
        include: { project: true, team: true }
      })
      return projectsTeam
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al eliminar el equipo del proyecto, por favor contacte al administrador' )
    }
  }
}
