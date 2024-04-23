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
  
  async create(createNewsDto: CreateNewsDto) {
    const news = this.newsRepository.create(createNewsDto);
    return await this.newsRepository.save(news);
  }

  async findAll(): Promise<New[]> {
    return await this.newsRepository.find({
      relations: ['restaurant'],
      order: {
        createdAt: 'DESC' // Order by the 'createdAt' field in descending order
      }
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

  async findByRestaurantId(restaurantId: number): Promise<New[]> {
    const user = (await this.restaurantRepository.findOne({where:{id:restaurantId}}));
    const news = await this.newsRepository.find({
      where: { restaurant: user },
      relations: ['restaurant'],
      order: {
        createdAt: 'DESC' // Order by the 'createdAt' field in descending order
      }
    });
    if (!news.length) {
      throw new NotFoundException(`News for Restaurant with ID ${restaurantId} not found.`);
    }
    return news;
  }

}
