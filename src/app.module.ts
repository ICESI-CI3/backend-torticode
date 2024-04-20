import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, NewsModule, SalesModule, ProductsModule, ReportsModule, AuthModule],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
