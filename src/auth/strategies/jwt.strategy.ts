
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { ConfigService } from '@nestjs/config'
import { IJwtPayload } from '../interfaces'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
  constructor (
    private readonly authService : AuthService,
    configService : ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>( 'JWT_SECRET' )
    })
  }

  async validate ( payload : IJwtPayload ) : Promise<User> {
    const { id } = payload
    const user = await this.authService.validateUser( id )
    return user
  }
}
