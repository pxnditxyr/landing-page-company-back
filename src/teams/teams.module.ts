import { Module } from '@nestjs/common'
import { TeamsService } from './teams.service'
import { TeamsController } from './teams.controller'
import { PrismaService } from 'src/prisma-client'
import { AuthModule } from 'src/auth'
import { CompaniesModule } from 'src/companies'

@Module({
  controllers: [ TeamsController ],
  providers: [
    TeamsService,
    PrismaService
  ],
  imports: [
    AuthModule,
    CompaniesModule
  ],
  exports: [ TeamsService ]
})
export class TeamsModule {}
