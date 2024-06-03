import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto {
    @IsNotEmpty({message: 'Title is required'})
    @IsString({message: 'Title must be a string'})
    title: string;

    @IsNotEmpty({message: 'Description is required'})
    @IsString({message: 'Description must be a string'})
    description: string;

    @IsNotEmpty({message: 'image path is required'})
    @IsString({message: 'image path must be a string. Path must be valid.'})
    image: string;
}