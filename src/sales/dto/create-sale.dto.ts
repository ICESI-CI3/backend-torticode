import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateSaleDetailDto } from '../../sale-details/dto/create-sale-detail.dto';

export class CreateSaleDto {

    @IsNotEmpty({message: 'the restaurantId is required'})
    @IsNumber()
    restaurantId: number;
    
    @IsNotEmpty({message: 'the studentId is required'})
    @IsNumber()
    studentId: number;

    saleDetails: CreateSaleDetailDto[];
}
