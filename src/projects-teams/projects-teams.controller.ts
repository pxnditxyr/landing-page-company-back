import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ProjectsTeamsService } from './projects-teams.service'
import { CreateProjectsTeamDto, UpdateProjectsTeamDto } from './dto'
import { ProjectsTeam } from './entities/projects-team.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/users/enums'

@Controller( 'projects-teams' )
export class ProjectsTeamsController {

  constructor( private readonly projectsTeamsService : ProjectsTeamsService ) {}

  @Post()
  @Auth( ValidRoles.ADMIN )
  async create ( @Body() createProjectsTeamDto : CreateProjectsTeamDto ) : Promise<ProjectsTeam> {
    return this.projectsTeamsService.create( createProjectsTeamDto )
  }

  @Get()
  async findAll () : Promise<ProjectsTeam[]> {
    return this.projectsTeamsService.findAll()
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<ProjectsTeam> {
    return this.projectsTeamsService.findOne( id )
  }

  @Patch( ':id' )
  @Auth( ValidRoles.ADMIN )
  async update(
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateProjectsTeamDto: UpdateProjectsTeamDto
  ) : Promise<ProjectsTeam> {
    return this.projectsTeamsService.update( id, updateProjectsTeamDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.ADMIN )
  async remove ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<ProjectsTeam> {
    return this.projectsTeamsService.remove( id )
  }
}
