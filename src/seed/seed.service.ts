import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { finalSupervisor} from './data/user.seed';

@Injectable()
export class SeedService implements OnModuleInit{

    constructor(
        private readonly usersService: UsersService,
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
          console.log(await this.usersService.isTableEmpty()); // Now this will properly wait for the promise to resolve
        } else {
          console.log('DB already populated');
        }
      }


}
