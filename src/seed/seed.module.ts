import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
  imports:[UsersService],
})
export class SeedModule {}
