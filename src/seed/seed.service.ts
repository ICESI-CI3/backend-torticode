import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {  news, productsSeed,restaurantSeed,studentSeed} from './data/user.seed';
import { ProductsService } from 'src/products/products.service';
import { NewsService } from 'src/news/news.service';


@Injectable()
export class SeedService implements OnModuleInit{

    constructor(
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
        private readonly newsService: NewsService,
    ){}
    async onModuleInit(): Promise<void> {
        try {
          await this.populateDB();

        } catch (error) {
          console.error('Failed to seed data:', error);
        }
      }
    
      async populateDB(): Promise<void> {
        if (await this.usersService.isTableEmpty()) {
          console.log('Populating DB with seed data ');
          await this.usersService.fillStudentWithSeedData(studentSeed);
          await this.usersService.fillRestaurantWithSeedData(restaurantSeed);
          await this.productsService.fillProductWithSeedData(productsSeed);
          await this.newsService.fillNewsWithSeedData(news);
          console.log(await this.usersService.isTableEmpty()); // Now this will properly wait for the promise to resolve
        } else {
          console.log('DB already populated');
        }
      }


}
