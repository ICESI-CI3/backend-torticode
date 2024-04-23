import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { New } from './entities/new.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/roles/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([New, Restaurant])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
