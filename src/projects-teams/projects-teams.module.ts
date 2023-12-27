import { Module } from '@nestjs/common'
import { ProjectsTeamsService } from './projects-teams.service'
import { ProjectsTeamsController } from './projects-teams.controller'
import { AuthModule } from 'src/auth'
import { ProjectsModule } from 'src/projects/projects.module'
import { TeamsModule } from 'src/teams'
import { PrismaService } from 'src/prisma-client'

@Module({
  controllers: [ ProjectsTeamsController ],
  providers: [
    ProjectsTeamsService,
    PrismaService
  ],
  imports: [
    AuthModule,
    ProjectsModule,
    TeamsModule
  ],
  exports: [ ProjectsTeamsService ]
})
export class ProjectsTeamsModule {}
