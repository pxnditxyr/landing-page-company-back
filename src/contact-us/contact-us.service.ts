import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateContactUsDto } from './dto/create-contact-us.dto'
import { PrismaService } from 'src/prisma-client'
import { ContactUs } from './entities/contact-us.entity'

@Injectable()
export class ContactUsService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create ( createContactUsDto : CreateContactUsDto ) : Promise<ContactUs> {
    try {
      const contactUs = await this.prismaService.contactUs.create({
        data: createContactUsDto
      })
      return contactUs
    } catch ( error ) {
      throw new InternalServerErrorException( 'Hubo un error al crear el formulario de contacto, por favor intente nuevamente' )
    }
  }

  async findAll () : Promise<ContactUs[]> {
    const contactUs = await this.prismaService.contactUs.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return contactUs
  }

  async findOne ( id : string ) : Promise<ContactUs> {
    const contactUs = await this.prismaService.contactUs.findUnique({
      where: { id }
    })
    if ( !contactUs ) throw new NotFoundException( 'El formulario de contacto que busca no existe' )
    return contactUs
  }

  async delete ( id : string ) : Promise<ContactUs> {
    await this.findOne( id )
    const contactUs = await this.prismaService.contactUs.delete({
      where: { id }
    })
    return contactUs
  }
}
