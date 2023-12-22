import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { UserRoleGuard } from '../guards'
import { RoleProtected } from './role-protected.decorator'

import { ValidRoles } from 'src/users/enums'


export function Auth( ...roles : ValidRoles[] ) {
  return applyDecorators(
    RoleProtected( ...roles ),
    UseGuards( AuthGuard(), UserRoleGuard )
  )
}
