import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
    token: string;
    userId: number;
    expiryDate: Date; 

}
