import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book) private readonly bookModel: typeof Book) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book({
      ...createBookDto,
      publicationDate: new Date(createBookDto.publicationDate),
    });
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const updatedFields: any = { ...updateBookDto };
    if (updateBookDto.publicationDate) {
      updatedFields.publicationDate = new Date(updateBookDto.publicationDate);
    }

    return book.update(updatedFields);
  }

  async remove(id: number): Promise<void> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await book.destroy();
  }
}
