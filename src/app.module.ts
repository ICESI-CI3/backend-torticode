import { Module } from '@nestjs/common';
import { SalesModule } from './sales/sales.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { SaleDetailsModule } from './sale-details/sale-details.module';



@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_unilunch',
      password: 'root',
      database: 'db_unilunch',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsersModule, NewsModule, SalesModule, ProductsModule, ReportsModule, AuthModule, SaleDetailsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
