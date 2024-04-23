import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateSaleDetailDto } from '../../sale-details/dto/create-sale-detail.dto';

export class CreateSaleDto {

    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;
    
    @IsNotEmpty()
    @IsNumber()
    studentId: number;

    saleDetails: CreateSaleDetailDto[];
}
