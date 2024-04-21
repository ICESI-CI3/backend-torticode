import { IsInt, IsString, Length, IsOptional, IsUrl } from "class-validator";

export class CreateProductDto {

    @IsString()
    readonly name: string;

    @IsString()
    @Length(10,150)
    readonly description: string;

    @IsInt()
    readonly price: number;

    @IsInt()
    readonly stock: number;

    @IsOptional()
    @IsUrl()
    readonly image: string;

}
