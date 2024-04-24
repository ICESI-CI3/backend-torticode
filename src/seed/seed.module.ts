import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
  imports:[UsersModule],
  exports:[SeedService]
})
export class SeedModule {}
