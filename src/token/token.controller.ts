import { RefreshTokenService } from "./token.service";
import { Controller, Get } from "@nestjs/common";

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: RefreshTokenService) { }

    @Get()
    findAll() {
        return this.tokenService.getAll();
    }
}
