import { SetMetadata } from "@nestjs/common"
import { ValidRoles } from "src/users/enums"

export const RoleProtected = ( ...args : ValidRoles[] ) => {
  return SetMetadata( 'roles', args )
}
