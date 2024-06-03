import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class ResponseSaleDetailDto {

    id: number;
    productId: number;
    quantity: number;
    unitValue: number;
    subtotal:number;
}
