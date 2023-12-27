import { Module } from '@nestjs/common'
import { TeamMembersService } from './team-members.service'
import { TeamMembersController } from './team-members.controller'
import { PrismaService } from 'src/prisma-client'
import { UsersModule } from 'src/users'
import { TeamsModule } from 'src/teams'
import { AuthModule } from 'src/auth'

@Module({
  controllers: [ TeamMembersController ],
  providers: [
    TeamMembersService,
    PrismaService
  ],
  imports: [
    UsersModule,
    TeamsModule,
    AuthModule
  ],
  exports: [ TeamMembersService ]
})
export class TeamMembersModule {}
