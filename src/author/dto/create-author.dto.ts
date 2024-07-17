import { IsNotEmpty, IsString } from "class-validator";


export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    firstname:string;
    @IsString()
    @IsNotEmpty()
    lastname:string;
    @IsNotEmpty()
    biography:string;
    @IsNotEmpty()
    dateOfBirth:Date;
    @IsNotEmpty()
    nationality:string
}
