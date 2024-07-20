import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateBorrowDto {
    @IsNumber()
    @IsNotEmpty()
    bookId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsDateString({}, { message: 'borrowDate must be a valid date string' })
    @IsNotEmpty()
    borrowDate: Date;

    @IsDateString({}, { message: 'dueDate must be a valid date string' })
    @IsNotEmpty()
    dueDate: Date;

    @IsDateString({}, { message: 'returnDate must be a valid date string' })
    @IsNotEmpty()
    returnDate: Date;

    @IsNotEmpty()
    @IsString()
    status: string = "borrowed";
}
