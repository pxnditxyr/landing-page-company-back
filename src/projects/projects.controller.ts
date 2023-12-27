import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { CreateProjectDto, UpdateProjectDto } from './dto'
import { Project } from './entities/project.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/users/enums'

@Controller( 'projects' )
export class ProjectsController {

  constructor( private readonly projectsService : ProjectsService ) {}

  @Post()
  @Auth( ValidRoles.ADMIN )
  async create ( @Body() createProjectDto : CreateProjectDto ) : Promise<Project> {
    return this.projectsService.create( createProjectDto )
  }

  @Get()
  async findAll () : Promise<Project[]> {
    return this.projectsService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Project> {
    return this.projectsService.findOne( id )
  }

  @Patch( ':id' )
  @Auth( ValidRoles.ADMIN )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateProjectDto : UpdateProjectDto
  ) : Promise<Project> {
    return this.projectsService.update( id, updateProjectDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.ADMIN )
  async remove ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Project> {
    return this.projectsService.remove( id )
  }
}
