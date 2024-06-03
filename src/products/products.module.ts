import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),AuthModule,
UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
  
})
export class ProductsModule {}
