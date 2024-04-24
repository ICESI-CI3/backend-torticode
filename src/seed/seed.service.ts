import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { finalSupervisor, products} from './data/user.seed';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SeedService implements OnModuleInit{

    constructor(
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
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
          console.log('Populating DB with seed data');
          await this.usersService.fillSupervisorWithSeedData(finalSupervisor);
          await this.usersService.fillStudentWithSeedData(finalSupervisor.students);
          await this.usersService.fillRestaurantWithSeedData(finalSupervisor.restaurants);
          await this.productsService.fillProductWithSeedData(products);
          console.log(await this.usersService.isTableEmpty()); // Now this will properly wait for the promise to resolve
        } else {
          console.log('DB already populated');
        }
      }


}
