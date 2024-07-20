import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateBookDto {
    @IsString({ message: 'title must be a string' })
    @IsNotEmpty({ message: 'title should not be empty' })
    title: string;

    @IsString({ message: 'isbn must be a string' })
    @IsNotEmpty({ message: 'isbn should not be empty' })
    isbn: string;

    @IsNotEmpty({ message: 'authorId should not be empty' })
    @IsNumber({}, { message: 'authorId must be a number' })
    authorId: number;

    @IsString({ message: 'category must be a string' })
    @IsNotEmpty({ message: 'category should not be empty' })
    category: string;

    @IsNotEmpty({ message: 'publicationDate should not be empty' })
    @IsDateString({}, { message: 'publicationDate must be a valid date string' })
    publicationDate: string;

    @IsNotEmpty({ message: 'totalCopies should not be empty' })
    @IsNumber({}, { message: 'totalCopies must be a number' })
    totalCopies: number;

    @IsNotEmpty({ message: 'availableCopies should not be empty' })
    @IsNumber({}, { message: 'availableCopies must be a number' })
    availableCopies: number;
}
