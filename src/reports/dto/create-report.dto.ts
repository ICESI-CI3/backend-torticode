import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
    /** Título del informe. */
    @IsNotEmpty({ message: 'El título del informe es requerido' })
    @IsString({ message: 'El título del informe debe ser una cadena de caracteres' })
    @MaxLength(100, { message: 'El título del informe no puede tener más de 100 caracteres' })
    title: string;

    /** Número total de ventas incluidas en el informe. */
    @IsNotEmpty({ message: 'El número total de ventas es requerido' })
    @IsNumber({}, { message: 'El número total de ventas debe ser un número' })
    totalSales: number;

    /** Ganancias totales generadas por las ventas incluidas en el informe. */
    @IsNotEmpty({ message: 'Las ganancias totales son requeridas' })
    @IsNumber({}, { message: 'Las ganancias totales deben ser un número' })
    totalEarnings: number;
}
