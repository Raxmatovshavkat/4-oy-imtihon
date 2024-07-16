import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateRegisterDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @IsStrongPassword()
    @IsNotEmpty()
    confirmPassword: string;

    @IsNotEmpty()
    role:Array<string>

    @IsNotEmpty()
    status:string;

}
