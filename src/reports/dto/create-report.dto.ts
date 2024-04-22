import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
    /** Título del informe. */
    @IsNotEmpty({ message: 'El título del informe es requerido' })
    @IsString({ message: 'El título del informe debe ser una cadena de caracteres' })
    @MaxLength(100, { message: 'El título del informe no puede tener más de 100 caracteres' })
    title: string;

    @IsNotEmpty({ message: 'El periodo de inicio es requerido' })
    @IsDateString()
    periodoInicio: string; 

    @IsNotEmpty({message: 'El periodo de de finalización es requerido' })
    @IsDateString()
    periodoFin: string; 

}
