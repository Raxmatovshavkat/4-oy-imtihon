import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author) private readonly authorModel: typeof Author) { }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new Author({
      ...createAuthorDto,
      dateOfBirth: createAuthorDto.dateOfBirth ? new Date(createAuthorDto.dateOfBirth) : null,
    });
    return author.save();
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.authorModel.findAll();
    if (!authors) {
      throw new NotFoundException('Authors not found');
    }
    return authors;
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorModel.findByPk(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorModel.findByPk(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const updatedFields: any = { ...updateAuthorDto };
    if (updateAuthorDto.dateOfBirth) {
      updatedFields.dateOfBirth = new Date(updateAuthorDto.dateOfBirth);
    }

    return author.update(updatedFields);
  }

  async remove(id: number): Promise<void> {
    const author = await this.authorModel.findByPk(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    await author.destroy();
  }
}
