import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users'
import { AuthModule } from './auth'
import { CompaniesModule } from './companies'
import { ProjectsModule } from './projects'
import { TeamsModule } from './teams'
import { TeamMembersModule } from './team-members'
import { ProjectsTeamsModule } from './projects-teams'
import { ContactUsModule } from './contact-us'

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    CompaniesModule,
    ProjectsModule,
    TeamsModule,
    TeamMembersModule,
    ProjectsTeamsModule,
    ContactUsModule
  ],
})
export class AppModule {}
