import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string
    @IsString()
    @IsNotEmpty()
    isbn: string
    @IsNotEmpty()
    auhtorId: number
    @IsString()
    @IsNotEmpty()
    category: string
    @IsNotEmpty()
    publicationDate: Date
    @IsNotEmpty()
    @IsNumber()
    totalCopies: number
    @IsNotEmpty()
    @IsNumber()
    availableCopies: number
}
