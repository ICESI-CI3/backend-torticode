import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateSaleDetailDto {
    @IsNotEmpty({message: 'the productId is required'})
    @IsNumber()
    productId: number;
    
    @IsNotEmpty({message: 'the saleId is required'})
    @IsInt({message: 'the saleId must be an integer'})
    @IsPositive({message: 'the saleId must be a positive number'})
    quantity: number;
}
