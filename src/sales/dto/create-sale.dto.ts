import { IsNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { CreateSaleDetailDto } from '../../sale-details/dto/create-sale-detail.dto';
import { Type } from 'class-transformer';

export class CreateSaleDto {

    @IsNotEmpty({message: 'the restaurantId is required'})
    @IsNumber()
    restaurantId: number;
    
    @IsNotEmpty({message: 'the studentId is required'})
    @IsNumber()
    studentId: number;

    //saleDetails: CreateSaleDetailDto[];
    @ValidateNested({ each: true })
    @Type(() => CreateSaleDetailDto)
    saleDetails: CreateSaleDetailDto[];
}
