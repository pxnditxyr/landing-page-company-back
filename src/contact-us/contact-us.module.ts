import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { PrismaService } from 'src/prisma-client';
import { AuthModule } from 'src/auth';

@Module({
  controllers: [ ContactUsController ],
  providers: [
    ContactUsService,
    PrismaService
  ],
  imports: [ AuthModule ]
})
export class ContactUsModule {}
