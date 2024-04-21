import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateSaleDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;

    @IsNotEmpty()
    @IsNumber()
    studentId: number;
}
