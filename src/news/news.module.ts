import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { New } from './entities/new.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([New, Restaurant]),AuthModule,
  UsersModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
