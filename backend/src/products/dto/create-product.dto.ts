import { IsInt, IsString, Length, IsOptional, IsUrl } from "class-validator";

export class CreateProductDto {

    @IsString({message: 'Name must be a string'})
    readonly name: string;

    @IsString({message: 'Description must be a string'})
    @Length(10,150)
    readonly description: string;

    @IsInt({message: 'Price must be a positive number'})
    readonly price: number;

    @IsInt({message: 'Stock must be a positive number'})
    readonly stock: number;

    @IsOptional({message: 'Image is optional'})
    @IsUrl()
    readonly image: string;

}
