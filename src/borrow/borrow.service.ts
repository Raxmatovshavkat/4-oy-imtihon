import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Borrow } from './entities/borrow.entity';

@Injectable()
export class BorrowService {
  constructor(@InjectModel(Borrow) private readonly borrowService:typeof Borrow){}
 async create(createBorrowDto: CreateBorrowDto) {
    return await this.borrowService.create({...createBorrowDto});
  }

  async findAll() {
    const borrow=await this.borrowService.findAll()
    if(!borrow){
      throw new NotFoundException()
    }
    return borrow
  }

  async findOne(id: number) {
    const borrow=await this.borrowService.findByPk(id)
    if (!borrow){
      throw new NotFoundException()
    }
    return borrow
  }

  async update(id: number, updateBorrowDto: UpdateBorrowDto) {
    const borrow = await this.borrowService.findByPk(id)
    if (!borrow) {
      throw new NotFoundException()
    }
    return borrow.update(updateBorrowDto)
  }

  async remove(id: number) {
    const borrow = await this.borrowService.findByPk(id)
    if (!borrow) {
      throw new NotFoundException()
    }
    return borrow.destroy()
  }
}
