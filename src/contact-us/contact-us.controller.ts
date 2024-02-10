import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Delete } from '@nestjs/common'
import { ContactUsService } from './contact-us.service'
import { CreateContactUsDto } from './dto/create-contact-us.dto'
import { ContactUs } from './entities/contact-us.entity'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/users/enums'

@Controller( 'contact-us' )
export class ContactUsController {

  constructor( private readonly contactUsService : ContactUsService ) {}

  @Post()
  async create ( @Body() createContactUsDto : CreateContactUsDto ) : Promise<ContactUs> {
    return this.contactUsService.create( createContactUsDto )
  }

  @Get()
  @Auth( ValidRoles.ADMIN )
  async findAll () : Promise<ContactUs[]> {
    return this.contactUsService.findAll()
  }

  @Get( ':id' )
  @Auth( ValidRoles.ADMIN )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<ContactUs> {
    return this.contactUsService.findOne( id )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.ADMIN )
  async delete ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<ContactUs> {
    return this.contactUsService.delete( id )
  }
}
