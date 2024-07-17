import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book) private readonly bookService:typeof Book){}

  async create(createBookDto: CreateBookDto) {
    return await this.bookService.create({...createBookDto});
  }

  async findAll() {
    const book=await this.bookService.findAll()
    if(!book){
      throw new UnauthorizedException()
    }
    return book
  }

  async findOne(id: number) {
    const book=await this.bookService.findByPk(id)
    if(!book){
      throw new NotFoundException()
    }
    return book
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookService.findByPk(id)
    if (!book) {
      throw new NotFoundException()
    }
    return book.update(updateBookDto)
  }

  async remove(id: number) {
    const book = await this.bookService.findByPk(id)
    if (!book) {
      throw new NotFoundException()
    }
    return book.destroy()
  }
}
