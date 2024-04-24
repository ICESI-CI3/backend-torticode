import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeedService {

    constructor(
        private readonly userService: UsersService
    ){}

    populateDB(){
        //this.userService.
    }

}
