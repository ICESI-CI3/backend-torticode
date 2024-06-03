import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { NewsService } from 'src/news/news.service';
import { NewsModule } from 'src/news/news.module';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
  imports:[UsersModule,ProductsModule,NewsModule],
  exports:[SeedService]
})
export class SeedModule {}
