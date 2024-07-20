import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { Borrow } from './entities/borrow.entity';

@Injectable()
export class BorrowService {
  constructor(@InjectModel(Borrow) private readonly borrowModel: typeof Borrow) { }

  async create(createBorrowDto: CreateBorrowDto): Promise<Borrow> {
    const borrow = new Borrow({
      ...createBorrowDto,
      borrowDate: new Date(createBorrowDto.borrowDate),
      dueDate: new Date(createBorrowDto.dueDate),
      returnDate: new Date(createBorrowDto.returnDate),
    });
    return borrow.save();
  }

  async findAll(): Promise<Borrow[]> {
    return this.borrowModel.findAll();
  }

  async findOne(id: number): Promise<Borrow> {
    const borrow = await this.borrowModel.findByPk(id);
    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }
    return borrow;
  }

  async update(id: number, updateBorrowDto: any): Promise<Borrow> {
    const borrow = await this.borrowModel.findByPk(id);
    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }

    const updatedFields: any = { ...updateBorrowDto };
    if (updateBorrowDto.borrowDate) {
      updatedFields.borrowDate = new Date(updateBorrowDto.borrowDate);
    }
    if (updateBorrowDto.dueDate) {
      updatedFields.dueDate = new Date(updateBorrowDto.dueDate);
    }
    if (updateBorrowDto.returnDate) {
      updatedFields.returnDate = new Date(updateBorrowDto.returnDate);
    }

    return borrow.update(updatedFields);
  }

  async remove(id: number): Promise<void> {
    const borrow = await this.borrowModel.findByPk(id);
    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }
    await borrow.destroy();
  }
}
