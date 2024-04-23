import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateSaleDetailDto {
    @IsNotEmpty()
    @IsNumber()
    productId: number;
    
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    quantity: number;
}
