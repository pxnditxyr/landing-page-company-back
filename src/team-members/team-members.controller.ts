import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { TeamMembersService } from './team-members.service'
import { CreateTeamMemberDto, UpdateTeamMemberDto } from './dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/users/enums'
import { TeamMember } from './entities/team-member.entity'

@Controller( 'team-members' )
export class TeamMembersController {

  constructor( private readonly teamMembersService : TeamMembersService ) {}

  @Post()
  @Auth( ValidRoles.ADMIN )
  async create( @Body() createTeamMemberDto : CreateTeamMemberDto) : Promise<TeamMember> {
    return this.teamMembersService.create( createTeamMemberDto )
  }

  @Get()
  async findAll () : Promise<TeamMember[]> {
    return this.teamMembersService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<TeamMember> {
    return this.teamMembersService.findOne( id )
  }

  @Patch( ':id' )
  @Auth( ValidRoles.ADMIN )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto
  ) : Promise<TeamMember> {
    return this.teamMembersService.update( id, updateTeamMemberDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.ADMIN )
  async remove ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<TeamMember> {
    return this.teamMembersService.remove( id )
  }
}
