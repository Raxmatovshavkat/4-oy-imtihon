import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBorrowDto {
    @IsNumber()
    @IsNotEmpty()
    bookId: number;
    @IsNotEmpty()
    @IsNumber()
    userId: number
    @IsNotEmpty()
    @IsDate()
    borrowDate: Date;
    @IsDate()
    @IsNotEmpty()
    dueDate: Date;
    @IsNotEmpty()
    @IsDate()
    returnDate: Date
    @IsNotEmpty()
    @IsString()
    status: string="borrowed"
}
