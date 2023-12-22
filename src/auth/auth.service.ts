import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { SigninDto, SignupDto } from './dtos'

import { compareSync } from 'bcrypt'
import { ValidRoles } from 'src/users/enums'
import { User } from 'src/users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { AuthResponse } from './types'

@Injectable()
export class AuthService {

  constructor (
    private readonly usersService : UsersService,
    private readonly jwtService : JwtService
  ) {}

  async signin ( signinDto : SigninDto ) : Promise<AuthResponse> {
    const { email, password } = signinDto
    try {
      const user = await this.usersService.findOneByEmail( email )
      if ( !compareSync( password, user.password ) ) throw new Error()
      return {
        token: this.generateToken( user.id ),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    } catch ( error ) {
      throw new UnauthorizedException( 'El usuario o la contraseña son incorrectos' )
    }
  }

  async signup ( signupDto : SignupDto ) : Promise<AuthResponse> {
    const user = await this.usersService.create({
      ...signupDto,
      role: ValidRoles.USER
    })

    return {
      token: this.generateToken( user.id ),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  }

  async revalidateToken ( user : User ) : Promise<AuthResponse> {
    return {
      token: this.generateToken( user.id ),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  }

  async validateUser ( id : string ) : Promise<User> {
    const user = await this.usersService.findOne( id )
    return user
  }

  private generateToken ( id : string ) : string {
    return this.jwtService.sign({ id })
  }
}
