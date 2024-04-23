import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { New } from './entities/new.entity';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { throws } from 'assert';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(New)
    private newsRepository: Repository<New>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>
  ){}
  
  async create(userId: number, createNewsDto: CreateNewsDto) {
    const user = (await this.restaurantRepository.findOne({where:{id:userId}}));
    if(!user){
      throw new NotFoundException(`Restaurant not found with ID ${userId}`);
    }
    const news = this.newsRepository.create(createNewsDto);
    news.restaurant = user;
    return await this.newsRepository.save(news);
  }

  async findAll(): Promise<New[]> {
    return await this.newsRepository.find({
      relations: ['restaurant'] 
    });
  }

  async findOne(id: number): Promise<New> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['restaurant'] // Cargar la relación con Restaurant
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found.`);
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<New> {
    const news = await this.newsRepository.preload({
      id: id,
      ...updateNewsDto
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found.`);
    }
    return await this.newsRepository.save(news);
  }

  async remove(id: number): Promise<void> {
    const result = await this.newsRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`News with ID ${id} not found.`);
    }
  }
}
