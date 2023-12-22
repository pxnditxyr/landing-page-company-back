import { Module, forwardRef } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/prisma-client'
import { AuthModule } from 'src/auth'

@Module({
  controllers: [ UsersController ],
  providers: [
    UsersService,
    PrismaService
  ],

  imports: [
    forwardRef( () => AuthModule )
  ],
  exports: [ UsersService ]
})
export class UsersModule {}
