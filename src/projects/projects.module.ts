import { Module } from '@nestjs/common'
import { ProjectsService } from './projects.service'
import { ProjectsController } from './projects.controller'
import { PrismaService } from 'src/prisma-client'
import { AuthModule } from 'src/auth'

@Module({
  controllers: [ ProjectsController ],
  providers: [
    ProjectsService,
    PrismaService
  ],
  imports: [ AuthModule ],
  exports: [ ProjectsService ]
})
export class ProjectsModule {}
