import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';
import { Student } from 'src/roles/entities/student.entity';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { Status } from './enum/status.enum';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) 
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleDetail)
    private saleDetailRepository: Repository<SaleDetail>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const sale = new Sale();
    sale.restaurant = await this.restaurantRepository.findOne({where:{id:createSaleDto.restaurantId}});
    sale.student = await this.studentRepository.findOne({where:{id:createSaleDto.studentId}});
    sale.status = Status.PENDING;
    return this.saleRepository.save(sale);
}

  async findAll() {
    return await this.saleRepository.find();
  }

  async findOne(id: number) {
    return await this.saleRepository.findOneBy({id});
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    return await this.saleRepository.update(id,updateSaleDto)
  }

  async remove(id: number) {
    return await this.saleRepository.softDelete(id);
  }
}
