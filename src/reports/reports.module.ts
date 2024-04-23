import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import {Sale} from '../sales/entities/sale.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Report,Sale, User])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
