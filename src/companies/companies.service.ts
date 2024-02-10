import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCompanyDto, UpdateCompanyDto } from './dto'
import { PrismaService } from 'src/prisma-client'
import { Company } from './entities/company.entity'

@Injectable()
export class CompaniesService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create ( createCompanyDto: CreateCompanyDto ) : Promise<Company> {
    try {
      const company = await this.prismaService.companies.create({
        data: {
          ...createCompanyDto,
          foundedAt: new Date( createCompanyDto.foundedAt )
        }
      })
      return company
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Hubo un error al crear la empresa, por favor intente nuevamente' )
    }
  }

  async findAll () : Promise<Company[]> {
    const companies = await this.prismaService.companies.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return companies
  }

  async findOne ( id : string ) : Promise<Company> {
    const company = await this.prismaService.companies.findUnique({
      where: { id }
    })
    if ( !company ) throw new NotFoundException( 'La empresa que busca no existe' )
    return company
  }

  async findFirst () : Promise<Company> {
    const company = await this.prismaService.companies.findFirst()
    if ( !company ) throw new NotFoundException( 'No hay empresas registradas' )
    return company
  }

  async update ( id : string, updateCompanyDto : UpdateCompanyDto ) : Promise<Company> {
    await this.findOne( id )
    try {
      const company = await this.prismaService.companies.update({
        where: { id },
        data: {
          ...updateCompanyDto,
          foundedAt: updateCompanyDto.foundedAt ? new Date( updateCompanyDto.foundedAt ) : undefined
        }
      })
      return company
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Hubo un error al actualizar la empresa, por favor intente nuevamente' )
    }
  }

  async remove ( id : string ) : Promise<Company> {
    await this.findOne( id )
    try {
      const company = await this.prismaService.companies.delete({
        where: { id }
      })
      return company
    } catch ( error ) {
      console.error( error )
      throw new InternalServerErrorException( 'Hubo un error al eliminar la empresa, por favor intente nuevamente' )
    }
  }
}
