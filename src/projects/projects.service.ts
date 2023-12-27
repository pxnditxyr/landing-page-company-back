import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateProjectDto, UpdateProjectDto } from './dto'
import { PrismaService } from 'src/prisma-client'
import { Project } from './entities/project.entity'

@Injectable()
export class ProjectsService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create ( createProjectDto : CreateProjectDto ) : Promise<Project> {
    try {
      const project = await this.prismaService.projects.create({
        data: createProjectDto,
        include: { projectsTeams: true }
      })
      return project
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al crear el proyecto, por favor contacte al administrador' )
    }
  }

  async findAll () : Promise<Project[]> {
    const projects = await this.prismaService.projects.findMany({
      include: { projectsTeams: true },
      orderBy: { createdAt: 'desc' }
    })
    return projects
  }

  async findOne ( id : string ) : Promise<Project> {
    const project = await this.prismaService.projects.findUnique({
      where: { id },
      include: { projectsTeams: true }
    })
    if ( !project ) throw new NotFoundException( 'El proyecto no existe' )
    return project
  }

  async update ( id : string, updateProjectDto : UpdateProjectDto ) : Promise<Project> {
    await this.findOne( id )
    try {
      const project = await this.prismaService.projects.update({
        where: { id },
        data: updateProjectDto,
        include: { projectsTeams: true }
      })
      return project
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al actualizar el proyecto, por favor contacte al administrador' )
    }
  }

  async remove ( id : string ) : Promise<Project> {
    await this.findOne( id )
    try {
      const project = await this.prismaService.projects.delete({
        where: { id },
        include: { projectsTeams: true }
      })
      return project
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Error al eliminar el proyecto, por favor contacte al administrador' )
    }
  }
}
