import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { TeamsService } from './teams.service'
import { CreateTeamDto, UpdateTeamDto } from './dto'
import { Team } from './entities/team.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/users/enums'

@Controller( 'teams' )
export class TeamsController {

  constructor( private readonly teamsService : TeamsService ) {}

  @Post()
  @Auth( ValidRoles.ADMIN )
  async create ( @Body() createTeamDto : CreateTeamDto ) : Promise<Team> {
    return this.teamsService.create( createTeamDto )
  }

  @Get()
  async findAll () {
    return this.teamsService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Team> {
    return this.teamsService.findOne( id )
  }

  @Patch( ':id' )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateTeamDto: UpdateTeamDto
  ) : Promise<Team> {
    return this.teamsService.update( id, updateTeamDto )
  }

  @Delete( ':id' )
  async remove( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Team> {
    return this.teamsService.remove( id )
  }
}
