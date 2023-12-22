import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor (
    private readonly reflector : Reflector
  ) {}

  canActivate ( context : ExecutionContext) : boolean | Promise<boolean> | Observable<boolean> {
    const validRoles : string[] = this.reflector.get( 'roles', context.getHandler() )
    if ( !validRoles ) return true
    if ( validRoles.length === 0 ) return true

    const request = context.switchToHttp().getRequest()
    const user = request.user
    if ( !user ) throw new BadRequestException( 'No se ha encontrado el usuario' )
    if ( validRoles.includes( user.role ) ) return true
    throw new ForbiddenException( 'Usted no tiene permisos para realizar esta acción' )
  }
}
