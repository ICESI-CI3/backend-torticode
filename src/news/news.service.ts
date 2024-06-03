import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { New } from './entities/new.entity';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NewsService {
  
  constructor(
    @InjectRepository(New)
    private newsRepository: Repository<New>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private readonly usersService: UsersService,
  ){}
  
  async create({email}: {email: string;}, createNewsDto: CreateNewsDto): Promise<New> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found with email ${email}`);
    }
    console.log(user.id);  // Esto se mueve después de la verificación de usuario
  
    const news = this.newsRepository.create(createNewsDto);
    news.restaurant = user as Restaurant;
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

  async fillNewsWithSeedData(news: New[]) {
    
    for(let neww of news){
      const existNew = await this.newsRepository.findOne(
        {where:{id:neww.id,restaurant:{id:neww.restaurant.id}}});
      if(!existNew){
        //const newNews = this.newsRepository.create(neww);
        await this.newsRepository.save(neww);
      }
    }
  }

}
