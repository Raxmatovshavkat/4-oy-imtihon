import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/guard/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'librarian')
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
 async create(@Body() createBorrowDto: CreateBorrowDto) {
    return await this.borrowService.create(createBorrowDto);
  }

  @Get()
  async findAll() {
    return await this.borrowService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.borrowService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBorrowDto: UpdateBorrowDto) {
    return await this.borrowService.update(+id, updateBorrowDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.borrowService.remove(+id);
  }
}
