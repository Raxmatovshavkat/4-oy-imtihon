import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
    @IsNotEmpty({ message: 'firstname should not be empty' })
    @IsString({ message: 'firstname must be a string' })
    firstname: string;

    @IsNotEmpty({ message: 'lastname should not be empty' })
    @IsString({ message: 'lastname must be a string' })
    lastname: string;

    @IsNotEmpty({ message: 'biography should not be empty' })
    @IsString({ message: 'biography must be a string' })
    biography: string;

    @IsOptional()
    @IsDateString({}, { message: 'dateOfBirth must be a valid date string' })
    dateOfBirth?: string;

    @IsOptional()
    @IsString({ message: 'nationality must be a string' })
    nationality?: string;
}
