import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { New } from './entities/new.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([New])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
