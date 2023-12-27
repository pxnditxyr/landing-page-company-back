import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto, UpdateCompanyDto } from './dto'
import { Company } from './entities/company.entity'
import { ValidRoles } from 'src/users/enums'
import { Auth } from 'src/auth/decorators'

@Controller('companies')
export class CompaniesController {

  constructor( private readonly companiesService : CompaniesService ) {}

  @Post()
  @Auth( ValidRoles.ADMIN )
  async create ( @Body() createCompanyDto : CreateCompanyDto ) : Promise<Company> {
    return this.companiesService.create( createCompanyDto )
  }

  @Get()
  async findAll () : Promise<Company[]> {
    return this.companiesService.findAll()
  }

  @Get( ':id' )
  async findOne( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Company> {
    return this.companiesService.findOne( id )
  }

  @Patch( ':id' )
  @Auth( ValidRoles.ADMIN )
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) : Promise<Company> {
    return this.companiesService.update( id, updateCompanyDto )
  }

  @Delete( ':id' )
  @Auth( ValidRoles.ADMIN )
  async remove ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Company> {
    return this.companiesService.remove( id )
  }
}
