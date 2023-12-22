import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto'
import { User } from './entities/user.entity'
import { PrismaService } from 'src/prisma-client'
import { hashSync } from 'bcrypt'

@Injectable()
export class UsersService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create ( createUserDto : CreateUserDto ) : Promise<User> {
    try {
      const { password } = createUserDto
      const hashedPassword = hashSync( password, 10 )
      const user = await this.prismaService.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          birthdate: new Date( createUserDto.birthdate )
        }
      })
      return user
    } catch ( error ) {
      this.handlerExceptions( error )
    }
  }

  async findAll () : Promise<User[]> {
    const users = await this.prismaService.users.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return users
  }

  async findOne ( id : string ) : Promise<User> {
    const user = await this.prismaService.users.findUnique({
      where: { id }
    })
    if ( !user ) throw new NotFoundException( 'Usuario no encontrado' )
    return user
  }

  async findOneByEmail ( email : string ) : Promise<User> {
    const user = await this.prismaService.users.findUnique({
      where: { email }
    })
    if ( !user ) throw new NotFoundException( 'Usuario no encontrado' )
    return user
  }

  async update ( id : string, updateUserDto : UpdateUserDto ) : Promise<User> {
    await this.findOne( id )
    try {
      const { password } = updateUserDto
      const user = await this.prismaService.users.update({
        where: { id },
        data: {
          ...updateUserDto,
          password: password ? hashSync( password, 10 ) : undefined,
          birthdate: updateUserDto.birthdate ? new Date( updateUserDto.birthdate ) : undefined
        }
      })
      return user
    } catch ( error ) {
      this.handlerExceptions( error )
    }
  }

  async remove ( id : string ) : Promise<User> {
    await this.findOne( id )
    try {
      const user = await this.prismaService.users.delete({
        where: { id }
      })
      return user
    } catch ( error ) {
      this.handlerExceptions( error )
    }
  }

  private handlerExceptions ( error : any ) : never {
    if ( error.code === 'P2002' ) throw new BadRequestException( 'El email ya esta en uso' )
    console.log( error )
    throw new InternalServerErrorException( 'Algo salio mal, por favor contacte al administrador' )
  }
}
