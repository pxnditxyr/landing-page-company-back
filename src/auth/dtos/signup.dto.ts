import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator'

export class SignupDto {
  @IsString()
  @IsNotEmpty( { message: 'El nombre es requerido' } )
  name: string

  @IsString()
  @IsNotEmpty( { message: 'El apellido es requerido' } )
  lastname: string

  @IsDateString( {}, { message: 'La fecha de nacimiento no es válida' } )
  birthdate: Date

  @IsIn([ 'Male', 'Female', 'Other' ], { message: 'El género no es válido, debe escoger entre Masculino, Femenino u Otro' })
  gender: string

  @IsNumberString( { no_symbols: true }, { message: 'El número de teléfono no es válido' } )
  phone: string

  @IsString()
  @IsNotEmpty( { message: 'La información es requerida' } )
  info: string

  @IsEmail( {}, { message: 'El correo electrónico no es válido' } )
  email: string

  @IsString()
  @IsNotEmpty( { message: 'La contraseña es requerida' } )
  @Matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, { message: 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula y un número' } )
  password: string
}
