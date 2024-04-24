import { IsNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { CreateSaleDetailDto } from '../../sale-details/dto/create-sale-detail.dto';
import { Type } from 'class-transformer';

export class ResponseSaleDto {
    id:number;
    restaurantId: number;
    studentId: number;
    saleDetails: CreateSaleDetailDto[];
    totalValue:number;
}
