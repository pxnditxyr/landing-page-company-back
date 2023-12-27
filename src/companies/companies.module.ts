import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { PrismaService } from 'src/prisma-client'
import { AuthModule } from 'src/auth'

@Module({
  controllers: [ CompaniesController ],
  providers: [
    CompaniesService,
    PrismaService
  ],
  imports: [ AuthModule ],
  exports: [ CompaniesService ]
})
export class CompaniesModule {}
