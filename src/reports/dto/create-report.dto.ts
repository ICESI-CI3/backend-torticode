import { IsDateString, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
    /** Title of the report. */
    @IsNotEmpty({ message: 'The report title is required' })
    @IsString({ message: 'The report title must be a string' })
    @MaxLength(100, { message: 'The report title cannot exceed 100 characters' })
    title: string;

    @IsNotEmpty({ message: 'The start period is required' })
    @IsDateString({})
    periodStart: string; 

    @IsNotEmpty({ message: 'The end period is required' })
    @IsDateString({})
    periodEnd: string; 

}
