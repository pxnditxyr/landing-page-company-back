import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { User } from './entities/user.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from './enums'

@Controller( 'users' )
export class UsersController {
  constructor( private readonly usersService : UsersService ) {}

  @Post()
  @Auth( ValidRoles.ADMIN )
  async create( @Body() createUserDto : CreateUserDto ) : Promise<User> {
    return this.usersService.create( createUserDto )
  }

  @Get()
  async findAll () : Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<User> {
    return this.usersService.findOne( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateUserDto : UpdateUserDto
  ) : Promise<User> {
    return this.usersService.update( id, updateUserDto )
  }

  @Delete( ':id' )
  @Auth()
  async remove ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<User> {
    return this.usersService.remove( id )
  }
}
