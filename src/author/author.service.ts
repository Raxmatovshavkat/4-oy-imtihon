import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author) private readonly authorService:typeof Author){}

 async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorService.create({...createAuthorDto});
  }

  async findAll() {
    const auhtor=await this.authorService.findAll()
    if(!auhtor){
      throw new NotFoundException('Author topilmadi')
    }
    return auhtor
  }

  async findOne(id: number) {
    const auhtor=await this.authorService.findByPk(id)
    if(!auhtor){
      throw new NotFoundException('auhtor bu id buyicha topilmadi')
    }
    return auhtor
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const auhtor = await this.authorService.findByPk(id)
    if (!auhtor) {
      throw new NotFoundException('auhtor bu id buyicha topilmadi')
    }
    return auhtor.update(updateAuthorDto)
  }

  async remove(id: number) {
    const auhtor = await this.authorService.findByPk(id)
    if (!auhtor) {
      throw new NotFoundException('auhtor bu id buyicha topilmadi')
    }
    return auhtor.destroy()
  }
}
