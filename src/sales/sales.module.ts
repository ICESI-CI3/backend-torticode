import { Module, forwardRef } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';
import { Product } from 'src/products/entities/product.entity';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { Student } from 'src/roles/entities/student.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, Restaurant, Student, SaleDetail, Product]),
    forwardRef(() => AuthModule),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
