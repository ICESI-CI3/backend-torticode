import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { New } from './entities/new.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(New)
    private newsRepository: Repository<New>
  ){}
  
  async create(createNewsDto: CreateNewsDto) {
    const news = this.create(createNewsDto);
    return await this.newsRepository.save(news);
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async findOne(id: number) {
    return await this.newsRepository.findOneBy({id});
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    return await this.newsRepository.update(id, updateNewsDto);
  }

  async remove(id: number) {
    return await this.newsRepository.softDelete(id);
  }
}
